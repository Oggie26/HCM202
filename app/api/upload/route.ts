import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import pdf from 'pdf-parse';
import mammoth from 'mammoth'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Không có file được tải lên' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Chỉ hỗ trợ file PDF và Word' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File quá lớn. Kích thước tối đa là 10MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Extract text content
    let textContent = ''
    let pages = 0

    if (file.type === 'application/pdf') {
      try {
        const pdfData = await pdf(buffer)
        textContent = pdfData.text
        pages = pdfData.numpages
      } catch (error) {
        console.error('PDF parsing error:', error)
        return NextResponse.json(
          { error: 'Không thể đọc file PDF' },
          { status: 400 }
        )
      }
    } else if (file.type.includes('word')) {
      try {
        const result = await mammoth.extractRawText({ buffer })
        textContent = result.value
        pages = Math.ceil(textContent.length / 2000) // Estimate pages
      } catch (error) {
        console.error('Word parsing error:', error)
        return NextResponse.json(
          { error: 'Không thể đọc file Word' },
          { status: 400 }
        )
      }
    }

    // Save extracted text to a separate file for AI to use
    const textFileName = `${fileName}.txt`
    const textFilePath = join(uploadsDir, textFileName)
    await writeFile(textFilePath, textContent, 'utf-8')

    return NextResponse.json({
      success: true,
      fileName,
      pages,
      textLength: textContent.length,
      message: 'File đã được tải lên và xử lý thành công'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tải lên file' },
      { status: 500 }
    )
  }
}

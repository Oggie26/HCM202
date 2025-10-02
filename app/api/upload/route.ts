import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
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

    // Chỉ cho phép file Word
    const allowedTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Chỉ hỗ trợ file Word' },
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File quá lớn. Kích thước tối đa là 10MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = join('/tmp', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Dùng mammoth để trích xuất text từ file Word
    let textContent = ''
    let pages = 0

    try {
      const result = await mammoth.extractRawText({ buffer })
      textContent = result.value
      pages = Math.ceil(textContent.length / 2000) // ước lượng số trang
    } catch (error) {
      console.error('Word parsing error:', error)
      return NextResponse.json(
        { error: 'Không thể đọc file Word' },
        { status: 400 }
      )
    }

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

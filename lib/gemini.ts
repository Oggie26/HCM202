import axios from 'axios'

const geminiConfig = {
    apiKey:  'AIzaSyBny_5rk8aKOYT4Ld-_sgT9FD0v-Eggb54',
    apiUrl:  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    model: 'gemini-2.0-flash'
}

export interface GeminiMessage {
  role: 'user' | 'model'
  parts: { text: string }[]
}

export interface GeminiRequest {
  contents: GeminiMessage[]
  generationConfig?: {
    temperature?: number
    maxOutputTokens?: number
    topP?: number
    topK?: number
  }
}

export async function generateContent(messages: GeminiMessage[]): Promise<string> {
  try {
    const requestData: GeminiRequest = {
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.8,
        topK: 40
      }
    }

    console.log('Sending request to Gemini:', JSON.stringify(requestData, null, 2))

    const response = await axios.post(
      `${geminiConfig.apiUrl}?key=${geminiConfig.apiKey}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('Gemini response:', JSON.stringify(response.data, null, 2))

    if (response.data && response.data.candidates && response.data.candidates[0]) {
      const candidate = response.data.candidates[0]
      if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
        return candidate.content.parts[0].text
      }
    }

    throw new Error('Không thể tạo phản hồi từ Gemini')
  } catch (error) {
    console.error('Gemini API error:', error)
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data)
      if (error.response?.status === 401) {
        throw new Error('API key không hợp lệ')
      } else if (error.response?.status === 429) {
        throw new Error('Đã vượt quá giới hạn API')
      } else if (error.response?.status === 400) {
        throw new Error(`Lỗi yêu cầu: ${JSON.stringify(error.response?.data)}`)
      } else {
        throw new Error(`Lỗi API: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`)
      }
    }
    throw new Error('Có lỗi xảy ra khi gọi Gemini API')
  }
}

export default geminiConfig

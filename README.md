# 🎓 Chat AI - Tư tưởng Hồ Chí Minh

Ứng dụng chat AI hiện đại hỗ trợ học tập môn Tư tưởng Hồ Chí Minh với giao diện đẹp mắt và tính năng quản lý câu hỏi thông minh.

## ✨ Tính năng nổi bật

- 🤖 **Chat AI thông minh** với Gemini 2.0 Flash
- 📚 **Upload giáo trình** (PDF, Word) để AI đọc và trả lời chính xác
- 💬 **Gửi câu hỏi trực tiếp** cho giáo viên
- 👨‍🏫 **Dashboard quản lý** với thống kê và bộ lọc thông minh
- 🎨 **Giao diện hiện đại** với glass morphism và animations
- 📱 **Responsive design** hoạt động tốt trên mọi thiết bị
- 🔔 **Notification system** thông báo real-time
- 🚀 **Deploy trên Vercel** với cấu hình tối ưu

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd ho-chi-minh-chat-ai
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env.local`:
```bash
cp env.example .env.local
```

4. Thêm OpenAI API Key vào `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Chạy ứng dụng:
```bash
npm run dev
```

## Cấu trúc dự án

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # API chat với AI
│   │   ├── upload/route.ts         # API upload file
│   │   └── questions/route.ts     # API quản lý câu hỏi
│   ├── teacher/
│   │   └── page.tsx               # Trang quản lý cho giáo viên
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   # Trang chính
├── components/
│   ├── ChatInterface.tsx          # Giao diện chat
│   ├── Header.tsx                 # Header
│   ├── Sidebar.tsx                # Sidebar
│   ├── UploadModal.tsx            # Modal upload file
│   ├── QuestionModal.tsx          # Modal gửi câu hỏi
│   └── QuestionsList.tsx          # Danh sách câu hỏi
└── uploads/                       # Thư mục lưu file upload
```

## Deploy trên Vercel

1. Push code lên GitHub
2. Kết nối repository với Vercel
3. Thêm environment variables:
   - `OPENAI_API_KEY`: API key của OpenAI
4. Deploy

## Sử dụng

### Cho sinh viên:
- Truy cập trang chính để chat với AI
- Click "Gửi câu hỏi cho giáo viên" để gửi câu hỏi trực tiếp
- Upload giáo trình để AI có thể đọc và trả lời chính xác hơn

### Cho giáo viên:
- Truy cập `/teacher` để xem và trả lời câu hỏi
- Upload giáo trình qua sidebar
- Quản lý câu hỏi từ sinh viên

## Công nghệ sử dụng

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenAI API** - AI chat
- **Vercel** - Deployment
- **PDF-parse** - Đọc file PDF
- **Mammoth** - Đọc file Word

## Lưu ý

- Cần có OpenAI API key để sử dụng tính năng chat AI
- File upload giới hạn 10MB
- Hỗ trợ định dạng PDF và Word
- Dữ liệu câu hỏi hiện tại lưu trong memory (cần database cho production)
"# HCM202" 
"# HCM202" 

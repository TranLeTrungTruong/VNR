# 🔑 Hướng dẫn lấy API Keys cho Supabase và Gemini

## 📦 **1. SUPABASE - Database cho Feedback**

### Bước 1: Đăng ký tài khoản
1. Truy cập: https://supabase.com
2. Click **"Start your project"** hoặc **"Sign up"**
3. Đăng ký bằng GitHub, Google, hoặc Email

### Bước 2: Tạo Project mới
1. Sau khi đăng nhập, click **"New Project"**
2. Điền thông tin:
   - **Project Name**: `VNR202` (hoặc tên bạn muốn)
   - **Database Password**: Tạo password mạnh (lưu lại!)
   - **Region**: Chọn gần nhất (ví dụ: `Southeast Asia (Singapore)`)
   - **Pricing Plan**: Chọn **Free** (miễn phí)
3. Click **"Create new project"** và đợi 2-3 phút

### Bước 3: Lấy API Keys
1. Vào **Settings** (biểu tượng bánh răng) ở sidebar trái
2. Chọn **API** trong menu Settings
3. Bạn sẽ thấy:
   - **Project URL**: `https://xxxxx.supabase.co` (đây là `VITE_SUPABASE_URL`)
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (đây là `VITE_SUPABASE_ANON_KEY`)

### Bước 4: Tạo bảng Feedback
1. Vào **SQL Editor** ở sidebar trái
2. Chạy SQL sau để tạo bảng:

```sql
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  email TEXT,
  language TEXT DEFAULT 'vi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để tìm kiếm nhanh hơn
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
```

3. Click **Run** để tạo bảng

### Bước 5: Cấu hình Row Level Security (RLS)
1. Vào **Authentication** → **Policies** hoặc **Table Editor** → chọn bảng `feedback`
2. Enable RLS nếu chưa bật
3. Tạo policy cho phép INSERT (người dùng có thể thêm feedback):
   - Vào **SQL Editor** và chạy:

```sql
-- Cho phép ai cũng có thể insert feedback
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on feedback"
ON feedback FOR INSERT
TO public
WITH CHECK (true);
```

---

## 🤖 **2. GEMINI API - AI Chatbot**

### Bước 1: Lấy API Key từ Google AI Studio
1. Truy cập: https://aistudio.google.com/apikey
2. Đăng nhập bằng tài khoản Google của bạn
3. Click **"Create API Key"**
4. Chọn project Google Cloud (hoặc tạo mới nếu chưa có)
5. Copy API Key: `AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Bước 2: Kiểm tra API Key
- API Key có dạng: `AIzaSy...` (bắt đầu bằng `AIza`)
- Free tier có 15 requests/phút, 1,500 requests/ngày

### Bước 3: Model name
- Model mặc định: `gemini-2.5-flash` (hoặc `gemini-1.5-flash`)
- Có thể thay đổi trong biến môi trường `VITE_GEMINI_MODEL`

---

## ⚙️ **3. CẤU HÌNH TRÊN VERCEL**

### Cách 1: Qua Vercel Dashboard (Khuyến nghị)
1. Vào https://vercel.com và đăng nhập
2. Chọn project **VNR202** (hoặc project của bạn)
3. Vào **Settings** → **Environment Variables**
4. Thêm các biến sau:

#### **Supabase:**
```
Name: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co
(Environment: Production, Preview, Development - chọn cả 3)
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
(Environment: Production, Preview, Development - chọn cả 3)
```

#### **Gemini:**
```
Name: VITE_GEMINI_API_KEY
Value: AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
(Environment: Production, Preview, Development - chọn cả 3)
```

```
Name: VITE_GEMINI_MODEL
Value: gemini-2.5-flash
(Environment: Production, Preview, Development - chọn cả 3)
```

5. Click **Save** cho mỗi biến
6. **Redeploy** project để áp dụng thay đổi

### Cách 2: Qua file .env.local (Development)
1. Tạo file `.env.local` ở thư mục gốc project:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_GEMINI_MODEL=gemini-2.5-flash
```

2. **Lưu ý**: Không commit file `.env.local` lên git (đã có trong .gitignore)

---

## ✅ **4. KIỂM TRA CẤU HÌNH**

### Test Supabase:
1. Mở Developer Console (F12)
2. Vào trang Feedback và gửi một feedback test
3. Kiểm tra console không có lỗi
4. Vào Supabase Dashboard → **Table Editor** → `feedback` để xem dữ liệu

### Test Gemini:
1. Mở trang Chat (/chat)
2. Gửi một câu hỏi test
3. Nếu có phản hồi từ AI → thành công!
4. Nếu có lỗi → kiểm tra lại API key

---

## 📋 **TÓM TẮT CÁC KEY CẦN:**

| Key | Lấy từ đâu | Ví dụ |
|-----|------------|-------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_GEMINI_API_KEY` | Google AI Studio → Create API Key | `AIzaSyxxxxxxxxxxxxx` |
| `VITE_GEMINI_MODEL` | Tùy chọn (mặc định: gemini-2.5-flash) | `gemini-2.5-flash` |

---

## 🚨 **LƯU Ý BẢO MẬT:**

- ⚠️ **KHÔNG** commit API keys lên GitHub
- ⚠️ **KHÔNG** chia sẻ keys với người khác
- ✅ Sử dụng `.env.local` cho development
- ✅ Sử dụng Vercel Environment Variables cho production
- ✅ Supabase Anon Key là public key, an toàn để dùng ở client-side
- ✅ Gemini API Key nên giữ bí mật, nhưng do Vite expose nên cần cẩn thận

---

## 🎉 **HOÀN THÀNH!**

Sau khi cấu hình xong, bạn sẽ có:
- ✅ Database lưu feedback từ người dùng
- ✅ AI Chatbot hoạt động với Gemini
- ✅ Tất cả tính năng hoạt động đầy đủ!


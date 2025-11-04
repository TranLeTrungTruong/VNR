# 📊 Hướng dẫn tạo Database Feedback trong Supabase

## 🎯 **Mục tiêu**
Tạo bảng `feedback` trong Supabase để lưu trữ phản hồi từ người dùng.

## 📝 **Các bước thực hiện:**

### **Bước 1: Đăng nhập Supabase**
1. Truy cập: https://supabase.com
2. Đăng nhập vào tài khoản của bạn
3. Chọn project: `izavnjkrvjagqhluecyz` (hoặc project của bạn)

### **Bước 2: Mở SQL Editor**
1. Ở sidebar bên trái, click vào **"SQL Editor"** (biểu tượng `</>`)
2. Click **"New query"** để tạo query mới

### **Bước 3: Chạy SQL Script**
1. Copy **TOÀN BỘ** nội dung từ file `supabase_setup.sql`
2. Paste vào SQL Editor
3. Click nút **"Run"** (hoặc nhấn `Ctrl + Enter` / `Cmd + Enter`)
4. Đợi vài giây để script chạy xong

### **Bước 4: Kiểm tra kết quả**
1. Vào **Table Editor** ở sidebar trái
2. Tìm bảng **`feedback`**
3. Nếu thấy bảng `feedback` → ✅ Thành công!

## 📋 **Nội dung SQL Script sẽ tạo:**

```sql
- Bảng `feedback` với các cột:
  • id (tự động tăng)
  • rating (1-5 sao)
  • feedback (nội dung phản hồi)
  • email (email người dùng, tùy chọn)
  • language (ngôn ngữ: vi/en)
  • created_at (thời gian tạo)

- Indexes để tối ưu truy vấn
- Row Level Security (RLS) policies
- Policy cho phép public insert feedback
```

## ✅ **Kiểm tra sau khi tạo:**

### **Test 1: Xem bảng đã tạo chưa**
1. Vào **Table Editor** → Tìm bảng `feedback`
2. Bảng phải có 6 cột: id, rating, feedback, email, language, created_at

### **Test 2: Test insert từ website**
1. Mở website: `/feedback`
2. Điền form và gửi feedback
3. Vào Supabase **Table Editor** → `feedback`
4. Nếu thấy dòng mới → ✅ Hoạt động!

### **Test 3: Kiểm tra RLS**
1. Vào **Authentication** → **Policies**
2. Tìm policy "Allow public insert on feedback"
3. Phải có policy này → ✅ Đúng

## 🚨 **Lỗi thường gặp:**

### **Lỗi: "relation already exists"**
- **Nguyên nhân**: Bảng đã tồn tại
- **Giải pháp**: Script đã có `CREATE TABLE IF NOT EXISTS`, nên không sao, hoặc xóa bảng cũ và tạo lại

### **Lỗi: "permission denied"**
- **Nguyên nhân**: Không có quyền tạo bảng
- **Giải pháp**: Đảm bảo bạn là owner của project

### **Lỗi: "syntax error"**
- **Nguyên nhân**: Copy thiếu hoặc thừa ký tự
- **Giải pháp**: Copy lại toàn bộ file `supabase_setup.sql`

## 📸 **Hình ảnh minh họa:**

1. **SQL Editor**: https://supabase.com/dashboard/project/[project-id]/sql
2. **Table Editor**: https://supabase.com/dashboard/project/[project-id]/editor

## 🎉 **Sau khi hoàn thành:**

- ✅ Bảng `feedback` đã được tạo
- ✅ Có thể lưu feedback từ website
- ✅ Có thể xem feedback trong Supabase Dashboard
- ✅ Email notification sẽ gửi đến `dieptcseSE173104@fpt.edu.vn`

---

**Lưu ý**: Nếu gặp khó khăn, hãy kiểm tra:
- Project URL và API keys đã đúng chưa
- Database password đã được set chưa
- Bạn có quyền admin của project không


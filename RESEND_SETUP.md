# 📧 Hướng dẫn Resend cho Việt Nam (VN-ready)

## 🎯 Mục tiêu
Thiết lập Resend để gửi email thông báo feedback với cấu hình, ví dụ và lưu ý phù hợp người dùng tại Việt Nam.

## 📝 Các bước thiết lập

### 1) Đăng ký tài khoản Resend
1. Truy cập: https://resend.com
2. Chọn **Sign Up / Get Started**
3. Đăng ký bằng Email hoặc GitHub
4. Xác thực email nếu được yêu cầu

### 2) Tạo API Key
1. Mở **Dashboard** → **API Keys**
2. Nhấn **Create API Key**
3. Đặt tên (ví dụ: `VNR202-Production`)
4. Quyền (Permissions): chọn ✅ **Sending access**
5. Tạo và sao chép API key ngay (chỉ hiển thị 1 lần), dạng: `re_xxxxxxxxxxxxx`

### 3) Verify Domain (khuyến nghị nhưng không bắt buộc)
- Nếu muốn gửi từ địa chỉ như `noreply@yourdomain.vn` hoặc `no-reply@yourdomain.com`, vào **Domains** → **Add Domain** → thêm DNS records theo hướng dẫn.
- Nếu chưa verify domain, vẫn có thể gửi bằng domain mặc định: `onboarding@resend.dev`.

### 4) Cấu hình biến môi trường

#### Local Development (`.env.local`)
Thêm vào file `.env.local` ở thư mục gốc dự án:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
# Email nhận thông báo feedback (ví dụ FPT):
NOTIFICATION_EMAIL=sinhvien@fpt.edu.vn
```

#### Production (Vercel/Netlify)
1. Mở Project Settings → Environment Variables
2. Thêm 2 biến sau cho cả 3 môi trường (Production, Preview, Development):
   - Name: `RESEND_API_KEY` — Value: `re_xxxxxxxxxxxxx`
   - Name: `NOTIFICATION_EMAIL` — Value: `sinhvien@fpt.edu.vn`
3. Lưu lại và **Redeploy** để áp dụng

Ghi chú: Mã nguồn hiện đang default gửi đến `vnr202nhom5@gmail.com` nếu không đặt `NOTIFICATION_EMAIL` (xem `api/send-feedback-notification.ts`).

## ✅ Kiểm tra hoạt động
1. Mở trang `/feedback`, gửi thử một phản hồi.
2. Kiểm tra hộp thư `NOTIFICATION_EMAIL` (và cả mục Spam/Quảng cáo).
3. Xem log (Vercel logs) nếu có lỗi gửi.
4. Có thể dùng script `test-email-api.js` để gọi thử endpoint server.

## 🇻🇳 Lưu ý dành cho người dùng tại Việt Nam
- Tên hiển thị (From name) hỗ trợ tiếng Việt có dấu, ví dụ: `VNR202 Feedback`.
- Chủ đề (Subject) đang ở dạng tiếng Việt và emoji; có thể sửa trong `api/send-feedback-notification.ts` nếu cần.
- Một số hộp thư trong nước (ví dụ doanh nghiệp) có thể lọc mạnh; nếu không thấy mail:
  - Kiểm tra mục Spam/Quảng cáo.
  - Thêm địa chỉ gửi vào danh bạ/an toàn.
  - Cân nhắc verify domain riêng để tăng độ tin cậy.
- Múi giờ khuyến nghị: `Asia/Ho_Chi_Minh` khi hiển thị thời gian trong nội dung email hoặc logs.

## 📋 Thông tin Resend
- Free tier tham khảo: ~100 emails/ngày (khoảng 3,000 emails/tháng).
- API Key định dạng: bắt đầu bằng `re_`.
- Domain mặc định: `onboarding@resend.dev` (không cần verify).

## 🔐 An toàn & bảo mật
- API Key chỉ hiển thị 1 lần khi tạo — lưu trữ an toàn ngay.
- Không commit `.env.local` hoặc API Key lên GitHub.
- API Key chỉ sử dụng phía server (Vercel Function); không expose ra client.


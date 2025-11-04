# 📧 Hướng dẫn lấy Resend API Key

## 🎯 **Mục tiêu**
Lấy Resend API Key để gửi email thông báo khi có feedback mới.

## 📝 **Các bước lấy Resend API Key:**

### **Bước 1: Đăng ký tài khoản Resend**
1. Truy cập: https://resend.com
2. Click **"Sign Up"** hoặc **"Get Started"**
3. Đăng ký bằng Email hoặc GitHub
4. Xác thực email (nếu cần)

### **Bước 2: Tạo API Key**
1. Sau khi đăng nhập, vào **Dashboard**
2. Click vào **"API Keys"** ở sidebar trái hoặc menu
3. Click **"Create API Key"**
4. Đặt tên cho API key (ví dụ: `VNR202-Production`)
5. Chọn **Permissions**: 
   - ✅ **Sending access** (cho phép gửi email)
6. Click **"Add"** hoặc **"Create"**
7. **Copy API Key ngay** (chỉ hiển thị 1 lần!): `re_xxxxxxxxxxxxx`

### **Bước 3: Verify Domain (Tùy chọn)**
- Nếu muốn dùng domain của bạn (ví dụ: `noreply@yourdomain.com`)
- Vào **Domains** → **Add Domain** → Thêm DNS records
- Nếu không verify, có thể dùng domain mặc định: `onboarding@resend.dev`

### **Bước 4: Cấu hình Environment Variables**

#### **Local Development (.env.local):**
Thêm vào file `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAIL=dieptcseSE173104@fpt.com.vn
```

#### **Vercel Production:**
1. Vào Vercel Dashboard → Chọn project → **Settings** → **Environment Variables**
2. Thêm 2 biến:
   - **Name**: `RESEND_API_KEY`
     **Value**: `re_xxxxxxxxxxxxx`
     **Environment**: Production, Preview, Development (chọn cả 3)
   
   - **Name**: `NOTIFICATION_EMAIL`
     **Value**: `dieptcseSE173104@fpt.com.vn`
     **Environment**: Production, Preview, Development (chọn cả 3)
3. Click **Save**
4. **Redeploy** project để áp dụng thay đổi

## ✅ **Kiểm tra:**
1. Gửi feedback từ form `/feedback`
2. Kiểm tra email `dieptcseSE173104@fpt.com.vn` có nhận được notification không
3. Kiểm tra Vercel logs nếu có lỗi

## 📋 **Thông tin Resend:**
- **Free tier**: 100 emails/ngày, 3,000 emails/tháng
- **API Key format**: `re_` + 32 ký tự
- **Default domain**: `onboarding@resend.dev` (không cần verify)

## 🚨 **Lưu ý:**
- ⚠️ API Key chỉ hiển thị 1 lần khi tạo, lưu lại ngay!
- ⚠️ Không commit API Key lên GitHub
- ✅ File `.env.local` đã có trong `.gitignore`
- ✅ Resend API Key chỉ cần trên Vercel (server-side), không expose ra client


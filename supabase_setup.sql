-- ============================================
-- Script tạo bảng Feedback cho VNR202
-- ============================================

-- Tạo bảng feedback
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  email TEXT,
  language TEXT DEFAULT 'vi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để tìm kiếm nhanh hơn
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);

-- Bật Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép ai cũng có thể insert feedback (public insert)
-- Xóa policy cũ nếu tồn tại (để tránh lỗi khi chạy lại)
DROP POLICY IF EXISTS "Allow public insert on feedback" ON feedback;

CREATE POLICY "Allow public insert on feedback"
ON feedback FOR INSERT
TO public
WITH CHECK (true);

-- Tạo policy cho phép đọc (chỉ admin hoặc service role, có thể bỏ qua nếu không cần)
-- Policy này để bạn có thể đọc feedback từ Supabase Dashboard
-- Nếu muốn chỉ admin mới đọc được, uncomment dòng dưới và cấu hình role
-- CREATE POLICY "Allow service role read on feedback"
-- ON feedback FOR SELECT
-- TO service_role
-- USING (true);

-- ============================================
-- Hướng dẫn sử dụng:
-- 1. Vào Supabase Dashboard
-- 2. Vào SQL Editor
-- 3. Copy toàn bộ script này
-- 4. Click "Run" để thực thi
-- ============================================


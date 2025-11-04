import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log request để debug
  console.log('📧 Feedback notification API called:', {
    method: req.method,
    body: req.body,
    hasResendKey: !!process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'vnr202nhom5@gmail.com'
  });

  // Chỉ cho phép POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rating, feedback, email, language } = req.body;

    // Localize based on language
    const lang = (typeof language === 'string' ? language : 'vi').toLowerCase();
    const isVi = lang === 'vi';
    const locale = isVi ? 'vi-VN' : 'en-US';
    const timeZone = isVi ? 'Asia/Ho_Chi_Minh' : 'UTC';
    const languageLabel = isVi ? 'Việt Nam' : 'English';
    const subjectText = isVi
      ? `📝 Feedback mới từ VNR202 - Đánh giá ${rating}/5`
      : `📝 New feedback from VNR202 - Rating ${rating}/5`;
    const dateTimeText = new Date().toLocaleString(locale, { timeZone });

    // Validate required fields
    const parsedRating = typeof rating === 'string' ? Number(rating) : rating;
    const safeRating = Number.isFinite(parsedRating) ? Math.max(1, Math.min(5, parsedRating)) : NaN;

    if (!Number.isFinite(safeRating)) {
      return res.status(400).json({ error: 'Invalid rating. Must be a number from 1 to 5.' });
    }
    if (typeof feedback !== 'string' || feedback.trim().length === 0) {
      return res.status(400).json({ error: 'Feedback is required.' });
    }

    // Email template (localized parts)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${isVi ? 'Feedback mới từ VNR202' : 'New feedback from VNR202'}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ef4444, #eab308, #a855f7); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; text-align: center;">${isVi ? '📝 Feedback mới từ VNR202' : '📝 New feedback from VNR202'}</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #ef4444; margin-top: 0;">${isVi ? 'Thông tin Feedback' : 'Feedback Details'}</h2>
              
              <div style="margin-bottom: 15px;">
                <strong>${isVi ? '⭐ Đánh giá:' : '⭐ Rating:'}</strong> 
                <span style="color: #eab308; font-size: 18px;">
                  ${'★'.repeat(safeRating)}${'☆'.repeat(5 - safeRating)} (${safeRating}/5)
                </span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong>${isVi ? '📧 Email người gửi:' : '📧 Sender email:'}</strong> 
                ${email ? `<a href="mailto:${email}" style="color: #a855f7;">${email}</a>` : (isVi ? 'Không cung cấp' : 'Not provided')}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong>🌐 ${isVi ? 'Ngôn ngữ' : 'Language'}:</strong> ${languageLabel}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong>📅 ${isVi ? 'Thời gian (múi giờ' : 'Time (timezone'}: ${timeZone}):</strong> ${dateTimeText}
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="color: #ef4444; margin-top: 0;">${isVi ? 'Nội dung Feedback' : 'Feedback Content'}</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${feedback}</div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
              <p style="margin: 0; color: #666;">
                ${isVi ? 'Email này được gửi tự động từ hệ thống VNR202' : 'This email was sent automatically by the VNR202 system'}<br>
                <small>${isVi ? 'VNR202 - Nền tảng học tập về Lịch sử Đảng Cộng sản Việt Nam' : 'VNR202 - Learning platform for the History of the Communist Party of Vietnam'}</small>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Gửi email notification
    const { data, error } = await resend.emails.send({
      from: 'VNR202 Feedback <onboarding@resend.dev>',
      to: [process.env.NOTIFICATION_EMAIL || 'vnr202nhom5@gmail.com'],
      subject: subjectText,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email notification' });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ 
      success: true, 
      message: 'Feedback notification sent successfully',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

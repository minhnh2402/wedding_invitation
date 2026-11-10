/**
 * Lưu xác nhận tham dự từ thiệp cưới vào Google Sheets + gửi email báo về.
 * Cách cài:
 *   1. Mở Google Sheets → Tiện ích mở rộng → Apps Script.
 *   2. Xóa code cũ, dán toàn bộ file này vào, bấm Lưu.
 *   3. Chạy thử hàm guiMailThu (chọn ở thanh trên rồi bấm ▶ Chạy) để cấp quyền gửi mail.
 *   4. Triển khai → Quản lý triển khai → bút chì → Phiên bản: Phiên bản mới → Triển khai.
 *      (Lần đầu tiên thì dùng: Triển khai → Tùy chọn triển khai mới → Ứng dụng web,
 *       Thực thi dưới dạng: Tôi, Người có quyền truy cập: Bất kỳ ai.)
 */
const SHEET_NAME = 'Xác nhận';

/* ===== Cài đặt email ===== */
const GUI_MAIL = true;   // false = tắt gửi mail, chỉ lưu vào Sheets
// Email của cô dâu chú rể (người nhận báo), nhiều email thì cách nhau bằng dấu phẩy.
const MAIL_NHAN = 'email-co-dau@gmail.com, email-chu-re@gmail.com';
// true = gửi thêm một bản cho bạn (chủ tài khoản Google chạy script này) để theo dõi.
const GUI_CHO_TOI = true;
// Tên người gửi hiện trong hộp thư của cô dâu chú rể.
const TEN_NGUOI_GUI = 'Thiệp cưới Công Hiển & Minh Thúy';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Thời gian', 'Họ tên', 'Khách của', 'Tham dự', 'Số người', 'Lời chúc']);
    sheet.setFrozenRows(1);
    sheet.getRange('1:1').setFontWeight('bold');
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // tránh ghi đè khi nhiều khách gửi cùng lúc
  let row;
  try {
    const p = e.parameter || {};
    const clean = (v, max) => String(v || '').replace(/^[=+\-@]/, "'$&").slice(0, max); // chặn chèn công thức
    row = {
      name: clean(p.name, 60),
      side: clean(p.side, 20),
      attend: clean(p.attend, 10),
      guests: Number(p.guests) || 0,
      message: clean(p.message, 500),
    };
    getSheet_().appendRow([new Date(), row.name, row.side, row.attend, row.guests, row.message]);
  } finally {
    lock.releaseLock();
  }

  // Gửi mail sau khi đã lưu: nếu mail lỗi (vd hết hạn mức) thì dữ liệu vẫn còn trong Sheets.
  if (GUI_MAIL) {
    try { sendNotification_(row); } catch (err) { console.error('Gửi mail lỗi: ' + err); }
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendNotification_(r) {
  const list = MAIL_NHAN.split(',').map((s) => s.trim()).filter(Boolean);
  if (GUI_CHO_TOI || !list.length) list.push(Session.getEffectiveUser().getEmail());
  const to = list.join(',');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const coDen = r.attend === 'Có';
  const tong = tongKhach_();

  const subject = coDen
    ? `🎉 ${r.name} sẽ tham dự (${r.guests} người)`
    : `${r.name} không thể tham dự`;

  const html = `
    <div style="font-family:Georgia,serif;font-size:15px;color:#3A1E20">
      <h2 style="color:#6E1624;margin:0 0 12px">Có xác nhận tham dự mới</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Họ tên</b></td><td>${esc(r.name)}</td></tr>
        <tr><td><b>Khách của</b></td><td>${esc(r.side)}</td></tr>
        <tr><td><b>Tham dự</b></td><td>${coDen ? 'Có' : 'Không'}</td></tr>
        ${coDen ? `<tr><td><b>Số người</b></td><td>${r.guests}</td></tr>` : ''}
        ${r.message ? `<tr><td valign="top"><b>Lời chúc</b></td><td><i>${esc(r.message)}</i></td></tr>` : ''}
      </table>
      <p style="margin-top:16px;color:#6D5250">Tổng số khách đã xác nhận đến: <b>${tong}</b> người.</p>
      <p><a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}">Mở danh sách trong Google Sheets</a></p>
    </div>`;

  MailApp.sendEmail({ to, subject, htmlBody: html, name: TEN_NGUOI_GUI });
}

// Cộng cột "Số người" của các dòng "Có"
function tongKhach_() {
  const values = getSheet_().getDataRange().getValues().slice(1);
  return values.reduce((sum, v) => sum + (v[3] === 'Có' ? Number(v[4]) || 0 : 0), 0);
}

// Chạy hàm này 1 lần trong trình soạn thảo để cấp quyền gửi mail và xem thử mail.
function guiMailThu() {
  sendNotification_({ name: 'Khách thử', side: 'Nhà trai', attend: 'Có', guests: 2, message: 'Chúc mừng hạnh phúc!' });
}

function doGet() {
  return ContentService.createTextOutput('Thiệp cưới: RSVP đang hoạt động.');
}

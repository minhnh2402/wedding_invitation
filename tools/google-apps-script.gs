/**
 * Lưu xác nhận tham dự từ thiệp cưới vào Google Sheets.
 * Cách cài (chi tiết trong README.md):
 *   1. Tạo Google Sheets mới → Tiện ích mở rộng → Apps Script.
 *   2. Xóa code có sẵn, dán toàn bộ file này vào, bấm Lưu.
 *   3. Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web
 *      - Thực thi dưới dạng: Tôi
 *      - Người có quyền truy cập: Bất kỳ ai
 *   4. Copy "URL ứng dụng web" (đuôi /exec) dán vào rsvpUrl trong config.js.
 */
const SHEET_NAME = 'Xác nhận';

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
  try {
    const p = e.parameter || {};
    const clean = (v, max) => String(v || '').replace(/^[=+\-@]/, "'$&").slice(0, max); // chặn chèn công thức
    getSheet_().appendRow([
      new Date(),
      clean(p.name, 60),
      clean(p.side, 20),
      clean(p.attend, 10),
      Number(p.guests) || 0,
      clean(p.message, 500),
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Thiệp cưới: RSVP đang hoạt động.');
}

/* =====================================================================
   FILE CẤU HÌNH THIỆP CƯỚI — bạn chỉ cần sửa file này.
   Thông tin bên dưới là dữ liệu MẪU, hãy thay bằng thông tin thật.
   Ngày âm lịch được tính tự động từ ngày dương, không cần gõ tay.
   ===================================================================== */
window.WEDDING = {
  groom: {
    name: 'Hoàng Minh',                 // tên hiển thị lớn (chữ viết tay)
    role: 'Chú rể',
    father: 'Ông Nguyễn Văn An',
    mother: 'Bà Trần Thị Bình',
    address: 'Phường Tân Định, TP. Hồ Chí Minh',
  },
  bride: {
    name: 'Thu Hà',
    role: 'Cô dâu',
    father: 'Ông Lê Văn Cường',
    mother: 'Bà Phạm Thị Dung',
    address: 'Xã Vĩnh Phong, An Giang',
  },

  // Ngày giờ chính (dùng cho trang đầu, lịch và đếm ngược). Giữ đúng định dạng.
  mainDate: '2026-12-20T11:00:00+07:00',

  quote: 'Hôn nhân là chuyện cả đời,\nYêu người vừa ý, cưới người mình thương.',

  // Lời mời hiển thị dưới "Trân trọng kính mời"
  inviteText: 'tới dự bữa tiệc chung vui cùng gia đình chúng tôi',

  /* Các lễ. `side` quyết định lễ nào hiện cho khách bên nào:
     'all' = mọi khách, 'nhatrai' / 'nhagai' = chỉ khách bên đó.
     Gửi link kèm ?ben=nhatrai hoặc ?ben=nhagai để lọc (xem README). */
  events: [
    {
      title: 'Lễ Vu Quy',
      datetime: '2026-12-19T09:00:00+07:00',
      place: 'Tư gia nhà gái',
      address: 'Tổ 4, Ấp Đập Đá 2, Xã Vĩnh Phong, An Giang',
      mapLink: 'https://maps.google.com/?q=Vinh+Phong+An+Giang',
      side: 'nhagai',
    },
    {
      title: 'Lễ Thành Hôn',
      datetime: '2026-12-20T09:00:00+07:00',
      place: 'Tư gia nhà trai',
      address: 'Phường Tân Định, TP. Hồ Chí Minh',
      mapLink: 'https://maps.google.com/?q=Tan+Dinh+Ho+Chi+Minh',
      side: 'nhatrai',
    },
    {
      title: 'Tiệc Cưới',
      datetime: '2026-12-20T11:00:00+07:00',
      place: 'Trung tâm Hội nghị Tiệc cưới Riverside Palace',
      address: '360D Bến Vân Đồn, Phường Khánh Hội, TP. Hồ Chí Minh',
      mapLink: 'https://maps.google.com/?q=Riverside+Palace+Ben+Van+Don',
      side: 'all',
    },
  ],

  /* Bản đồ nhúng: Google Maps → tìm địa điểm → Chia sẻ → Nhúng bản đồ →
     copy phần trong src="..." dán vào đây. Để '' nếu không muốn hiện bản đồ. */
  map: {
    title: 'Riverside Palace',
    address: '360D Bến Vân Đồn, Phường Khánh Hội, TP. Hồ Chí Minh',
    embedUrl: 'https://www.google.com/maps?q=Riverside+Palace+360D+Ben+Van+Don&output=embed',
    link: 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don',
  },

  coverImage: 'images/bia.webp',     // ảnh chính ở trang đầu (dọc, 1080×1440)

  // Danh sách ảnh album: tên file trong images/album và images/thumb (cùng tên).
  // Script tools/toi-uu-anh.sh sẽ in sẵn dòng này cho bạn copy.
  album: ['01', '02', '03', '04', '05', '06', '07'],

  music: 'music/nhac-nen.mp3',       // để '' nếu không dùng nhạc

  /* Link Google Apps Script để lưu xác nhận tham dự vào Google Sheets
     (hướng dẫn trong README). Để '' thì form chỉ chạy thử, không lưu. */
  rsvpUrl: '',

  /* Mừng cưới. Mã QR tạo tự động qua VietQR từ bankBin + accountNo.
     Mã BIN: Vietcombank 970436, MB 970422, Techcombank 970407, VietinBank 970415,
     BIDV 970418, ACB 970416, Agribank 970405, VPBank 970432, TPBank 970423,
     Sacombank 970403.
     Muốn dùng ảnh QR tải từ app ngân hàng thì điền qrImage: 'images/qr-chu-re.webp'. */
  gifts: [
    {
      label: 'Chú rể',
      bankName: 'Vietcombank',
      bankBin: '970436',
      accountNo: '0123456789',
      accountName: 'NGUYEN HOANG MINH',
      qrImage: '',
    },
    {
      label: 'Cô dâu',
      bankName: 'MB Bank',
      bankBin: '970422',
      accountNo: '0987654321',
      accountName: 'LE THU HA',
      qrImage: '',
    },
  ],

  closing: 'Rất hân hạnh được đón tiếp!',
};

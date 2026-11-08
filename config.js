/* =====================================================================
   FILE CẤU HÌNH THIỆP CƯỚI — bạn chỉ cần sửa file này.
   Thông tin bên dưới là dữ liệu MẪU, hãy thay bằng thông tin thật.
   Ngày âm lịch được tính tự động từ ngày dương, không cần gõ tay.
   ===================================================================== */
window.WEDDING = {
  groom: {
    name: 'Phêrô Trần Công Hiển',                 // tên hiển thị lớn (chữ viết tay)
    role: 'Chú rể',
    father: 'Ông Phêrô Trần Công Đức',
    mother: 'Bà Maria Hà Thị Bạch Tuyết',
    address: 'Tân An, Đồng Nai',
  },
  bride: {
    name: 'Anna Nguyễn Quỳnh Minh Thúy',
    role: 'Cô dâu',
    father: 'Ông Nguyễn Minh Luân',
    mother: 'Bà Nguyễn Thị Quỳnh Vân',
    address: 'Tam Hiệp, Đồng Nai',
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
      title: 'Lễ Tân Hôn',
      datetime: '2026-12-05T03:00:00+07:00',
      place: 'Thánh Đường Giáo xứ Thái Hiệp',
      address: 'Số 94/16 (hoặc 93/58) Khu phố 8, phường Tân Phong, TP. Biên Hòa, tỉnh Đồng Nai (gần trục đường Nguyễn Ái Quốc)',
      mapLink: 'https://share.google/aL3ENNfxP2PgKkdNr',
      side: 'nhatrai',
    },
    {
      title: 'Tiệc rượu',
      datetime: '2026-12-27T11:30:00+07:00',
      place: 'Tư Gia Nhà Trai',
      address: '2299, Đường 768, Ấp Thái An, Xã Tân An, Đồng Nai',
      mapLink: 'xxxxxx',
      side: 'nhatrai',
    },
    {
      title: 'Lễ Vu Quy',
      datetime: '2026-12-27T08:00:00+07:00',
      place: 'Tư Gia Nhà Gái',
      address: 'Sảnh Grand Opera - Lầu 2, 628 Phạm Văn Thuận, phường Tam Hiệp, Đồng Nai',
      mapLink: 'https://share.google/10Ak2R8IGHMNXxBDa',
      side: 'nhagai',
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
      bankName: 'VietinBank',
      bankBin: '970436',
      accountNo: '0123456789',
      accountName: 'NGUYEN HOANG MINH',
      qrImage: '',
    },
    {
      label: 'Cô dâu',
      bankName: 'MB Bank',
      bankBin: '970422',
      accountNo: '0123456789',
      accountName: 'HUYNH THANH TUYEN',
      qrImage: '',
    },
  ],

  closing: 'Rất hân hạnh được đón tiếp!',
};

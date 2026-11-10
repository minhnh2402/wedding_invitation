/* =====================================================================
   FILE CẤU HÌNH THIỆP CƯỚI — bạn chỉ cần sửa file này.
   Thông tin bên dưới là dữ liệu MẪU, hãy thay bằng thông tin thật.
   Ngày âm lịch được tính tự động từ ngày dương, không cần gõ tay.
   ===================================================================== */
window.WEDDING = {
  groom: {
    saint: 'Phêrô',                               // tên thánh (hiện dòng nhỏ phía trên), để '' nếu không có
    name: 'Trần Công Hiển',                       // họ tên đầy đủ (hiện bên trong thiệp)
    shortName: 'Công Hiển',                       // tên ngắn (hiện ở màn hình "Thư mời cưới" và cuối thiệp)
    photo: 'images/thumb/06.webp',                // ảnh riêng chú rể (dọc 2:3) — đang dùng tạm ảnh album
    role: 'Chú rể',
    father: 'Ông Phêrô Trần Công Đức',
    mother: 'Bà Maria Hà Thị Bạch Tuyết',
    address: 'Tân An, Đồng Nai',
  },
  bride: {
    saint: 'Anna',
    name: 'Nguyễn Quỳnh Minh Thúy',
    shortName: 'Minh Thúy',
    photo: 'images/thumb/07.webp',                // ảnh riêng cô dâu (dọc 2:3) — đang dùng tạm ảnh album
    role: 'Cô dâu',
    father: 'Ông Nguyễn Minh Luân',
    mother: 'Bà Nguyễn Thị Quỳnh Vân',
    address: 'Tam Hiệp, Đồng Nai',
  },

  // Ngày giờ chính (dùng cho trang đầu, lịch và đếm ngược). Giữ đúng định dạng.
  mainDate: '2026-12-06T11:30:00+07:00',

  quote: 'Hôn nhân là chuyện cả đời,\nYêu người vừa ý, cưới người mình thương.',

  // Lời mời hiển thị dưới "Trân trọng kính mời"
  inviteText: 'tới dự bữa tiệc chung vui cùng gia đình chúng tôi',

  /* Các lễ. `side` quyết định lễ nào hiện cho khách bên nào:
     'all' = mọi khách, 'nhatrai' / 'nhagai' = chỉ khách bên đó.
     Gửi link kèm ?ben=nhatrai hoặc ?ben=nhagai để lọc (xem README). */
  // Các lễ tự sắp xếp theo giờ, không cần quan tâm thứ tự trong danh sách.
  events: [
    // Thánh Lễ Hôn Phối: tạm ẩn khỏi thiệp. Muốn hiện lại thì bỏ dấu // ở 9 dòng dưới.
    // {
    //   title: 'Thánh Lễ Hôn Phối',
    //   datetime: '2026-12-06T15:00:00+07:00',
    //   place: 'Thánh Đường Giáo xứ Thái Hiệp',
    //   address: 'Số 94/16 (hoặc 93/58) Khu phố 8, phường Tân Phong, TP. Biên Hòa, tỉnh Đồng Nai (gần trục đường Nguyễn Ái Quốc)',
    //   mapLink: 'https://share.google/aL3ENNfxP2PgKkdNr',
    //   mapQuery: 'Nhà thờ Giáo xứ Thái Hiệp, Tân Phong, Biên Hòa, Đồng Nai', // dùng cho bản đồ nhúng ở mục Địa điểm
    //   side: 'all',                                  // hiện cho cả khách nhà trai và nhà gái
    // },
    {
      title: '',                                    // tên lễ, để '' thì không hiện (đang ẩn: Lễ Thành Hôn)
      datetime: '2026-12-06T11:30:00+07:00',
      place: 'Nhà hàng KIM CENTER',
      address: 'Sảnh Grand Opera - Lầu 2\n628 Phạm Văn Thuận, Tam Hiệp, Đồng Nai',   // \n = xuống dòng
      mapLink: 'https://share.google/10Ak2R8IGHMNXxBDa',
      mapQuery: '628 Phạm Văn Thuận, Tam Hiệp, Biên Hòa, Đồng Nai',
      side: 'all',                                  // hiện cho mọi khách
    },
  ],

  /* Mục "Địa điểm" tự liệt kê các lễ ở trên (theo bên khách) kèm bản đồ nhúng,
     lấy từ `mapQuery` (hoặc `address` nếu không có). Đặt showMaps: false để ẩn bản đồ. */
  showMaps: true,

  coverImage: 'images/bia.webp',     // ảnh chính ở trang đầu (dọc, 1080×1440)

  // Danh sách ảnh album: tên file trong images/album và images/thumb (cùng tên).
  // Script tools/toi-uu-anh.sh sẽ in sẵn dòng này cho bạn copy.
  album: ['01', '02', '03', '04', '05'],

  music: 'music/nhac-nen.mp3',       // để '' nếu không dùng nhạc

  /* Link Google Apps Script để lưu xác nhận tham dự vào Google Sheets
     (hướng dẫn trong README). Để '' thì form chỉ chạy thử, không lưu. */
  rsvpUrl: 'https://script.google.com/u/0/home/projects/1TbErW7NU9YmmsAkYUt4E7FFXwD4z16z_ftcxwCfdfr5OGRvEZQNBJp0f/edit',

  /* Mừng cưới. Mã QR tạo tự động qua VietQR từ bankBin + accountNo.
     Mã BIN: Vietcombank 970436, MB 970422, Techcombank 970407, VietinBank 970415,
     BIDV 970418, ACB 970416, Agribank 970405, VPBank 970432, TPBank 970423,
     Sacombank 970403.
     Muốn dùng ảnh QR tải từ app ngân hàng thì điền qrImage: 'images/qr-chu-re.webp'. */
  gifts: [
    {
      label: 'Cô dâu',
      bankName: 'Vietcombank',
      accountNo: '1045986249',
      accountName: 'NGUYEN QUYNH MINH THUY',
      qrImage: 'images/qr-co-dau.png',
    },
  ],

  closing: 'Rất hân hạnh được đón tiếp!',
};

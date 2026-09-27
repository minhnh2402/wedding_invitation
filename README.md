# Thiệp cưới online — tông kem & đỏ đô

Trang tĩnh HTML/CSS/JS thuần, không cần framework, host miễn phí trên GitHub Pages.

## Cấu trúc

```
thiep-cuoi/
├── index.html        ← khung trang + thẻ og (ảnh xem trước khi gửi Zalo)
├── config.js         ← ★ TOÀN BỘ THÔNG TIN THIỆP: sửa file này
├── style.css         ← giao diện; màu nằm ở đầu file (:root)
├── script.js         ← dựng trang từ config, nhạc, đếm ngược, album, form
├── lunar.js          ← tự đổi ngày dương → âm lịch (không cần gõ tay)
├── fonts/            ← Great Vibes + Cormorant Garamond, tự host, có tiếng Việt
├── images/
│   ├── bia.webp      ← ảnh chính trang đầu (dọc 1080×1440)
│   ├── og.jpg        ← ảnh xem trước khi gửi link (ngang 1200×630)
│   ├── album/        ← ảnh to (01.webp, 02.webp…)
│   └── thumb/        ← ảnh nhỏ cùng tên
├── music/            ← bỏ file nhac-nen.mp3 vào đây
└── tools/
    ├── toi-uu-anh.sh          ← nén ảnh hàng loạt
    └── google-apps-script.gs  ← lưu xác nhận tham dự vào Google Sheets
```

Ảnh trong `images/` hiện là **ảnh mẫu**, thay bằng ảnh thật theo bước 2.

## 1. Chạy thử trên máy

Mở terminal trong thư mục dự án:

```bash
python3 -m http.server 8000
```

Rồi vào `http://localhost:8000`. (Hoặc dùng extension **Live Server** của VS Code.)
Nên chạy qua server thay vì mở thẳng file `index.html`, vì một số trình duyệt chặn font khi mở bằng `file://`.

Xem giao diện điện thoại: Chrome → F12 → biểu tượng điện thoại (Ctrl+Shift+M) → chọn iPhone.

## 2. Điền thông tin và ảnh

1. **Sửa `config.js`**: tên, bố mẹ, địa chỉ, ngày giờ, các lễ, bản đồ, tài khoản ngân hàng.
   Ngày âm lịch và thứ trong tuần được tính tự động.
2. **Ảnh**: cài ImageMagick (`brew install imagemagick` / `sudo apt install imagemagick`),
   tạo thư mục `goc/` ở ngoài cùng, bỏ ảnh gốc vào (đặt tên theo thứ tự muốn hiện):
   - `bia.jpg` → thành ảnh trang đầu
   - `og.jpg` → thành ảnh xem trước khi gửi link
   - các ảnh còn lại → album

   ```bash
   bash tools/toi-uu-anh.sh
   ```
   Script in ra dòng `album: [...]`, dán thay dòng `album` trong `config.js`.
   Nhớ **không đẩy thư mục `goc/` lên GitHub** (đã có sẵn trong `.gitignore`).
3. **Nhạc**: bỏ file mp3 vào `music/nhac-nen.mp3`. Nên nén về 128kbps, dưới 4MB:
   `ffmpeg -i bai-hat.mp3 -b:a 128k music/nhac-nen.mp3`
4. **Sửa tay phần đầu `index.html`** (title, og:title, og:description, og:image).
   Zalo/Facebook không chạy JavaScript nên không đọc được `config.js`, phải sửa trực tiếp ở đây.

## 3. Nối form xác nhận tham dự với Google Sheets

1. Tạo một Google Sheets mới → **Tiện ích mở rộng → Apps Script**.
2. Xóa code có sẵn, dán nội dung `tools/google-apps-script.gs`, bấm Lưu.
3. **Triển khai → Tùy chọn triển khai mới** → biểu tượng bánh răng → **Ứng dụng web**:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
4. Cấp quyền khi Google hỏi (bấm "Nâng cao → Đi tới…" nếu có cảnh báo, vì đây là script của chính bạn).
5. Copy **URL ứng dụng web** (đuôi `/exec`) dán vào `rsvpUrl` trong `config.js`.
6. Gửi thử một lần, mở Sheets sẽ thấy tab **Xác nhận** có dòng mới.

Khi sửa code Apps Script sau này: **Triển khai → Quản lý triển khai → Sửa → Phiên bản mới**, thì URL giữ nguyên.

## 4. Đưa lên mạng (GitHub Pages, miễn phí)

```bash
git init
git add .
git commit -m "Thiệp cưới"
git branch -M main
git remote add origin https://github.com/<ten-ban>/thiep-cuoi.git
git push -u origin main
```

Trên GitHub: repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
Sau 1–2 phút có link dạng `https://<ten-ban>.github.io/thiep-cuoi/`.
Nhớ sửa `og:image` trong `index.html` thành link đầy đủ tới `images/og.jpg`.

**Tên miền riêng** (tùy chọn): mua tên miền (Mắt Bão, PA Việt Nam, Namecheap…), trong **Settings → Pages → Custom domain** điền tên miền, rồi ở trang quản lý tên miền tạo bản ghi `CNAME` trỏ về `<ten-ban>.github.io`. Tick **Enforce HTTPS**.

## 5. Link riêng cho từng khách

Thêm tham số vào cuối link:

| Link | Kết quả |
|---|---|
| `…/?ten=Anh%20Tuấn` | Màn hình mở thiệp ghi "Gửi Anh Tuấn", lời mời ghi tên khách, form điền sẵn tên |
| `…/?ben=nhagai` | Chỉ hiện các lễ của nhà gái + lễ chung (`side: 'nhagai'` hoặc `'all'`) |
| `…/?ben=nhatrai&ten=Cô%20Lan` | Kết hợp cả hai |

Có thể gõ thẳng dấu tiếng Việt và dấu cách vào link, trình duyệt tự mã hóa.

## 6. Đổi giao diện

- **Màu**: sửa các biến ở đầu `style.css` (`--kem`, `--do`, `--vang`…).
- **Font**: thay file trong `fonts/` và sửa `fonts/fonts.css`, `--font-script`, `--font-body`.
  Nhớ chọn font có bộ ký tự tiếng Việt.
- **Ẩn một phần**: để trống trong config (`album: []`, `music: ''`, `map.embedUrl: ''`, `gifts: []`).

## 7. Kiểm tra trước khi gửi

- [ ] Mở link bằng **Zalo** và **Messenger** trên điện thoại thật (trình duyệt bên trong app hay khác Chrome).
- [ ] Ảnh xem trước hiện đúng khi dán link (nếu Zalo/Facebook giữ ảnh cũ, dùng Facebook Sharing Debugger để làm mới).
- [ ] Quét thử mã QR mừng cưới bằng app ngân hàng, kiểm tra đúng tên chủ tài khoản.
- [ ] Gửi thử form, kiểm tra Google Sheets.
- [ ] Bấm "Xem chỉ đường" mở đúng địa điểm.

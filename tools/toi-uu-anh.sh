#!/usr/bin/env bash
# =====================================================================
# Tối ưu ảnh cưới cho web (cần ImageMagick 7: lệnh `magick`).
# Cách dùng:
#   1. Bỏ ảnh gốc (jpg/jpeg/png/heic) vào thư mục goc/ ở ngoài cùng dự án.
#      Ảnh đặt tên theo thứ tự bạn muốn hiện (vd 01-bia.jpg, 02.jpg...).
#   2. Chạy:   bash tools/toi-uu-anh.sh
#   3. Copy dòng "album: [...]" in ra ở cuối, dán vào config.js.
# Ảnh bìa: đặt tên file gốc là bia.jpg → tạo images/bia.webp (1080px).
# Ảnh xem trước Zalo/Facebook: đặt tên og.jpg → tạo images/og.jpg (1200×630).
# =====================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

IM="magick"
command -v magick >/dev/null 2>&1 || IM="convert"   # ImageMagick 6

SRC="goc"
[ -d "$SRC" ] || { echo "Không thấy thư mục $SRC/. Tạo thư mục đó và bỏ ảnh gốc vào."; exit 1; }
mkdir -p images/album images/thumb

# Xóa ảnh mẫu cũ trong album/thumb
rm -f images/album/*.webp images/thumb/*.webp

names=()
i=1
shopt -s nullglob nocaseglob
for f in "$SRC"/*.{jpg,jpeg,png,heic,webp}; do
  base="$(basename "${f%.*}")"
  case "$base" in
    bia)
      $IM "$f" -auto-orient -strip -resize "1080x1440^" -gravity center -extent 1080x1440 -quality 80 images/bia.webp
      echo "✓ ảnh bìa  → images/bia.webp"
      continue ;;
    og)
      $IM "$f" -auto-orient -strip -resize "1200x630^" -gravity center -extent 1200x630 -quality 82 images/og.jpg
      echo "✓ ảnh xem trước → images/og.jpg"
      continue ;;
  esac
  n=$(printf "%02d" "$i")
  # -auto-orient: xoay đúng chiều ảnh điện thoại | -strip: xóa EXIF, GPS
  $IM "$f" -auto-orient -strip -resize "1600x1600>" -quality 78 "images/album/$n.webp"
  $IM "$f" -auto-orient -strip -resize "600x600>"   -quality 72 "images/thumb/$n.webp"
  echo "✓ $(basename "$f") → album/$n.webp"
  names+=("'$n'")
  i=$((i + 1))
done

echo
echo "Dung lượng:"
du -sh images/album images/thumb images/bia.webp 2>/dev/null || true
echo
echo "Dán dòng này vào config.js (thay dòng album cũ):"
joined=$(IFS=,; echo "${names[*]:-}")
echo "  album: [${joined//,/, }],"

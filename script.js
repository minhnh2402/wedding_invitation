(function () {
  const W = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const THU = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const main = new Date(W.mainDate);

  /* ---------- Tham số trên link: ?ten=Anh%20Tuấn&ben=nhagai ---------- */
  const params = new URLSearchParams(location.search);
  const guestName = (params.get('ten') || '').trim().slice(0, 60);
  const side = params.get('ben'); // 'nhatrai' | 'nhagai' | null
  const events = W.events.filter((e) => !side || e.side === 'all' || e.side === side);

  /* ---------- Họa tiết dùng chung ---------- */
  const flourish = `
    <svg class="flourish" viewBox="0 0 240 24" aria-hidden="true">
      <path d="M4 12h86M150 12h86" />
      <path d="M90 12c8-9 20-9 30 0-10 9-22 9-30 0Zm60 0c-8-9-20-9-30 0 10 9 22 9 30 0Z" />
      <circle cx="120" cy="12" r="3" />
    </svg>`;
  const heading = (text) => `<h2 class="heading script">${esc(text)}</h2>${flourish}`;

  function dateLine(d) {
    return `${THU[d.getDay()]}, ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  }
  const timeText = (d) => `${pad(d.getHours())} giờ ${d.getMinutes() ? pad(d.getMinutes()) : ''}`.trim();

  /* ---------- Các phần của thiệp ---------- */
  function hero() {
    return `
    <section class="hero" id="trang-dau">
      <figure class="arch">
        <img src="${esc(W.coverImage)}" alt="${esc(W.groom.name)} và ${esc(W.bride.name)}" width="1080" height="1440" fetchpriority="high">
      </figure>
      <h1 class="hero__names script">
        <span>${esc(W.groom.name)}</span>
        <span class="hero__amp">&amp;</span>
        <span>${esc(W.bride.name)}</span>
      </h1>
      <div class="hero__date">
        <span>${THU[main.getDay()]}</span>
        <strong>${pad(main.getDate())}.${pad(main.getMonth() + 1)}.${main.getFullYear()}</strong>
        <span>${timeText(main)}</span>
      </div>
      <p class="lunar">Tức ${Lunar.lunarText(main)}</p>
    </section>`;
  }

  function families() {
    const col = (p, label) => `
      <div class="family">
        <h3 class="family__side">${label}</h3>
        <p>${esc(p.father)}</p>
        <p>${esc(p.mother)}</p>
        <p class="family__addr">${esc(p.address)}</p>
      </div>`;
    return `
    <section class="section families" id="hai-nha">
      <p class="quote">${esc(W.quote).replace(/\n/g, '<br>')}</p>
      <div class="families__grid">
        ${col(W.groom, 'Nhà trai')}
        <span class="families__hy" aria-hidden="true">囍</span>
        ${col(W.bride, 'Nhà gái')}
      </div>
    </section>`;
  }

  function invitation() {
    const items = events.map((e) => {
      const d = new Date(e.datetime);
      return `
      <li class="event">
        <h3 class="event__title">${esc(e.title)}</h3>
        <p class="event__time">${timeText(d)}</p>
        <p class="event__date">${dateLine(d)}</p>
        <p class="event__lunar">Tức ${Lunar.lunarText(d)}</p>
        <p class="event__place">${esc(e.place)}</p>
        <p class="event__addr">${esc(e.address)}</p>
        ${e.mapLink ? `<a class="link" href="${esc(e.mapLink)}" target="_blank" rel="noopener">Xem chỉ đường</a>` : ''}
      </li>`;
    }).join('');
    return `
    <section class="section invite" id="loi-moi">
      ${heading('Thư mời')}
      <p class="invite__lead">Trân trọng kính mời</p>
      <p class="invite__guest script">${guestName ? esc(guestName) : 'Quý khách'}</p>
      <p class="invite__text">${esc(W.inviteText)}</p>
      <ol class="events">${items}</ol>
    </section>`;
  }

  function calendar() {
    const y = main.getFullYear(), m = main.getMonth();
    const first = new Date(y, m, 1);
    const offset = (first.getDay() + 6) % 7; // tuần bắt đầu từ thứ hai
    const days = new Date(y, m + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<span></span>';
    for (let d = 1; d <= days; d++) {
      cells += d === main.getDate()
        ? `<span class="cal__day is-wedding" aria-label="Ngày cưới ${d}"><svg viewBox="0 0 32 30" aria-hidden="true"><path d="M16 29S1 19.6 1 9.5A7.5 7.5 0 0 1 16 5a7.5 7.5 0 0 1 15 4.5C31 19.6 16 29 16 29Z"/></svg><b>${d}</b></span>`
        : `<span class="cal__day">${d}</span>`;
    }
    return `
    <section class="section save" id="lich">
      ${heading('Save the date')}
      <div class="cal">
        <p class="cal__month">Tháng ${m + 1}, ${y}</p>
        <div class="cal__grid cal__grid--head">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((t) => `<span>${t}</span>`).join('')}</div>
        <div class="cal__grid">${cells}</div>
      </div>
      <div class="countdown" id="countdown" aria-live="off">
        <div><b data-cd="d">00</b><span>ngày</span></div>
        <div><b data-cd="h">00</b><span>giờ</span></div>
        <div><b data-cd="m">00</b><span>phút</span></div>
        <div><b data-cd="s">00</b><span>giây</span></div>
      </div>
    </section>`;
  }

  function mapSection() {
    if (!W.map || !W.map.embedUrl) return '';
    return `
    <section class="section venue" id="dia-diem">
      ${heading('Địa điểm')}
      <p class="venue__name">${esc(W.map.title)}</p>
      <p class="venue__addr">${esc(W.map.address)}</p>
      <div class="venue__map">
        <iframe src="${esc(W.map.embedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ ${esc(W.map.title)}"></iframe>
      </div>
      <a class="btn" href="${esc(W.map.link)}" target="_blank" rel="noopener">Mở Google Maps chỉ đường</a>
    </section>`;
  }

  function album() {
    if (!W.album || !W.album.length) return '';
    const items = W.album.map((n, i) => `
      <a class="album__item" href="images/album/${esc(n)}.webp" data-index="${i}">
        <img src="images/thumb/${esc(n)}.webp" alt="Ảnh cưới ${i + 1}" loading="lazy" decoding="async">
      </a>`).join('');
    return `
    <section class="section" id="album">
      ${heading('Album ảnh cưới')}
      <div class="album">${items}</div>
    </section>`;
  }

  function rsvp() {
    const sideDefault = side === 'nhagai' ? 'nhagai' : side === 'nhatrai' ? 'nhatrai' : '';
    return `
    <section class="section rsvp" id="xac-nhan">
      ${heading('Xác nhận tham dự')}
      <p class="section__intro">Bạn cho gia đình biết trước để chúng mình chuẩn bị chu đáo nhé.</p>
      <form class="form" id="rsvpForm" novalidate>
        <label class="field">
          <span>Họ và tên</span>
          <input name="name" required maxlength="60" autocomplete="name" value="${esc(guestName)}">
        </label>
        <fieldset class="choice">
          <legend>Bạn là khách của</legend>
          <label><input type="radio" name="side" value="Nhà trai" ${sideDefault === 'nhatrai' ? 'checked' : ''}><span>Nhà trai</span></label>
          <label><input type="radio" name="side" value="Nhà gái" ${sideDefault === 'nhagai' ? 'checked' : ''}><span>Nhà gái</span></label>
        </fieldset>
        <fieldset class="choice">
          <legend>Bạn có tham dự không?</legend>
          <label><input type="radio" name="attend" value="Có" checked><span>Có, mình sẽ đến</span></label>
          <label><input type="radio" name="attend" value="Không"><span>Rất tiếc, không thể</span></label>
        </fieldset>
        <label class="field" id="guestsField">
          <span>Số người tham dự (tính cả bạn)</span>
          <select name="guests">${[1, 2, 3, 4, 5].map((n) => `<option>${n}</option>`).join('')}</select>
        </label>
        <label class="field">
          <span>Lời chúc gửi cô dâu chú rể</span>
          <textarea name="message" rows="3" maxlength="500"></textarea>
        </label>
        <button class="btn btn--solid" type="submit">Gửi xác nhận</button>
        <p class="form__status" id="rsvpStatus" role="status"></p>
      </form>
    </section>`;
  }

  function gifts() {
    if (!W.gifts || !W.gifts.length) return '';
    const tabs = W.gifts.map((g, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-gift="${i}">${esc(g.label)}</button>`).join('');
    const panels = W.gifts.map((g, i) => {
      const qr = g.qrImage || `https://img.vietqr.io/image/${encodeURIComponent(g.bankBin)}-${encodeURIComponent(g.accountNo)}-qr_only.png?accountName=${encodeURIComponent(g.accountName)}&addInfo=${encodeURIComponent('Mung cuoi')}`;
      return `
      <div class="gift" role="tabpanel" data-panel="${i}" ${i ? 'hidden' : ''}>
        <div class="gift__qr"><img src="${esc(qr)}" alt="Mã QR chuyển khoản ${esc(g.label)}" loading="lazy" width="220" height="220"></div>
        <p class="gift__bank">${esc(g.bankName)}</p>
        <p class="gift__no">${esc(g.accountNo)}</p>
        <p class="gift__owner">${esc(g.accountName)}</p>
        <button class="btn" type="button" data-copy="${esc(g.accountNo)}">Sao chép số tài khoản</button>
      </div>`;
    }).join('');
    return `
    <section class="section gifts" id="mung-cuoi">
      ${heading('Gửi mừng cưới')}
      <p class="section__intro">Nếu không tiện đến chung vui, bạn có thể gửi lời chúc qua mã QR bên dưới.</p>
      <div class="tabs" role="tablist">${tabs}</div>
      ${panels}
    </section>`;
  }

  function footer() {
    return `
    <footer class="closing">
      <p class="closing__text script">${esc(W.closing)}</p>
      <p class="closing__names">${esc(W.groom.name)} &amp; ${esc(W.bride.name)}</p>
    </footer>`;
  }

  /* ---------- Dựng trang ---------- */
  $('#card').innerHTML = hero() + families() + invitation() + calendar() + mapSection() + album() + rsvp() + gifts() + footer();

  $$('[data-bind]').forEach((el) => {
    el.textContent = el.dataset.bind.split('.').reduce((o, k) => o && o[k], W) || '';
  });
  if (guestName) {
    const g = $('#coverGuest');
    g.hidden = false;
    g.querySelector('span').textContent = guestName;
  }

  /* ---------- Mở thiệp + nhạc ---------- */
  const audio = $('#bgm');
  const musicBtn = $('#musicBtn');
  const setMusicUI = (on) => {
    musicBtn.classList.toggle('is-playing', on);
    musicBtn.setAttribute('aria-label', on ? 'Tắt nhạc' : 'Bật nhạc');
  };
  if (W.music) {
    audio.src = W.music;
    musicBtn.hidden = false;
    audio.addEventListener('error', () => { musicBtn.hidden = true; });
    audio.addEventListener('play', () => setMusicUI(true));
    audio.addEventListener('pause', () => setMusicUI(false));
    musicBtn.addEventListener('click', () => (audio.paused ? audio.play().catch(() => {}) : audio.pause()));
  }

  $('#openBtn').addEventListener('click', () => {
    if (W.music) audio.play().catch(() => {}); // chỉ được phát sau thao tác của người dùng
    const cover = $('#cover');
    document.body.classList.remove('is-locked');
    if (reduceMotion) { cover.remove(); return; }
    cover.classList.add('is-open');
    setTimeout(() => cover.remove(), 1600);
  });

  /* ---------- Đếm ngược ---------- */
  const cd = $('#countdown');
  function tick() {
    let diff = main - Date.now();
    if (diff <= 0) {
      cd.innerHTML = `<p class="countdown__done">${Date.now() - main < 864e5 ? 'Hôm nay là ngày vui của chúng mình!' : 'Cảm ơn bạn đã cùng chung vui.'}</p>`;
      return false;
    }
    const s = Math.floor(diff / 1000);
    const v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
    Object.keys(v).forEach((k) => { cd.querySelector(`[data-cd="${k}"]`).textContent = pad(v[k]); });
    return true;
  }
  if (tick()) { const t = setInterval(() => { if (!tick()) clearInterval(t); }, 1000); }

  /* ---------- Album + lightbox (vuốt trái/phải trên điện thoại) ---------- */
  const lb = $('#lightbox');
  if (lb && W.album && W.album.length) {
    const img = $('.lightbox__img', lb);
    const count = $('.lightbox__count', lb);
    let idx = 0, lastFocus = null;
    const show = (i) => {
      idx = (i + W.album.length) % W.album.length;
      img.src = `images/album/${W.album[idx]}.webp`;
      img.alt = `Ảnh cưới ${idx + 1}`;
      count.textContent = `${idx + 1} / ${W.album.length}`;
    };
    const open = (i) => { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.classList.add('is-locked'); $('.lightbox__close', lb).focus(); };
    const close = () => { lb.hidden = true; document.body.classList.remove('is-locked'); lastFocus && lastFocus.focus(); };
    $$('.album__item').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); open(+a.dataset.index); }));
    $('.lightbox__close', lb).addEventListener('click', close);
    $('.lightbox__nav--prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lightbox__nav--next', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Xác nhận tham dự → Google Sheets ---------- */
  const form = $('#rsvpForm');
  const status = $('#rsvpStatus');
  const guestsField = $('#guestsField');
  const f = form.elements;
  form.addEventListener('change', () => {
    guestsField.hidden = f.attend.value === 'Không';
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = f.name.value.trim();
    if (!name) { status.textContent = 'Bạn nhập họ tên giúp mình nhé.'; f.name.focus(); return; }
    if (!f.side.value) { status.textContent = 'Bạn chọn là khách nhà trai hay nhà gái nhé.'; return; }
    const data = new URLSearchParams({
      name,
      side: f.side.value,
      attend: f.attend.value,
      guests: f.attend.value === 'Có' ? f.guests.value : '0',
      message: f.message.value.trim(),
    });
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = 'Đang gửi…';
    try {
      if (W.rsvpUrl) {
        await fetch(W.rsvpUrl, { method: 'POST', mode: 'no-cors', body: data });
      } else {
        console.warn('Chưa điền rsvpUrl trong config.js, dữ liệu chưa được lưu:', Object.fromEntries(data));
      }
      form.reset();
      f.name.value = '';
      guestsField.hidden = false;
      status.textContent = data.get('attend') === 'Có'
        ? 'Đã gửi xác nhận. Hẹn gặp bạn trong ngày vui!'
        : 'Đã gửi. Cảm ơn lời chúc của bạn!';
    } catch (err) {
      status.textContent = 'Chưa gửi được, bạn kiểm tra mạng rồi bấm gửi lại nhé.';
    } finally {
      btn.disabled = false;
    }
  });

  /* ---------- Mừng cưới: chuyển tab + sao chép số tài khoản ---------- */
  $$('.tabs [data-gift]').forEach((tab) => tab.addEventListener('click', () => {
    $$('.tabs [data-gift]').forEach((t) => t.setAttribute('aria-selected', t === tab));
    $$('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== tab.dataset.gift; });
  }));
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    }
    const old = btn.textContent;
    btn.textContent = 'Đã sao chép';
    setTimeout(() => { btn.textContent = old; }, 1800);
  }));
})();

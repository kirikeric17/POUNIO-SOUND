(() => {
  const CONTACTS = [
    { name: 'Calvin', phone: '011 3172 0625', intl: '601131720625' },
    { name: 'Chris',  phone: '011 3159 5663', intl: '601131595663' }
  ];
  const EVENTS = ['Birthdays', 'Weddings', 'Engagements', 'Religious Events', 'Corporate Events'];
  const PACKAGES = [
    { code: 'PS01', name: 'Starter',  tier: 'Basic Setup',    price: 449,
      items: [['2','Speaker'],['1','Mixer'],['2','Wireless Mic'],['1','Tablet']] },
    { code: 'PS02', name: 'Plus',     tier: 'Basic+ Setup',   price: 549,
      items: [['3','Speaker'],['1','Mixer'],['2','Wireless Mic'],['1','Tablet']] },
    { code: 'PS03', name: 'Standard', tier: 'Standard Setup', price: 699, popular: true,
      items: [['4','Speaker'],['1','Mixer'],['2','Wireless Mic'],['1','Laptop'],['1','Screen Monitor']] },
    { code: 'PS04', name: 'Premium',  tier: 'Premium Setup',  price: 899,
      items: [['4','Speaker'],['1','Mixer'],['4','Wireless Mic'],['1','Sub'],['1','Laptop'],['1','Screen Monitor']] },
    { code: 'PS05', name: 'Advanced', tier: 'Full Setup',     price: 1199,
      items: [['4','Speaker'],['1','Mixer'],['4','Wireless Mic'],['2','Sub'],['1','Laptop'],['1','Screen Monitor']] }
  ];
  const ADDONS = ['Speaker', 'Sub', 'Screen Monitor', 'Laptop', 'Wireless Mic'];

  const ICONS = {
    Speaker: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="7" r="2"/><circle cx="12" cy="15" r="4"/>',
    Sub: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    Mixer: '<path d="M6 3v18M12 3v18M18 3v18"/><rect x="4" y="13" width="4" height="3" rx="1"/><rect x="10" y="6" width="4" height="3" rx="1"/><rect x="16" y="10" width="4" height="3" rx="1"/>',
    'Wireless Mic': '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
    Tablet: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>',
    Laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
    'Screen Monitor': '<rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>'
  };
  const svg = (k, sw = 2) => `<svg viewBox="0 0 24 24" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ''}</svg>`;
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
  const WA = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z"/></svg>';
  const PHONE = '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';

  const $ = s => document.querySelector(s);
  const app = $('#app');
  const state = { pkg: null, addons: new Set(), events: new Set() };
  const buzz = () => navigator.vibrate && navigator.vibrate(12);

  /* --- Decorative bars --- */
  $('#wave').innerHTML = Array.from({ length: 12 }, (_, i) => `<i style="animation-delay:${(i * 0.08).toFixed(2)}s"></i>`).join('');
  $('#eq').innerHTML = Array.from({ length: 22 }, () =>
    `<span style="animation-delay:-${(Math.random() * 1.2).toFixed(2)}s;animation-duration:${(0.8 + Math.random() * 0.8).toFixed(2)}s"></span>`).join('');

  /* --- Home: events & contacts --- */
  $('#events').innerHTML = EVENTS.map((e, i) =>
    `<button class="chip" data-ev="${e}" style="animation-delay:${0.15 + i * 0.08}s"><span class="tick">${CHECK}</span>${e}</button>`).join('');
  $('#events').addEventListener('click', ev => {
    const c = ev.target.closest('.chip'); if (!c) return;
    buzz();
    c.classList.toggle('on');
    c.classList.contains('on') ? state.events.add(c.dataset.ev) : state.events.delete(c.dataset.ev);
  });

  const waLink = (c, msg) => `https://wa.me/${c.intl}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
  $('#contacts').innerHTML = CONTACTS.map(c => `
    <div class="contact">
      <b>${c.name}</b><small>${c.phone}</small>
      <div class="acts">
        <a class="icon-btn wa" href="${waLink(c, 'Hi Pounio Sound! I would like to know more about your sound system rental.')}" target="_blank" rel="noopener" aria-label="WhatsApp ${c.name}">${WA}</a>
        <a class="icon-btn call" href="tel:+${c.intl}" aria-label="Call ${c.name}">${PHONE}</a>
      </div>
    </div>`).join('');

  /* --- Ripple on main buttons --- */
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.cta, .book-btn'); if (!b || b.disabled) return;
    const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height);
    const s = document.createElement('span');
    s.className = 'ripple';
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(s); setTimeout(() => s.remove(), 650);
  });

  /* --- Packages --- */
  const tierBtns = ['All', ...PACKAGES.map(p => p.code)];
  $('#tiers').innerHTML = tierBtns.map((t, i) => `<button class="tier${i === 0 ? ' on' : ''}" data-t="${t}">${t}</button>`).join('');

  $('#pkgList').innerHTML = PACKAGES.map((p, i) => `
    <article class="pkg" data-code="${p.code}" style="animation-delay:${0.1 + i * 0.08}s">
      ${p.popular ? '<span class="pop">★ MOST POPULAR</span>' : ''}
      <div class="pkg-head">
        <div><div class="code">${p.code}</div><h3>${p.name.toUpperCase()}</h3></div>
        <div class="badge"><small>${p.tier}</small><b>RM<span class="num" data-v="${p.price}">${p.price}</span></b></div>
      </div>
      <div class="items">
        ${p.items.map(([n, k]) => `<div class="item">${svg(k)}<span><b>${n}</b> ${k}</span></div>`).join('')}
      </div>
      <div class="sel-ind">${CHECK}</div>
    </article>`).join('');

  $('#pkgList').addEventListener('click', e => {
    const card = e.target.closest('.pkg'); if (!card) return;
    buzz();
    const code = card.dataset.code;
    state.pkg = state.pkg && state.pkg.code === code ? null : PACKAGES.find(p => p.code === code);
    document.querySelectorAll('.pkg').forEach(c => c.classList.toggle('sel', state.pkg && c.dataset.code === state.pkg.code));
    document.querySelectorAll('.tier').forEach(t => t.classList.toggle('on', t.dataset.t === (state.pkg ? state.pkg.code : 'All')));
    updateBar();
  });

  $('#tiers').addEventListener('click', e => {
    const t = e.target.closest('.tier'); if (!t) return;
    buzz();
    document.querySelectorAll('.tier').forEach(x => x.classList.toggle('on', x === t));
    if (t.dataset.t === 'All') { $('#packages').scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const card = document.querySelector(`.pkg[data-code="${t.dataset.t}"]`);
    if (!card.classList.contains('sel')) card.click();
    const view = $('#packages');
    view.scrollTo({ top: card.offsetTop - 90, behavior: 'smooth' });
  });

  $('#addons').innerHTML = ADDONS.map(a => `<button class="addon" data-addon="${a}"><span class="plus">+</span>${a}</button>`).join('');
  document.querySelectorAll('.addon').forEach(b => b.addEventListener('click', () => {
    buzz();
    b.classList.toggle('on');
    const a = b.dataset.addon;
    b.classList.contains('on') ? state.addons.add(a) : state.addons.delete(a);
    updateBar();
  }));

  function updateBar() {
    const p = state.pkg;
    const n = state.addons.size;
    $('#sumName').textContent = p
      ? `${p.code} – ${p.name}${n ? ` + ${n} add-on${n > 1 ? 's' : ''}` : ''}`
      : (n ? `${n} add-on${n > 1 ? 's' : ''} · pick a package` : 'Select a package');
    $('#sumPrice').innerHTML = p ? `RM${p.price}${n ? '<em>+ add-ons</em>' : ''}` : '—';
    $('#bookBtn').disabled = !p;
  }
  updateBar();

  /* Count-up animation on prices */
  function countUp() {
    document.querySelectorAll('.num').forEach(el => {
      const end = +el.dataset.v, t0 = performance.now(), dur = 900;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* --- Navigation (hash-based so the phone back button works) --- */
  function route() {
    const onPk = location.hash === '#packages';
    const was = app.classList.contains('on-packages');
    app.classList.toggle('on-packages', onPk);
    $('#eq').classList.toggle('paused', onPk);
    if (onPk && !was) {
      document.querySelectorAll('.pkg').forEach(c => { c.style.animation = 'none'; c.offsetHeight; c.style.animation = ''; });
      $('#packages').scrollTop = 0;
      countUp();
    }
    if (!onPk) closeSheet();
  }
  $('#seePackages').addEventListener('click', () => { buzz(); location.hash = 'packages'; });
  $('#back').addEventListener('click', () => { buzz(); history.length > 1 && location.hash === '#packages' ? history.back() : (location.hash = ''); });
  window.addEventListener('hashchange', route);
  route();

  /* --- Booking sheet --- */
  function buildMessage() {
    const p = state.pkg;
    const lines = ['Hi Pounio Sound! I would like to book:', `• ${p.code} – ${p.name} (${p.tier}) RM${p.price}`];
    if (state.addons.size) lines.push(`• Add-ons: ${[...state.addons].join(', ')}`);
    if (state.events.size) lines.push(`• Event: ${[...state.events].join(', ')}`);
    const d = $('#evDate').value, pl = $('#evPlace').value.trim();
    if (d) lines.push(`• Date: ${new Date(d + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`);
    if (pl) lines.push(`• Location: ${pl}`);
    lines.push('Please confirm availability. Thank you!');
    return lines.join('\n');
  }
  function renderPeople() {
    $('#people').innerHTML = CONTACTS.map(c => `
      <div class="person">
        <div class="avatar">${c.name[0]}</div>
        <div class="who"><b>${c.name}</b><small>${c.phone}</small></div>
        <a class="icon-btn wa" href="${waLink(c, buildMessage())}" target="_blank" rel="noopener" aria-label="WhatsApp ${c.name}">${WA}</a>
        <a class="icon-btn call" href="tel:+${c.intl}" aria-label="Call ${c.name}">${PHONE}</a>
      </div>`).join('');
  }
  function openSheet() {
    const p = state.pkg; if (!p) return;
    $('#recap').innerHTML = `<b style="color:var(--gold)">${p.code} – ${p.name}</b> · RM${p.price}` +
      (state.addons.size ? `<br>Add-ons: ${[...state.addons].join(', ')} <span style="color:var(--muted)">(from RM80 each)</span>` : '') +
      `<br><span style="color:var(--muted)">Send your request via WhatsApp or call us directly.</span>`;
    renderPeople();
    app.classList.add('sheet-open');
  }
  function closeSheet() { app.classList.remove('sheet-open'); }
  $('#bookBtn').addEventListener('click', () => { buzz(); openSheet(); });
  $('#scrim').addEventListener('click', closeSheet);
  ['#evDate', '#evPlace'].forEach(s => $(s).addEventListener('input', renderPeople));

  /* Swipe-down to close sheet */
  let y0 = null;
  $('#sheet').addEventListener('touchstart', e => { if (e.target.tagName !== 'INPUT') y0 = e.touches[0].clientY; }, { passive: true });
  $('#sheet').addEventListener('touchend', e => { if (y0 !== null && e.changedTouches[0].clientY - y0 > 60) closeSheet(); y0 = null; });

  /* Swipe right on packages to go back */
  let sx = null, sy = null;
  $('#packages').addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  $('#packages').addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = Math.abs(e.changedTouches[0].clientY - sy);
    if (sx < 40 && dx > 80 && dy < 60) $('#back').click();
    sx = null;
  });

  /* Toast */
  let tt;
  window.toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 1800); };
  document.addEventListener('click', e => {
    if (e.target.closest('.pkg') && state.pkg) toast(`${state.pkg.code} ${state.pkg.name} selected`);
  });
})();

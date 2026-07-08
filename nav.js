/* FLH Anesthesia Portal - shared navigation
   Injects a floating menu button on every page.
   - Mobile (<=700px): slide-out drawer from the right
   - Desktop: dropdown panel under the button
   Edit the LINKS array below to change the menu everywhere. */
(function () {
  var SVGS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.2 5.07A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    warn: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>'
  };
  var LINKS = [
    { group: 'Quick access' },
    { label: 'Home', href: 'index.html', icon: 'home' },
    { label: 'Schedule', href: 'schedule.html', icon: 'calendar' },
    { label: 'On Call Team', href: 'call-team.html', icon: 'phone' },
    { label: 'Print Drug Label', href: 'drug-labels.html', icon: 'tag' },
    { label: 'Block Schedule', href: 'block-schedule.html', icon: 'grid' },
    { label: 'OR Emergencies', href: 'or-emergencies.html', icon: 'warn', alert: true },
    { label: 'Anesthesia Reference', href: 'reference.html', icon: 'book', green: true },
    { group: 'Resources' },
    { label: 'Useful Links', href: 'useful-links.html', icon: 'link' },
    { label: 'SAB Notes', href: 'sab-notes.html', icon: 'note' },
    { label: 'BMI Calculator', href: 'bmi.html', icon: 'activity' },
    { label: 'URMC Remote Access', href: 'https://myapps.urmc.rochester.edu/Citrix/MyAppsRemoteWeb/', icon: 'monitor', ext: true },
    { label: 'URMC Outlook Mail', href: 'http://outlook.com/owa/urmc.rochester.edu', icon: 'mail', ext: true },
    { label: 'FLH MyPath', href: 'https://uidp-prod.its.rochester.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=csod-flh', icon: 'book', ext: true }
  ];

  var css = ''
    + '#flhnav-btn{position:fixed;top:12px;right:12px;z-index:99990;width:42px;height:42px;border-radius:12px;'
    + 'border:1px solid #e6e8ec;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);'
    + 'box-shadow:0 2px 8px rgba(18,24,33,.10);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}'
    + '#flhnav-btn:hover{border-color:#cdd3da}'
    + '#flhnav-btn svg{width:20px;height:20px;stroke:#1f2933;stroke-width:2;stroke-linecap:round}'
    + '#flhnav-overlay{position:fixed;inset:0;background:rgba(18,24,33,.35);z-index:99991;opacity:0;pointer-events:none;transition:opacity .2s}'
    + '#flhnav-overlay.open{opacity:1;pointer-events:auto}'
    + '#flhnav-panel{position:fixed;z-index:99992;background:#fff;border:1px solid #e6e8ec;overflow-y:auto;'
    + 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}'
    + '#flhnav-panel .grp{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;padding:14px 18px 6px}'
    + '#flhnav-panel a{display:flex;align-items:center;gap:12px;padding:11px 18px;color:#1f2933;text-decoration:none;font-size:15px;font-weight:500}'
    + '#flhnav-panel a:hover{background:#f6f7f9}'
    + '#flhnav-panel a.alert{color:#c0392b}'
    + '#flhnav-panel a .ic{width:22px;height:20px;flex:none;display:flex;align-items:center;justify-content:center;color:#64748b}'
    + '#flhnav-panel a .ic svg{width:19px;height:19px}'
    + '#flhnav-panel a.alert .ic{color:#c0392b}'
    + '#flhnav-panel a.green{color:#1e7a44}'
    + '#flhnav-panel a.green .ic{color:#1e7a44}'
    + '#flhnav-panel a.current .ic{color:#2f6fed}'
    + '#flhnav-panel a .extmark{margin-left:auto;color:#9aa3af;font-size:12px}'
    + '#flhnav-panel a.current{background:#eef4ff;color:#2f6fed}'
    + '@media (max-width:700px){'
    + '#flhnav-panel{top:0;right:0;bottom:0;width:min(300px,85vw);border-radius:0;border-top:none;border-bottom:none;border-right:none;'
    + 'transform:translateX(105%);transition:transform .22s ease;box-shadow:-8px 0 24px rgba(18,24,33,.12);padding-bottom:env(safe-area-inset-bottom)}'
    + '#flhnav-panel.open{transform:translateX(0)}'
    + '#flhnav-panel .grp:first-child{padding-top:20px}'
    + '}'
    + '@media (min-width:701px){'
    + '#flhnav-panel{top:62px;right:12px;width:280px;max-height:calc(100vh - 80px);border-radius:14px;'
    + 'box-shadow:0 10px 32px rgba(18,24,33,.16);display:none}'
    + '#flhnav-panel.open{display:block}'
    + '}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.id = 'flhnav-btn';
  btn.setAttribute('aria-label', 'Site menu');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

  var overlay = document.createElement('div');
  overlay.id = 'flhnav-overlay';

  var panel = document.createElement('nav');
  panel.id = 'flhnav-panel';
  var here = location.pathname.split('/').pop() || 'index.html';
  var html = '';
  for (var i = 0; i < LINKS.length; i++) {
    var l = LINKS[i];
    if (l.group) { html += '<div class="grp">' + l.group + '</div>'; continue; }
    var cls = (l.alert ? 'alert ' : '') + (l.green ? 'green ' : '') + (l.href === here ? 'current' : '');
    html += '<a href="' + l.href + '"' + (l.ext ? ' target="_blank" rel="noopener noreferrer"' : '')
      + (cls ? ' class="' + cls.trim() + '"' : '') + '>'
      + '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + SVGS[l.icon] + '</svg></span>' + l.label
      + (l.ext ? '<span class="extmark">↗</span>' : '') + '</a>';
  }
  panel.innerHTML = html;

  function toggle(open) {
    var on = open === undefined ? !panel.classList.contains('open') : open;
    panel.classList.toggle('open', on);
    overlay.classList.toggle('open', on);
  }
  btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
  overlay.addEventListener('click', function () { toggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn) toggle(false);
  });

  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  document.body.appendChild(btn);

  // Hide the floating menu button while a page popup is open (both
  // Anesthesia Reference and OR Emergencies mark their popup with `.modal.on`),
  // so it never collides with the popup's own close (X) button.
  function syncWithPopup() {
    var popupOpen = !!document.querySelector('.modal.on');
    btn.style.display = popupOpen ? 'none' : '';
    if (popupOpen) toggle(false);
  }
  try {
    new MutationObserver(syncWithPopup).observe(document.documentElement, {
      attributes: true, subtree: true, attributeFilter: ['class']
    });
  } catch (e) {}
  syncWithPopup();
})();

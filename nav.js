/* FLH Anesthesia Portal - shared navigation
   Injects a floating menu button on every page.
   - Mobile (<=700px): slide-out drawer from the right
   - Desktop: dropdown panel under the button
   Edit the LINKS array below to change the menu everywhere. */
(function () {
  var LINKS = [
    { group: 'Quick access' },
    { label: 'Home', href: 'index.html', icon: '⌂' },
    { label: 'Schedule', href: 'schedule.html', icon: '📅' },
    { label: 'On Call Team', href: 'call-team.html', icon: '📞' },
    { label: 'Print Drug Label', href: 'drug-labels.html', icon: '🏷' },
    { label: 'Block Schedule', href: 'block-schedule.html', icon: '🗓' },
    { label: 'OR Emergencies', href: 'or-emergencies.html', icon: '🚨', alert: true },
    { label: 'Anesthesia Reference', href: 'https://ketulmd.github.io/anesthesia-reference/', icon: '📖', ext: true },
    { group: 'Resources' },
    { label: 'Useful Links', href: 'useful-links.html', icon: '🔗' },
    { label: 'SAB Notes', href: 'sab-notes.html', icon: '📝' },
    { label: 'BMI Calculator', href: 'bmi.html', icon: '🧮' },
    { label: 'URMC Remote Access', href: 'https://myapps.urmc.rochester.edu/Citrix/MyAppsRemoteWeb/', icon: '🖥', ext: true },
    { label: 'URMC Outlook Mail', href: 'http://outlook.com/owa/urmc.rochester.edu', icon: '✉️', ext: true },
    { label: 'FLH MyPath', href: 'https://uidp-prod.its.rochester.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=csod-flh', icon: '🎓', ext: true }
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
    + '#flhnav-panel a .ic{width:22px;text-align:center;flex:none}'
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
    var cls = (l.alert ? 'alert ' : '') + (l.href === here ? 'current' : '');
    html += '<a href="' + l.href + '"' + (l.ext ? ' target="_blank" rel="noopener noreferrer"' : '')
      + (cls ? ' class="' + cls.trim() + '"' : '') + '>'
      + '<span class="ic">' + l.icon + '</span>' + l.label
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
})();

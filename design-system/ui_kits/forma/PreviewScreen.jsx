// ── Forma UI Kit — Template Preview Screen ───────────────────────────

function PreviewScreen({ template, setScreen }) {
  const [tab, setTab] = React.useState('preview');
  const [purchasing, setPurchasing] = React.useState(false);
  const [purchased, setPurchased] = React.useState(template?.id === 't3');

  const t = template || TEMPLATES[0];
  const plat = PLATFORM_COLORS[t.type] || PLATFORM_COLORS.html;

  const handleBuy = () => {
    if (purchased) return;
    setPurchasing(true);
    setTimeout(() => { setPurchasing(false); setPurchased(true); }, 1400);
  };

  // Mock HTML preview content
  const mockPreview = `
    <style>
      body { margin:0; font-family:'Plus Jakarta Sans',sans-serif; background:#0d0a06; color:#EDE8DC; }
      .hero { padding:60px 40px; border-bottom:1px solid rgba(237,232,220,0.08); }
      .label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#C8915A; margin-bottom:12px; }
      h1 { font-size:42px; font-weight:700; letter-spacing:-0.02em; margin:0 0 16px; }
      p { font-size:15px; color:rgba(237,232,220,0.6); line-height:1.7; max-width:500px; margin:0 0 28px; }
      .btn { display:inline-block; background:#C8915A; color:#0d0a06; padding:12px 28px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.14em; }
      .features { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; padding:40px; }
      .feature { padding:20px; border:1px solid rgba(237,232,220,0.08); background:rgba(30,26,20,0.5); }
      .f-icon { width:32px; height:32px; background:rgba(200,145,90,0.15); margin-bottom:12px; }
      .f-title { font-size:14px; font-weight:600; margin:0 0 6px; }
      .f-desc { font-size:12px; color:rgba(237,232,220,0.5); line-height:1.5; margin:0; }
    </style>
    <div class="hero">
      <div class="label">SaaS Platform</div>
      <h1>Ship faster,<br>grow smarter</h1>
      <p>The all-in-one dashboard template for modern SaaS teams. Beautifully designed, fully responsive.</p>
      <span class="btn">Get Started →</span>
    </div>
    <div class="features">
      <div class="feature"><div class="f-icon"></div><div class="f-title">Analytics</div><p class="f-desc">Real-time metrics and KPI tracking</p></div>
      <div class="feature"><div class="f-icon"></div><div class="f-title">Dark Mode</div><p class="f-desc">Full light and dark theme support</p></div>
      <div class="feature"><div class="f-icon"></div><div class="f-title">Responsive</div><p class="f-desc">Mobile-first, works on all screens</p></div>
    </div>
  `;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', fontFamily: FONTS.body, fontSize: 12, color: COLORS.muted, cursor: 'pointer', padding: 0 }}>Catalog</button>
        <span style={{ color: COLORS.muted, fontSize: 12 }}>›</span>
        <span style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.text }}>{t.name}</span>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* ── Main content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${COLORS.border}`, padding: '0 24px' }}>
            {['preview', 'details'].map(tb => (
              <button key={tb} onClick={() => setTab(tb)} style={{
                fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
                color: tab === tb ? COLORS.text : COLORS.muted,
                borderBottom: tab === tb ? `2px solid ${COLORS.accent}` : '2px solid transparent',
                marginBottom: -1, transition: 'color 0.2s',
              }}>{tb}</button>
            ))}
          </div>

          {/* Preview iframe mock */}
          {tab === 'preview' && (
            <div style={{ position: 'relative' }}>
              {/* Phone / desktop toggle */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '12px 0', borderBottom: `1px solid ${COLORS.border}` }}>
                {[['🖥', 'Desktop'], ['📱', 'Mobile']].map(([icon, label]) => (
                  <button key={label} style={{
                    fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', background: label === 'Desktop' ? COLORS.inputBg : 'none',
                    border: `1px solid ${label === 'Desktop' ? 'rgba(200,145,90,0.3)' : COLORS.border}`,
                    color: label === 'Desktop' ? COLORS.accent : COLORS.muted,
                    padding: '4px 10px', cursor: 'pointer',
                  }}>{icon} {label}</button>
                ))}
              </div>
              {/* Mock preview area */}
              <div style={{ background: '#0d0a06', margin: 16, border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
                <div dangerouslySetInnerHTML={{ __html: mockPreview }} style={{ pointerEvents: 'none' }} />
              </div>
            </div>
          )}

          {tab === 'details' && (
            <div style={{ padding: '24px', maxWidth: 700 }}>
              {/* Description */}
              <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 8 }}>Description</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.text, lineHeight: 1.8, marginBottom: 24 }}>
                A fully responsive, production-ready SaaS dashboard template built with clean semantic HTML and modern CSS. Includes dark mode, multiple chart placeholders, sidebar navigation, and full mobile support.
              </p>
              {/* What's included */}
              <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 12 }}>What's Included</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {['Single HTML file, zero dependencies', 'Light & dark mode', 'Responsive — mobile + tablet + desktop', 'Claude AI customisation via Studio', '6 months free updates'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.8 3 5.2-5" stroke={COLORS.success} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.text }}>{item}</span>
                  </div>
                ))}
              </div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['HTML', 'Dashboard', 'SaaS', 'Dark Mode', 'Responsive'].map(tag => (
                  <span key={tag} style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', border: `1px solid ${COLORS.border}`, color: COLORS.muted }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right sidebar CTA ── */}
        <div style={{ width: 280, flexShrink: 0, borderLeft: `1px solid ${COLORS.border}`, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Wax seal + price */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 4 }}>{plat.label} Template</div>
              <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: COLORS.text }}>{t.name}</div>
            </div>
            {/* Wax seal */}
            <div style={{ position: 'relative', width: 52, height: 52, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #d4a070, ${COLORS.accent} 60%, #9a6030 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d0a06', fontFamily: FONTS.display, fontWeight: 600, fontSize: 13, transform: 'rotate(-6deg)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.6)', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.35)' }} />
              {formatPrice(t.price)}
            </div>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill={i <= 4 ? COLORS.accent : 'none'}><path d="M6 1l1.2 2.6 2.8.4-2 2 .5 2.8L6 7.6l-2.5 1.2.5-2.8-2-2 2.8-.4z" stroke={COLORS.accent} strokeWidth="0.8" strokeLinejoin="round"/></svg>)}
            </div>
            <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted }}>4.8 (32 reviews)</span>
          </div>

          {/* Buy / Download button */}
          <button onClick={handleBuy} style={{
            fontFamily: FONTS.heading, fontWeight: 700, fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            background: purchased ? COLORS.success : COLORS.accent,
            color: '#0d0a06', padding: '14px', border: 'none', cursor: purchased ? 'default' : 'pointer',
            transition: `background 0.3s ${EASE.glide}`,
          }}>
            {purchasing ? '...' : purchased ? '↓ Download Template' : t.price === 0 ? 'Get for Free' : `Buy — ${formatPrice(t.price)}`}
          </button>

          {/* Studio customise */}
          <button onClick={() => {}} style={{
            fontFamily: FONTS.heading, fontWeight: 600, fontSize: 10,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            background: 'transparent', color: COLORS.text,
            padding: '10px', border: `1px solid rgba(237,232,220,0.22)`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none"><path d="M5 1l1.1 2.3L9 4l-2 1.8.5 2.5L5 7.2 2.5 8.3 3 5.8 1 4l2.9-.7L5 1z" fill={COLORS.accent}/></svg>
            Customise with AI
          </button>

          {/* Meta info */}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Format', plat.label], ['Delivery', 'Instant download'], ['Licence', 'Single use'], ['Updates', '6 months free']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted }}>{k}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.text }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PreviewScreen });

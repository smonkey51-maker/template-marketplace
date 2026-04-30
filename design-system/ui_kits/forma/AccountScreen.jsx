// ── Forma UI Kit — Account Screen ────────────────────────────────────

function AccountScreen() {
  const [tab, setTab] = React.useState('purchases');

  const purchases = [
    { ...TEMPLATES[0], purchasedAt: 'Apr 28, 2025' },
    { ...TEMPLATES[2], purchasedAt: 'Mar 14, 2025' },
    { ...TEMPLATES[4], purchasedAt: 'Feb 02, 2025' },
  ];

  const rowStyle = {
    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
    borderBottom: `1px solid ${COLORS.border}`,
  };

  const platColors = { html: COLORS.accent, sheets: '#0F9D58', notion: '#888' };

  return (
    <div style={{ padding: '0 0 64px' }}>
      {/* Header band */}
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: '32px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(200,145,90,0.2)', border: `1px solid rgba(200,145,90,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.display, fontSize: 22, color: COLORS.accent }}>形</div>
        <div>
          <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: COLORS.text }}>Marco Rossi</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.muted, marginTop: 2 }}>marco@example.com · Member since 2024</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ padding: '8px 14px', border: `1px solid rgba(200,145,90,0.3)`, background: 'rgba(200,145,90,0.1)' }}>
            <div style={{ fontFamily: FONTS.heading, fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 2 }}>Studio Access</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted }}>Active — Monthly</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px', maxWidth: 900, margin: '0 auto' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
          {['purchases', 'studio-access', 'settings'].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{
              fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
              color: tab === tb ? COLORS.text : COLORS.muted,
              borderBottom: tab === tb ? `2px solid ${COLORS.accent}` : '2px solid transparent',
              marginBottom: -1,
            }}>
              {tb === 'purchases' ? 'My Templates' : tb === 'studio-access' ? 'Studio Access' : 'Settings'}
            </button>
          ))}
        </div>

        {tab === 'purchases' && (
          <div>
            <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 16 }}>
              {purchases.length} templates purchased
            </div>
            {purchases.map(p => (
              <div key={p.id} style={rowStyle}>
                {/* Icon */}
                <div style={{ width: 40, height: 40, background: `${platColors[p.type] || COLORS.accent}22`, border: `1px solid ${platColors[p.type] || COLORS.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: FONTS.heading, fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: platColors[p.type] || COLORS.accent }}>{(p.type || 'html').slice(0,3).toUpperCase()}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONTS.heading, fontWeight: 600, fontSize: 13, color: COLORS.text }}>{p.name}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted, marginTop: 2 }}>Purchased {p.purchasedAt}</div>
                </div>
                <div style={{ fontFamily: FONTS.display, fontSize: 16, color: COLORS.accent }}>{formatPrice(p.price)}</div>
                <button style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', background: COLORS.accent, color: '#0d0a06', padding: '6px 14px', border: 'none', cursor: 'pointer' }}>↓ Download</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'studio-access' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ border: `1px solid rgba(200,145,90,0.3)`, background: 'rgba(200,145,90,0.06)', padding: '20px 24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.terra})` }} />
              <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 6 }}>Current Plan</div>
              <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 20, color: COLORS.text, marginBottom: 4 }}>Studio Access — Monthly</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.muted, marginBottom: 16 }}>Renews May 28, 2025 · €9.99/month</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', background: COLORS.accent, color: '#0d0a06', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>Manage Subscription</button>
                <button style={{ fontFamily: FONTS.heading, fontWeight: 600, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'none', color: COLORS.muted, padding: '8px 16px', border: `1px solid ${COLORS.border}`, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
            <div style={{ border: `1px solid ${COLORS.border}`, padding: '20px 24px' }}>
              <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 12 }}>Studio Usage This Month</div>
              {[['Templates Generated', '18', '/ unlimited'], ['Templates Customised', '34', '/ unlimited'], ['AI Tokens Used', '142k', '/ 500k']].map(([l, v, limit]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.muted, flex: 1 }}>{l}</span>
                  <span style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 14, color: COLORS.text }}>{v}</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.muted }}>{limit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
            {[['Display name', 'Marco Rossi'], ['Email', 'marco@example.com']].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.muted }}>{label}</span>
                <input defaultValue={val} style={{ background: COLORS.inputBg, border: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONTS.body, fontSize: 13, padding: '9px 12px', outline: 'none', width: '100%' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.muted }}>Language</span>
                <select style={{ background: COLORS.inputBg, border: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONTS.body, fontSize: 13, padding: '9px 12px', outline: 'none' }}>
                  <option>Italiano</option><option>English</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.muted }}>Theme</span>
                <select style={{ background: COLORS.inputBg, border: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONTS.body, fontSize: 13, padding: '9px 12px', outline: 'none' }}>
                  <option>Dark</option><option>Light</option>
                </select>
              </div>
            </div>
            <button style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', background: COLORS.accent, color: '#0d0a06', padding: '11px 24px', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AccountScreen });

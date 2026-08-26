// Brand mark + intro animation
// Pillar Pair logo (selected variant 04). Includes:
// - <BrandMark /> static mark for use in nav/footer
// - <BrandWordmark /> mark + 'peerbridge' wordmark
// - <IntroAnimation /> P/b letters morph into pillars + bridge deck on first load

function BrandMark({ size = 28, color = '#16140f' }) {
  // Pillar Pair: deck on top, two rounded pillars below, center dot
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, display: 'block' }} aria-label="peerbridge">
      <rect x="14" y="32" width="20" height="60" rx="10" fill={color} />
      <rect x="66" y="32" width="20" height="60" rx="10" fill={color} />
      <rect x="8" y="20" width="84" height="10" rx="5" fill={color} />
      <circle cx="50" cy="60" r="4" fill={color} />
    </svg>
  );
}

function BrandWordmark({ size = 28, color = '#16140f', wordSize = 18, gap = 8 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandMark size={size} color={color} />
      <span style={{ fontSize: wordSize, fontWeight: 700, letterSpacing: -0.5, color, fontFamily: T.fDisp }}>peerbridge</span>
    </div>
  );
}

// ───────────────────────── Intro Animation ─────────────────────────
// Letters 'P' and 'b' fade in → straighten/morph into rounded pillars
// → deck slides in on top → reveals "peerbridge" wordmark → fades to page.
// Total: ~2.6s. Skips on second load (sessionStorage).

function IntroAnimation({ onDone }) {
  const [phase, setPhase] = React.useState(0);
  // 0: P/b letters in · 1: letters fade, pillars grow · 2: deck slides in + dot · 3: wordmark · 4: fade out

  React.useEffect(() => {
    setPhase(0);
    const t0 = setTimeout(() => setPhase(0), 50);
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 1700);
    const t3 = setTimeout(() => setPhase(3), 2300);
    const t4 = setTimeout(() => setPhase(4), 3100);
    const t5 = setTimeout(() => {
      onDone && onDone();
    }, 3700);
    return () => [t0, t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onDone]);

  const ink = T.ink;
  const bg = T.bg;

  // viewBox 400x240. Pillars centered at x=140 and x=260. Pillar width 56, height 140.
  // Letters sit at the same x centers so morph reads as direct.
  const lx = 140, rx = 260;       // pillar center x
  const pw = 56, ph = 140;        // pillar w/h (final)
  const pyTop = 60, pyBot = 200;  // pillar top/bottom y

  return (
    <div style={{
      position: 'fixed', inset: 0, background: bg, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase >= 4 ? 0 : 1,
      transition: 'opacity 600ms ease',
      pointerEvents: phase >= 4 ? 'none' : 'auto',
    }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <svg viewBox="0 0 400 260" style={{ width: 480, height: 312, overflow: 'visible' }}>
          {/* P glyph — centered at lx */}
          <text x={lx} y="180" textAnchor="middle"
            style={{
              fontFamily: '"Inter", sans-serif', fontSize: 180, fontWeight: 600,
              fill: ink, letterSpacing: -8,
              opacity: phase === 0 ? 1 : 0,
              transition: 'opacity 500ms ease',
            }}>P</text>
          {/* b glyph — centered at rx */}
          <text x={rx} y="180" textAnchor="middle"
            style={{
              fontFamily: '"Inter", sans-serif', fontSize: 180, fontWeight: 600,
              fill: ink, letterSpacing: -8,
              opacity: phase === 0 ? 1 : 0,
              transition: 'opacity 500ms ease',
            }}>b</text>

          {/* Left pillar — grows from bottom up as P fades out */}
          <rect
            x={lx - pw / 2}
            y={phase >= 1 ? pyTop : pyBot}
            width={pw}
            height={phase >= 1 ? ph : 0}
            rx={pw / 2}
            fill={ink}
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transition: 'opacity 350ms ease 200ms, y 700ms cubic-bezier(0.34, 1.2, 0.4, 1) 200ms, height 700ms cubic-bezier(0.34, 1.2, 0.4, 1) 200ms',
            }}
          />
          {/* Right pillar */}
          <rect
            x={rx - pw / 2}
            y={phase >= 1 ? pyTop : pyBot}
            width={pw}
            height={phase >= 1 ? ph : 0}
            rx={pw / 2}
            fill={ink}
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transition: 'opacity 350ms ease 280ms, y 700ms cubic-bezier(0.34, 1.2, 0.4, 1) 280ms, height 700ms cubic-bezier(0.34, 1.2, 0.4, 1) 280ms',
            }}
          />

          {/* Bridge deck — slides in from left across both pillars */}
          <rect
            x={phase >= 2 ? 80 : -260}
            y={36}
            width={240}
            height={24}
            rx={12}
            fill={ink}
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'x 700ms cubic-bezier(0.3, 0, 0.2, 1), opacity 240ms ease',
            }}
          />

          {/* Center dot — pops in once deck lands */}
          <circle
            cx={(lx + rx) / 2}
            cy={120}
            r={phase >= 2 ? 10 : 0}
            fill={ink}
            style={{ transition: 'r 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 480ms' }}
          />
        </svg>

        <div style={{
          marginTop: 8,
          fontFamily: T.fDisp, fontSize: 32, fontWeight: 600, letterSpacing: -1.2, color: ink,
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 500ms ease, transform 500ms ease',
        }}>
          peerbridge
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { BrandMark, BrandWordmark, IntroAnimation });

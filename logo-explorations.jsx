// PB Logo explorations — peerbridge
// 6 variants for the PB monogram. Designed at 96px size for legibility, scaled in usage.

function LogoExplorations() {
  const items = [
    {
      n: '01',
      name: 'Bridge Mark',
      desc: 'P와 b를 거울 대칭으로 배치해 다리(bridge)를 형상화. 두 곡선이 가운데 갭을 두고 마주봄.',
      mark: <BridgeMark />,
    },
    {
      n: '02',
      name: 'Linked Counter',
      desc: 'p의 카운터(빈 공간)와 b의 카운터를 한 줄로 연결. 두 사이드를 잇는 한 획.',
      mark: <LinkedCounter />,
    },
    {
      n: '03',
      name: 'Stencil Cut',
      desc: '굵은 라운드 사각형에서 P/B를 도려낸 스텐실. 모노그램으로서 가장 그래픽한 형태.',
      mark: <StencilCut />,
    },
    {
      n: '04',
      name: 'Pillar Pair',
      desc: '두 개의 둥근 기둥 위에 다리 상판이 놓인 모듈러 마크. 부동산/구조의 메타포.',
      mark: <PillarPair />,
    },
    {
      n: '05',
      name: 'Half-circle',
      desc: '반원 두 개가 마주보며 원을 이루지만 중앙에 1px 갭. P와 b의 곡선만 추출.',
      mark: <HalfCircle />,
    },
    {
      n: '06',
      name: 'Serif Ligature',
      desc: '에디토리얼 톤. 세리프 P와 b를 합자처럼 묶어 한 글리프로. 럭셔리/저널리즘 무드.',
      mark: <SerifLigature />,
    },
  ];

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, padding: '56px 56px 80px' }}>
      <div style={{ fontSize: 13, color: T.ink2, letterSpacing: 2, marginBottom: 16 }}>BRAND / LOGO EXPLORATION</div>
      <h1 style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>peerbridge</h1>
      <div style={{ fontSize: 16, color: T.ink2, marginTop: 12, maxWidth: 640, lineHeight: 1.6 }}>
        PB 모노그램 6안. 같은 톤·동일한 워드마크 페어링 안에서 마크의 형태만 바꿔 비교할 수 있어요.
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap, marginTop: 48 }}>
        {items.map(it => (
          <div key={it.n} style={{ background: T.card, borderRadius: T.rLg, padding: 32, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
              <span style={{ fontFamily: T.fDisp, fontSize: 11, fontWeight: 600, color: T.ink2, letterSpacing: 1.5 }}>{it.n}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</span>
            </div>

            {/* Big mark on bg */}
            <div style={{ height: 220, background: T.bgSoft, borderRadius: T.rMd, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 120, height: 120 }}>{it.mark}</div>
            </div>

            {/* Lockup row — mark + wordmark */}
            <div style={{ marginTop: 14, padding: '14px 18px', background: T.ink, borderRadius: T.rMd, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, color: T.card }}>{React.cloneElement(it.mark, { mono: 'light' })}</div>
              <span style={{ color: T.card, fontFamily: T.fDisp, fontSize: 16, fontWeight: 600, letterSpacing: -0.4 }}>peerbridge</span>
            </div>

            {/* Tiny scale + favicon */}
            <div style={{ marginTop: 10, padding: '12px 18px', background: T.bgSoft, borderRadius: T.rMd, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 16, height: 16 }}>{it.mark}</div>
              <div style={{ width: 12, height: 12 }}>{it.mark}</div>
              <span style={{ fontSize: 11, color: T.ink3, marginLeft: 'auto' }}>16 / 12px</span>
            </div>

            <div style={{ fontSize: 12, color: T.ink2, marginTop: 16, lineHeight: 1.6 }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────── Mark components ───────────────────
// All draw to a 100×100 viewBox and use currentColor so they recolor in lockups.

function BridgeMark({ mono }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', color: mono === 'light' ? '#fff' : '#16140f' }}>
      {/* Left P-bowl: opens right */}
      <path d="M 28 18 A 22 22 0 0 1 28 62 L 28 18 Z M 24 18 L 24 86 L 30 86 L 30 18 Z" fill="currentColor" />
      {/* Right b-bowl: opens left, mirrored */}
      <path d="M 72 38 A 22 22 0 0 1 72 82 L 72 38 Z M 70 14 L 76 14 L 76 86 L 70 86 Z" fill="currentColor" />
    </svg>
  );
}

function LinkedCounter({ mono }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', color: mono === 'light' ? '#fff' : '#16140f' }}>
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
        {/* P stem */}
        <line x1="18" y1="14" x2="18" y2="86" />
        {/* P bowl */}
        <path d="M 18 18 L 36 18 A 14 14 0 0 1 36 46 L 18 46" />
        {/* connector across middle */}
        <line x1="36" y1="46" x2="64" y2="54" />
        {/* b bowl */}
        <path d="M 82 54 L 64 54 A 14 14 0 0 0 64 82 L 82 82" transform="rotate(180 73 68)" />
        {/* b stem */}
        <line x1="82" y1="14" x2="82" y2="86" />
      </g>
    </svg>
  );
}

function StencilCut({ mono }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', color: mono === 'light' ? '#fff' : '#16140f' }}>
      <defs>
        <mask id="stencil-mask">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          {/* P cutout */}
          <rect x="14" y="20" width="6" height="60" fill="black" />
          <path d="M 20 20 L 34 20 A 11 11 0 0 1 34 42 L 20 42 Z" fill="black" />
          {/* b cutout */}
          <rect x="80" y="20" width="6" height="60" fill="black" />
          <path d="M 80 38 L 66 38 A 11 11 0 0 0 66 60 L 80 60 Z" fill="black" />
        </mask>
      </defs>
      <rect x="4" y="8" width="92" height="84" rx="20" fill="currentColor" mask="url(#stencil-mask)" />
    </svg>
  );
}

function PillarPair({ mono }) {
  const c = mono === 'light' ? '#fff' : '#16140f';
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      {/* Two rounded pillars */}
      <rect x="14" y="32" width="20" height="60" rx="10" fill={c} />
      <rect x="66" y="32" width="20" height="60" rx="10" fill={c} />
      {/* Bridge deck */}
      <rect x="8" y="20" width="84" height="10" rx="5" fill={c} />
      {/* Tiny dot indicating linked */}
      <circle cx="50" cy="60" r="4" fill={c} />
    </svg>
  );
}

function HalfCircle({ mono }) {
  const c = mono === 'light' ? '#fff' : '#16140f';
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      {/* Left half-circle (P bowl) */}
      <path d="M 48 8 A 40 40 0 0 0 48 88 L 48 8 Z" fill={c} />
      {/* Right half-circle (b bowl) */}
      <path d="M 52 8 A 40 40 0 0 1 52 88 L 52 8 Z" fill={c} />
      {/* gap is naturally between x=48 and x=52 */}
    </svg>
  );
}

function SerifLigature({ mono }) {
  const c = mono === 'light' ? '#fff' : '#16140f';
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      <text x="50" y="74" textAnchor="middle"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 80, fontWeight: 500, fontStyle: 'italic', fill: c, letterSpacing: -6 }}>
        Pb
      </text>
      {/* tiny serif bridge dot */}
      <circle cx="50" cy="84" r="2" fill={c} />
    </svg>
  );
}

Object.assign(window, { LogoExplorations, BridgeMark, LinkedCounter, StencilCut, PillarPair, HalfCircle, SerifLigature });

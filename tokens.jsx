// Design tokens — V4 Modern Minimal 톤앤매너
// 베이지/크림 배경, 매우 둥근 카드, 평면적, 넉넉한 여백, 차분한 자산 관리 톤.

const T = {
  // colors
  bg: '#f5f1ea',          // 베이지/크림 페이지 배경
  bgSoft: '#efebe2',      // 살짝 더 짙은 섹션 구분용
  card: '#ffffff',        // 카드 흰색
  cardSoft: '#faf7f0',    // 매우 옅은 베이지 카드 (variant)
  ink: '#16140f',         // 다크 그레이 / 거의 블랙
  ink2: '#5e5a51',        // 중간 회색 (보조 텍스트)
  ink3: '#9b958a',        // 옅은 회색 (메타)
  line: 'rgba(22,20,15,0.08)',
  lineStrong: 'rgba(22,20,15,0.16)',
  green: '#1f5132',       // 다크 그린 (수익률 강조)
  greenSoft: '#e8efe7',   // 다크 그린 백그라운드용
  black: '#16140f',       // CTA 블랙

  // type
  fSans: `'Pretendard', -apple-system, "Inter", "Noto Sans KR", sans-serif`,
  fDisp: `'Inter', 'Pretendard', sans-serif`,  // 대형 숫자/영문

  // radius
  rSm: 12,
  rMd: 16,
  rLg: 24,        // rounded-3xl
  rXl: 32,
  rPill: 999,

  // spacing
  pageX: 56,      // 1440 페이지 좌우 패딩
  gap: 16,
  gapLg: 24,
  gapXl: 40,
};

// Common Button
function Btn({ children, variant = 'primary', size = 'md', style, ...rest }) {
  const sizes = {
    sm: { padding: '10px 18px', fontSize: 13 },
    md: { padding: '14px 24px', fontSize: 14 },
    lg: { padding: '18px 30px', fontSize: 15 },
  };
  const variants = {
    primary: { background: T.ink, color: T.card, border: 'none' },
    secondary: { background: T.card, color: T.ink, border: `1px solid ${T.line}` },
    ghost: { background: 'transparent', color: T.ink, border: `1px solid ${T.lineStrong}` },
  };
  return (
    <button style={{
      ...sizes[size], ...variants[variant],
      borderRadius: T.rPill, fontWeight: 500, cursor: 'pointer',
      fontFamily: T.fSans, letterSpacing: -0.2,
      ...style,
    }} {...rest}>{children}</button>
  );
}

// Tag chip — small label
function Tag({ children, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: T.bgSoft, fg: T.ink2 },
    green:   { bg: T.greenSoft, fg: T.green },
    dark:    { bg: T.ink, fg: T.card },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', background: t.bg, color: t.fg,
      borderRadius: T.rPill, fontSize: 11, fontWeight: 500, letterSpacing: -0.1,
    }}>{children}</span>
  );
}

// Section header — "section label" + 큰 타이틀 + 옵션 right slot
function SectionHeader({ kicker, title, sub, right, align = 'left' }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      marginBottom: 32, gap: 32,
      flexDirection: align === 'center' ? 'column' : 'row',
      textAlign: align === 'center' ? 'center' : 'left',
    }}>
      <div>
        {kicker && <div style={{ fontSize: 12, color: T.ink2, marginBottom: 12, fontWeight: 500 }}>{kicker}</div>}
        <div style={{
          fontFamily: T.fDisp, fontSize: 44, fontWeight: 600,
          letterSpacing: -1.5, lineHeight: 1.1, color: T.ink,
        }}>{title}</div>
        {sub && <div style={{ fontSize: 15, color: T.ink2, marginTop: 12, lineHeight: 1.6, maxWidth: 600 }}>{sub}</div>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

Object.assign(window, { T, Btn, Tag, SectionHeader });

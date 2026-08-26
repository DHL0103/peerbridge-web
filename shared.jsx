// Shared product data + tiny utilities for all variations.

const PRODUCTS = [
  { tag: '부동산 담보', title: '강남 역삼동 오피스텔 선순위', rate: 9.4, term: 12, total: 1_280_000_000, raised: 0.78, grade: 'A', risk: 'LTV 58%' },
  { tag: '부동산 담보', title: '판교 아파트 후순위 브릿지', rate: 11.2, term: 8, total: 540_000_000, raised: 0.42, grade: 'B+', risk: 'LTV 71%' },
  { tag: '동산 담보', title: '의료기기 매출채권 24-11호', rate: 8.6, term: 6, total: 320_000_000, raised: 0.91, grade: 'A−', risk: '매출 4.2배' },
  { tag: '개인신용', title: '프라임 신용 분산 포트폴리오', rate: 7.8, term: 18, total: 800_000_000, raised: 0.34, grade: 'A', risk: '평균 신용 1등급' },
  { tag: '부동산 담보', title: '용산 상가 리파이낸싱', rate: 10.1, term: 10, total: 950_000_000, raised: 0.66, grade: 'B+', risk: 'LTV 64%' },
  { tag: '동산 담보', title: '제조업 원자재 담보 시리즈', rate: 9.0, term: 9, total: 410_000_000, raised: 0.55, grade: 'A−', risk: '담보 2.1배' },
];

const STATS = {
  cumulativeInvestment: '8,742억',
  activeInvestors: '127,840',
  avgReturn: '9.3',
  defaultRate: '0.41',
  productsLive: 14,
  yearsRunning: 7,
};

const NAV = ['투자하기', '진행중인 상품', '나의 투자', '리포트', '회사소개'];

function fmtKRW(n) {
  if (n >= 100_000_000) {
    const eok = n / 100_000_000;
    return `${eok.toLocaleString('ko-KR', { maximumFractionDigits: 1 })}억`;
  }
  if (n >= 10_000) return `${(n / 10_000).toLocaleString('ko-KR')}만`;
  return n.toLocaleString('ko-KR');
}

function pct(x) { return `${Math.round(x * 100)}%`; }

// Striped placeholder used in lieu of real imagery.
function Placeholder({ label, ratio = '4 / 3', tone = 'light', radius = 0, style }) {
  const stripe = tone === 'dark'
    ? 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 8px, rgba(255,255,255,0.10) 8px 16px)'
    : 'repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 8px, rgba(0,0,0,0.08) 8px 16px)';
  const bg = tone === 'dark' ? '#1a1d22' : '#e8e6e0';
  const fg = tone === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';
  return (
    <div style={{
      aspectRatio: ratio,
      width: '100%',
      background: `${stripe}, ${bg}`,
      borderRadius: radius,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: fg, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase',
      ...style,
    }}>{label}</div>
  );
}

Object.assign(window, { PRODUCTS, STATS, NAV, fmtKRW, pct, Placeholder });

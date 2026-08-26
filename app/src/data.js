export const PRODUCTS = [
  { tag: '부동산 담보', title: '강남 역삼동 오피스텔 선순위', rate: 9.4, term: 12, total: 1_280_000_000, raised: 0.78, grade: 'A', risk: 'LTV 58%' },
  { tag: '부동산 담보', title: '판교 아파트 후순위 브릿지', rate: 11.2, term: 8, total: 540_000_000, raised: 0.42, grade: 'B+', risk: 'LTV 71%' },
  { tag: '동산 담보', title: '의료기기 매출채권 24-11호', rate: 8.6, term: 6, total: 320_000_000, raised: 0.91, grade: 'A−', risk: '매출 4.2배' },
  { tag: '개인신용', title: '프라임 신용 분산 포트폴리오', rate: 7.8, term: 18, total: 800_000_000, raised: 0.34, grade: 'A', risk: '평균 신용 1등급' },
  { tag: '부동산 담보', title: '용산 상가 리파이낸싱', rate: 10.1, term: 10, total: 950_000_000, raised: 0.66, grade: 'B+', risk: 'LTV 64%' },
  { tag: '동산 담보', title: '제조업 원자재 담보 시리즈', rate: 9.0, term: 9, total: 410_000_000, raised: 0.55, grade: 'A−', risk: '담보 2.1배' },
];

export const STATS = {
  cumulativeInvestment: '8,742억',
  activeInvestors: '127,840',
  avgReturn: '9.3',
  defaultRate: '0.41',
  productsLive: 14,
  yearsRunning: 7,
};

export const NAV = ['투자하기', '진행중인 상품', '나의 투자', '리포트', '회사소개'];

export function fmtKRW(n) {
  if (n >= 100_000_000) {
    const eok = n / 100_000_000;
    return `${eok.toLocaleString('ko-KR', { maximumFractionDigits: 1 })}억`;
  }
  if (n >= 10_000) return `${(n / 10_000).toLocaleString('ko-KR')}만`;
  return n.toLocaleString('ko-KR');
}

export function pct(x) { return `${Math.round(x * 1000) / 10}%`; }

export function fmtKRW(n) {
  if (n >= 100_000_000) {
    const eok = n / 100_000_000;
    return `${eok.toLocaleString('ko-KR', { maximumFractionDigits: 1 })}억`;
  }
  if (n >= 10_000) return `${(n / 10_000).toLocaleString('ko-KR')}만`;
  return n.toLocaleString('ko-KR');
}

export function pct(x) { return `${Math.round(x * 1000) / 10}%`; }

// Trust Stats — 누적 지표 3개를 한 묶음 카드로

function TrustStats() {
  const items = [
    { k: '누적 투자액', v: STATS.cumulativeInvestment, unit: '원', sub: '2019년 서비스 시작 이후' },
    { k: '평균 수익률', v: STATS.avgReturn, unit: '%', sub: '세전 · 가중 평균', accent: true },
    { k: '누적 부실률', v: STATS.defaultRate, unit: '%', sub: '업계 평균 대비 1/8 수준' },
  ];

  return (
    <div style={{ padding: '32px 56px' }}>
      <div style={{ background: T.card, borderRadius: T.rXl, padding: '40px 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {items.map((s, i) => (
          <div key={s.k} style={{
            padding: '0 32px', borderRight: i < 2 ? `1px solid ${T.line}` : 'none',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ fontSize: 13, color: T.ink2 }}>{s.k}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2.5,
                color: s.accent ? T.green : T.ink, lineHeight: 1,
              }}>{s.v}</span>
              <span style={{ fontSize: 22, color: s.accent ? T.green : T.ink2, fontWeight: 500 }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 12, color: T.ink3 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.TrustStats = TrustStats;

// Page: 투자상품 목록

function PageProducts() {
  const all = [...PRODUCTS, ...PRODUCTS.slice(0, 3).map(p => ({ ...p, title: p.title + ' II' }))];
  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav active="투자상품" />

      <div style={{ padding: '40px 56px 24px' }}>
        <div style={{ fontSize: 12, color: T.ink2, marginBottom: 12 }}>투자하기 / 진행중인 상품</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
            모집중인 상품 <span style={{ color: T.ink3 }}>{all.length}</span>
          </h1>
          <div style={{ fontSize: 13, color: T.ink2 }}>이번 주 마감 4건 · 평균 수익률 9.3%</div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ padding: '0 56px 24px', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['전체', '부동산 담보', '동산 담보', '개인신용', 'A등급 이상', '단기 (6M↓)'].map((c, i) => (
            <span key={c} style={{ padding: '8px 14px', fontSize: 13, fontWeight: 500, borderRadius: T.rPill, background: i === 0 ? T.ink : T.card, color: i === 0 ? T.card : T.ink2, cursor: 'pointer' }}>{c}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ background: T.card, borderRadius: T.rPill, padding: '8px 14px', fontSize: 13, color: T.ink3, display: 'flex', alignItems: 'center', gap: 8, minWidth: 220 }}>
            <span>🔍</span><span>상품명·차주사 검색</span>
          </div>
          <div style={{ background: T.card, borderRadius: T.rPill, padding: '8px 14px', fontSize: 13, color: T.ink, fontWeight: 500 }}>수익률 높은 순 ▾</div>
        </div>
      </div>

      <div style={{ padding: '0 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap }}>
        {all.map((p, i) => {
          const dDay = Math.max(1, Math.round((1 - p.raised) * 10));
          return (
            <div key={i} style={{ background: T.card, borderRadius: T.rLg, padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tag>{p.tag}</Tag>
                <span style={{ fontSize: 11, color: T.ink2 }}>D-{dDay} · {p.grade}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: T.ink, letterSpacing: -0.3, minHeight: 44 }}>{p.title}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, color: T.green, letterSpacing: -1.8, lineHeight: 1 }}>{p.rate}</span>
                <span style={{ fontSize: 18, color: T.green, fontWeight: 600 }}>%</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: T.ink2 }}>{p.term}개월</span>
              </div>
              <div>
                <div style={{ height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct(p.raised), background: T.ink }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink2, marginTop: 8 }}>
                  <span>{pct(p.raised)} · {fmtKRW(p.total)}원</span>
                  <span>{p.risk}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
        {['‹', '1', '2', '3', '›'].map((n, i) => (
          <span key={i} style={{ width: 36, height: 36, borderRadius: T.rPill, background: n === '1' ? T.ink : T.card, color: n === '1' ? T.card : T.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500 }}>{n}</span>
        ))}
      </div>

      <AppFooter />
    </div>
  );
}

window.PageProducts = PageProducts;

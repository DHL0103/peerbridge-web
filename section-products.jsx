// Products — 모집중인 상품 그리드 + 필터 칩

function ProductsList() {
  const filters = ['전체 14', '부동산 8', '동산 4', '신용 2'];

  return (
    <div style={{ padding: '64px 56px 32px' }}>
      <SectionHeader
        title="모집중인 상품"
        sub="심사역이 한 건 한 건 직접 검토한 상품만 만나보세요."
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            {filters.map((t, i) => (
              <span key={t} style={{
                padding: '8px 14px', fontSize: 13, fontWeight: 500,
                borderRadius: T.rPill,
                background: i === 0 ? T.ink : T.card,
                color: i === 0 ? T.card : T.ink2,
                cursor: 'pointer',
              }}>{t}</span>
            ))}
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap }}>
        {PRODUCTS.slice(0, 6).map(p => <ProductCard key={p.title} p={p} />)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <Btn variant="secondary">전체 14개 상품 보기 →</Btn>
      </div>
    </div>
  );
}

function ProductCard({ p }) {
  const dDay = Math.max(1, Math.round((1 - p.raised) * 10));
  return (
    <div style={{
      background: T.card, borderRadius: T.rLg, padding: 28,
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag>{p.tag}</Tag>
        <span style={{ fontSize: 11, color: T.ink2 }}>D-{dDay}</span>
      </div>

      <div style={{
        fontSize: 16, fontWeight: 600, lineHeight: 1.4,
        color: T.ink, letterSpacing: -0.3, minHeight: 44,
      }}>{p.title}</div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontFamily: T.fDisp, fontSize: 44, fontWeight: 600,
          color: T.green, letterSpacing: -1.8, lineHeight: 1,
        }}>{p.rate}</span>
        <span style={{ fontSize: 18, color: T.green, fontWeight: 600 }}>%</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: T.ink2 }}>{p.term}개월 · {p.grade}</span>
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
}

window.ProductsList = ProductsList;

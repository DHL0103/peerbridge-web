// Hero — 큼직한 타이포 + 추천 상품 카드 + 미니 지표 row

function Hero() {
  const featured = PRODUCTS[3]; // 프라임 신용 분산

  return (
    <div style={{ padding: '40px 56px 32px' }}>
      {/* status pill */}
      <div style={{ marginBottom: 28 }}>
        <Tag tone="green">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: T.green }}></span>
          11월 신규 14개 상품 모집중
        </Tag>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'end' }}>
        {/* Headline */}
        <div>
          <h1 style={{
            fontFamily: T.fDisp, fontSize: 96, fontWeight: 600,
            letterSpacing: -4, lineHeight: 0.98, margin: 0, color: T.ink,
          }}>
            작게, 자주,<br />
            <span style={{ color: T.ink3 }}>오래.</span>
          </h1>
          <p style={{
            fontSize: 18, color: T.ink2, marginTop: 28, lineHeight: 1.6,
            maxWidth: 520,
          }}>
            1만 원부터 시작하는 분산 투자.<br />
            복잡한 금융 상품을 아주 단순한 형태로 다시 설계했습니다.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <Btn size="lg">3분만에 시작하기 →</Btn>
            <Btn size="lg" variant="secondary">상품 둘러보기</Btn>
          </div>
        </div>

        {/* Featured card */}
        <FeaturedCard p={featured} />
      </div>
    </div>
  );
}

function FeaturedCard({ p }) {
  return (
    <div style={{
      background: T.card, borderRadius: T.rLg, padding: 28,
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag>이번 주 추천</Tag>
        <span style={{ fontSize: 12, color: T.ink2 }}>등급 <b style={{ color: T.ink, fontWeight: 600 }}>{p.grade}</b> · D-3</span>
      </div>

      <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.35, color: T.ink, letterSpacing: -0.3 }}>{p.title}</div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: T.fDisp, fontSize: 76, fontWeight: 600, color: T.green, letterSpacing: -3, lineHeight: 1 }}>{p.rate}</span>
        <span style={{ fontSize: 24, color: T.green, fontWeight: 600 }}>%</span>
        <span style={{ fontSize: 13, color: T.ink2, marginLeft: 8 }}>· {p.term}개월 · 세전</span>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.ink2, marginBottom: 8 }}>
          <span>모집률 {pct(p.raised)}</span>
          <span>잔여 {fmtKRW(Math.round(p.total * (1 - p.raised)))}원</span>
        </div>
        <div style={{ height: 6, borderRadius: T.rPill, background: T.bg, overflow: 'hidden' }}>
          <div style={{ width: pct(p.raised), height: '100%', background: T.ink }}></div>
        </div>
      </div>

      <Btn style={{ width: '100%' }}>지금 투자하기</Btn>
    </div>
  );
}

window.Hero = Hero;

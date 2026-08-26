// How it works — 3단계 프로세스

function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: '심사역이 직접 검토',
      body: '평균 18년 경력의 심사역이 차주사 현장 실사부터 담보 평가까지 한 건 한 건 직접 검토합니다. AI 자동심사를 사용하지 않습니다.',
    },
    {
      n: '02',
      title: '한 곳에 분산 투자',
      body: '1만 원부터 여러 상품에 나눠 투자하세요. 부동산·동산·신용 등 자산 클래스별로 자동 분산해주는 포트폴리오 모드도 제공합니다.',
    },
    {
      n: '03',
      title: '매주 현장 리포트',
      body: '투자한 상품의 차주사 현장 사진과 진척 상황을 매주 메일로 받아보세요. 위험 신호는 일어나기 전에 먼저 알려드립니다.',
    },
  ];

  return (
    <div style={{ padding: '80px 56px' }}>
      <SectionHeader
        kicker="HOW IT WORKS"
        title={<>복잡함을 덜어내고,<br />필요한 것만 남겼습니다.</>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap }}>
        {steps.map(s => (
          <div key={s.n} style={{
            background: T.card, borderRadius: T.rLg, padding: 32,
            minHeight: 280, display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{
              fontFamily: T.fDisp, fontSize: 13, color: T.ink3,
              letterSpacing: 1, fontWeight: 500,
            }}>{s.n}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: T.ink, letterSpacing: -0.6, lineHeight: 1.25 }}>{s.title}</div>
            <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

window.HowItWorks = HowItWorks;

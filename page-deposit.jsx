// Page: 예치금 관리

function PageDeposit() {
  const txs = [
    ['11.18', '강남 역삼동 오피스텔 - 이자 입금', '이자', 7_830, 'in'],
    ['11.15', '예치금 충전', '충전', 1_000_000, 'in'],
    ['11.12', '용산 상가 리파이낸싱', '투자', 500_000, 'out'],
    ['11.05', '의료기기 매출채권 24-11호 - 만기상환', '원리금', 1_038_200, 'in'],
    ['11.01', '판교 아파트 후순위 - 이자', '이자', 5_140, 'in'],
    ['10.28', '예치금 출금', '출금', 200_000, 'out'],
    ['10.25', '강남 역삼동 오피스텔 - 이자', '이자', 7_830, 'in'],
  ];

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav active="나의 투자" />
      <div style={{ display: 'flex' }}>
        <Sidebar active="예치금" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>나의 투자 / 예치금</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>예치금 관리</h1>

          {/* Hero balance */}
          <div style={{ background: T.ink, color: T.card, borderRadius: T.rXl, padding: '40px 48px', marginTop: 24, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>현재 예치금 잔액</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
                <span style={{ fontFamily: T.fDisp, fontSize: 80, fontWeight: 600, letterSpacing: -3.5, lineHeight: 1 }}>4,280,000</span>
                <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)' }}>원</span>
              </div>
              <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                <span>투자 가능 4,280,000원</span>
                <span>·</span>
                <span>출금 가능 4,280,000원</span>
                <span>·</span>
                <span>연결 계좌 KB국민 ****-1234</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
              <Btn size="lg" variant="secondary" style={{ background: T.card, color: T.ink, border: 'none' }}>충전 +</Btn>
              <Btn size="lg" style={{ background: 'transparent', color: T.card, border: `1px solid rgba(255,255,255,0.25)` }}>출금 −</Btn>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap, marginTop: T.gap }}>
            <MiniStat k="이번 달 입금" v="2,096,200원" />
            <MiniStat k="이번 달 출금" v="700,000원" />
            <MiniStat k="이번 달 순증" v="+1,396,200원" accent />
          </div>

          {/* Tx list */}
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 32, marginTop: T.gap }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>거래 내역</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['전체', '충전/출금', '투자', '이자/상환'].map((t, i) => (
                  <span key={t} style={{ padding: '6px 12px', borderRadius: T.rPill, fontSize: 12, fontWeight: 500, background: i === 0 ? T.ink : 'transparent', color: i === 0 ? T.card : T.ink2, border: i === 0 ? 'none' : `1px solid ${T.line}` }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 110px 160px', fontSize: 12, color: T.ink2, padding: '12px 0', borderBottom: `1px solid ${T.line}` }}>
              <span>일자</span><span>내역</span><span>유형</span><span style={{ textAlign: 'right' }}>금액</span>
            </div>
            {txs.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 110px 160px', fontSize: 13, padding: '16px 0', borderBottom: i < txs.length - 1 ? `1px solid ${T.line}` : 'none', alignItems: 'center' }}>
                <span style={{ fontFamily: T.fDisp, color: T.ink2 }}>{t[0]}</span>
                <span style={{ color: T.ink }}>{t[1]}</span>
                <span><Tag tone={t[2] === '이자' || t[2] === '원리금' ? 'green' : 'neutral'}>{t[2]}</Tag></span>
                <span style={{ fontFamily: T.fDisp, fontWeight: 600, color: t[4] === 'in' ? T.green : T.ink, textAlign: 'right' }}>{t[4] === 'in' ? '+' : '−'}{t[3].toLocaleString()}원</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ k, v, accent }) {
  return (
    <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
      <div style={{ fontSize: 12, color: T.ink2 }}>{k}</div>
      <div style={{ fontFamily: T.fDisp, fontSize: 28, fontWeight: 600, letterSpacing: -1, color: accent ? T.green : T.ink, marginTop: 6 }}>{v}</div>
    </div>
  );
}

window.PageDeposit = PageDeposit;

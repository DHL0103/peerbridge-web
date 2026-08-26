// Calculator — 수익률 계산기 미리보기

function Calculator() {
  // visual-only mock numbers
  const principal = 1_000_000;
  const months = 12;
  const rate = 9.3;
  const interest = Math.round(principal * (rate / 100) * (months / 12));
  const tax = Math.round(interest * 0.154);
  const net = principal + interest - tax;

  return (
    <div style={{ padding: '80px 56px' }}>
      <div style={{
        background: T.ink, color: T.card, borderRadius: T.rXl, padding: '56px 48px',
        display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>SIMULATOR</div>
          <div style={{
            fontFamily: T.fDisp, fontSize: 48, fontWeight: 600,
            letterSpacing: -1.5, lineHeight: 1.1,
          }}>
            얼마를 넣으면<br />얼마가 돌아오는지<br />
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>먼저 보세요.</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 24, lineHeight: 1.65, maxWidth: 380 }}>
            기간·금액·등급에 따른 예상 수익을 시뮬레이션해보고,
            세금까지 반영한 실수령 기준으로 비교할 수 있습니다.
          </p>
          <Btn variant="secondary" style={{ marginTop: 28, background: T.card, color: T.ink, border: 'none' }}>
            계산기 열기 →
          </Btn>
        </div>

        {/* mock calculator card */}
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: T.rLg, padding: 32, border: `1px solid rgba(255,255,255,0.10)` }}>
          <Row k="투자 원금" v={`${(principal / 10_000).toLocaleString()}만 원`} />
          <Row k="투자 기간" v={`${months}개월`} />
          <Row k="목표 수익률" v={`${rate}% (세전)`} />

          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '20px 0' }}></div>

          <Row k="예상 이자 수익" v={`+${interest.toLocaleString()}원`} />
          <Row k="원천징수 세금 (15.4%)" v={`−${tax.toLocaleString()}원`} muted />

          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '20px 0' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>실수령 예상액</span>
            <span style={{ fontFamily: T.fDisp, fontSize: 42, fontWeight: 600, color: '#7dd398', letterSpacing: -1.5 }}>
              {(net / 10_000).toLocaleString()}<span style={{ fontSize: 18, marginLeft: 4 }}>만 원</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, muted }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '10px 0', fontSize: 14,
      color: muted ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)',
    }}>
      <span>{k}</span>
      <span style={{ fontFamily: T.fDisp, fontWeight: 500 }}>{v}</span>
    </div>
  );
}

window.Calculator = Calculator;

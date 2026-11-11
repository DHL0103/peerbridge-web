import { useNavigate } from 'react-router-dom';
import { T, Btn } from '../tokens';
import { AppNav, AppFooter } from '../components/AppChrome';

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink }}>
      <AppNav />

      <div style={{ padding: '80px 56px 96px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, alignItems: 'end', borderBottom: `1px solid ${T.line}` }}>
        <div>
          <div style={{ fontSize: 12, color: T.ink2, letterSpacing: 2, marginBottom: 24 }}>ABOUT — VOL.04</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 120, fontWeight: 600, letterSpacing: -5, lineHeight: 0.9, margin: 0 }}>
            금융을<br /><span style={{ fontStyle: 'italic', color: T.ink2 }}>투명</span>하게,<br />작게.
          </h1>
        </div>
        <div style={{ paddingBottom: 16 }}>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: T.ink2, maxWidth: 380 }}>
            peerbridge는 P2P 대출의 모집·투자·상환·분배 전 과정을 구현한 개인 포트폴리오 프로젝트입니다. 실제 등록된 금융업자가 아니며, 모든 거래는 시뮬레이션입니다.
          </div>
        </div>
      </div>

      <div style={{ padding: '80px 56px' }}>
        <div style={{ fontSize: 13, color: T.ink2, letterSpacing: 2, marginBottom: 24 }}>OUR PRINCIPLES</div>
        <div style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, marginBottom: 56, maxWidth: 920 }}>
          모든 설계는 <span style={{ fontStyle: 'italic' }}>네 가지 원칙</span> 위에서 이루어집니다.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, alignItems: 'start' }}>
          {[['01', '투명한 원장', '모든 자금 이동은 거래내역(원장)에 기록되어 추적할 수 있습니다.'], ['02', '정합성 우선', '잔액 변경은 항상 원장 기록과 같은 트랜잭션으로 처리됩니다.'], ['03', '관리자 심사', '금리는 차주 자기신고가 아니라 관리자가 심사 시점에 책정합니다.'], ['04', '소액 분산', '여러 상품에 나눠 투자할 수 있습니다.']].map(([n, t, d]) => (
            <div key={n} style={{ borderTop: `1px solid ${T.lineStrong}`, paddingTop: 20 }}>
              <div style={{ fontFamily: T.fDisp, fontSize: 14, fontWeight: 600, letterSpacing: 1, color: T.ink2, marginBottom: 24 }}>{n}</div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, marginBottom: 12 }}>{t}</div>
              <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '120px 56px', textAlign: 'center' }}>
        <div style={{ fontFamily: T.fDisp, fontSize: 80, fontWeight: 600, letterSpacing: -3, lineHeight: 1, marginBottom: 32 }}>
          오늘부터 시작해도 늦지 않습니다.
        </div>
        <div style={{ fontSize: 17, color: T.ink2, marginBottom: 40 }}>소액으로도 충분합니다.</div>
        <div style={{ display: 'inline-flex', gap: 12 }}>
          <Btn size="lg" onClick={() => navigate('/signup')}>투자 시작하기 →</Btn>
          <Btn size="lg" variant="secondary" onClick={() => navigate('/loan/apply')}>대출 신청하기</Btn>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

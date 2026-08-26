import { useNavigate } from 'react-router-dom';
import { T, DashStat } from '../tokens';
import { AppNav, AppFooter, Sidebar } from '../components/AppChrome';
import { getCachedUser } from '../api';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCachedUser();
  const displayName = user?.first_name || user?.username || '';
  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="대시보드" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>{displayName}님, 안녕하세요</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, letterSpacing: -1.5, margin: 0 }}>
            이번 달 수익 <span style={{ color: T.green }}>+183,420원</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, marginTop: 32 }}>
            <DashStat k="총 투자금" v="12,000,000" unit="원" sub="14건 진행중" />
            <DashStat k="누적 수익" v="1,847,283" unit="원" sub="세후 · 평균 9.1%" accent />
            <DashStat k="예상 월 수익" v="167,400" unit="원" sub="다음 입금 11월 25일" />
            <DashStat k="예치금" v="4,280,000" unit="원" sub="투자 가능" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: T.gap, marginTop: T.gap }}>
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>수익률 추이</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['1M', '3M', '6M', '1Y', 'ALL'].map((t, i) => (
                    <span key={t} style={{ padding: '6px 12px', borderRadius: T.rPill, fontSize: 12, fontWeight: 500, background: i === 3 ? T.ink : 'transparent', color: i === 3 ? T.card : T.ink2 }}>{t}</span>
                  ))}
                </div>
              </div>
              <Chart />
            </div>
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 32 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 20 }}>다가오는 상환</div>
              {[['11.25', '강남 역삼동 오피스텔', '+78,300원'], ['11.25', '의료기기 매출채권 24-11호', '+34,200원'], ['11.30', '판교 아파트 후순위', '+54,900원'], ['12.05', '용산 상가 리파이낸싱', '+89,500원']].map(([d, t, v], i, a) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < a.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                  <div style={{ width: 44, textAlign: 'center', fontFamily: T.fDisp, fontSize: 13, fontWeight: 600 }}>{d}</div>
                  <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>{t}</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 14, fontWeight: 600, color: T.green }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: T.card, borderRadius: T.rLg, padding: 32, marginTop: T.gap }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>최근 거래</div>
              <span onClick={() => navigate('/my-investments')} style={{ fontSize: 13, color: T.ink2, cursor: 'pointer' }}>전체 보기 →</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 140px', fontSize: 12, color: T.ink2, padding: '12px 0', borderBottom: `1px solid ${T.line}` }}>
              <span>일자</span><span>내역</span><span>유형</span><span style={{ textAlign: 'right' }}>금액</span>
            </div>
            {[
              ['11.18', '강남 역삼동 오피스텔 - 11월 이자', '이자 입금', '+7,830원', T.green],
              ['11.15', '예치금 충전', '입금', '+1,000,000원', T.ink],
              ['11.12', '용산 상가 리파이낸싱', '투자', '−500,000원', T.ink],
              ['11.05', '의료기기 매출채권 24-11호 - 만기상환', '원리금 입금', '+1,038,200원', T.green],
              ['11.01', '판교 아파트 후순위 - 11월 이자', '이자 입금', '+5,140원', T.green],
            ].map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 140px', fontSize: 13, padding: '14px 0', borderBottom: i < 4 ? `1px solid ${T.line}` : 'none' }}>
                <span style={{ fontFamily: T.fDisp, color: T.ink2 }}>{r[0]}</span>
                <span>{r[1]}</span>
                <span style={{ color: T.ink2 }}>{r[2]}</span>
                <span style={{ fontFamily: T.fDisp, fontWeight: 600, color: r[4], textAlign: 'right' }}>{r[3]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chart() {
  const W = 700, H = 220;
  const pts = [12, 18, 22, 19, 28, 32, 30, 38, 42, 47, 52, 58];
  const max = 64;
  const stepX = W / (pts.length - 1);
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${H - (v / max) * H}`).join(' ');
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} style={{ width: '100%' }}>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={T.green} stopOpacity="0.16" />
          <stop offset="1" stopColor={T.green} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map(p => <line key={p} x1="0" x2={W} y1={p * H} y2={p * H} stroke={T.line} strokeWidth="1" />)}
      <path d={area} fill="url(#g1)" />
      <path d={path} fill="none" stroke={T.green} strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((v, i) => i === pts.length - 1 ? <circle key={i} cx={i * stepX} cy={H - (v / max) * H} r="5" fill={T.green} /> : null)}
      {['1월', '3월', '5월', '7월', '9월', '11월'].map((l, i) => (
        <text key={l} x={(i / 5) * W} y={H + 22} fill={T.ink3} fontSize="11" textAnchor={i === 5 ? 'end' : i === 0 ? 'start' : 'middle'}>{l}</text>
      ))}
    </svg>
  );
}

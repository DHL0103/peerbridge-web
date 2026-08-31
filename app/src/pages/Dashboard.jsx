import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, DashStat } from '../tokens';
import { AppNav, AppFooter, Sidebar } from '../components/AppChrome';
import { getCachedUser, apiGet } from '../api';

const IN_PROGRESS = ['FUNDRAISING', 'ACTIVE', 'OVERDUE_1', 'OVERDUE_2', 'DEFAULT'];

const LEDGER_TYPE_LABEL = {
  CHARGE: '예치금 충전', WITHDRAW: '예치금 출금', INVEST: '투자', DISTRIBUTION: '이자 입금',
  REPAY: '상환 납부', PLATFORM_FEE: '플랫폼 수수료', INVEST_REFUND: '투자 환불',
};
const LEDGER_SIGN = {
  CHARGE: '+', WITHDRAW: '−', INVEST: '−', DISTRIBUTION: '+', REPAY: '−', PLATFORM_FEE: '+', INVEST_REFUND: '+',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCachedUser();
  const displayName = user?.first_name || user?.username || '';
  const [balance, setBalance] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [ledger, setLedger] = useState(null);
  const [monthly, setMonthly] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    Promise.all([
      apiGet('/api/auth/me/'),
      apiGet('/api/investments/mine/'),
      apiGet('/api/ledger/'),
      apiGet('/api/investments/monthly-returns/'),
    ])
      .then(([me, inv, led, mr]) => {
        setBalance(me.balance);
        setInvestments(inv.results);
        setLedger(led.results.slice(0, 5));
        setMonthly(mr.results);
      })
      .catch(err => {
        if (err.status === 401) navigate('/login');
        else setLoadError('대시보드 정보를 불러오지 못했습니다.');
      });
  }, [navigate]);

  const totalInvested = sum(investments?.filter(it => IN_PROGRESS.includes(it.loan_status)), 'amount');
  const totalEarned = sum(investments, 'earned');
  const upcoming = (investments ?? [])
    .filter(it => it.next_due_date)
    .sort((a, b) => a.next_due_date.localeCompare(b.next_due_date))
    .slice(0, 4);
  const estimatedMonthlyIncome = sum(upcoming, 'estimated_next_amount');

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="대시보드" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>{displayName}님, 안녕하세요</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, letterSpacing: -1.5, margin: 0 }}>
            누적 수익 <span style={{ color: T.green }}>+{totalEarned.toLocaleString()}원</span>
          </h1>

          {loadError && <div style={{ fontSize: 13, color: '#c0392b', marginTop: 16 }}>{loadError}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, marginTop: 32 }}>
            <DashStat k="총 투자금" v={totalInvested.toLocaleString()} unit="원" sub={`${investments?.filter(it => IN_PROGRESS.includes(it.loan_status)).length ?? 0}건 진행중`} />
            <DashStat k="누적 수익" v={totalEarned.toLocaleString()} unit="원" sub="세전" accent />
            <DashStat k="예상 다음 수익" v={estimatedMonthlyIncome.toLocaleString()} unit="원" sub={upcoming[0] ? `다음 정산 ${formatMonthDay(upcoming[0].next_due_date)}` : '정산 예정 없음'} />
            <DashStat k="예치금" v={balance !== null ? Number(balance).toLocaleString() : '—'} unit="원" sub="투자 가능" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: T.gap, marginTop: T.gap }}>
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 32 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 24 }}>월별 수익 추이</div>
              {monthly && <MonthlyChart data={monthly} />}
            </div>
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 32 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 20 }}>다가오는 정산 (예상)</div>
              {upcoming.length === 0 && <div style={{ fontSize: 13, color: T.ink2 }}>정산 예정인 투자가 없습니다.</div>}
              {upcoming.map((it, i) => (
                <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < upcoming.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                  <div style={{ width: 44, textAlign: 'center', fontFamily: T.fDisp, fontSize: 13, fontWeight: 600 }}>{formatMonthDay(it.next_due_date)}</div>
                  <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>{it.purpose}</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 14, fontWeight: 600, color: T.green }}>+{Number(it.estimated_next_amount).toLocaleString()}원</div>
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
            {ledger?.length === 0 && <div style={{ padding: '24px 0', fontSize: 13, color: T.ink2 }}>거래 내역이 없습니다.</div>}
            {ledger?.map((r, i) => (
              <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 140px', fontSize: 13, padding: '14px 0', borderBottom: i < ledger.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                <span style={{ fontFamily: T.fDisp, color: T.ink2 }}>{formatMonthDay(r.created_at.slice(0, 10))}</span>
                <span>{r.memo || LEDGER_TYPE_LABEL[r.type]}</span>
                <span style={{ color: T.ink2 }}>{LEDGER_TYPE_LABEL[r.type]}</span>
                <span style={{ fontFamily: T.fDisp, fontWeight: 600, color: LEDGER_SIGN[r.type] === '+' ? T.green : T.ink, textAlign: 'right' }}>
                  {LEDGER_SIGN[r.type]}{Number(r.amount).toLocaleString()}원
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

function sum(items, key) {
  return (items ?? []).reduce((s, it) => s + Number(it[key] ?? 0), 0);
}

function formatMonthDay(isoDate) {
  const [, m, d] = isoDate.split('-');
  return `${m}.${d}`;
}

function MonthlyChart({ data }) {
  const W = 700, H = 220;
  const pts = data.map(d => Number(d.total));
  const max = Math.max(...pts, 1);
  const stepX = W / (pts.length - 1 || 1);
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
      {data.map((d, i) => (
        i % 2 === 0
          ? <text key={d.month} x={i * stepX} y={H + 22} fill={T.ink3} fontSize="11" textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}>{d.month.slice(5)}월</text>
          : null
      ))}
    </svg>
  );
}

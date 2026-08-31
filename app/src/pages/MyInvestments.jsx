import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Tag, DashStat } from '../tokens';
import { pct } from '../data';
import { AppNav, Sidebar } from '../components/AppChrome';
import { apiGet } from '../api';

const STATUS_LABEL = {
  FUNDRAISING: '모집중', ACTIVE: '진행중', OVERDUE_1: '연체 1단계', OVERDUE_2: '연체 2단계',
  DEFAULT: '부실', WRITTEN_OFF: '상각', COMPLETED: '완료', CANCELLED: '취소됨',
};
const STATUS_TONE = {
  FUNDRAISING: 'neutral', ACTIVE: 'green', OVERDUE_1: 'red', OVERDUE_2: 'red',
  DEFAULT: 'red', WRITTEN_OFF: 'red', COMPLETED: 'neutral', CANCELLED: 'neutral',
};
const IN_PROGRESS = ['FUNDRAISING', 'ACTIVE', 'OVERDUE_1', 'OVERDUE_2', 'DEFAULT'];
const OVERDUE = ['OVERDUE_1', 'OVERDUE_2', 'DEFAULT'];

const FILTERS = [
  { key: '전체', match: () => true },
  { key: '진행중', match: it => IN_PROGRESS.includes(it.loan_status) },
  { key: '완료', match: it => it.loan_status === 'COMPLETED' },
  { key: '연체', match: it => OVERDUE.includes(it.loan_status) },
];

export default function MyInvestments() {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    apiGet('/api/investments/mine/')
      .then(data => setItems(data.results))
      .catch(err => {
        if (err.status === 401) navigate('/login');
        else setLoadError('투자 내역을 불러오지 못했습니다.');
      });
  }, [navigate]);

  const inProgressCount = items?.filter(it => IN_PROGRESS.includes(it.loan_status)).length ?? 0;
  const inProgressTotal = sum(items?.filter(it => IN_PROGRESS.includes(it.loan_status)), 'amount');
  const completed = items?.filter(it => it.loan_status === 'COMPLETED') ?? [];
  const overdueCount = items?.filter(it => OVERDUE.includes(it.loan_status)).length ?? 0;
  const totalEarned = sum(items, 'earned');
  const totalInvested = sum(items, 'amount');
  const avgRate = items?.length
    ? items.reduce((s, it) => s + Number(it.investor_rate) * Number(it.amount), 0) / (totalInvested || 1)
    : 0;

  const visible = items?.filter(FILTERS.find(f => f.key === filter).match) ?? [];

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="내 투자 내역" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>나의 투자 / 내 투자 내역</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>내 투자 내역</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, marginTop: 24 }}>
            <DashStat k="진행중" v={String(inProgressCount)} unit="건" sub={`총 ${inProgressTotal.toLocaleString()}원`} />
            <DashStat k="완료" v={String(completed.length)} unit="건" sub={`누적 수익 ${totalEarned.toLocaleString()}원`} />
            <DashStat k="연체" v={String(overdueCount)} unit="건" sub="원금 보전 진행중" />
            <DashStat k="평균 수익률" v={avgRate.toFixed(1)} unit="%" sub="가중 평균 · 세전" accent />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: T.gap, padding: '20px 0' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {FILTERS.map(f => (
                <span key={f.key} onClick={() => setFilter(f.key)} style={{ padding: '8px 14px', borderRadius: T.rPill, fontSize: 13, fontWeight: 500, cursor: 'pointer', background: filter === f.key ? T.ink : T.card, color: filter === f.key ? T.card : T.ink2 }}>
                  {f.key} {items ? items.filter(f.match).length : ''}
                </span>
              ))}
            </div>
          </div>

          {loadError && <div style={{ fontSize: 13, color: '#c0392b', marginBottom: 16 }}>{loadError}</div>}

          {items && items.length === 0 && (
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 48, textAlign: 'center', fontSize: 13, color: T.ink2 }}>
              아직 투자 내역이 없습니다. <span onClick={() => navigate('/products')} style={{ color: T.ink, fontWeight: 600, cursor: 'pointer' }}>투자 상품 보러가기 →</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
            {visible.map(it => (
              <div key={it.id} onClick={() => navigate(`/products/${it.loan_id}`)} style={{ background: T.card, borderRadius: T.rLg, padding: 28, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 100px', gap: 24, alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <Tag tone={STATUS_TONE[it.loan_status]}>{STATUS_LABEL[it.loan_status]}</Tag>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4, letterSpacing: -0.3 }}>{it.purpose}</div>
                  <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>연 {Number(it.investor_rate).toFixed(1)}% · {it.term_months}개월</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.ink2 }}>투자금</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 18, fontWeight: 600, marginTop: 4 }}>{Number(it.amount).toLocaleString()}원</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.ink2 }}>누적 수익</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 18, fontWeight: 600, color: T.green, marginTop: 4 }}>+{Number(it.earned).toLocaleString()}원</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.ink2, marginBottom: 6 }}>진행률 {pct(it.progress)}</div>
                  <div style={{ height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                    <div style={{ width: pct(it.progress), height: '100%', background: OVERDUE.includes(it.loan_status) ? '#c4452f' : T.ink }} />
                  </div>
                  <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>
                    {it.next_due_date ? `다음 ${formatMonthDay(it.next_due_date)} · +${Number(it.estimated_next_amount).toLocaleString()}원` : '다음 예정 없음'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>상세 →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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

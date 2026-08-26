import { useNavigate } from 'react-router-dom';
import { T, Tag, DashStat } from '../tokens';
import { PRODUCTS, pct } from '../data';
import { AppNav, Sidebar } from '../components/AppChrome';

export default function MyInvestments() {
  const navigate = useNavigate();
  const items = [
    { ...PRODUCTS[0], invested: 1_000_000, earned: 47_280, status: '진행중', nextDate: '11.25', nextAmt: 7_830, progress: 0.42 },
    { ...PRODUCTS[1], invested: 500_000, earned: 18_400, status: '진행중', nextDate: '11.30', nextAmt: 4_670, progress: 0.62 },
    { ...PRODUCTS[3], invested: 2_000_000, earned: 124_300, status: '진행중', nextDate: '12.05', nextAmt: 13_000, progress: 0.78 },
    { ...PRODUCTS[2], invested: 800_000, earned: 41_280, status: '완료', nextDate: '—', nextAmt: 0, progress: 1.0 },
    { ...PRODUCTS[4], invested: 600_000, earned: 18_900, status: '연체', nextDate: '11.10', nextAmt: 5_250, progress: 0.55 },
  ];

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="내 투자 내역" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>나의 투자 / 내 투자 내역</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>내 투자 내역</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, marginTop: 24 }}>
            <DashStat k="진행중" v="14" unit="건" sub="총 11,200,000원" />
            <DashStat k="완료" v="23" unit="건" sub="누적 수익 1,847,283원" />
            <DashStat k="연체" v="1" unit="건" sub="원금 보전 진행중" />
            <DashStat k="평균 수익률" v="9.1" unit="%" sub="가중 평균 · 세전" accent />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: T.gap, padding: '20px 0' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['전체 38', '진행중 14', '완료 23', '연체 1'].map((t, i) => (
                <span key={t} style={{ padding: '8px 14px', borderRadius: T.rPill, fontSize: 13, fontWeight: 500, background: i === 0 ? T.ink : T.card, color: i === 0 ? T.card : T.ink2 }}>{t}</span>
              ))}
            </div>
            <span style={{ fontSize: 13, color: T.ink2 }}>최근 투자순 ▾</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
            {items.map((it, i) => (
              <div key={i} onClick={() => navigate(`/products/${i % PRODUCTS.length}`)} style={{ background: T.card, borderRadius: T.rLg, padding: 28, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 100px', gap: 24, alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    <Tag>{it.tag}</Tag>
                    <Tag tone={it.status === '진행중' ? 'green' : 'neutral'}>{it.status}</Tag>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4, letterSpacing: -0.3 }}>{it.title}</div>
                  <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>{it.rate}% · {it.term}개월 · {it.grade}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.ink2 }}>투자금</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 18, fontWeight: 600, marginTop: 4 }}>{it.invested.toLocaleString()}원</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.ink2 }}>누적 수익</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 18, fontWeight: 600, color: T.green, marginTop: 4 }}>+{it.earned.toLocaleString()}원</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.ink2, marginBottom: 6 }}>진행률 {pct(it.progress)}</div>
                  <div style={{ height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                    <div style={{ width: pct(it.progress), height: '100%', background: it.status === '연체' ? '#c4452f' : T.ink }} />
                  </div>
                  <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>다음 {it.nextDate}{it.nextAmt > 0 ? ` · +${it.nextAmt.toLocaleString()}원` : ''}</div>
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

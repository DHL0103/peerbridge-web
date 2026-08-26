import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Tag } from '../tokens';
import { fmtKRW, pct } from '../data';
import { AppNav, AppFooter } from '../components/AppChrome';
import { apiGet } from '../api';

export default function Products() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState(null);

  useEffect(() => {
    apiGet('/api/loans/?status=FUNDRAISING')
      .then(data => setLoans(data.results))
      .catch(() => setLoans([]));
  }, []);

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ padding: '40px 56px 24px' }}>
        <div style={{ fontSize: 12, color: T.ink2, marginBottom: 12 }}>투자하기 / 진행중인 상품</div>
        <h1 style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
          모집중인 상품 <span style={{ color: T.ink3 }}>{loans?.length ?? ''}</span>
        </h1>
      </div>

      {loans === null && <div style={{ padding: '0 56px', fontSize: 13, color: T.ink2 }}>불러오는 중...</div>}
      {loans?.length === 0 && <div style={{ padding: '0 56px', fontSize: 13, color: T.ink2 }}>현재 모집중인 상품이 없습니다.</div>}

      <div style={{ padding: '0 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap }}>
        {loans?.map(p => {
          const raised = Number(p.funded_amount) / Number(p.target_amount);
          const dDay = Math.max(0, Math.ceil((new Date(p.funding_deadline) - new Date()) / 86_400_000));
          return (
            <div key={p.id} onClick={() => navigate(`/products/${p.id}`)} style={{ background: T.card, borderRadius: T.rLg, padding: 28, display: 'flex', flexDirection: 'column', gap: 18, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tag>{p.term_months}개월</Tag>
                <span style={{ fontSize: 11, color: T.ink2 }}>D-{dDay}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: T.ink, letterSpacing: -0.3, minHeight: 44 }}>{p.purpose}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, color: T.green, letterSpacing: -1.8, lineHeight: 1 }}>{p.investor_rate}</span>
                <span style={{ fontSize: 18, color: T.green, fontWeight: 600 }}>%</span>
              </div>
              <div>
                <div style={{ height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct(raised), background: T.ink }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink2, marginTop: 8 }}>
                  <span>{pct(raised)} · {fmtKRW(Number(p.target_amount))}원</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AppFooter />
    </div>
  );
}

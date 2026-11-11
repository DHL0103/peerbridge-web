import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag } from '../tokens';
import { AppNav, Sidebar } from '../components/AppChrome';
import { apiGet } from '../api';

const STATUS_LABEL = { PENDING: '심사중', APPROVED: '승인', REJECTED: '반려' };

export default function MyLoans() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    apiGet('/api/loans/applications/')
      .then(data => setApplications(data.results))
      .catch(err => {
        if (err.status === 401) navigate('/login');
        else setLoadError('신청 현황을 불러오지 못했습니다.');
      });
  }, [navigate]);

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="대출 현황" group="borrower" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>대출 / 내 대출</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>내 대출 현황</h1>
            <Btn onClick={() => navigate('/loan/apply')}>새 대출 신청 →</Btn>
          </div>

          <div style={{ marginTop: 32, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 16 }}>심사 신청 현황</div>
          {loadError && <div style={{ fontSize: 13, color: '#c0392b', marginBottom: 12 }}>{loadError}</div>}
          <div style={{ background: T.card, borderRadius: T.rLg }}>
            {applications.length === 0 && !loadError && (
              <div style={{ padding: '24px 32px', fontSize: 13, color: T.ink2 }}>신청한 대출이 없습니다.</div>
            )}
            {applications.map((a, i) => (
              <div key={a.id} style={{ padding: '20px 32px', borderBottom: i < applications.length - 1 ? `1px solid ${T.line}` : 'none', display: 'grid', gridTemplateColumns: '1fr 140px 120px 100px', gap: 24, alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{a.purpose}</div>
                <div style={{ fontFamily: T.fDisp, fontWeight: 600 }}>{Number(a.amount).toLocaleString()}원</div>
                <Tag tone={a.status === 'APPROVED' ? 'green' : 'neutral'}>{STATUS_LABEL[a.status]}</Tag>
                <div style={{ fontSize: 12, color: T.ink2, textAlign: 'right' }}>{new Date(a.created_at).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} 신청</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

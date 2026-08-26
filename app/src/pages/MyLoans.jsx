import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag, DashStat } from '../tokens';
import { pct } from '../data';
import { AppNav } from '../components/AppChrome';
import { apiGet } from '../api';

const STATUS_LABEL = { PENDING: '심사중', APPROVED: '승인', REJECTED: '반려' };

export default function MyLoans() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loadError, setLoadError] = useState('');
  const inProgress = [
    { name: '강남 역삼 오피스텔 리파이낸싱', remain: 215_000_000, total: 300_000_000, next: '11.25', nextAmt: 2_350_000, progress: 0.28, rate: 9.4 },
    { name: '용산 상가 운영자금', remain: 80_000_000, total: 100_000_000, next: '12.05', nextAmt: 670_000, progress: 0.20, rate: 8.7 },
  ];

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
      <div style={{ padding: '32px 56px 24px' }}>
        <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>대출 / 내 대출</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>내 대출 현황</h1>
          <Btn onClick={() => navigate('/loan/apply')}>새 대출 신청 →</Btn>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, marginTop: 24 }}>
          <DashStat k="진행중 대출" v="2" unit="건" sub="총 잔여 295,000,000원" />
          <DashStat k="이번 달 상환 예정" v="3,020,000" unit="원" sub="11.25 + 12.05" />
          <DashStat k="평균 금리" v="9.1" unit="%" sub="가중 평균" accent />
          <DashStat k="신용 점수" v="847" unit="점" sub="NICE 1등급" />
        </div>

        <div style={{ marginTop: 32, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 16 }}>진행중인 대출</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
          {inProgress.map((l, i) => (
            <div key={i} style={{ background: T.card, borderRadius: T.rLg, padding: 32, display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 200px', gap: 28, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}><Tag tone="green">정상</Tag><Tag>연 {l.rate}%</Tag></div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>{l.name}</div>
                <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>다음 상환 {l.next} · {l.nextAmt.toLocaleString()}원</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.ink2 }}>잔여 원금</div>
                <div style={{ fontFamily: T.fDisp, fontSize: 22, fontWeight: 600, marginTop: 4 }}>{(l.remain / 100_000_000).toFixed(2)}억</div>
                <div style={{ fontSize: 11, color: T.ink3, marginTop: 2 }}>총 {(l.total / 100_000_000).toFixed(1)}억 중</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.ink2, marginBottom: 6 }}>상환 진행률 {pct(l.progress)}</div>
                <div style={{ height: 6, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                  <div style={{ width: pct(l.progress), height: '100%', background: T.ink }} />
                </div>
                <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>잔여 {Math.round((1 - l.progress) * 12)}개월</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Btn size="sm" onClick={() => navigate('/repay')}>상환하기</Btn>
                <Btn size="sm" variant="secondary">상세</Btn>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 16 }}>심사 신청 현황</div>
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
  );
}

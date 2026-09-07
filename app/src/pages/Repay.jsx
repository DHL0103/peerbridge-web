import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag } from '../tokens';
import { AppNav, Sidebar } from '../components/AppChrome';
import { apiGet, apiPost, fieldError } from '../api';

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export default function Repay() {
  const navigate = useNavigate();
  const [next, setNext] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);

  function load() {
    setLoadError('');
    apiGet('/api/loans/mine/next-repayment/')
      .then(setNext)
      .catch(err => {
        if (err.status === 401) navigate('/login');
        else if (err.status === 404) setNext(null);
        else setLoadError('상환 정보를 불러오지 못했습니다.');
      });
  }

  useEffect(load, [navigate]);

  async function handleRepay() {
    if (!next) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await apiPost(`/api/loans/${next.loan_id}/repay/`, { idempotency_key: crypto.randomUUID() });
      setDone(true);
      load();
    } catch (err) {
      setSubmitError(fieldError(err.data, 'loan') || fieldError(err.data, 'balance') || '상환 요청에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="상환 일정" group="borrower" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>
            <span onClick={() => navigate('/my-loans')} style={{ cursor: 'pointer' }}>대출 / 내 대출</span> / 상환
          </div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>상환하기</h1>

          {loadError && (
            <div style={{ marginTop: 24, padding: 20, background: T.card, borderRadius: T.rLg, fontSize: 13, color: '#c0392b' }}>{loadError}</div>
          )}

          {!loadError && next === null && (
            <div style={{ marginTop: 24, padding: 40, background: T.card, borderRadius: T.rLg, textAlign: 'center' }}>
              <div style={{ fontSize: 15, color: T.ink2 }}>상환할 예정인 회차가 없습니다.</div>
              <Btn size="lg" style={{ marginTop: 20 }} onClick={() => navigate('/my-loans')}>내 대출로 돌아가기</Btn>
            </div>
          )}

          {next && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: T.gap }}>
              <div style={{ background: T.card, borderRadius: T.rLg, padding: 40 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <Tag>{next.purpose}</Tag><Tag tone="green">{next.installment_number}회차</Tag>
                </div>
                <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>{fmtDate(next.due_date)} 상환 예정 금액</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: T.fDisp, fontSize: 64, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1 }}>
                    {Number(next.total_amount).toLocaleString()}
                  </span>
                  <span style={{ fontSize: 22, color: T.ink2 }}>원</span>
                </div>

                <div style={{ marginTop: 32, padding: 24, background: T.bgSoft, borderRadius: T.rMd }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>상환 내역</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                    <RR k="원금" v={`${Number(next.principal).toLocaleString()}원`} />
                    <RR k="이자" v={`${Number(next.interest).toLocaleString()}원`} muted />
                    <div style={{ height: 1, background: T.line, margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>납부 합계</span>
                      <span style={{ fontFamily: T.fDisp, fontWeight: 600, fontSize: 18 }}>{Number(next.total_amount).toLocaleString()}원</span>
                    </div>
                  </div>
                </div>

                {submitError && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 16 }}>{submitError}</div>}
                {done && !submitError && <div style={{ fontSize: 12, color: T.green, marginTop: 16 }}>상환이 완료되었습니다.</div>}

                <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                  <Btn size="lg" style={{ flex: 1 }} disabled={submitting} onClick={handleRepay}>
                    {submitting ? '처리 중...' : `${Number(next.total_amount).toLocaleString()}원 지금 상환`}
                  </Btn>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
                <div style={{ background: T.card, borderRadius: T.rLg, padding: 28 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>상환 후 잔여</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
                    <RR k="잔여 회차" v={`${next.remaining_installments} → ${next.remaining_installments - 1}회`} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RR({ k, v, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: T.ink2 }}>{k}</span>
      <span style={{ fontFamily: T.fDisp, fontWeight: 500, color: muted ? T.ink2 : T.ink }}>{v}</span>
    </div>
  );
}

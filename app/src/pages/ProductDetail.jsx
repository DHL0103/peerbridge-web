import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { T, Btn, Tag } from '../tokens';
import { pct, fmtKRW } from '../data';
import { AppNav } from '../components/AppChrome';
import { apiGet, apiPost, cacheUser, fieldError, getCachedUser } from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showInvest, setShowInvest] = useState(false);

  function loadLoan() {
    apiGet(`/api/loans/${id}/`)
      .then(setLoan)
      .catch(err => {
        if (err.status === 404) setNotFound(true);
      });
  }

  useEffect(loadLoan, [id]);

  function handleInvestClick() {
    if (!getCachedUser()) { navigate('/login'); return; }
    setShowInvest(true);
  }

  if (notFound) {
    return (
      <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, minHeight: '100vh' }}>
        <AppNav />
        <div style={{ padding: 56, fontSize: 14, color: T.ink2 }}>존재하지 않는 상품입니다.</div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, minHeight: '100vh' }}>
        <AppNav />
        <div style={{ padding: 56, fontSize: 14, color: T.ink2 }}>불러오는 중...</div>
      </div>
    );
  }

  const raised = Number(loan.funded_amount) / Number(loan.target_amount);
  const dDay = Math.max(0, Math.ceil((new Date(loan.funding_deadline) - new Date()) / 86_400_000));

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, position: 'relative', paddingBottom: 80 }}>
      <AppNav />
      <div style={{ padding: '32px 56px 16px' }}>
        <div style={{ fontSize: 12, color: T.ink2 }}>
          <span onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>투자상품</span> / 상세
        </div>
      </div>

      <div style={{ padding: '0 56px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: T.gap, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 40 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Tag>{loan.term_months}개월</Tag><Tag>D-{dDay}</Tag>
            </div>
            <div style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.2 }}>{loan.purpose}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 32, paddingTop: 28, borderTop: `1px solid ${T.line}` }}>
              {[
                ['투자자 수익률', `${loan.investor_rate}%`, true],
                ['투자 기간', `${loan.term_months}개월`],
                ['모집 금액', `${fmtKRW(Number(loan.target_amount))}원`],
              ].map(([k, v, accent]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: T.ink2 }}>{k}</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 32, fontWeight: 600, letterSpacing: -1, color: accent ? T.green : T.ink, marginTop: 6 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: T.ink2 }}>모집 진행률</span>
                <span style={{ fontWeight: 600 }}>{pct(raised)} · 잔여 {fmtKRW(Math.round(Number(loan.target_amount) - Number(loan.funded_amount)))}원</span>
              </div>
              <div style={{ height: 10, borderRadius: T.rPill, background: T.bg, overflow: 'hidden' }}>
                <div style={{ width: pct(raised), height: '100%', background: T.ink }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: T.gap }}>
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
            <div style={{ fontSize: 12, color: T.ink2 }}>상품 정보</div>
            <div style={{ height: 1, background: T.line, margin: '16px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {[
                ['투자자 수익률', `${loan.investor_rate}%`],
                ['투자 기간', `${loan.term_months}개월`],
                ['모집 마감일', loan.funding_deadline],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: T.ink2 }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span></div>
              ))}
            </div>
            <Btn size="lg" style={{ width: '100%', marginTop: 20 }} disabled={loan.status !== 'FUNDRAISING'} onClick={handleInvestClick}>
              {loan.status === 'FUNDRAISING' ? '투자하기' : '모집 마감'}
            </Btn>
            <div style={{ fontSize: 11, color: T.ink3, textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>원금 손실 가능 상품입니다.</div>
          </div>
        </div>
      </div>

      {showInvest && (
        <InvestModal
          loan={loan}
          onDone={() => { setShowInvest(false); loadLoan(); }}
          onCancel={() => setShowInvest(false)}
          onUnauthorized={() => navigate('/login')}
        />
      )}
    </div>
  );
}

function InvestModal({ loan, onDone, onCancel, onUnauthorized }) {
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet('/api/auth/me/')
      .then(profile => setBalance(Number(profile.balance)))
      .catch(err => {
        if (err.status === 401) onUnauthorized();
      });
  }, [onUnauthorized]);

  const remaining = Number(loan.target_amount) - Number(loan.funded_amount);

  async function handleConfirm() {
    if (!amount) return;
    setError('');
    setLoading(true);
    try {
      await apiPost('/api/investments/', { loan_id: loan.id, amount, idempotency_key: idempotencyKey });
      cacheUser(await apiGet('/api/auth/me/'));
      onDone();
    } catch (err) {
      if (err.status === 401) { onUnauthorized(); return; }
      setError(fieldError(err.data, 'amount') || fieldError(err.data, 'loan') || '투자 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(22,20,15,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={onCancel}>
      <div onClick={e => e.stopPropagation()} style={{ width: 440, background: T.card, borderRadius: T.rXl, padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4 }}>투자하기</span>
          <span onClick={onCancel} style={{ fontSize: 18, color: T.ink2, cursor: 'pointer' }}>×</span>
        </div>

        <div style={{ fontSize: 12, color: T.ink2, marginBottom: 8 }}>투자 금액</div>
        <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'flex-end' }}>
            <input
              type="number" min="0" step="1" autoFocus value={amount || ''} placeholder="0"
              onChange={e => setAmount(Math.max(0, Number(e.target.value) || 0))}
              style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'right', width: '100%', fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, color: T.ink }}
            />
            <span style={{ fontSize: 16, color: T.ink2 }}>원</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            <span onClick={() => setAmount(remaining)}
              style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>잔여 전액</span>
            {balance != null && (
              <span onClick={() => setAmount(Math.min(balance, remaining))}
                style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>내 잔액 전액</span>
            )}
            <span onClick={() => setAmount(0)}
              style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>초기화</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: T.ink2, marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>내 예치금 잔액</span><span style={{ fontWeight: 500, color: T.ink }}>{balance != null ? `${balance.toLocaleString()}원` : '불러오는 중...'}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>모집 잔여 금액</span><span style={{ fontWeight: 500, color: T.ink }}>{fmtKRW(remaining)}원</span></div>
        </div>

        {error && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 12 }}>{error}</div>}

        <Btn size="lg" style={{ width: '100%', marginTop: 20 }} disabled={loading || !amount} onClick={handleConfirm}>
          {loading ? '처리 중...' : `${amount.toLocaleString()}원 투자하기`}
        </Btn>
      </div>
    </div>
  );
}

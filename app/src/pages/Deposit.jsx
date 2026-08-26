import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag } from '../tokens';
import { AppNav, Sidebar } from '../components/AppChrome';
import { apiGet, apiPost, cacheUser, fieldError } from '../api';

const TYPE_LABEL = {
  CHARGE: '충전',
  WITHDRAW: '출금',
  INVEST: '투자',
  DISTRIBUTION: '분배',
  REPAY: '상환',
  PLATFORM_FEE: '수수료',
};
const IN_TYPES = new Set(['CHARGE', 'DISTRIBUTION']);

export default function Deposit() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [primaryAccount, setPrimaryAccount] = useState(null);
  const [txs, setTxs] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [action, setAction] = useState(null);

  function loadAll() {
    Promise.all([apiGet('/api/auth/me/'), apiGet('/api/auth/bank-accounts/'), apiGet('/api/ledger/')])
      .then(([profileData, accountsData, ledgerData]) => {
        setProfile(profileData);
        cacheUser(profileData);
        setPrimaryAccount(accountsData.results.find(a => a.is_primary) || null);
        setTxs(ledgerData.results);
      })
      .catch(err => {
        if (err.status === 401) navigate('/login');
        else setLoadError('정보를 불러오지 못했습니다.');
      });
  }

  useEffect(loadAll, [navigate]);

  const balance = Number(profile?.balance ?? 0);

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="예치금" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>나의 투자 / 예치금</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>예치금 관리</h1>
          {loadError && <div style={{ fontSize: 13, color: '#c0392b', marginTop: 12 }}>{loadError}</div>}

          <div style={{ background: T.ink, color: T.card, borderRadius: T.rXl, padding: '40px 48px', marginTop: 24, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>현재 예치금 잔액</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
                <span style={{ fontFamily: T.fDisp, fontSize: 80, fontWeight: 600, letterSpacing: -3.5, lineHeight: 1 }}>{balance.toLocaleString()}</span>
                <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)' }}>원</span>
              </div>
              <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                <span>투자 가능 {balance.toLocaleString()}원</span><span>·</span><span>출금 가능 {balance.toLocaleString()}원</span><span>·</span>
                <span>연결 계좌 {primaryAccount ? `${primaryAccount.bank_name} ****-${primaryAccount.account_number.slice(-4)}` : '없음'}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
              <Btn size="lg" variant="secondary" style={{ background: T.card, color: T.ink, border: 'none' }} onClick={() => setAction(action === 'charge' ? null : 'charge')}>충전 +</Btn>
              <Btn size="lg" style={{ background: 'transparent', color: T.card, border: '1px solid rgba(255,255,255,0.25)' }} onClick={() => setAction(action === 'withdraw' ? null : 'withdraw')}>출금 −</Btn>
            </div>
          </div>

          <div style={{ background: T.card, borderRadius: T.rLg, padding: 32, marginTop: T.gap }}>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 16 }}>거래 내역</div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', fontSize: 12, color: T.ink2, padding: '12px 0', borderBottom: `1px solid ${T.line}` }}>
              <span>일시</span><span>내역</span><span>유형</span><span style={{ textAlign: 'right' }}>금액</span>
            </div>
            {txs.length === 0 && <div style={{ padding: '24px 0', fontSize: 13, color: T.ink2 }}>거래 내역이 없습니다.</div>}
            {txs.map((t, i) => (
              <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', fontSize: 13, padding: '16px 0', borderBottom: i < txs.length - 1 ? `1px solid ${T.line}` : 'none', alignItems: 'center' }}>
                <span style={{ fontFamily: T.fDisp, color: T.ink2 }}>{new Date(t.created_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                <span>{t.memo || TYPE_LABEL[t.type]}</span>
                <span><Tag tone={IN_TYPES.has(t.type) ? 'green' : 'neutral'}>{TYPE_LABEL[t.type]}</Tag></span>
                <span style={{ fontFamily: T.fDisp, fontWeight: 600, color: IN_TYPES.has(t.type) ? T.green : T.ink, textAlign: 'right' }}>{IN_TYPES.has(t.type) ? '+' : '−'}{Number(t.amount).toLocaleString()}원</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {action && (
        <AmountModal
          action={action}
          balance={balance}
          onDone={() => { setAction(null); loadAll(); }}
          onCancel={() => setAction(null)}
        />
      )}
    </div>
  );
}

const QUICK_AMOUNTS = [
  ['+1만', 10_000],
  ['+10만', 100_000],
  ['+100만', 1_000_000],
];

function AmountModal({ action, balance, onDone, onCancel }) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isCharge = action === 'charge';

  async function handleConfirm() {
    if (!amount) return;
    setError('');
    setLoading(true);
    try {
      await apiPost(isCharge ? '/api/ledger/charge/' : '/api/ledger/withdraw/', { amount });
      onDone();
    } catch (err) {
      setError(fieldError(err.data, 'amount') || '요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(22,20,15,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={onCancel}>
      <div onClick={e => e.stopPropagation()} style={{ width: 440, background: T.card, borderRadius: T.rXl, padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4 }}>예치금 {isCharge ? '충전' : '출금'}</span>
          <span onClick={onCancel} style={{ fontSize: 18, color: T.ink2, cursor: 'pointer' }}>×</span>
        </div>

        <div style={{ fontSize: 12, color: T.ink2, marginBottom: 8 }}>{isCharge ? '충전' : '출금'} 금액</div>
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
            {QUICK_AMOUNTS.map(([label, add]) => (
              <span key={label} onClick={() => setAmount(a => a + add)}
                style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{label}</span>
            ))}
            {!isCharge && (
              <span onClick={() => setAmount(balance)}
                style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>전액</span>
            )}
            <span onClick={() => setAmount(0)}
              style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>초기화</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: T.ink2, marginTop: 16 }}>
          <span>{isCharge ? '충전 후' : '출금 후'} 예치금 잔액</span>
          <span style={{ fontWeight: 500, color: T.ink }}>{Math.max(0, isCharge ? balance + amount : balance - amount).toLocaleString()}원</span>
        </div>

        {error && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 12 }}>{error}</div>}

        <Btn size="lg" style={{ width: '100%', marginTop: 20 }} disabled={loading || !amount} onClick={handleConfirm}>
          {loading ? '처리 중...' : `${amount.toLocaleString()}원 ${isCharge ? '충전하기' : '출금하기'}`}
        </Btn>
      </div>
    </div>
  );
}

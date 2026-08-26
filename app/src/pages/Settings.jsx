import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag } from '../tokens';
import { AppNav, Sidebar } from '../components/AppChrome';
import { apiGet, apiPost, apiPut, cacheUser, fieldError, logout } from '../api';

export default function Settings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    apiGet('/api/auth/me/')
      .then(data => {
        setProfile(data);
        cacheUser(data);
      })
      .catch(err => {
        if (err.status === 401) navigate('/login');
        else setProfileError('내 정보를 불러오지 못했습니다.');
      });
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80, minHeight: '100vh' }}>
      <AppNav />
      <div style={{ display: 'flex' }}>
        <Sidebar active="계정 설정" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>나의 투자 / 계정 설정</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>계정 설정</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: T.gap, marginTop: 32 }}>
            <Card title="프로필" desc="다른 사용자에게 표시되는 정보입니다.">
              {profileError && <div style={{ fontSize: 13, color: '#c0392b' }}>{profileError}</div>}
              {profile && (
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, alignItems: 'center' }}>
                  <div style={{ width: 96, height: 96, borderRadius: T.rPill, background: T.ink, color: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fDisp, fontSize: 36, fontWeight: 600 }}>{profile.first_name?.[0] || profile.username[0]}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <SRow label="이름"><span style={rowValueStyle}>{profile.first_name}</span></SRow>
                    <SRow label="아이디"><span style={rowValueStyle}>{profile.username}</span></SRow>
                    <SRow label="이메일"><span style={rowValueStyle}>{profile.email}</span></SRow>
                    <SRow label="휴대폰"><span style={rowValueStyle}>{profile.phone_number || '-'}</span></SRow>
                    <SRow label="예치금"><span style={rowValueStyle}>{Number(profile.balance).toLocaleString()}원</span></SRow>
                  </div>
                </div>
              )}
            </Card>

            <Card title="보안" desc="계정 비밀번호를 변경합니다.">
              <PasswordChangeRow />
              <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>로그아웃</div>
                <Btn variant="secondary" size="sm" onClick={handleLogout}>로그아웃</Btn>
              </div>
            </Card>

            <Card title="연결 계좌" desc="예치금 출금에 사용할 계좌를 등록하고 기본계좌를 설정합니다." style={{ gridColumn: '1 / -1' }}>
              <BankAccountSection />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { background: T.bgSoft, border: 'none', borderRadius: T.rMd, padding: '12px 14px', fontSize: 14, fontFamily: T.fSans, color: T.ink, width: 320, outline: 'none' };
const rowValueStyle = { fontSize: 14, color: T.ink };

function PasswordChangeRow() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ current: '', next: '', nextConfirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function update(key) {
    return e => setForm({ ...form, [key]: e.target.value });
  }

  function close() {
    setOpen(false);
    setForm({ current: '', next: '', nextConfirm: '' });
    setErrors({});
    setDone(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    if (form.next !== form.nextConfirm) {
      setErrors({ new_password_confirm: ['비밀번호가 일치하지 않습니다.'] });
      return;
    }

    setLoading(true);
    try {
      await apiPut('/api/auth/password/', {
        current_password: form.current,
        new_password: form.next,
        new_password_confirm: form.nextConfirm,
      });
      setDone(true);
    } catch (err) {
      setErrors(err.data || { _general: ['비밀번호 변경에 실패했습니다.'] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '12px 0', borderBottom: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>비밀번호</div>
          <div style={{ fontSize: 11, color: T.ink2, marginTop: 4 }}>3개월마다 변경 권장</div>
        </div>
        <Btn variant="secondary" size="sm" onClick={() => (open ? close() : setOpen(true))}>{open ? '취소' : '변경'}</Btn>
      </div>

      {open && (
        done ? (
          <div style={{ marginTop: 16, fontSize: 13, color: T.green }}>비밀번호가 변경되었습니다.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PwField placeholder="현재 비밀번호" value={form.current} onChange={update('current')} error={fieldError(errors, 'current_password')} />
            <PwField placeholder="새 비밀번호" value={form.next} onChange={update('next')} error={fieldError(errors, 'new_password')} />
            <PwField placeholder="새 비밀번호 확인" value={form.nextConfirm} onChange={update('nextConfirm')} error={fieldError(errors, 'new_password_confirm')} />
            {errors._general && <div style={{ fontSize: 12, color: '#c0392b' }}>{errors._general[0]}</div>}
            <div>
              <Btn size="sm" type="submit" disabled={loading}>{loading ? '변경 중...' : '저장'}</Btn>
            </div>
          </form>
        )
      )}
    </div>
  );
}

function PwField({ placeholder, value, onChange, error }) {
  return (
    <div>
      <input type="password" placeholder={placeholder} value={value} onChange={onChange} required style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', border: error ? '1px solid #c0392b' : 'none' }} />
      {error && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function BankAccountSection() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  function load() {
    apiGet('/api/auth/bank-accounts/')
      .then(data => setAccounts(data.results))
      .catch(() => setError('계좌 목록을 불러오지 못했습니다.'));
  }

  useEffect(load, []);

  async function setPrimary(id) {
    await apiPost(`/api/auth/bank-accounts/${id}/set-primary/`, {});
    load();
  }

  return (
    <div>
      {error && <div style={{ fontSize: 13, color: '#c0392b', marginBottom: 12 }}>{error}</div>}
      {accounts.map(a => (
        <div key={a.id} style={{ padding: '12px 0', borderBottom: `1px solid ${T.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{a.bank_name} {a.account_number}</div>
            <div style={{ fontSize: 11, color: T.ink2, marginTop: 4 }}>{a.account_holder}</div>
          </div>
          {a.is_primary ? <Tag tone="green">기본계좌</Tag> : <Btn variant="secondary" size="sm" onClick={() => setPrimary(a.id)}>기본으로 설정</Btn>}
        </div>
      ))}
      {accounts.length === 0 && !error && <div style={{ fontSize: 13, color: T.ink2, padding: '12px 0' }}>등록된 계좌가 없습니다.</div>}

      <div style={{ padding: '12px 0 0' }}>
        <Btn variant="secondary" size="sm" onClick={() => (open ? setOpen(false) : setOpen(true))}>{open ? '취소' : '계좌 등록'}</Btn>
        {open && <AddAccountForm onDone={() => { setOpen(false); load(); }} />}
      </div>
    </div>
  );
}

function AddAccountForm({ onDone }) {
  const [form, setForm] = useState({ bank_name: '', account_number: '', account_holder: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function update(key) {
    return e => setForm({ ...form, [key]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await apiPost('/api/auth/bank-accounts/', form);
      onDone();
    } catch (err) {
      setErrors(err.data || { _general: ['계좌 등록에 실패했습니다.'] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <AccountField placeholder="은행명 (예: KB국민)" value={form.bank_name} onChange={update('bank_name')} error={fieldError(errors, 'bank_name')} />
      <AccountField placeholder="계좌번호" value={form.account_number} onChange={update('account_number')} error={fieldError(errors, 'account_number')} />
      <AccountField placeholder="예금주" value={form.account_holder} onChange={update('account_holder')} error={fieldError(errors, 'account_holder')} />
      {errors._general && <div style={{ fontSize: 12, color: '#c0392b' }}>{errors._general[0]}</div>}
      <div>
        <Btn size="sm" type="submit" disabled={loading}>{loading ? '등록 중...' : '저장'}</Btn>
      </div>
    </form>
  );
}

function AccountField({ placeholder, value, onChange, error }) {
  return (
    <div>
      <input placeholder={placeholder} value={value} onChange={onChange} required style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', border: error ? '1px solid #c0392b' : 'none' }} />
      {error && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function Card({ title, desc, children, danger, style }) {
  return (
    <div style={{ background: T.card, borderRadius: T.rLg, padding: 28, border: danger ? '1px solid rgba(196,69,47,0.15)' : 'none', ...style }}>
      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, color: danger ? '#c4452f' : T.ink }}>{title}</div>
      <div style={{ fontSize: 12, color: T.ink2, marginTop: 4, marginBottom: 20 }}>{desc}</div>
      {children}
    </div>
  );
}

function SRow({ label, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, alignItems: 'center', fontSize: 13 }}>
      <span style={{ color: T.ink2 }}>{label}</span>{children}
    </div>
  );
}

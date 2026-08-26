import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn } from '../tokens';
import { BrandWordmark } from '../components/Brand';
import { apiPost, fieldError } from '../api';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', firstName: '', email: '', password: '', passwordConfirm: '', phoneNumber: '' });
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
      await apiPost('/api/auth/register/', {
        username: form.username,
        first_name: form.firstName,
        email: form.email,
        password: form.password,
        password_confirm: form.passwordConfirm,
        phone_number: form.phoneNumber,
      });
      navigate('/login');
    } catch (err) {
      setErrors(err.data || { _general: ['서버에 연결할 수 없습니다.'] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: T.fSans, color: T.ink, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ padding: 56, background: T.ink, color: T.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <BrandWordmark size={26} wordSize={18} gap={10} color={T.card} />
        </div>
        <div>
          <div style={{ fontFamily: T.fDisp, fontSize: 64, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1.05 }}>
            작게, 자주,<br /><span style={{ color: 'rgba(255,255,255,0.45)' }}>오래.</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginTop: 24, maxWidth: 380 }}>
            7년간 누적 부실률 0.41%. 심사역이 한 건 한 건 직접 검토한 14개 상품을 만나보세요.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          {[['8,742억', '누적 투자액'], ['9.3%', '평균 수익률'], ['127K', '활성 투자자']].map(([v, k]) => (
            <div key={k}>
              <div style={{ fontFamily: T.fDisp, fontSize: 22, fontWeight: 600 }}>{v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 380, margin: '0 auto', width: '100%' }}>
          <div style={{ fontSize: 12, color: T.ink2, marginBottom: 12 }}>회원가입</div>
          <div style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 32 }}>
            3분이면 첫 투자<br />까지 갈 수 있어요.
          </div>

          <form onSubmit={handleSubmit}>
            <Field label="이름" placeholder="홍길동" value={form.firstName} onChange={update('firstName')} error={fieldError(errors, 'first_name')} />
            <Field label="아이디" placeholder="아이디" value={form.username} onChange={update('username')} error={fieldError(errors, 'username')} />
            <Field label="이메일" placeholder="you@example.com" value={form.email} onChange={update('email')} error={fieldError(errors, 'email')} />
            <Field label="비밀번호" placeholder="8자 이상" type="password" value={form.password} onChange={update('password')} error={fieldError(errors, 'password')} />
            <Field label="비밀번호 확인" placeholder="비밀번호 재입력" type="password" value={form.passwordConfirm} onChange={update('passwordConfirm')} error={fieldError(errors, 'password_confirm')} />
            <Field label="휴대폰" placeholder="010-0000-0000" value={form.phoneNumber} onChange={update('phoneNumber')} error={fieldError(errors, 'phone_number')} required={false} />

            {errors._general && <div style={{ fontSize: 12, color: '#c0392b', marginBottom: 12 }}>{errors._general[0]}</div>}

            <Btn size="lg" type="submit" disabled={loading} style={{ width: '100%', marginTop: 24 }}>{loading ? '가입 중...' : '가입하고 시작하기'}</Btn>
          </form>

          <div style={{ marginTop: 28, fontSize: 13, color: T.ink2, textAlign: 'center' }}>
            이미 계정이 있나요?{' '}
            <span onClick={() => navigate('/login')} style={{ color: T.ink, fontWeight: 600, borderBottom: `1px solid ${T.ink}`, cursor: 'pointer' }}>로그인</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', value, onChange, error, required = true }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 8 }}>{label}</div>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} style={{ width: '100%', background: T.card, borderRadius: T.rMd, padding: '14px 16px', fontSize: 14, color: T.ink, border: `1px solid ${error ? '#c0392b' : T.line}`, fontFamily: T.fSans, outline: 'none', boxSizing: 'border-box' }} />
      {error && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 6 }}>{error}</div>}
    </div>
  );
}

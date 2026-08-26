import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn } from '../tokens';
import { BrandWordmark } from '../components/Brand';
import { apiGet, apiPost, cacheUser, saveTokens } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const tokens = await apiPost('/api/auth/login/', { username, password });
      saveTokens(tokens);
      cacheUser(await apiGet('/api/auth/me/'));
      navigate('/dashboard');
    } catch (err) {
      setError(err.data?.detail || '아이디 또는 비밀번호가 올바르지 않습니다.');
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
          <div style={{ fontSize: 12, color: T.ink2, marginBottom: 12 }}>로그인</div>
          <div style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 32 }}>
            다시 만나서<br />반갑습니다.
          </div>

          <form onSubmit={handleSubmit}>
            <Field label="아이디" placeholder="아이디" value={username} onChange={e => setUsername(e.target.value)} />
            <Field label="비밀번호" placeholder="8자 이상" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: T.ink2, marginTop: 4 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" /> 자동 로그인</label>
              <span style={{ cursor: 'pointer' }}>비밀번호 찾기 →</span>
            </div>

            {error && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 12 }}>{error}</div>}

            <Btn size="lg" type="submit" disabled={loading} style={{ width: '100%', marginTop: 24 }}>{loading ? '로그인 중...' : '로그인'}</Btn>
          </form>

          <div style={{ marginTop: 28, fontSize: 13, color: T.ink2, textAlign: 'center' }}>
            아직 계정이 없나요?{' '}
            <span onClick={() => navigate('/signup')} style={{ color: T.ink, fontWeight: 600, borderBottom: `1px solid ${T.ink}`, cursor: 'pointer' }}>회원가입</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', value, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 8 }}>{label}</div>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required style={{ width: '100%', background: T.card, borderRadius: T.rMd, padding: '14px 16px', fontSize: 14, color: T.ink, border: `1px solid ${T.line}`, fontFamily: T.fSans, outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );
}

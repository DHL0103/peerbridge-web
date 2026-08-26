// Page: 로그인 / 회원가입 — 차분한 분할 레이아웃

function PageAuth({ mode = 'login' }) {
  const isSignup = mode === 'signup';
  return (
    <div style={{ width: 1440, height: 900, background: T.bg, fontFamily: T.fSans, color: T.ink, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left — brand panel */}
      <div style={{ padding: 56, background: T.ink, color: T.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BrandWordmark size={26} wordSize={18} gap={10} color={T.card} />

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

      {/* Right — form */}
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 380, margin: '0 auto', width: '100%' }}>
          <div style={{ fontSize: 12, color: T.ink2, marginBottom: 12 }}>{isSignup ? '회원가입' : '로그인'}</div>
          <div style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 32 }}>
            {isSignup ? <>3분이면 첫 투자<br />까지 갈 수 있어요.</> : <>다시 만나서<br />반갑습니다.</>}
          </div>

          {isSignup && <Field label="이름" placeholder="홍길동" />}
          <Field label="이메일" placeholder="you@example.com" />
          <Field label="비밀번호" placeholder="8자 이상" type="password" />
          {isSignup && <Field label="휴대폰" placeholder="010-0000-0000" />}

          {isSignup && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, color: T.ink2, marginBottom: 10 }}>역할 선택</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['투자자로 가입', '차입자로 가입'].map((r, i) => (
                  <div key={r} style={{
                    padding: 14, borderRadius: T.rMd, fontSize: 13,
                    background: i === 0 ? T.ink : T.card, color: i === 0 ? T.card : T.ink,
                    border: i === 0 ? 'none' : `1px solid ${T.line}`,
                    fontWeight: 500, textAlign: 'center', cursor: 'pointer',
                  }}>{r}</div>
                ))}
              </div>
            </div>
          )}

          {!isSignup && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: T.ink2, marginTop: 4 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="checkbox" /> 자동 로그인
              </label>
              <span>비밀번호 찾기 →</span>
            </div>
          )}

          <Btn size="lg" style={{ width: '100%', marginTop: 24 }}>{isSignup ? '가입하고 시작하기' : '로그인'}</Btn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', color: T.ink3, fontSize: 11 }}>
            <div style={{ flex: 1, height: 1, background: T.line }}></div>
            <span>또는</span>
            <div style={{ flex: 1, height: 1, background: T.line }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['Kakao', 'Naver', 'Apple'].map(s => (
              <div key={s} style={{ padding: 12, borderRadius: T.rMd, background: T.card, fontSize: 13, textAlign: 'center', border: `1px solid ${T.line}`, fontWeight: 500 }}>{s}</div>
            ))}
          </div>

          <div style={{ marginTop: 28, fontSize: 13, color: T.ink2, textAlign: 'center' }}>
            {isSignup ? '이미 계정이 있나요? ' : '아직 계정이 없나요? '}
            <span style={{ color: T.ink, fontWeight: 600, borderBottom: `1px solid ${T.ink}` }}>{isSignup ? '로그인' : '회원가입'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text' }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 8 }}>{label}</div>
      <div style={{ background: T.card, borderRadius: T.rMd, padding: '14px 16px', fontSize: 14, color: T.ink3, border: `1px solid ${T.line}` }}>{placeholder}</div>
    </div>
  );
}

window.PageAuth = PageAuth;

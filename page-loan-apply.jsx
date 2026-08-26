// Page: 대출 신청 (3-step)

function PageLoanApply({ step = 1 }) {
  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav active="대출 신청" />
      <div style={{ padding: '32px 56px 16px' }}>
        <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>대출 / 신청</div>
        <h1 style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>
          대출 신청<br /><span style={{ color: T.ink3 }}>3단계로 끝납니다.</span>
        </h1>
      </div>

      {/* Stepper */}
      <div style={{ padding: '24px 56px', display: 'flex', gap: 0, alignItems: 'center' }}>
        {[
          ['01', '기본 정보', '대출 목적·금액·기간'],
          ['02', '담보 정보', '담보 종류·가치 평가'],
          ['03', '약관 동의', '검토 후 제출'],
        ].map(([n, t, sub], i) => {
          const isActive = i + 1 === step;
          const isDone = i + 1 < step;
          return (
            <React.Fragment key={n}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: T.rPill, background: isActive || isDone ? T.ink : T.card, color: isActive || isDone ? T.card : T.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fDisp, fontSize: 13, fontWeight: 600 }}>{isDone ? '✓' : n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? T.ink : T.ink2 }}>{t}</div>
                  <div style={{ fontSize: 11, color: T.ink3 }}>{sub}</div>
                </div>
              </div>
              {i < 2 && <div style={{ width: 80, height: 1, background: T.line, marginRight: 24 }}></div>}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ padding: '24px 56px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: T.gap, alignItems: 'start' }}>
        <div style={{ background: T.card, borderRadius: T.rLg, padding: 40 }}>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.line}` }}>
            <Btn variant="secondary">{step === 1 ? '취소' : '← 이전'}</Btn>
            <Btn size="md">{step === 3 ? '신청 제출' : '다음 →'}</Btn>
          </div>
        </div>

        {/* Live preview */}
        <div style={{ background: T.ink, color: T.card, borderRadius: T.rLg, padding: 28, position: 'sticky', top: 16 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>예상 대출 조건</div>
          <div style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, marginTop: 8 }}>
            연 <span style={{ color: '#7dd398' }}>9.4%</span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>신용 등급 A · LTV 58% 기준</div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '20px 0' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <PreviewRow k="대출 금액" v="3억원" />
            <PreviewRow k="대출 기간" v="12개월" />
            <PreviewRow k="월 이자" v="2,350,000원" />
            <PreviewRow k="만기 상환 원금" v="300,000,000원" />
            <PreviewRow k="총 이자 부담" v="28,200,000원" />
          </div>

          <div style={{ marginTop: 20, padding: 14, background: 'rgba(255,255,255,0.06)', borderRadius: T.rMd, fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            제출 후 평균 2영업일 이내 심사 결과를 알려드립니다. 심사 결과에 따라 조건이 변경될 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>STEP 01</div>
      <div style={{ fontFamily: T.fDisp, fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginBottom: 24 }}>기본 정보를 알려주세요</div>

      <FieldLabel>대출 목적</FieldLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
        {['리파이낸싱', '운영자금', '시설자금', '기타'].map((c, i) => (
          <div key={c} style={{ padding: 14, borderRadius: T.rMd, fontSize: 13, textAlign: 'center', background: i === 0 ? T.ink : T.bgSoft, color: i === 0 ? T.card : T.ink2, fontWeight: 500 }}>{c}</div>
        ))}
      </div>

      <FieldLabel>희망 대출 금액</FieldLabel>
      <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 4 }}>
          <span style={{ fontFamily: T.fDisp, fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>300,000,000</span>
          <span style={{ color: T.ink2 }}>원</span>
        </div>
        <div style={{ height: 4, background: T.card, borderRadius: T.rPill, overflow: 'hidden', marginTop: 12 }}>
          <div style={{ width: '30%', height: '100%', background: T.ink }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink2, marginTop: 6 }}>
          <span>1,000만원</span><span>최대 10억원</span>
        </div>
      </div>

      <FieldLabel>희망 대출 기간</FieldLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {['3M', '6M', '12M', '18M', '24M', '36M'].map((m, i) => (
          <div key={m} style={{ padding: 12, borderRadius: T.rMd, fontSize: 13, textAlign: 'center', background: i === 2 ? T.ink : T.bgSoft, color: i === 2 ? T.card : T.ink2, fontWeight: 500 }}>{m}</div>
        ))}
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>STEP 02</div>
      <div style={{ fontFamily: T.fDisp, fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginBottom: 24 }}>담보 정보를 입력해주세요</div>

      <FieldLabel>담보 종류</FieldLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
        {['부동산', '동산 / 매출채권', '기타'].map((c, i) => (
          <div key={c} style={{ padding: 16, borderRadius: T.rMd, fontSize: 13, textAlign: 'center', background: i === 0 ? T.ink : T.bgSoft, color: i === 0 ? T.card : T.ink2, fontWeight: 500 }}>{c}</div>
        ))}
      </div>

      <FieldLabel>부동산 종류</FieldLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
        {['아파트', '오피스텔', '상가', '토지'].map((c, i) => (
          <div key={c} style={{ padding: 14, borderRadius: T.rMd, fontSize: 13, textAlign: 'center', background: i === 1 ? T.ink : T.bgSoft, color: i === 1 ? T.card : T.ink2, fontWeight: 500 }}>{c}</div>
        ))}
      </div>

      <FieldLabel>주소 / 감정평가액</FieldLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, marginBottom: 24 }}>
        <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: '14px 16px', fontSize: 14, color: T.ink3 }}>서울시 강남구 역삼동 ...</div>
        <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: '14px 16px', fontSize: 14, textAlign: 'right' }}><b>2,200,000,000</b><span style={{ color: T.ink2 }}> 원</span></div>
      </div>

      <FieldLabel>선순위 채권 금액</FieldLabel>
      <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: '14px 16px', fontSize: 14, textAlign: 'right', marginBottom: 16 }}>
        <b>850,000,000</b><span style={{ color: T.ink2 }}> 원</span>
      </div>

      <div style={{ background: T.greenSoft, color: T.green, borderRadius: T.rMd, padding: '14px 18px', fontSize: 13, lineHeight: 1.65 }}>
        ✓ 자동 계산된 LTV: <b>61%</b> · peerbridge 인수 가능 범위 내 (최대 70%)
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>STEP 03</div>
      <div style={{ fontFamily: T.fDisp, fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginBottom: 24 }}>마지막으로 확인해주세요</div>

      <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, marginBottom: 24 }}>
        {[
          ['목적', '리파이낸싱'],
          ['금액', '3억원'],
          ['기간', '12개월'],
          ['담보', '오피스텔 (강남 역삼)'],
          ['감정평가액', '22.0억원'],
          ['선순위', '8.5억원'],
          ['LTV', '61%'],
          ['예상 금리', '연 9.4%'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.line}` }}>
            <span style={{ color: T.ink2 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['(필수) 대출 신청 약관', true],
          ['(필수) 신용정보 조회 동의', true],
          ['(필수) 개인정보 수집·이용', true],
          ['(선택) 마케팅 정보 수신', false],
        ].map(([t, c]) => (
          <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: T.bgSoft, borderRadius: T.rMd, fontSize: 13 }}>
            <input type="checkbox" defaultChecked={c} />
            <span style={{ flex: 1 }}>{t}</span>
            <span style={{ color: T.ink2, fontSize: 11 }}>보기 →</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FieldLabel({ children }) { return <div style={{ fontSize: 12, color: T.ink2, marginBottom: 10, fontWeight: 500 }}>{children}</div>; }
function PreviewRow({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{k}</span>
      <span style={{ fontFamily: T.fDisp, fontWeight: 500 }}>{v}</span>
    </div>
  );
}

window.PageLoanApply = PageLoanApply;

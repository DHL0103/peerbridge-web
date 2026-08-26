import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn } from '../tokens';
import { AppNav } from '../components/AppChrome';
import { apiPost, fieldError } from '../api';

const PURPOSES = ['리파이낸싱', '운영자금', '시설자금', '기타'];
const TERMS = [3, 6, 12, 18, 24, 36];
const MAX_AMOUNT = 1_000_000_000;

export default function LoanApply() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ purpose: PURPOSES[0], amount: 300_000_000, term_months: 12 });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function set(key) {
    return value => setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setErrors({});
    setLoading(true);
    try {
      await apiPost('/api/loans/applications/', {
        purpose: form.purpose,
        amount: form.amount,
        term_months: form.term_months,
      });
      navigate('/my-loans');
    } catch (err) {
      if (err.status === 401) { navigate('/login'); return; }
      setErrors(err.data || { _general: ['신청에 실패했습니다.'] });
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (step < 2) { setStep(step + 1); return; }
    handleSubmit();
  }

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav />
      <div style={{ padding: '32px 56px 16px' }}>
        <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>대출 / 신청</div>
        <h1 style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>
          대출 신청<br /><span style={{ color: T.ink3 }}>2단계로 끝납니다.</span>
        </h1>
      </div>

      <div style={{ padding: '24px 56px', display: 'flex', gap: 0, alignItems: 'center' }}>
        {[['01', '기본 정보', '대출 목적·금액·기간'], ['02', '확인 및 제출', '검토 후 제출']].map(([n, t, sub], i) => {
          const isActive = i + 1 === step;
          const isDone = i + 1 < step;
          return (
            <div key={n} style={{ display: 'contents' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: T.rPill, background: isActive || isDone ? T.ink : T.card, color: isActive || isDone ? T.card : T.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fDisp, fontSize: 13, fontWeight: 600 }}>{isDone ? '✓' : n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? T.ink : T.ink2 }}>{t}</div>
                  <div style={{ fontSize: 11, color: T.ink3 }}>{sub}</div>
                </div>
              </div>
              {i < 1 && <div style={{ width: 80, height: 1, background: T.line, marginRight: 24 }} />}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '24px 56px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: T.gap, alignItems: 'start' }}>
        <div style={{ background: T.card, borderRadius: T.rLg, padding: 40 }}>
          {step === 1 && <Step1 form={form} set={set} />}
          {step === 2 && <Step2 form={form} />}

          {errors._general && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 16 }}>{errors._general[0]}</div>}
          {fieldError(errors, 'amount') && <div style={{ fontSize: 12, color: '#c0392b', marginTop: 16 }}>{fieldError(errors, 'amount')}</div>}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.line}` }}>
            <Btn variant="secondary" onClick={() => step === 1 ? navigate('/my-loans') : setStep(step - 1)}>{step === 1 ? '취소' : '← 이전'}</Btn>
            <Btn size="md" disabled={loading} onClick={handleNext}>
              {step === 2 ? (loading ? '제출 중...' : '신청 제출') : '다음 →'}
            </Btn>
          </div>
        </div>

        <div style={{ background: T.ink, color: T.card, borderRadius: T.rLg, padding: 28, position: 'sticky', top: 16 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>신청 요약</div>
          <div style={{ fontFamily: T.fDisp, fontSize: 28, fontWeight: 600, letterSpacing: -1, marginTop: 8 }}>
            {form.amount.toLocaleString()}<span style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>원</span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{form.purpose} · {form.term_months}개월</div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '20px 0' }} />
          <div style={{ marginTop: 4, padding: 14, background: 'rgba(255,255,255,0.06)', borderRadius: T.rMd, fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            금리는 신청 시점에는 정해지지 않으며, 심사 승인 시 신용도에 따라 확정됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1({ form, set }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>STEP 01</div>
      <div style={{ fontFamily: T.fDisp, fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginBottom: 24 }}>기본 정보를 알려주세요</div>
      <FL>대출 목적</FL>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
        {PURPOSES.map(c => (
          <div key={c} onClick={() => set('purpose')(c)} style={{ padding: 14, borderRadius: T.rMd, fontSize: 13, textAlign: 'center', background: form.purpose === c ? T.ink : T.bgSoft, color: form.purpose === c ? T.card : T.ink2, fontWeight: 500, cursor: 'pointer' }}>{c}</div>
        ))}
      </div>
      <FL>희망 대출 금액</FL>
      <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 4 }}>
          <input
            type="number" min="1" max={MAX_AMOUNT} step="1000000" value={form.amount}
            onChange={e => set('amount')(Math.max(0, Number(e.target.value) || 0))}
            style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'right', width: '100%', fontFamily: T.fDisp, fontSize: 32, fontWeight: 600, letterSpacing: -1, color: T.ink }}
          />
          <span style={{ color: T.ink2 }}>원</span>
        </div>
        <div style={{ height: 4, background: T.card, borderRadius: T.rPill, overflow: 'hidden', marginTop: 12 }}>
          <div style={{ width: `${Math.min(100, (form.amount / MAX_AMOUNT) * 100)}%`, height: '100%', background: T.ink }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink2, marginTop: 6 }}>
          <span>1,000만원</span><span>최대 10억원</span>
        </div>
      </div>
      <FL>희망 대출 기간</FL>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {TERMS.map(m => (
          <div key={m} onClick={() => set('term_months')(m)} style={{ padding: 12, borderRadius: T.rMd, fontSize: 13, textAlign: 'center', background: form.term_months === m ? T.ink : T.bgSoft, color: form.term_months === m ? T.card : T.ink2, fontWeight: 500, cursor: 'pointer' }}>{m}M</div>
        ))}
      </div>
    </div>
  );
}

function Step2({ form }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>STEP 02</div>
      <div style={{ fontFamily: T.fDisp, fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginBottom: 24 }}>마지막으로 확인해주세요</div>
      <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, marginBottom: 24 }}>
        {[
          ['목적', form.purpose],
          ['금액', `${form.amount.toLocaleString()}원`],
          ['기간', `${form.term_months}개월`],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.line}` }}>
            <span style={{ color: T.ink2 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[['(필수) 대출 신청 약관', true], ['(필수) 신용정보 조회 동의', true], ['(필수) 개인정보 수집·이용', true], ['(선택) 마케팅 정보 수신', false]].map(([t, c]) => (
          <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: T.bgSoft, borderRadius: T.rMd, fontSize: 13 }}>
            <input type="checkbox" defaultChecked={c} /><span style={{ flex: 1 }}>{t}</span><span style={{ color: T.ink2, fontSize: 11 }}>보기 →</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FL({ children }) { return <div style={{ fontSize: 12, color: T.ink2, marginBottom: 10, fontWeight: 500 }}>{children}</div>; }

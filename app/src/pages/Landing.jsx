import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag, SectionHeader } from '../tokens';
import { fmtKRW, pct } from '../data';
import { BrandWordmark } from '../components/Brand';
import { AppNav } from '../components/AppChrome';
import { apiGet } from '../api';

export default function Landing() {
  const [loans, setLoans] = useState(null);

  useEffect(() => {
    apiGet('/api/loans/?status=FUNDRAISING')
      .then(data => setLoans(data.results))
      .catch(() => setLoans([]));
  }, []);

  return (
    <>
      <AppNav />
      <Hero loans={loans} />
      <ProductsList loans={loans} />
      <HowItWorks />
      <Calculator />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

function Hero({ loans }) {
  const navigate = useNavigate();
  const featured = loans?.[0];
  return (
    <div style={{ padding: '40px 56px 32px' }}>
      <div style={{ marginBottom: 28 }}>
        <Tag tone="green">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: T.green, display: 'inline-block' }} />
          {loans === null ? '모집중인 상품 불러오는 중' : `${loans.length}건 모집중`}
        </Tag>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'end' }}>
        <div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 0.98, margin: 0, color: T.ink }}>
            작게, 자주,<br /><span style={{ color: T.ink3 }}>오래.</span>
          </h1>
          <p style={{ fontSize: 18, color: T.ink2, marginTop: 28, lineHeight: 1.6, maxWidth: 520 }}>
            소액으로 시작하는 분산 투자.<br />복잡한 금융 상품을 아주 단순한 형태로 다시 설계했습니다.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <Btn size="lg" onClick={() => navigate('/signup')}>3분만에 시작하기 →</Btn>
            <Btn size="lg" variant="secondary" onClick={() => navigate('/products')}>상품 둘러보기</Btn>
          </div>
        </div>
        {featured && <FeaturedCard p={featured} />}
      </div>
    </div>
  );
}

function FeaturedCard({ p }) {
  const navigate = useNavigate();
  const raised = Number(p.funded_amount) / Number(p.target_amount);
  const dDay = Math.max(0, Math.ceil((new Date(p.funding_deadline) - new Date()) / 86_400_000));
  return (
    <div onClick={() => navigate(`/products/${p.id}`)} style={{ background: T.card, borderRadius: T.rLg, padding: 28, display: 'flex', flexDirection: 'column', gap: 20, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag>이번 주 추천</Tag>
        <span style={{ fontSize: 12, color: T.ink2 }}>D-{dDay}</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.35, color: T.ink, letterSpacing: -0.3 }}>{p.purpose}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: T.fDisp, fontSize: 76, fontWeight: 600, color: T.green, letterSpacing: -3, lineHeight: 1 }}>{p.investor_rate}</span>
        <span style={{ fontSize: 24, color: T.green, fontWeight: 600 }}>%</span>
        <span style={{ fontSize: 13, color: T.ink2, marginLeft: 8 }}>· {p.term_months}개월 · 세전</span>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.ink2, marginBottom: 8 }}>
          <span>모집률 {pct(raised)}</span>
          <span>잔여 {fmtKRW(Math.round(Number(p.target_amount) - Number(p.funded_amount)))}원</span>
        </div>
        <div style={{ height: 6, borderRadius: T.rPill, background: T.bg, overflow: 'hidden' }}>
          <div style={{ width: pct(raised), height: '100%', background: T.ink }} />
        </div>
      </div>
    </div>
  );
}

function ProductsList({ loans }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '64px 56px 32px' }}>
      <SectionHeader title="모집중인 상품" sub="관리자가 심사·승인한 상품만 만나보세요." />
      {loans === null && <div style={{ fontSize: 13, color: T.ink2 }}>불러오는 중...</div>}
      {loans?.length === 0 && <div style={{ fontSize: 13, color: T.ink2 }}>현재 모집중인 상품이 없습니다.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap }}>
        {loans?.slice(0, 6).map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      {loans?.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <Btn variant="secondary" onClick={() => navigate('/products')}>전체 상품 보기 →</Btn>
        </div>
      )}
    </div>
  );
}

function ProductCard({ p }) {
  const navigate = useNavigate();
  const raised = Number(p.funded_amount) / Number(p.target_amount);
  const dDay = Math.max(0, Math.ceil((new Date(p.funding_deadline) - new Date()) / 86_400_000));
  return (
    <div onClick={() => navigate(`/products/${p.id}`)} style={{ background: T.card, borderRadius: T.rLg, padding: 28, display: 'flex', flexDirection: 'column', gap: 18, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag>{p.term_months}개월</Tag>
        <span style={{ fontSize: 11, color: T.ink2 }}>D-{dDay}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: T.ink, letterSpacing: -0.3, minHeight: 44 }}>{p.purpose}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, color: T.green, letterSpacing: -1.8, lineHeight: 1 }}>{p.investor_rate}</span>
        <span style={{ fontSize: 18, color: T.green, fontWeight: 600 }}>%</span>
      </div>
      <div>
        <div style={{ height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: pct(raised), background: T.ink }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink2, marginTop: 8 }}>
          <span>{pct(raised)} · {fmtKRW(Number(p.target_amount))}원</span>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: '관리자 심사 후 금리 확정', body: '차주는 신청 시 금리를 정하지 않습니다. 관리자가 신용도를 보고 심사 시점에 금리를 책정해 승인합니다.' },
    { n: '02', title: '소액으로 분산 투자', body: '여러 상품에 나눠 투자할 수 있습니다. 투자금은 각 상품의 모집 비율에 따라 누적됩니다.' },
    { n: '03', title: '상환 시 비율대로 자동 분배', body: '차주가 회차를 상환하면 투자 비율에 따라 투자자에게 자동으로 분배되고, 거래내역에서 바로 확인할 수 있습니다.' },
  ];
  return (
    <div style={{ padding: '80px 56px' }}>
      <SectionHeader kicker="HOW IT WORKS" title={<>복잡함을 덜어내고,<br />필요한 것만 남겼습니다.</>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: T.gap }}>
        {steps.map(s => (
          <div key={s.n} style={{ background: T.card, borderRadius: T.rLg, padding: 32, minHeight: 280, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: T.fDisp, fontSize: 13, color: T.ink3, letterSpacing: 1, fontWeight: 500 }}>{s.n}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: T.ink, letterSpacing: -0.6, lineHeight: 1.25 }}>{s.title}</div>
            <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calculator() {
  const navigate = useNavigate();
  const principal = 1_000_000, months = 12, rate = 9.3;
  const interest = Math.round(principal * (rate / 100) * (months / 12));
  const tax = Math.round(interest * 0.154);
  const net = principal + interest - tax;
  return (
    <div style={{ padding: '80px 56px' }}>
      <div style={{ background: T.ink, color: T.card, borderRadius: T.rXl, padding: '56px 48px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>SIMULATOR</div>
          <div style={{ fontFamily: T.fDisp, fontSize: 48, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.1 }}>
            얼마를 넣으면<br />얼마가 돌아오는지<br /><span style={{ color: 'rgba(255,255,255,0.5)' }}>먼저 보세요.</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 24, lineHeight: 1.65, maxWidth: 380 }}>
            기간·금액·등급에 따른 예상 수익을 시뮬레이션해보고, 세금까지 반영한 실수령 기준으로 비교할 수 있습니다.
          </p>
          <Btn variant="secondary" style={{ marginTop: 28, background: T.card, color: T.ink, border: 'none' }} onClick={() => navigate('/products')}>계산기 열기 →</Btn>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: T.rLg, padding: 32, border: '1px solid rgba(255,255,255,0.10)' }}>
          <CalcRow k="투자 원금" v={`${(principal / 10_000).toLocaleString()}만 원`} />
          <CalcRow k="투자 기간" v={`${months}개월`} />
          <CalcRow k="목표 수익률" v={`${rate}% (세전)`} />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '20px 0' }} />
          <CalcRow k="예상 이자 수익" v={`+${interest.toLocaleString()}원`} />
          <CalcRow k="원천징수 세금 (15.4%)" v={`−${tax.toLocaleString()}원`} muted />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '20px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>실수령 예상액</span>
            <span style={{ fontFamily: T.fDisp, fontSize: 42, fontWeight: 600, color: '#7dd398', letterSpacing: -1.5 }}>
              {(net / 10_000).toLocaleString()}<span style={{ fontSize: 18, marginLeft: 4 }}>만 원</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalcRow({ k, v, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 14, color: muted ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)' }}>
      <span>{k}</span>
      <span style={{ fontFamily: T.fDisp, fontWeight: 500 }}>{v}</span>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: '최소 투자 금액이 정해져 있나요?', a: '별도의 최소/최대 한도는 두지 않았습니다. 상품 상세 페이지에서 투자 가능한 잔여 모집 금액을 확인할 수 있습니다.' },
    { q: '원금이 보장되나요?', a: '보장되지 않습니다. peerbridge의 모든 상품은 원금 손실 가능성이 있는 투자상품입니다.' },
    { q: '투자한 돈은 중도에 회수할 수 있나요?', a: '원칙적으로 만기 전 회수는 불가능합니다.' },
    { q: '예치금은 어떻게 관리되나요?', a: '예치금은 플랫폼 내 가상 잔액으로 관리되며, 충전·투자·분배 등 모든 자금 이동은 거래내역(원장)에 투명하게 기록됩니다.' },
    { q: '대출 금리는 누가, 어떻게 정하나요?', a: '차주는 신청 시 금리를 정하지 않습니다. 관리자가 신용도를 보고 심사 시점에 금리를 책정해 승인합니다.' },
  ];
  return (
    <div style={{ padding: '80px 56px' }}>
      <SectionHeader kicker="FAQ" title="자주 묻는 질문" sub="투자 전 가장 많이 받는 질문들을 정리했습니다." />
      <div style={{ background: T.card, borderRadius: T.rLg, overflow: 'hidden' }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} style={{ borderBottom: i < items.length - 1 ? `1px solid ${T.line}` : 'none' }}>
              <div onClick={() => setOpen(isOpen ? -1 : i)} style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>{it.q}</span>
                <span style={{ fontSize: 20, color: T.ink2, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', display: 'inline-block' }}>+</span>
              </div>
              {isOpen && <div style={{ padding: '0 32px 28px', fontSize: 14, color: T.ink2, lineHeight: 1.7, maxWidth: 760 }}>{it.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinalCTA() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px 56px 80px' }}>
      <div style={{ background: T.card, borderRadius: T.rXl, padding: '72px 56px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: T.fDisp, fontSize: 64, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1.05, margin: 0, color: T.ink }}>
          소액으로도<br />충분합니다.
        </h2>
        <p style={{ fontSize: 16, color: T.ink2, marginTop: 20, lineHeight: 1.6 }}>
          회원가입 후 바로 투자를 시작할 수 있습니다.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
          <Btn size="lg" onClick={() => navigate('/signup')}>지금 시작하기 →</Btn>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const navigate = useNavigate();
  const groups = [
    { t: '서비스', items: [{ l: '투자하기', p: '/products' }, { l: '진행중인 상품', p: '/products' }, { l: '나의 투자', p: '/dashboard' }] },
    { t: '회사', items: [{ l: '소개', p: '/about' }, { l: '자주 묻는 질문', p: '/' }] },
  ];
  return (
    <div style={{ padding: '80px 56px 56px', background: T.ink, color: T.card }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
        <div>
          <div style={{ marginBottom: 20 }}><BrandWordmark size={26} wordSize={18} gap={10} color={T.card} /></div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0, maxWidth: 320 }}>
            peerbridge는 P2P 대출 전 사이클(모집·투자·상환·분배)을 보여주는 개인 포트폴리오용 시뮬레이션 프로젝트입니다. 실제 금융 서비스가 아닙니다.
          </p>
        </div>
        {groups.map(g => (
          <div key={g.t}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontWeight: 500 }}>{g.t}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.items.map(it => (
                <li key={it.l} onClick={() => it.p && navigate(it.p)} style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', cursor: it.p ? 'pointer' : 'default' }}>{it.l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.10)', fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
        © 2026 peerbridge. 포트폴리오 데모 프로젝트입니다.
      </div>
    </div>
  );
}

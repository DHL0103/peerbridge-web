import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Btn, Tag, SectionHeader } from '../tokens';
import { STATS, fmtKRW, pct } from '../data';
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
      <TrustStats />
      <ProductsList loans={loans} />
      <HowItWorks />
      <TrustSafety />
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
            1만 원부터 시작하는 분산 투자.<br />복잡한 금융 상품을 아주 단순한 형태로 다시 설계했습니다.
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

function TrustStats() {
  const items = [
    { k: '누적 투자액', v: STATS.cumulativeInvestment, unit: '원', sub: '2019년 서비스 시작 이후' },
    { k: '평균 수익률', v: STATS.avgReturn, unit: '%', sub: '세전 · 가중 평균', accent: true },
    { k: '누적 부실률', v: STATS.defaultRate, unit: '%', sub: '업계 평균 대비 1/8 수준' },
  ];
  return (
    <div style={{ padding: '32px 56px' }}>
      <div style={{ background: T.card, borderRadius: T.rXl, padding: '40px 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {items.map((s, i) => (
          <div key={s.k} style={{ padding: '0 32px', borderRight: i < 2 ? `1px solid ${T.line}` : 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 13, color: T.ink2 }}>{s.k}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2.5, color: s.accent ? T.green : T.ink, lineHeight: 1 }}>{s.v}</span>
              <span style={{ fontSize: 22, color: s.accent ? T.green : T.ink2, fontWeight: 500 }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 12, color: T.ink3 }}>{s.sub}</div>
          </div>
        ))}
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
    { n: '01', title: '심사역이 직접 검토', body: '평균 18년 경력의 심사역이 차주사 현장 실사부터 담보 평가까지 한 건 한 건 직접 검토합니다.' },
    { n: '02', title: '한 곳에 분산 투자', body: '1만 원부터 여러 상품에 나눠 투자하세요. 부동산·동산·신용 등 자산 클래스별로 자동 분산해주는 포트폴리오 모드도 제공합니다.' },
    { n: '03', title: '매주 현장 리포트', body: '투자한 상품의 차주사 현장 사진과 진척 상황을 매주 메일로 받아보세요. 위험 신호는 일어나기 전에 먼저 알려드립니다.' },
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

function TrustSafety() {
  const items = [
    { k: '0.41%', sub: '누적 부실률', body: '7년간 누적 1.2조 원 운용 중 부실 발생액 49억 원. 업계 평균 3.2% 대비 1/8 수준.' },
    { k: '100%', sub: '담보 우선순위', body: '부동산 상품은 모두 선·후순위가 명확한 담보 기반. 평균 LTV 62% 유지.' },
    { k: '주 1회', sub: '현장 리포트', body: '심사 이후에도 매주 차주사 영업 현황과 담보 가치를 점검해 투자자에게 공유합니다.' },
    { k: '예치금 분리', sub: '신탁사 보관', body: '투자자 예치금은 KB국민은행 신탁계정에 별도 보관. 회사 운영자금과 완전 분리됩니다.' },
  ];
  return (
    <div style={{ padding: '80px 56px', background: T.bgSoft }}>
      <SectionHeader kicker="RISK & SAFETY"
        title={<>위험은 사라지지 않습니다.<br /><span style={{ color: T.ink3 }}>다만 먼저 알 수 있을 뿐.</span></>}
        sub="투자 손실의 가능성을 솔직하게 다루고, 그 가능성을 줄이는 데 모든 자원을 씁니다." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: T.gap }}>
        {items.map(it => (
          <div key={it.sub} style={{ background: T.card, borderRadius: T.rLg, padding: 32, display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: T.fDisp, fontSize: 44, fontWeight: 600, color: T.ink, letterSpacing: -1.8, lineHeight: 1 }}>{it.k}</div>
              <div style={{ fontSize: 12, color: T.ink2, marginTop: 8 }}>{it.sub}</div>
            </div>
            <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.65, borderLeft: `1px solid ${T.line}`, paddingLeft: 24 }}>{it.body}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: T.gap, padding: '20px 28px', borderRadius: T.rMd, border: `1px dashed ${T.lineStrong}`, fontSize: 12, color: T.ink2, lineHeight: 1.6 }}>
        <b style={{ color: T.ink, fontWeight: 600 }}>투자 위험 고지</b>
        &nbsp;&nbsp;원금 손실의 가능성이 있는 상품입니다. 과거 수익률이 미래 수익률을 보장하지 않으며, 투자 전 상품설명서·위험고지서를 반드시 확인해주세요.
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
    { q: '최소 투자 금액은 얼마인가요?', a: '상품당 1만 원부터 가능합니다. 분산 투자를 위해 한 상품 최대 투자 한도(보통 모집액의 5%)가 있습니다.' },
    { q: '원금이 보장되나요?', a: '보장되지 않습니다. peerbridge의 모든 상품은 원금 손실 가능성이 있는 투자상품이며, 7년간 누적 부실률은 0.41%입니다.' },
    { q: '세금은 어떻게 처리되나요?', a: '발생한 이자수익에 대해 15.4%가 원천징수되며, peerbridge가 자동으로 처리합니다.' },
    { q: '투자한 돈은 중도에 회수할 수 있나요?', a: '원칙적으로 만기 전 회수는 불가능합니다. 단, 일부 상품은 양도 게시판을 통해 다른 투자자에게 양도할 수 있습니다.' },
    { q: '예치금은 안전하게 보관되나요?', a: 'KB국민은행 신탁계정에 별도 보관됩니다. peerbridge의 운영자금과 완전히 분리되어 있습니다.' },
    { q: '심사역이 누구인지 알 수 있나요?', a: '회사소개 페이지에서 심사역 8명의 이력과 담당 자산 클래스를 확인할 수 있습니다.' },
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
          시작은 1만 원이면<br />충분합니다.
        </h2>
        <p style={{ fontSize: 16, color: T.ink2, marginTop: 20, lineHeight: 1.6 }}>
          가입부터 첫 투자까지 평균 3분.<br />본인인증과 계좌 연결만 하면 끝입니다.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
          <Btn size="lg" onClick={() => navigate('/signup')}>지금 시작하기 →</Btn>
          <Btn size="lg" variant="ghost">앱 다운로드</Btn>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const navigate = useNavigate();
  const groups = [
    { t: '서비스', items: [{ l: '투자하기', p: '/products' }, { l: '진행중인 상품', p: '/products' }, { l: '나의 투자', p: '/dashboard' }, { l: '리포트', p: '/dashboard' }, { l: '수익률 계산기', p: '/products' }] },
    { t: '회사', items: [{ l: '회사소개', p: '/about' }, { l: '심사역 소개', p: '/about' }, { l: '뉴스룸', p: '/about' }, { l: '채용', p: '/about' }, { l: '공지사항', p: '/about' }] },
    { t: '고객지원', items: [{ l: '자주 묻는 질문', p: '/' }, { l: '투자자 가이드', p: '/' }, { l: '보안 정책', p: '/' }] },
    { t: '법적 고지', items: [{ l: '이용약관' }, { l: '개인정보처리방침' }, { l: '위험고지서' }, { l: '상품설명서' }, { l: '전자금융거래약관' }] },
  ];
  return (
    <div style={{ padding: '80px 56px 56px', background: T.ink, color: T.card }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
        <div>
          <div style={{ marginBottom: 20 }}><BrandWordmark size={26} wordSize={18} gap={10} color={T.card} /></div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0, maxWidth: 320 }}>
            peerbridge는 작고 자주, 오래 가는 자산을 만드는 사람들을 위한 분산 투자 플랫폼입니다.
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
        (주)피어브릿지 · 대표 김신뢰 · 사업자등록번호 123-45-67890 · 서울시 강남구 테헤란로 123, 8층 · 금융위원회 등록 온라인투자연계금융업자(2021-XX-001) · © 2026 peerbridge.
      </div>
    </div>
  );
}

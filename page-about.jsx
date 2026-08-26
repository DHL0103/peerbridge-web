// Page: 서비스 소개 (About / 회사 소개)
// 비로그인 상태에서 접근하는 마케팅 페이지. Mainpage v4.html과 같은 톤이지만 더 에디토리얼하게.

function PageAbout() {
  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 0 }}>
      {/* simple public nav */}
      <div style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BrandWordmark size={22} wordSize={17} gap={8} />
        <div style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500, color: T.ink2 }}>
          <span>투자상품</span><span>대출 신청</span><span style={{ color: T.ink, paddingBottom: 4, borderBottom: `2px solid ${T.ink}` }}>회사 소개</span><span>고객센터</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="secondary" size="sm">로그인</Btn>
          <Btn size="sm">시작하기</Btn>
        </div>
      </div>

      {/* Editorial hero — magazine cover */}
      <div style={{ padding: '80px 56px 96px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, alignItems: 'end', borderBottom: `1px solid ${T.line}` }}>
        <div>
          <div style={{ fontSize: 12, color: T.ink2, letterSpacing: 2, marginBottom: 24 }}>ABOUT — VOL.04</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 120, fontWeight: 600, letterSpacing: -5, lineHeight: 0.9, margin: 0 }}>
            금융을<br /><span style={{ fontStyle: 'italic', color: T.ink2 }}>투명</span>하게,<br />작게.
          </h1>
        </div>
        <div style={{ paddingBottom: 16 }}>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: T.ink2, maxWidth: 380 }}>
            peerbridge는 2021년 시작된 온라인투자연계금융업자입니다. 1만 원부터 부동산·중소기업·매출채권에 분산 투자할 수 있도록, 그리고 차주가 합리적인 금리로 자금을 조달할 수 있도록, 양쪽을 직접 잇습니다.
          </div>
          <div style={{ fontSize: 13, color: T.ink3, marginTop: 24 }}>금융위원회 등록번호 2021-XX-001</div>
        </div>
      </div>

      {/* 우리의 원칙 — 4 columns */}
      <div style={{ padding: '80px 56px' }}>
        <div style={{ fontSize: 13, color: T.ink2, letterSpacing: 2, marginBottom: 24 }}>OUR PRINCIPLES</div>
        <div style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, marginBottom: 56, maxWidth: 920 }}>
          모든 의사결정은 <span style={{ fontStyle: 'italic' }}>네 가지 원칙</span> 위에서 이루어집니다.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, alignItems: 'start' }}>
          {[
            ['01', '직접 검토', '심사역이 모든 상품을 직접 보고 듣고 판단합니다. 알고리즘 점수만으로 통과시키지 않습니다.'],
            ['02', '공정한 가격', '플랫폼 수수료는 이자의 3%로 고정. 차주에게도 투자자에게도 숨은 비용이 없습니다.'],
            ['03', '실시간 공시', '연체율, 부실률, 평균 LTV를 매주 공개합니다. 좋은 숫자만 보여주지 않습니다.'],
            ['04', '작은 단위', '1만 원부터 시작합니다. 분산이 가능해야 위험을 통제할 수 있다고 믿습니다.'],
          ].map(([n, t, d]) => (
            <div key={n} style={{ borderTop: `1px solid ${T.lineStrong}`, paddingTop: 20 }}>
              <div style={{ fontFamily: T.fDisp, fontSize: 14, fontWeight: 600, letterSpacing: 1, color: T.ink2, marginBottom: 24 }}>{n}</div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, marginBottom: 12 }}>{t}</div>
              <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Numbers — large editorial */}
      <div style={{ padding: '80px 56px', background: T.ink, color: T.card }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', letterSpacing: 2, marginBottom: 56 }}>BY THE NUMBERS — 2026.10 기준</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            ['1,247억', '누적 투자액'],
            ['43,820', '누적 회원 수'],
            ['9.1%', '평균 수익률'],
            ['0.8%', '부실률'],
          ].map(([v, k], i) => (
            <div key={k} style={{ padding: '0 32px', borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.10)` : 'none' }}>
              <div style={{ fontFamily: T.fDisp, fontSize: 72, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)', marginTop: 16 }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '80px 56px' }}>
        <div style={{ fontSize: 13, color: T.ink2, letterSpacing: 2, marginBottom: 24 }}>HISTORY</div>
        <div style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, marginBottom: 56 }}>5년의 기록</div>

        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0 }}>
          {[
            ['2021', '회사 설립 · 금융위 등록', '서울 성수동에서 4명으로 시작. 첫 상품 모집 1억원.'],
            ['2022', '누적 100억 돌파', '회원 5,000명, 평균 수익률 8.2%. 부동산 담보 비중 60%.'],
            ['2023', '시리즈 A 투자 유치', 'KB인베스트먼트 외 50억원 조달. 매출채권 상품 출시.'],
            ['2024', '누적 500억 · 부실률 1% 미만', '심사 자동화 도입. 평균 모집 시간 18시간.'],
            ['2025', 'ISO 27001 인증 · 회원 3만명', '신뢰성 인증 획득. 차주 사이드 간소화 신청 도입.'],
            ['2026', '누적 1,000억 · 정식 운용 5년', '오늘. 그리고 다음 5년을 계속 만들어가는 중.'],
          ].map(([y, t, d], i, arr) => (
            <React.Fragment key={y}>
              <div style={{ fontFamily: T.fDisp, fontSize: 32, fontWeight: 600, letterSpacing: -0.5, color: i === arr.length - 1 ? T.ink : T.ink3, padding: '24px 0', borderTop: `1px solid ${T.lineStrong}` }}>{y}</div>
              <div style={{ padding: '24px 0', borderTop: `1px solid ${T.lineStrong}`, display: 'flex', gap: 32 }}>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4, flex: '0 0 320px' }}>{t}</div>
                <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.7, flex: 1 }}>{d}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ padding: '80px 56px', background: T.bgSoft }}>
        <div style={{ fontSize: 13, color: T.ink2, letterSpacing: 2, marginBottom: 24 }}>TEAM</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div style={{ fontFamily: T.fDisp, fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            금융, 기술, 신중함을<br />
            한 자리에 모았습니다.
          </div>
          <div style={{ fontSize: 13, color: T.ink2 }}>32명 · 서울 성수</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap }}>
          {[
            ['김도현', 'CEO · Co-founder', '前 카카오뱅크 신용평가팀'],
            ['이서연', 'CFO · Co-founder', '前 KB증권 IB본부 8년'],
            ['박지훈', 'CTO', '前 토스 백엔드 6년'],
            ['최예린', 'CRO · 리스크', '前 한국기업평가 9년'],
          ].map(([n, r, b]) => (
            <div key={n} style={{ background: T.card, borderRadius: T.rLg, padding: 28 }}>
              <div style={{ width: '100%', aspectRatio: '1', background: T.bgSoft, borderRadius: T.rMd, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: T.ink3, fontFamily: T.fDisp }}>{n[0]}</div>
              <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>{n}</div>
              <div style={{ fontSize: 12, color: T.ink2, marginTop: 4 }}>{r}</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 8, lineHeight: 1.6 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '120px 56px', textAlign: 'center' }}>
        <div style={{ fontFamily: T.fDisp, fontSize: 80, fontWeight: 600, letterSpacing: -3, lineHeight: 1, marginBottom: 32 }}>
          오늘부터 시작해도 늦지 않습니다.
        </div>
        <div style={{ fontSize: 17, color: T.ink2, marginBottom: 40 }}>1만 원이면 충분합니다.</div>
        <div style={{ display: 'inline-flex', gap: 12 }}>
          <Btn size="lg">투자 시작하기 →</Btn>
          <Btn size="lg" variant="secondary">대출 신청하기</Btn>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}

window.PageAbout = PageAbout;

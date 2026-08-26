// Footer + final CTA

function FinalCTA() {
  return (
    <div style={{ padding: '40px 56px 80px' }}>
      <div style={{
        background: T.card, borderRadius: T.rXl, padding: '72px 56px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: T.fDisp, fontSize: 64, fontWeight: 600,
          letterSpacing: -2.5, lineHeight: 1.05, margin: 0, color: T.ink,
        }}>
          시작은 1만 원이면<br />충분합니다.
        </h2>
        <p style={{ fontSize: 16, color: T.ink2, marginTop: 20, lineHeight: 1.6 }}>
          가입부터 첫 투자까지 평균 3분.<br />
          본인인증과 계좌 연결만 하면 끝입니다.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
          <Btn size="lg">지금 시작하기 →</Btn>
          <Btn size="lg" variant="ghost">앱 다운로드</Btn>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const groups = [
    { t: '서비스', items: ['투자하기', '진행중인 상품', '나의 투자', '리포트', '수익률 계산기'] },
    { t: '회사', items: ['회사소개', '심사역 소개', '뉴스룸', '채용', '공지사항'] },
    { t: '고객지원', items: ['고객센터', '1:1 상담', '자주 묻는 질문', '투자자 가이드', '보안 정책'] },
    { t: '법적 고지', items: ['이용약관', '개인정보처리방침', '위험고지서', '상품설명서', '전자금융거래약관'] },
  ];

  return (
    <div style={{ padding: '80px 56px 56px', background: T.ink, color: T.card }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
        <div>
          <div style={{ marginBottom: 20 }}>
            <BrandWordmark size={26} wordSize={18} gap={10} color={T.card} />
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0, maxWidth: 320 }}>
            peerbridge는 작고 자주, 오래 가는 자산을 만드는 사람들을 위한 분산 투자 플랫폼입니다.
            금융위원회 등록 온라인투자연계금융업자입니다.
          </p>
        </div>

        {groups.map(g => (
          <div key={g.t}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontWeight: 500 }}>{g.t}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.items.map(i => (
                <li key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.10)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, gap: 32, flexWrap: 'wrap',
      }}>
        <div style={{ maxWidth: 800 }}>
          (주)피어브릿지 · 대표 김신뢰 · 사업자등록번호 123-45-67890 · 통신판매업 2021-서울강남-01234<br />
          서울시 강남구 테헤란로 123, 8층 · 금융위원회 등록 온라인투자연계금융업자(2021-XX-001) · © 2026 peerbridge. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>한국어</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
          <span>English</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FinalCTA, Footer });

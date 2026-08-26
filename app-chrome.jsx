// App-wide nav and footer for logged-in pages.
// Slightly different from landing — shows balance + profile.

function AppNav({ active, balance = 4_280_000, notifs = 2 }) {
  const links = ['투자상품', '나의 투자', '대출 신청', '고객센터'];
  return (
    <div style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.bg, borderBottom: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <BrandWordmark size={22} wordSize={17} gap={8} />
        <div style={{ display: 'flex', gap: 28 }}>
          {links.map(l => (
            <span key={l} style={{ fontSize: 14, fontWeight: 500, color: l === active ? T.ink : T.ink2, paddingBottom: 4, borderBottom: l === active ? `2px solid ${T.ink}` : '2px solid transparent' }}>{l}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ background: T.card, borderRadius: T.rPill, padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
          <span style={{ color: T.ink2 }}>예치금</span>
          <span style={{ fontWeight: 600, fontFamily: T.fDisp }}>{balance.toLocaleString()}원</span>
        </div>
        <div style={{ position: 'relative', width: 36, height: 36, borderRadius: T.rPill, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
          🔔
          {notifs > 0 && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 999, background: '#c4452f' }}></span>}
        </div>
        <div style={{ width: 36, height: 36, borderRadius: T.rPill, background: T.ink, color: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>김</div>
      </div>
    </div>
  );
}

function AppFooter() {
  return (
    <div style={{ padding: '40px 56px', borderTop: `1px solid ${T.line}`, fontSize: 12, color: T.ink3, textAlign: 'center', lineHeight: 1.7 }}>
      (주)피어브릿지 · 금융위원회 등록 온라인투자연계금융업자 (2021-XX-001) · 학습용 시뮬레이터<br />
      © 2026 peerbridge — 투자 손실 가능성이 있는 상품입니다.
    </div>
  );
}

// Sidebar for mypage / 차입자 / admin
function Sidebar({ active, group = 'investor' }) {
  const groups = {
    investor: {
      title: '나의 투자',
      items: [
        { k: '대시보드', icon: '◐' },
        { k: '내 투자 내역', icon: '☰' },
        { k: '예치금', icon: '◇' },
        { k: '거래 내역', icon: '↔' },
        { k: '계정 설정', icon: '⚙' },
      ],
    },
    borrower: {
      title: '나의 대출',
      items: [
        { k: '대출 현황', icon: '◐' },
        { k: '대출 신청', icon: '＋' },
        { k: '상환 일정', icon: '☰' },
        { k: '신용 정보', icon: '◇' },
        { k: '계정 설정', icon: '⚙' },
      ],
    },
    admin: {
      title: '관리자',
      items: [
        { k: '대시보드', icon: '◐' },
        { k: '심사 대기', icon: '☰' },
        { k: '진행 상품', icon: '◇' },
        { k: '회원 관리', icon: '◯' },
        { k: '리스크', icon: '⚠' },
        { k: '시스템 설정', icon: '⚙' },
      ],
    },
  };
  const g = groups[group];
  return (
    <div style={{ width: 240, padding: '32px 16px', flexShrink: 0 }}>
      <div style={{ fontSize: 12, color: T.ink3, padding: '0 16px', marginBottom: 14, fontWeight: 500 }}>{g.title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {g.items.map(it => {
          const isActive = it.k === active;
          return (
            <div key={it.k} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', borderRadius: T.rMd,
              background: isActive ? T.card : 'transparent',
              color: isActive ? T.ink : T.ink2,
              fontSize: 14, fontWeight: isActive ? 600 : 500, cursor: 'pointer',
            }}>
              <span style={{ width: 16, color: isActive ? T.ink : T.ink3 }}>{it.icon}</span>
              {it.k}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { AppNav, AppFooter, Sidebar });

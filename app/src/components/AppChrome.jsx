import { useNavigate, useLocation } from 'react-router-dom';
import { T, Btn } from '../tokens';
import { BrandWordmark } from './Brand';
import { getCachedUser } from '../api';

const navLinks = [
  { label: '투자상품', path: '/products' },
  { label: '나의 투자', path: '/my-investments' },
  { label: '내 대출', path: '/my-loans' },
  { label: '대출 신청', path: '/loan/apply' },
];

const guestLinks = [
  { label: '투자상품', path: '/products' },
  { label: '회사소개', path: '/about' },
];

export function AppNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = getCachedUser();

  if (!user) {
    return (
      <div style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.bg, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <BrandWordmark size={22} wordSize={17} gap={8} />
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            {guestLinks.map(l => {
              const active = pathname.startsWith(l.path);
              return (
                <span key={l.label} onClick={() => navigate(l.path)}
                  style={{ fontSize: 14, fontWeight: 500, color: active ? T.ink : T.ink2, paddingBottom: 4, borderBottom: active ? `2px solid ${T.ink}` : '2px solid transparent', cursor: 'pointer' }}>
                  {l.label}
                </span>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span onClick={() => navigate('/login')} style={{ fontSize: 13, color: T.ink2, padding: '8px 14px', cursor: 'pointer' }}>로그인</span>
          <Btn size="sm" onClick={() => navigate('/signup')}>회원가입</Btn>
        </div>
      </div>
    );
  }

  const balance = Number(user?.balance ?? 0);
  const initial = user?.first_name?.[0] || user?.username?.[0] || '?';
  const links = user?.is_staff ? [...navLinks, { label: '관리자', path: '/admin' }] : navLinks;

  return (
    <div style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.bg, borderBottom: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <BrandWordmark size={22} wordSize={17} gap={8} />
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {links.map(l => {
            const active = pathname.startsWith(l.path);
            return (
              <span key={l.label} onClick={() => navigate(l.path)}
                style={{ fontSize: 14, fontWeight: 500, color: active ? T.ink : T.ink2, paddingBottom: 4, borderBottom: active ? `2px solid ${T.ink}` : '2px solid transparent', cursor: 'pointer' }}>
                {l.label}
              </span>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div onClick={() => navigate('/deposit')} style={{ background: T.card, borderRadius: T.rPill, padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
          <span style={{ color: T.ink2 }}>예치금</span>
          <span style={{ fontWeight: 600, fontFamily: T.fDisp }}>{balance.toLocaleString()}원</span>
        </div>
        <div onClick={() => navigate('/settings')} style={{ width: 36, height: 36, borderRadius: T.rPill, background: T.ink, color: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{initial}</div>
      </div>
    </div>
  );
}

export function AppFooter() {
  return (
    <div style={{ padding: '40px 56px', borderTop: `1px solid ${T.line}`, fontSize: 12, color: T.ink3, textAlign: 'center', lineHeight: 1.7 }}>
      (주)피어브릿지 · 금융위원회 등록 온라인투자연계금융업자 (2021-XX-001) · 학습용 시뮬레이터<br />
      © 2026 peerbridge — 투자 손실 가능성이 있는 상품입니다.
    </div>
  );
}

const sidebarGroups = {
  investor: {
    title: '나의 투자',
    items: [
      { k: '대시보드', icon: '◐', path: '/dashboard' },
      { k: '내 투자 내역', icon: '☰', path: '/my-investments' },
      { k: '예치금', icon: '◇', path: '/deposit' },
      { k: '계정 설정', icon: '⚙', path: '/settings' },
    ],
  },
  borrower: {
    title: '나의 대출',
    items: [
      { k: '대출 현황', icon: '◐', path: '/my-loans' },
      { k: '대출 신청', icon: '＋', path: '/loan/apply' },
      { k: '상환 일정', icon: '☰', path: '/repay' },
      { k: '신용 정보', icon: '◇', path: '/my-loans' },
      { k: '계정 설정', icon: '⚙', path: '/settings' },
    ],
  },
  admin: {
    title: '관리자',
    items: [
      { k: '대시보드', icon: '◐', path: '/admin' },
      { k: '심사 대기', icon: '☰', path: '/admin' },
      { k: '진행 상품', icon: '◇', path: '/admin' },
      { k: '회원 관리', icon: '◯', path: '/admin' },
      { k: '리스크', icon: '⚠', path: '/admin' },
      { k: '시스템 설정', icon: '⚙', path: '/admin' },
    ],
  },
};

export function Sidebar({ active, group = 'investor' }) {
  const navigate = useNavigate();
  const g = sidebarGroups[group];
  return (
    <div style={{ width: 240, padding: '32px 16px', flexShrink: 0 }}>
      <div style={{ fontSize: 12, color: T.ink3, padding: '0 16px', marginBottom: 14, fontWeight: 500 }}>{g.title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {g.items.map(it => {
          const isActive = it.k === active;
          return (
            <div key={it.k} onClick={() => navigate(it.path)} style={{
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

// Nav — peerbridge brand

function Nav() {
  return (
    <div style={{ padding: '24px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <BrandWordmark size={26} wordSize={18} gap={8} color={T.ink} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {NAV.map((x, i) => (
          <span key={x} style={{
            fontSize: 14, fontWeight: 500, color: i === 0 ? T.ink : T.ink2, cursor: 'pointer',
          }}>{x}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: T.ink2, padding: '8px 14px', cursor: 'pointer' }}>로그인</span>
        <Btn size="sm">회원가입</Btn>
      </div>
    </div>
  );
}

window.Nav = Nav;

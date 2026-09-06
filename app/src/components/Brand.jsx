import { T } from '../tokens';

export function BrandMark({ size = 28, color = '#16140f' }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, display: 'block' }} aria-label="peerbridge">
      <rect x="14" y="32" width="20" height="60" rx="10" fill={color} />
      <rect x="66" y="32" width="20" height="60" rx="10" fill={color} />
      <rect x="8" y="20" width="84" height="10" rx="5" fill={color} />
      <circle cx="50" cy="60" r="4" fill={color} />
    </svg>
  );
}

export function BrandWordmark({ size = 28, color = '#16140f', wordSize = 18, gap = 8 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandMark size={size} color={color} />
      <span style={{ fontSize: wordSize, fontWeight: 700, letterSpacing: -0.5, color, fontFamily: T.fDisp }}>peerbridge</span>
    </div>
  );
}

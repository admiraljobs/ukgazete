import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #1d70b8, #1e3a5f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 72,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-2px',
        }}
      >
        UK
      </div>
    ),
    { ...size }
  );
}

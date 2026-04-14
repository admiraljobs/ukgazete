import { ImageResponse } from 'next/og';

export const alt = 'UK ETA Service — Apply for UK Electronic Travel Authorisation Online';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#f4f7fb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            padding: '56px 72px',
            background: 'white',
            borderRadius: 24,
            border: '1px solid #dde6f0',
            width: 1000,
          }}
        >
          {/* Logo + name row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: '#1d70b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              UK
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>
                UK ETA Service
              </span>
              <span style={{ fontSize: 16, color: '#5b7fa6', marginTop: 2 }}>
                Electronic Travel Authorisation
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              lineHeight: 1.2,
              display: 'flex',
            }}
          >
            Apply for Your UK ETA Online
          </div>

          <div
            style={{
              fontSize: 22,
              color: '#5b7fa6',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            Fast · Secure · Expert Review · 5 Languages
          </div>

          {/* Badges row */}
          <div style={{ display: 'flex', gap: 12 }}>
            {['✓ 3-Day Approval', '✓ 256-bit Encrypted', '✓ 2,400+ Approved'].map((badge) => (
              <div
                key={badge}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  background: '#eef2f8',
                  borderRadius: 50,
                  fontSize: 16,
                  color: '#1d70b8',
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

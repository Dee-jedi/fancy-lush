import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050404',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'serif',
          borderRadius: '4px',
          border: '1px solid #D4AF37',
        }}
      >
        FL
      </div>
    ),
    { ...size }
  )
}

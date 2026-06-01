import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/greatvibes/v21/RWmMoKWR9v4ksMfaWd_JN-XC.ttf')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          fontSize: 26,
          fontFamily: '"Great Vibes"',
        }}
      >
        FL
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Great Vibes',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}

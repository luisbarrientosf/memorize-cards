import { Oswald } from 'next/font/google'
import '../app/globals.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Oswald({ subsets: ['latin'] })
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
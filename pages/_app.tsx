import '../app/globals.css';
import { Oswald } from 'next/font/google';


const inter = Oswald({ subsets: ['latin'] })
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
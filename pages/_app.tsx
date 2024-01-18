import '../app/globals.css';
import { AppProps } from 'next/app';
import { Oswald } from 'next/font/google';


const inter = Oswald({ subsets: ['latin'] })
export default function MyApp({ Component, pageProps } : AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
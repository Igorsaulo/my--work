import '../styles/globals.css'
import Layout from './Component/Layout'

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
prisma.$connect()
export default MyApp

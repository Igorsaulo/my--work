import '../styles/globals.css'
import Layout from './Component/Layout'
import { db } from '../utils/firebase/firebase'
import { collection,query,orderBy,onSnapshot } from 'firebase/firestore'

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

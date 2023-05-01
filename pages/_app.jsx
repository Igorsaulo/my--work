import '../styles/globals.css'
import Layout from './Component/Layout'
import { db } from '../utils/firebase/firebase'
import { collection,query,orderBy,onSnapshot } from 'firebase/firestore'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

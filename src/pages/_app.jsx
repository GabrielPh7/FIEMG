import '../styles/globals.scss'
import { AuthProvider } from "../context/AuthContext"
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  ) 
}

export default MyApp

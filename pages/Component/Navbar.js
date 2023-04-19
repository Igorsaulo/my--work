import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';


export default function Navbar(){
    const [isVisible,setIsVisible] = useState(false);
    const router = useRouter()
    function logOut(){
        Cookies.remove('NextCoockie')
        router.push('/')

    }
    return (
        <nav className={styles.navbar}>
        <div>
            <div className={styles.navComponents}>
                <p>Logo</p>
                <input className={styles.searchButton} type='text' placeholder='buscar'></input>
            </div>
        </div>
        <div>
            <div className={styles.navComponents}>
                 <div className={styles.navPhoto}></div>
                <Link id={styles.linkbtn} onClick={()=> setIsVisible(!isVisible)} href="#"><MenuIcon/></Link>
            </div>
        </div>
        {isVisible && (
        <div className={styles.menu}>
          <Link href='/profile'>Perfil</Link>
          <Link href='/account'>Conta</Link>
          <Link href='/config'>Configuração</Link>
          <Link href='/' onClick={logOut()}>Logout</Link>
        </div>
      )}
        </nav>
    )
}
import Link from 'next/link'
import styles from '../../styles/NavbarHome.module.css'
import { useRouter } from "next/router";
import Cookies from "js-cookie"

export default function HomeNavbar(){
    const router = useRouter()
    function logOut(){
        Cookies.remove('NextCoockie')
        router.push('/')

    }
    return (
        <nav className={styles.navbarhome}>
            <div>
                <p>My-Work</p>
            </div>
            <div className={styles.signbtn}>
                <a href='/register'>Sigin</a>
            </div>
        </nav>
    )
}
import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'
import { useRouter } from "next/router";
import Cookies from "js-cookie"

export default function HomeNavbar(){
    const router = useRouter()
    function logOut(){
        Cookies.remove('NextCoockie')
        router.push('/')

    }
    return (
        <nav className={styles.navbar}>
        <h3>My-work</h3>
        </nav>
    )
}
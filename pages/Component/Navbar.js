import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import SearchArea from "./Searcharea";
import { useForm } from "react-hook-form"
import axios from "axios"


export default function Navbar(){
    const [isVisible,setIsVisible] = useState(false);
    const [users,setUsers] = useState(false);
    const router = useRouter()
    const {register ,handleSubmit } = useForm();
    async function searchUsernames(data){
        const response = await axios.post('/api/friends', { username: data.username } );
        console.log(data.username)
        setUsers(response.data.data)
        setUsers(true)
        
    }
    function logOut(){
        Cookies.remove('NextCoockie')
        router.push('/')

    }
    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    <div className={styles.navComponents}>
                        <p>Logo</p>
                        <form  onSubmit={handleSubmit(searchUsernames)}>
                            <input {...register('username')} className={styles.searchButton} name='username' type='text' placeholder='buscar'/>
                            <button type='submit'>B</button>
                        </form>
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
                            <Link href='/' onClick={logOut}>Logout</Link>
                        </div>
                    )}
            </nav>
           { users && (
            <SearchArea users={users} />
           )}
        </>
    )
}
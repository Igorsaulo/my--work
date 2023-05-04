import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { CollectionsOutlined, People } from '@material-ui/icons';
import { useState,useContext,useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import SearchArea from "./Searcharea";
import { useForm } from "react-hook-form"
import axios from "axios"
import { Badge } from '@material-ui/core';


export default function Navbar(){
    const [convites,setConvites] = useState([])
    const [count,setCount] = useState(1)
    const { user } = useContext(AuthContext);
    const [isVisible,setIsVisible] = useState(false);
    const [ notification,setNotification] = useState(false);
    const [solicitacao,setSolicitacao] = useState()
    const [users,setUsers] = useState(false);
    const router = useRouter()
    const {register ,handleSubmit } = useForm();
    async function searchUsernames(data){
        const response = await axios.post('/api/friends', { username: data.username } );
        console.log(response.data.data)
        setUsers(response.data.data)
        
    }
    function logOut(){
        Cookies.remove('NextCoockie')
        router.push('/')

    }
    useEffect(()=>{
        // if(user){
        //     user.solicitacao.map((solicit)=>{
        //         if(solicit.remetente != user.id) setConvites(solicit.remetente);
        //     })
        if (user) {
            const novosConvites = user.solicitacao
              .filter(solici => solici.remetente !== user.id)
              .map(solici => solici.remetente);
            setConvites(convitesAntigos => [...convitesAntigos, ...novosConvites]);
          }
    },[user])
    useEffect(()=>{
            setCount(convites.length)
            console.log(convites)
    },[convites])
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
                    <div className={styles.navPhoto} onClick={()=> setIsVisible(!isVisible)}>
                        </div>
                        <Badge color='error' badgeContent={count} max={999} >
                        <Link id={styles.linkbtn} onClick={()=> setSolicitacao(!solicitacao)} href="#"><People/></Link>
                        </Badge>
                        <Badge color='error' badgeContent={1000} max={999} >
                        <Link id={styles.linkbtn} onClick={()=> setNotification(!notification)} href="#"><NotificationsIcon/></Link>
                        </Badge>
                        <Link id={styles.linkbtn} onClick={()=> setIsVisible(!isVisible)} href="#"><MenuIcon/></Link>
                    </div>
                </div>
                {solicitacao && (
                    <div className={styles.notification}>
                        <h3>Notificações</h3>
                        <div className={styles.notificationContainer}>
                            <div  className={styles.notificationItens}>Item 1</div>
                            <div className={styles.notificationItens}>Item 2</div>
                            <div className={styles.notificationItens}>Item 2</div>
                            <div className={styles.notificationItens}>Item 2</div>
                        </div>                      
                    </div>
                )}
                    {isVisible && (
                        <div className={styles.menu}>
                            <Link href='/profile'>Perfil</Link>
                            <Link href='/account'>Conta</Link>
                            <Link href='/config'>Configuração</Link>
                            <Link href='/' onClick={logOut}>Logout</Link>
                        </div>
                    )}
                    {notification && (
                        <div className={styles.notification}>
                            <h3>Notificações</h3>
                            <div className={styles.notificationContainer}>
                                <div  className={styles.notificationItens}>Item 1</div>
                                <div className={styles.notificationItens}>Item 2</div>
                                <div className={styles.notificationItens}>Item 2</div>
                                <div className={styles.notificationItens}>Item 2</div>
                            </div>                      
                        </div>
                    )}
            </nav>
            { users && (
            <SearchArea users={users} />
           )}
        </>
    )
}
import styles from '../../styles/Profile.module.css'
import Chat from '../Component/Chat';
import CardPhoto from '../Component/PhotoCard';
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
const jwt = require('jsonwebtoken')
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export default function Profile(){
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [username, setUsername] = useState('');
const [chat, setChat] = useState(false);
const chatId = 1;


useEffect(() => {
    const coockie = Cookies.get('NextCoockie')
    if (coockie){
        axios.post('/api/login',{token:coockie}).then(response =>{
            const auth =response.data.auth
            if(auth){
                setUsername(response.data.dados)
                setIsAuthenticated(true)
            }
        })
    }
}, [])


if(isAuthenticated){
    return (
        <>
            <main className={styles.main}>
                <div className={styles.background}>

                </div>
                <div className={styles.pofilePhoto}>
                    <p className={styles.edit}><FontAwesomeIcon icon={faPenToSquare}/></p>
                </div>
                <div className={styles.username}>
                    <p>{username.username}</p>
                </div>
                <div className={styles.bio}>
                    <p>My text generic bio text rexr text rtexfadvb gddgbgg gdsgddgs gdsdsdg
                    sahshdgsdg gdgsdxg gdsbhdsbhdh dbdhgdjshs hdsjdsh hdshh usdhgsudh hdjshdsh hdsh</p>
                </div>
                <div className={styles.photoContainer}>
                    <div className={styles.photoContainerText}>
                        <p>Albums</p>
                    </div>
                    <div className={styles.containerCards}>
                        <CardPhoto/>
                    </div>
                </div>
            </main>
            <Chat user={username} chatId={chatId} />
        </>
    )
}
else{
    return(
        <h1>Privado</h1>
    )
}
}
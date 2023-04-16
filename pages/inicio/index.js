import Cookies from "js-cookie"
const jwt = require('jsonwebtoken')
import axios from "axios"
import { useState, useEffect } from "react"
import Chat from "../Component/Chat"
import styles from '../../styles/Dashboard.module.css'
import AuthtenticationClient from "../../utils/authenticationClient"

export default function Inicio(){
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
                <div className={styles.serviceContainer}>
                </div>
                <div>
                <Chat user={username} chatId={chatId} />
                </div>
                </main>
            </>
        )
    }
    else{
        return(
            <h1>Privado</h1>
        )
    }
}

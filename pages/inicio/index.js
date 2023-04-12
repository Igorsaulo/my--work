import Cookies from "js-cookie"
const jwt = require('jsonwebtoken')
import axios from "axios"
import { useState, useEffect } from "react"
import Chat from "../Component/Chat"
import Chatbox from "../Component/chatbox"
import styles from '../../styles/Dashboard.module.css'

export default function Inicio(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [chat, setChat] = useState(false);

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

    const chatFunc = () => {
        setChat(true)
    }

    if(isAuthenticated){
        return (
            <>
                <main className={styles.main}>
                <div className={styles.serviceContainer}>
                </div>
                <div onClick={chatFunc}>
                <Chat user={username} />
                </div>
                { chat && (
                    <Chatbox/>
                )}
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

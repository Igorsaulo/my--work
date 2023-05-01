import Cookies from "js-cookie"
import Chat from "../Component/Chat"
import styles from '../../styles/Dashboard.module.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export default function Inicio(){
    const coockie = Cookies.get('NextCoockie')
    const { user } = useContext(AuthContext);
    const chatId = 1;

        return (
            <>
                <main className={styles.main}>
                <div className={styles.serviceContainer}>
                </div>
                <div>
                <Chat user={user} chatId ={chatId}/>
                </div>
                </main>
            </>
        )
}
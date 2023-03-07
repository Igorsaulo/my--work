import styles from '../../styles/Chat.module.css'
import Image from 'next/image'
import imagem from '../../public/315281570_1330066611099327_3957239708455660094_n.jpg'

export default function Chat(props){
    const {username} = props.user;
    console.log(username)
    return(
        <>
            <div className={styles.chat}>
                <div className={styles.chatHeader}>
                    <p>Contatos</p>
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div className={styles.userBox}>
                        <div>
                            <Image 
                                src={imagem}
                                width={40}
                                height={40}
                                style={{borderRadius:20}}
                            />                            
                        </div>
                        <div>
                            <p>{username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import styles from '../../../styles/Profile.module.css'
import Chat from '../../Component/Chat';


export default function Profile(){
    const username = 'Mariocard';
    const chatId = 1;
    return (
        <>
            <main className={styles.main}>
                <div className={styles.background}>

                </div>
                <div className={styles.pofilePhoto}>

                </div>
                <div className={styles.username}>
                    <p>Username</p>
                </div>
                <div className={styles.bio}>
                    <p>My text generic bio text rexr text rtexfadvb gddgbgg gdsgddgs gdsdsdg
                    sahshdgsdg gdgsdxg gdsbhdsbhdh dbdhgdjshs hdsjdsh hdshh usdhgsudh hdjshdsh hdsh</p>
                </div>
                <div className={styles.photoContainer}>
                    <div className={styles.photoContainerText}>
                        <p>Albúms</p>
                    </div>
                </div>
            </main>
            <Chat user={username} chatId={chatId} />
        </>
    )
}
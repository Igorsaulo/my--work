import { useContext, useEffect, useState } from 'react'
import styles from '../../styles/Navbar.module.css'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext'

export default function Solicitaitens(props){
    const {userId} = props
    const [ friendUser, setFriendUSer ] = useState(null)
    const { user, updateUser} = useContext(AuthContext);
    
    const acepteUser = async()=>{
        const userup = await axios.patch('/api/friends', { myuserid: user.id,frienduserid:friendUser.id,solicitacaoId:userId.id });
    }
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            if (userId) {
                const userup = await axios.post('/api/photoprofile', { id: userId.remetente });
                if (isMounted) {
                    setFriendUSer(userup.data);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [userId]);
    return (
        <div className={styles.notificationItens}>
            <div className={styles.photoSolicit}>
                <img src={friendUser?.profilephoto} alt={`${friendUser?.username} profile photo`} />
            </div>
            <div className={styles.aceptAndinfos}>
                <p>{friendUser?.username}</p>
                <p>{friendUser?.bio}</p>
                <button onClick={acepteUser}>Aceitar</button>
                <button>Recusar</button>
            </div>
        </div>
    )
}

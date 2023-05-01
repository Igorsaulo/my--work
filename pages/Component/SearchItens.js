import axios from 'axios'
import styles from '../../styles/Searcharea.module.css'
import Cookies from "js-cookie";
import { AuthtenticationClient } from '../../utils/authenticationClient';
import { useEffect } from 'react';

export default  function Searchitens(props){
    const coockie = Cookies.get('NextCoockie');
    const myuser = async() =>{
        const user = await AuthtenticationClient(coockie)
        return user
    }
     const { user } = props
    async function requestFriend(){
        const primarryuser = await myuser()
        const myuserid = primarryuser.dados.id
        const response = axios.patch('/api/friends/add',{myuserid:myuserid,frienduserid:user.id})
    }
    return(
        <div className={styles.searchItem}>
                <div className={styles.photoContainer}>
            <div className={styles.photo}>
                <img src={user?.profilephoto} />
            </div>
        </div>
        <div className={styles.infosContainer}>
            <p>{user?.username}</p>
            <p>{user?.bio}</p>
            <button onClick={requestFriend}>Adcionar</button>
        </div>
    </div>
    )
}
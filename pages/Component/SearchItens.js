import axios from 'axios'
import styles from '../../styles/Searcharea.module.css'
import Cookies from "js-cookie";
import { AuthtenticationClient } from '../../utils/authenticationClient';
import { useEffect } from 'react';

export default async function Searchitens(props){
    const coockie = Cookies.get('NextCoockie');
    const myuser = await AuthtenticationClient(coockie)
     const { user } = props
    async function requestFriend(id){
        const response = await axios.patch('api/friends/add',{myuserid:myuser.dados.id, frienduserid: user.id})
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
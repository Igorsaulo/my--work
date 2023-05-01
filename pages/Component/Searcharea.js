import axios from "axios";
import styles from '../../styles/Searcharea.module.css'
import Searchitens from "./SearchItens";

export default function SearchArea(props){
    let { users } = props
    users?.map(user => {
         if (!user.bio) {
           user.bio = 'Hello my friend';
         }
       });
       console.log(users)
    return(
        <div className={styles.seachContainer}>
        {users?.map(user=>{
          return <Searchitens user={user}/>
        })}
        </div>
    )
}
import styles from '../../styles/Profile.module.css'
import CardPhoto from '../Component/PhotoCard';
import { useState, useEffect, useContext } from "react"
import {
    faEnvelopeOpenText,
    faPenToSquare,
  } from "@fortawesome/free-solid-svg-icons";
import { PaginationComponent } from "../Component/Pagination";
import { compactToPagination } from "../../utils/tratamentArrayFilterPagination";
import { Upload } from '../../utils/upload';
import { AuthContext } from '../../contexts/AuthContext';
import Uploadform from '../Component/Uploadform';
import Profileupload from '../Component/Profileupload';
  


export default function Profile(){
    const upload = new Upload()
    const [listImages, setListImages] = useState([]);
    const [positionPage, setPositionPage] = useState(0);
    const {user, updateUser } = useContext(AuthContext);
    const [photoedit,setPhotoedit] = useState(false);
    const [ isVisible,setIsvisible] = useState(false);
    const cancelPload = ()=> setIsvisible(false)
    const renderPload = ()=> setIsvisible(true)
    const renderEdit= ()=> setPhotoedit(true)
    const cancelEdit = ()=> setPhotoedit(false)


  useEffect(()=>{
    if(user){
        setListImages(compactToPagination(user.photos, 6));
        console.log(user.username)
    }
  },[user])




if(user){
    return (
        <>
            <main className={styles.main}>
                <div className={styles.background}>
                </div>
                <div onClick={renderEdit}  className={styles.pofilePhoto}>
                    <img src={user.profilephoto} />
                </div>
                <div className={styles.username}>
                    <p>{user.username}</p>
                </div>
                <div className={styles.bio}>
                    <p>My text generic bio text rexr text rtexfadvb gddgbgg gdsgddgs gdsdsdg
                    sahshdgsdg gdgsdxg gdsbhdsbhdh dbdhgdjshs hdsjdsh hdshh usdhgsudh hdjshdsh hdsh</p>
                </div>
                <div onClick={renderPload}  className={styles.photoContainer}>
                    <div className={styles.photoContainerText}>
                        <p>Albums</p>
                    </div>
                    <div className={styles.containerCards}>
                        {listImages[positionPage]?.map((photo, index) => (
                            <CardPhoto key={index} url={photo} />
                        ))}
                    </div>
                </div>
                <PaginationComponent
                    pageCount={listImages?.length}
                    onPageChange={(value) => setPositionPage(value.selected)}
                />
                { photoedit && (
                    <div className={styles.uploadBox}>
                    <Profileupload/>
                    <button type='button' onClick={cancelEdit}>X</button>
                </div>
                )}
                {isVisible && (
                    <div className={styles.uploadBox}>
                        <Uploadform/>
                        <button type='button' onClick={cancelPload}>X</button>
                    </div>
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

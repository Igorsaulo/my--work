import styles from '../../styles/Profile.module.css'
import Chat from '../Component/Chat';
import CardPhoto from '../Component/PhotoCard';
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase/firebase';
import { AuthtenticationClient } from '../../utils/authenticationClient';
import { profilePhoto } from '../../utils/profilePhoto';
import {
    faEnvelopeOpenText,
    faPenToSquare,
  } from "@fortawesome/free-solid-svg-icons";
import { PaginationComponent } from "../Component/Pagination";
import { compactToPagination } from "../../utils/tratamentArrayFilterPagination";
import { Upload } from '../../utils/upload';
  


export default function Profile(){
    const upload = new Upload()
    const [listImages, setListImages] = useState([]);
    const [positionPage, setPositionPage] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const chatId = 1;
    const [photoedit,setPhotoedit] = useState(false);
    const [files, setFiles] = useState([]);
    const [photoupload,setPhotoupload] = useState(false);

    
useEffect(async () => {
    const coockie = Cookies.get('NextCoockie');
    const dados = await AuthtenticationClient(coockie)
    if(dados.auth){
        const updateuser = await profilePhoto(dados.dados)
        setUser(updateuser);
        setIsAuthenticated(true);
       
    }
  }, []);

  useEffect(()=>{
    if(user){
        setListImages(compactToPagination(user.photos, 6));
        console.log(user)
    }
  },[user])

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    const updateuser = await upload.uploadPhoto(user,file,true)
    setUser(updateuser);
    setPhotoedit(false)
};


const photosUpload = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    const updateuser = await upload.uploadPhoto(user,file,false)
    setUser(updateuser);
    setPhotoupload(false)
};


const renderEdit= ()=> setPhotoedit(true)
const renderPload = ()=> setPhotoupload(true)
const cancelEdit = ()=> setPhotoedit(false)


if(isAuthenticated){
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
                <Chat user={user} chatId={chatId} />
                { photoedit && (
                    <div className={styles.uploadBox}>
                    <div>

                    </div>
                    <div>
                        <form onSubmit={handleUpload}>
                            <input type="file" />
                            <button type='submit'>Enviar</button>
                            <button type='button' onClick={cancelEdit}>X</button>
                        </form>
                    </div>
                </div>
                )}
                { photoupload && (
                    <div className={styles.uploadBox}>
                    <div>

                    </div>
                    <div>
                        <form onSubmit={photosUpload}>
                            <input type="file" />
                            <button type='submit'>Enviar</button>
                            <button type='button' onClick={cancelEdit}>X</button>
                        </form>
                    </div>
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

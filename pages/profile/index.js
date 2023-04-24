import styles from '../../styles/Profile.module.css'
import Chat from '../Component/Chat';
import CardPhoto from '../Component/PhotoCard';
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
const jwt = require('jsonwebtoken')
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  



export default function Profile(){
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
        await getFiles();
        // setListImages(compactToPagination(user.photos, 7));
       
    }

    // Versão demonstrativa, depois deve apagar esse array e setar no state os valores reais
  }, []);
  useEffect(()=>{
    if(user){
        setListImages(compactToPagination(user.photos, 7));
    }
  },[user])
  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            try {
                const userupdate = { id: user.id , profilephoto: downloadURL,email:user.email}
                const response = await axios.patch(`/api/user`, userupdate);
                const updatedUser = response.data;
                console.log(updatedUser)
                setUser(updatedUser);
                setPhotoedit(false)
              } catch (error) {
                console.error(error);
              }
        }
    );

};
const photosUpload = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `${user.id}/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    const userupdate = { id: user.id, data:{ photos: { url: downloadURL } }};
    const response = await axios.patch(`/api/user`, userupdate);
    const updatedUser = response.data;
    console.log(updatedUser)
    setUser(updatedUser);
    setPhotoupload(false)
};

const renderEdit= ()=>{
    setPhotoedit(true)
}
const renderPload = ()=> setPhotoupload(true)

const getFiles = async () => {
    try {
        const storageRef = ref(storage, `images/`);
        const fileList = await listAll(storageRef);
        const downloadUrls = await Promise.all(
            fileList.items.map(async (item) => {
            return await getDownloadURL(item);
        })
      );
      setFiles(downloadUrls); 
    } catch (error) {
      console.error("Erro ao obter a lista de arquivos:", error);
    }
  };
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
      {user.photos.map((photo, index) => (
        <CardPhoto key={index} url={photo} /> // Crie um componente CardPhoto para cada URL
      ))}
    </div>
                </div>
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

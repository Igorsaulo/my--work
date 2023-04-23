import styles from "../../styles/Profile.module.css";
import Chat from "../Component/Chat";
import CardPhoto from "../Component/PhotoCard";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase";
import { PaginationComponent } from "../Component/Pagination";
import { compactToPagination } from "../../utils/tratamentArrayFilterPagination";

export default function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [chat, setChat] = useState(false);
  const chatId = 1;
  const [imgUrl, setImgUrl] = useState();
  const [progress, setProgress] = useState();
  const [listImages, setListImages] = useState([]);
  const [positionPage, setPositionPage] = useState(0);

  useEffect(() => {
    const coockie = Cookies.get("NextCoockie");
    if (coockie) {
      axios.post("/api/login", { token: coockie }).then(async (response) => {
        const auth = response.data.auth;
        if (auth) {
          await photoProfile(response.data.dados);
          setIsAuthenticated(true);
        }
      });
    }

    // Versão demonstrativa, depois deve apagar esse array e setar no state os valores reais
    const arrayListImages = [
      {
        imagem: "",
        nome: "Frederico",
      },
      {
        imagem: "",
        nome: "Paulo",
      },
      {
        imagem: "",
        nome: "Laura",
      },
      {
        imagem: "",
        nome: "Fredin",
      },
    ];
    setListImages(compactToPagination(arrayListImages, 7));
  }, []);

  const photoProfile = async (dados) => {
    try {
      const response = await axios.post("/api/photoprofile", { id: dados.id });
      const updatedUser = response.data;
      setUser(updatedUser);
    } catch (error) {
      console.error("Erro ao carregar perfil de usuário:", error);
    }
  };
  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          const userupdate = {
            id: user.id,
            profilephoto: downloadURL,
            email: user.email,
          };
          const response = await axios.patch(`/api/user`, userupdate);
          const updatedUser = response.data;
          console.log(updatedUser);
          setUser(updatedUser);
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  if (isAuthenticated) {
    return (
      <>
        <main className={styles.main}>
          <div className={styles.background}></div>
          <div className={styles.pofilePhoto}>
            <img src={user.profilephoto} alt={"uma imagem"} />
          </div>
          <div className={styles.username}>
            <p>{user.username}</p>
          </div>
          <div className={styles.bio}>
            <p>
              My text generic bio text rexr text rtexfadvb gddgbgg gdsgddgs
              gdsdsdg sahshdgsdg gdgsdxg gdsbhdsbhdh dbdhgdjshs hdsjdsh hdshh
              usdhgsudh hdjshdsh hdsh
            </p>
          </div>
          <div className={styles.photoContainer}>
            <div className={styles.photoContainerText}>
              <p>Albums</p>
            </div>
            <div className={styles.containerCards}>
              {listImages[positionPage]?.map((value) => {
                return (
                  <CardPhoto
                    key={value?.nome}
                    nome={value.nome}
                    url={value?.imagem}
                  />
                );
              })}
            </div>
            <PaginationComponent
              pageCount={listImages?.length}
              onPageChange={(value) => setPositionPage(value.selected)}
            />
          </div>
          <Chat user={user} chatId={chatId} />
          <div className={styles.uploadBox}>
            <div></div>
            <div>
              <form onSubmit={handleUpload}>
                <input type="file" />
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return <h1>Privado</h1>;
  }
}

import { useState,useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from '../../styles/Profile.module.css'
import { Upload } from "../../utils/upload";

export default function(){
    const upload = new Upload
    const {user, updateUser } = useContext(AuthContext);

    const photosUpload = async (event) => {
        event.preventDefault();
        const file = event.target[0]?.files[0];
        if (!file) return;
        const updateuser = await upload.uploadPhoto(user,file,false)
        console.log(updateuser)
        updateUser(updateuser);
    };
    return(
        <>
                    <div>
                        <form onSubmit={photosUpload}>
                            <input type="file" />
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
        </>
    )
}
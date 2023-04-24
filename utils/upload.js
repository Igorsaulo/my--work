import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase/firebase';
import axios from 'axios';

export class Upload{
    async uploadPhoto(user,file,profile){
        const storageRef = ref(storage, `${user.id}/${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        let userupdate;
        if (profile) {
            userupdate = { id: user.id, data: {profilephoto: downloadURL, email: user.email} };
        } else {
            userupdate = { id: user.id, data: { photos: { url: downloadURL } } };
        }
        const response = await axios.patch(`/api/user`, userupdate);
        const updatedUser = response.data;
        return updatedUser
    }
}


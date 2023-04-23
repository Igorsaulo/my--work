import axios from "axios"

export async function AuthtenticationClient(coockie){
    if (coockie){
        try {
            const response = await axios.post('/api/login',{token:coockie});
            const dados = response.data;
            return dados;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
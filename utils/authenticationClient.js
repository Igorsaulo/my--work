import Cookies from "js-cookie"
import axios from "axios"

export default function AuthtenticationClient(){
    const coockie = Cookies.get('NextCoockie')
    if (coockie){
        axios.post('/api/login',{token:coockie}).then(response =>{
            const auth =response.data.auth
            if(auth){
                console.log(response.data.dados)
                return {username:response.data.dados,isAuthenticated: true}
            }
        })
    }
}
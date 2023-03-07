import Cookies from "js-cookie"
const jwt = require('jsonwebtoken')
import axios from "axios"
import { useState } from "react"
import Chat from "../Component/Chat"
import { useRouter } from "next/router"

export default function(){
    const router = useRouter();
    const service = router.query.fed
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    var coockie = Cookies.get('NextCoockie')
    if (coockie){
        axios.post('/api/login',{token:coockie}).then(response =>{
            const auth =response.data.auth
            if(auth)
            setIsAuthenticated(true)
        })

    }
    if (isAuthenticated) {
        return (
            <>
                <h1>{service}</h1>
            </>
        )
    } else {
        return (
            <div>
                <h1>Página privada</h1>
            </div>
        )
    }
}

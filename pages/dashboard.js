import Cookies from "js-cookie"
const jwt = require('jsonwebtoken')
import axios from "axios"
import { useState } from "react"
import Chat from "./Component/Chat"
import styles from '../styles/Dashboard.module.css'
import { useRouter } from "next/router";

export default function(){
    const router = useRouter();
    var coockie = Cookies.get('NextCoockie')
    if (coockie){
        axios.post('/api/login',{token:coockie}).then(response =>{
            const auth =response.data.auth
            if(auth){
                router.push('/inicio')
            }
    })
    }
    return(
         <h1>Rota privada</h1>
    )
}

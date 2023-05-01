import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeNavbar from "./homeNavbar";
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useEffect } from "react"
import Cookies from "js-cookie"
import Chat from "./Chat";

export default function Layout({ children }){
    const chatId = 1;
    const name = children.type.name;
    if(name === 'Home'){
        return(
            <>
                <HomeNavbar/>
                {children}
                <Footer/>
            </>
        )
    }else{
        const coockie = Cookies.get('NextCoockie')
        const { user,auth } = useContext(AuthContext);
        useEffect(()=>{
            if(coockie) auth(coockie)
        },[])
        
        if (user){
            return(
                <>
                    <Navbar/>
                    {children}
                    <Footer/>
                    <Chat user={user} chatId ={chatId}/>
                </>
            )
        }else{
            return(
                <h1>Privado</h1>
            )
        }
    }
}
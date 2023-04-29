import Navbar from "./Navbar";
import stilohome from '../../styles/Home.module.css'
import Footer from "./Footer";
import HomeNavbar from "./homeNavbar";

export default function Layout({ children }){
    const name = children.type.name
    if(name === 'Home'){
        return(
            <>
                <HomeNavbar/>
                {children}
                <Footer/>
            </>
        )
    }else{
        return(
            <>
                <Navbar/>
                {children}
                <Footer/>
            </>
        )
    }
}
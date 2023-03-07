import Navbar from "./Navbar";
import stilohome from '../../styles/Home.module.css'
import Footer from "./Footer";
import HomeNavbar from "./homeNavbar";
import stilo from '../../styles/Dashboard.module.css'

export default function Layout({ children }){
    let navbar= <Navbar/>;
    let styles = stilo
    const name = children.type.name
    if(name === 'Home'){
        navbar=<HomeNavbar/>
        styles=stilohome
        console.log(styles)
    }
    return(
        <>
            {navbar}
            <main className={styles.main}>{children}</main>
            <Footer/>

        </>
    )
}
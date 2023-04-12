import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import Dropdown from 'react-bootstrap/Dropdown';
import MenuIcon from '@material-ui/icons/Menu';


export default function Navbar(){
    const router = useRouter()
    function logOut(){
        Cookies.remove('NextCoockie')
        router.push('/')

    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.navPhoto}></div>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       <MenuIcon/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </nav>
    )
}
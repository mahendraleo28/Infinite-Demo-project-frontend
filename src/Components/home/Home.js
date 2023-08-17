import {Link} from "react-router-dom";
import './home.css';
import Hamburger from "../Hamburger/Hamburger";


export default function Home() {
    return(
        <div>
            <Hamburger/>
            <div className='navbarinhome'>
                <h3 className='text'>Welcome! successfully LoggedIn!</h3    >
            </div>
        </div>
    )
}
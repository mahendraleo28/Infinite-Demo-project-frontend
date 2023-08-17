import "./hamburger.css"
import { Link } from "react-router-dom"
export default function Hamburger() {
    return (
        <div className="hometagforhamburger">
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <Link to="/users"><h3>Home</h3></Link>
                        <Link to="/profile-users"><h3>All users</h3></Link>
                        <Link to="/all-users"><h3>All</h3></Link>
                        <Link to="/update"><h3>update</h3></Link>
                        <Link to="/upload-image"><h3>upload image</h3></Link>
                        <Link to="/get-imagename"><h3>get image by name</h3></Link>
                        <Link to="/get-imageid"><h3>get image by id</h3></Link>
                        <Link to="/upload-excel"><h3>upload excel</h3></Link>
                        <Link to="/get-excel"><h3>get excel data</h3></Link>
                        <Link to="/search"><h3>search</h3></Link>
                        <Link to="/userform"><h3>UserForm</h3></Link>
                        {/* <Link to="/addressdropdown"><h3>Address Drop down</h3></Link> */}
                    </ul>
                    <div className="logoutdivtag" >
                        <Link to='/'>
                            <button className="logout">Logout</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
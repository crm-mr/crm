import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';


const Header = () => {
    return(
        <div>            
            <div className="headerH">
                    <div id="menu-action">
                    <i className="fa fa-bars"></i>
                    <span> </span>
                    </div>
                <div className="logo">
                <Link to={'/'}><img className="img_logo_nav" src="https://turnmyapp.com/assets/images/general/brand_turn.png" /></Link>
                </div>
            </div>
            
        </div>
    )
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

import '../css/style.css';


const Header = () => {
    return(
        <div>            
            <div className="headerH">
                    <div id="menu-action">
                    <i className="fa fa-bars"></i>
                    <span>Close</span>
                    </div>
                <div className="logo">
                <Link to={'/'}><img className="img_logo_nav" src="https://turnmyapp.com/assets/images/general/brand_turn.png" /></Link>
                </div>
            </div>
            <div className="sidebar">
                <ul>
                    <Link to={'/Dashboard'}><li><div><i className="fa fa-desktop"></i><span><button type="button" className="btn btn_100">Dashboard</button></span></div></li></Link>
                    <Link to={'/agentes'}><li><div><i className="fa fa-server"></i><span><button type="button" className="btn btn_100">Agentes</button></span></div></li></Link>
                    <Link to={'/autos'}><li><div><i className="fa fa-calendar"></i><span><button type="button" className="btn btn_100">Autos</button></span></div></li></Link>
                    <li><div><i className="fa fa-envelope-o"></i><span>Salir</span></div></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Header;
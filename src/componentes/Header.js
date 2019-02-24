import React from 'react';
import { Link } from 'react-router-dom';
import logo_turn from '../img/brand.png';
import '../css/style.css';


const Header = () => {
    return(
        <header>
            
            

            <nav className="navbar navbar-expand-lg   fixed-top navbar_scroll">
            <div className="container">
                <Link to={'/'}><img className="img_logo_nav" src={logo_turn} /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="fa fa-bars change_color_bars_menu"></span>
                </button>
                <div className="title_main_brand">
                 
                </div>
            </div>
            </nav>

        </header>
    )
}

export default Header;
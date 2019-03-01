import React, { Component } from "react";
import { Link } from "react-router-dom";
 
import axios from "axios"; 

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/style.css';

class Header extends Component {
    constructor() {
        super();
        
        this.state = { 
          gerentes_user: []
        };

        axios
        .get(
          "https://turnmyapp.com/ws_turnmyapp/get/msj_by_autos_agente/" +
            sessionStorage.getItem("id") +
            ""
        )
        .then(response => {
          this.setState({
            gerentes_user: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentWillMount() {
        
    

        
      }
    render(){
        return(
            <div>            
            <div className="headerH">
                    <div id="menu-action">
                    <i className="fa fa-bars"></i>
                    <span> </span>
                    </div>
                <div className="logo">
                <Link to={'/'}><img className="img_logo_nav" src="https://turnmyapp.com/assets/images/general/brand_turn.png" /></Link>
                <div className="header-info-name">{sessionStorage.getItem("name")} {sessionStorage.getItem("lastname")}</div> 
                <div className="header-info-name"><img src={ this.state.gerentes_user.image} /></div>                
                </div>
            </div>
            
        </div>
        );
    }
   
}

export default Header;
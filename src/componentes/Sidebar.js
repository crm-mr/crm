import React, { Component } from "react";
import { Link } from 'react-router-dom';


class Sidebar extends Component {
 
    constructor(){
        super();
        this.state = {isAgente: false};    

        
        this.salir = this.salir.bind(this);
        
    
    }
    salir() {
        // SI LOS DATOS SON CORRECTOS 
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";

    }
    componentWillMount() {
        if (
            sessionStorage.getItem("email") == "" ||
            sessionStorage.getItem("email") == null
          ) {
            window.location.href = "/";
          }
        if (sessionStorage.getItem("role_id") == "3") {            
            this.setState({isAgente: 'hidden_menu'});
          }
    }
    
    render() {
    return (
        
        <div className="sidebar">
                <ul>
                    <Link to={'/Dashboard'}><li><div><i className="fa fa-desktop"></i><span><button type="button" className="btn btn_100">Menú Principal</button></span></div></li></Link>
                    <Link to={'/agentes'}><li className={this.state.isAgente}><div><i className="fa fa fa-user"></i><span><button type="button" className="btn btn_100">Agentes</button></span></div></li></Link>
                    <Link to={'/autos'}><li><div><i className="fa fa-envelope"></i><span><button type="button" className="btn btn_100">Mensajes</button></span></div></li></Link>
                    <li id="agente_menu_off"  onClick={() => this.salir()}><div><i class="fas fa-power-off"></i><span><button type="button" className="btn btn-danger btn_100 salir">Salir</button></span></div></li>
                    
                </ul>
            </div>
    );
    }
}


export default Sidebar;

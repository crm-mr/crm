import React from 'react'
import { Link } from 'react-router-dom';


const Sidebar = () => { 
    return (
        
        <div className="sidebar">
                <ul>
                    <Link to={'/Dashboard'}><li><div><i className="fa fa-desktop"></i><span><button type="button" className="btn btn_100">Dashboard</button></span></div></li></Link>
                    <Link to={'/agentes'}><li><div><i className="fa fa fa-user"></i><span><button type="button" className="btn btn_100">Agentes</button></span></div></li></Link>
                    <Link to={'/autos'}><li><div><i className="fa fa-car"></i><span><button type="button" className="btn btn_100">Autos</button></span></div></li></Link>
                    <li><div><i className="fa fa-close"></i><span>Salir</span></div></li>
                    
                </ul>
            </div>
    )
}

export default Sidebar;

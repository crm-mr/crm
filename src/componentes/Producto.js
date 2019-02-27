import React from 'react'
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar.js';


const Producto = (props) => {
    const {imagen, nombre, precio, id} = props.informacion;
    return (
        <div>
        <Sidebar />
        <li>
            <img src={`img/${imagen}.png` } alt={nombre} />
            <p>{nombre} <span> $ {precio}</span></p>
            <Link to={`/producto/${id}`}>Más Información click aquí</Link>
        </li>
        </div>
    )
}

export default Producto;
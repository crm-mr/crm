import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Autos extends Component {


    constructor(){
        super();
        this.state = {
            gerentes_autos : []
        }

        this.verMensaje = this.verMensaje.bind(this);


        //Axios Gerentes por usuario
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/autos_by_agente/"+sessionStorage.getItem("id")+"").then(response => {
        this.setState({
            gerentes_autos: response.data
        })
      }).catch(error => {
        console.log(error);
      })
      
    } // FIN DE CONSTRUCTOR



    componentWillMount(){

        if((sessionStorage.getItem("email")=='') || sessionStorage.getItem("email")== null){
            window.location.href = "/";
        }

    }



    // FUNCION ELIMINAR AGENTE
    verMensaje = (e) => {
        alert(e);
    }


    render() {
        return (
            <div className="productos">
                <div className="text-center">Autos</div>

                <div className="row">
                <div className="col-md-9">
                        <div className="row">

                               <div className="col-md-12">
                                    <div className="div_after_table_dashboard">
                                    <table className="table table-dark">
                                        <thead>
                                            <tr>
                                            <th scope="col">Auto</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Año</th>
                                            <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            { this.state.gerentes_autos.map((datos,i) =>
                                            <tr>
                                            <th  scope="row" key={datos}>{datos.title}</th>
                                            <th key={datos}>{datos.description}</th>
                                            <th key={datos}>${datos.price}</th>
                                            <th key={datos}>{datos.year}</th>
                                            <th key={datos}>
                                            <Link to={`/mensajes/${datos.id}`}>
                                            Ver Mensaje
                                            </Link>
                                            </th>
                                            </tr>
                                            )}
                                            
                                        </tbody>
                                        </table>
                                        </div>
                            </div>



                        </div>

                </div>
                <div className="col-md-3">
                    <Link to={'/Dashboard'}><button type="button" className="btn btn-warning btn_100">Dashboard</button></Link> <br /><br />
                    <Link to={'/agentes'}><button type="button" className="btn btn-success btn_100">Agentes</button></Link> <br /><br />
                    <Link to={'/autos'}><button type="button" className="btn btn-primary btn_100">Autos</button></Link> <br/><br/>
                    <button type="button" className="btn btn-danger btn_100">Salir</button> <br/>
                </div>

                </div>
            </div>
        );
    }
}

export default Autos;

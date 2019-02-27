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
        this.asignarAgente = this.asignarAgente.bind(this);




        const datos_autos_asignadosmessage = {
            user_producto: sessionStorage.getItem("id"),
            agente_asignado : sessionStorage.getItem("email")
        }

        var data_form_auto_asignado_message = new FormData();
        data_form_auto_asignado_message.append('user_producto',datos_autos_asignadosmessage.user_producto);
        data_form_auto_asignado_message.append('agente_asignado',datos_autos_asignadosmessage.agente_asignado);


        //Axios Gerentes por usuario     
        axios({
            method: 'post',
            url: 'https://turnmyapp.com/ws_turnmyapp/get/autos_by_agente_with_message/validacion',
            data: data_form_auto_asignado_message,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                this.setState({gerentes_autos: response.data});
               console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });




        }



    componentWillMount(){

        if((sessionStorage.getItem("email")=='') || sessionStorage.getItem("email")== null){
            window.location.href = "/";
        }

    }



    // FUNCION ELIMINAR AGENTE
    verMensaje = (e) => {
        alert(e);
    }






    // FUNCION ELIMINAR AGENTE
    asignarAgente = (e) => {
        let id_auto_asignado = e;

        let retVal = window.confirm("¿Deseas asignarte este auto?");
           if( retVal == true ) {
            
            




            const datos_autos_asignados = {
                id_auto_asignado: id_auto_asignado,
                auto_asignado_email : sessionStorage.getItem("email")
            }
    
            var data_form_auto_asignado = new FormData();
            data_form_auto_asignado.append('id_auto_asignado',datos_autos_asignados.id_auto_asignado);
            data_form_auto_asignado.append('auto_asignado_email',datos_autos_asignados.auto_asignado_email);



            axios({
                method: 'post',
                url: 'https://turnmyapp.com/ws_turnmyapp/get/update_asignar_agente/validacion',
                data: data_form_auto_asignado,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    if(response.data=='invalid_asignacion'){
                        swal("Este auto ya fue asignado a otro agente", "Favor de verificar", "error");
                    }else{
                        swal("Asignado con exito", "", "success");
                    }
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });




                


              return true;
           }
           else {

              return false;
           }

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
                                            Ver
                                            </Link>
                                            <button onClick={this.asignarAgente.bind(this, datos.id)}>Asignar</button>
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

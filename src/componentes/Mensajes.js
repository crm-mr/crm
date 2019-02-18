import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Mensajes extends Component {


    constructor(props){
        super(props);
        this.state = {
            propsmensaje : this.props.mensajeId
        }

        //let myprops = this.props.mensajeId;
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





    render() {
        return (
            <div className="productos">
                <div className="text-center">Autos</div>

                <div className="row">
                <div className="col-md-9">
                        <div className="row">

                               <div className="col-md-12">
                               {this.props.mensajeId}
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

export default Mensajes;
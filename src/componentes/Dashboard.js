import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {

    constructor(){
        super();
        this.state = {
            msj_totales_user: [],
            msj_readed_user: [],
            msj_not_readed_user : [],
            gerentes_totales_user : []

        }



        //Axios Mensajes Totales
        axios.get("https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_msj_user_totales/"+sessionStorage.getItem("id")+"").then(response => {
        this.setState({
            msj_totales_user: response.data
        })
      }).catch(error => {
        console.log(error);
      })


      //Axios Mensajes Leidos
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_msj_user_readed/"+sessionStorage.getItem("id")+"").then(response => {
        this.setState({
            msj_readed_user: response.data
        })
      }).catch(error => {
        console.log(error);
      })


      //Axios Mensajes No Leidos
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_msj_user_not_readed/"+sessionStorage.getItem("id")+"").then(response => {
        this.setState({
            msj_not_readed_user: response.data
        })
      }).catch(error => {
        console.log(error);
      })



      
      //Axios Gerentes totales por usuario
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_total_gerentes_user/"+sessionStorage.getItem("id")+"").then(response => {
        this.setState({
            gerentes_totales_user: response.data
        })
      }).catch(error => {
        console.log(error);
      })



    }


    componentWillMount(){

        if((sessionStorage.getItem("email")=='') || sessionStorage.getItem("email")== null){
            window.location.href = "/";
        }

    }


    render() {
        return (
            <div className="productos">
                <div className="text-center">Bienvenido</div>

                <div className="row">
                <div className="col-md-9">
                        <div className="row">

                                <div className="col-md-3">
                                    <button className="btn btn-warning" type="button" >
                                    Msj Totales 
                                            { this.state.msj_totales_user.map((datos,i) =>
                                            <span className="badge" key={datos}>{datos.total}</span>
                                            )}
                                    </button>
                                </div>

                                <div className="col-md-3">
                                    <button className="btn btn-warning" type="button" >
                                    Msj Leidos 
                                            { this.state.msj_readed_user.map((datos,i) =>
                                            <span className="badge" key={datos}>{datos.total}</span>
                                            )}
                                    </button>
                                </div>

                                <div className="col-md-3">
                                    <button className="btn btn-warning" type="button" >
                                    Msj No Leidos 
                                            { this.state.msj_not_readed_user.map((datos,i) =>
                                            <span className="badge" key={datos}>{datos.total}</span>
                                            )}
                                    </button>
                                </div>

                                <div className="col-md-3">
                                        <button className="btn btn-warning" type="button" >
                                                Gerentes 
                                                { this.state.gerentes_totales_user.map((datos,i) =>
                                                <span className="badge" key={datos}>{datos.total}</span>
                                                )}
                                        </button>
                                </div>


                                <div className="col-md-12">

                                </div>


                                <div></div>



                        </div>

                </div>
                <div className="col-md-3">
                    <Link to={'/agentes'}><button type="button" className="btn btn-success btn_100">Agentes</button></Link> <br /><br />
                    <Link to={'/autos'}><button type="button" className="btn btn-primary btn_100">Autos</button></Link> <br/><br/>
                    <button type="button" className="btn btn-danger btn_100">Salir</button> <br/>
                </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;

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
            gerentes_autos : [],
            gerentes_totales_user : []

        }
        

   //Axios Gerentes por usuario
   axios.get("https://turnmyapp.com/ws_turnmyapp/get/autos_by_agente/"+sessionStorage.getItem("id")+"").then(response => {
    this.setState({
        gerentes_autos: response.data
    })
  }).catch(error => {
    console.log(error);
  })
   
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
            <div className="main">
                <div className="text-center">
                    <h2>Dashboard</h2>
                </div>
 
                 
                <div className="col-md-12">
                        <div className="row"> 
					<div class="col-lg-3 col-xs-12">
						<div class="rad-info-box rad-txt-success">
							<i class="fa fa-envelope"></i>
							<span class="heading">Mensajes Totales</span>
							<span class="value"><span> { this.state.msj_totales_user.map((datos,i) =>
                                            <span className="badge" key={datos}>{datos.total}</span>
                                            )}</span></span>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12">
						<div class="rad-info-box rad-txt-primary">
							<i class=" fa fa-folder-open-o "></i>
							<span class="heading">Mensajes Leidos 
                                           </span>
							<span class="value"><span> { this.state.msj_readed_user.map((datos,i) =>
                                            <span className="badge" key={datos}>{datos.total}</span>
                                            )}</span></span>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12">
						<div class="rad-info-box rad-txt-danger">
							<i class="fa fa-th-list"></i>
							<span class="heading">Mensajes No Leidos</span>
							<span class="value"><span> { this.state.msj_not_readed_user.map((datos,i) =>
                                            <span className="badge" key={datos}>{datos.total}</span>
                                            )}</span></span>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12">
						<div class="rad-info-box">
                        <i class="fa fa-user" aria-hidden="true"></i>
							<span class="heading"> Gerentes </span>
							<span class="value"><span>{ this.state.gerentes_totales_user.map((datos,i) =>
                                                <span className="badge" key={datos}>{datos.total}</span>
                                                )}</span></span>
						</div>
					</div>
                    <table className="table table-light">
                                        <thead>
                                            <tr>
                                            <th scope="col">Auto</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Año</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            { this.state.gerentes_autos.map((datos,i) =>
                                            <tr>
                                            <th  scope="row" key={datos}>{datos.title}</th>
                                            <th key={datos}>{datos.description}</th>
                                            <th key={datos}>${datos.price}</th>
                                            <th key={datos}>{datos.year}</th>
                                            </tr>
                                            )}
                                            
                                        </tbody>
                                        </table>
			        	</div>
			     </div>
               
 
            </div>
        );
    }
}

export default Dashboard;

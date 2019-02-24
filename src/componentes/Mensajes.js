import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import image_send_chat from '../img/arrow_send_chat.png';

class Mensajes extends Component {


    constructor(props){
        super(props);
        this.state = {
            propsmensaje : this.props.mensajeId,
            msj_autos : []
        }

        //let myprops = this.props.mensajeId;
        //Axios Gerentes por usuario
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/msj_by_autos_agente/"+this.state.propsmensaje+"").then(response => {
        this.setState({
            msj_autos: response.data
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
                                    <div className="div_after_table_dashboard">

                                        
                                        <div class="col-sm-12 frame">
                                            <ul>
                                            { this.state.msj_autos.map((datos,i) =>
                                            <li style={{width:"100%"}}>
                                                    <div class="msj macro">
                                                        <div class="avatar">
                                                        <img key={datos} class="img-circle" style={{width:"100%;"}} src={`https://turnmyapp.com/files/users/${datos.image}?sz=48`} alt={datos.name} />
                                                        </div>
                                                        <div class="text text-l">
                                                        <p><span key={datos} className="name_chat_text">{datos.name}</span>:</p>
                                                        <p><span key={datos} className="message_chat_text">{datos.message}</span></p>
                                                        <p><small key={datos}>{datos.created_at}</small></p>
                                                        </div>
                                                    </div>
                                            </li>
                                            )}

                                            </ul>
                                            <div>
                                                <div class="msj-rta macro">                        
                                                    <div class="text text-r" style={{background:'whitesmoke !important;'}}>
                                                        <input class="mytext" placeholder="Ingresa mensaje"/>
                                                    </div>  

                                                </div>
                                                <div className="div_btn_send_chat">
                                                    <span class="span_btn_send_chat"><img src={image_send_chat} /></span>
                                                </div>                
                                            </div>
                                        </div>



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

export default Mensajes;
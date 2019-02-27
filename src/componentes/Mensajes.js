import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import image_send_chat from '../img/arrow_send_chat.png';
import Sidebar from './Sidebar';


class Mensajes extends Component {


    constructor(props){
        super(props);
        this.state = {
            propsmensaje : this.props.mensajeId,
            msj_autos : [],
            id_user_login : sessionStorage.getItem("id"),
            id_user_interesado: []
        }

        //let myprops = this.props.mensajeId;


        //Axios Muestra mensajes por id del producto
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/msj_by_autos_agente/"+this.state.propsmensaje+"").then(response => {
        this.setState({
            msj_autos: response.data
        })
      }).catch(error => {
        console.log(error);
      });



      //Axios obtiene id de usuario que mando el primer mensaje
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/get_id_user_by_auto/"+this.state.propsmensaje+"").then(response => {
        this.setState({
            id_user_interesado: response.data[0][0]
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



    input_message = React.createRef();
    id_user_login = React.createRef();
    id_user_interesado = React.createRef();





    onSubmit = (e) => {
        e.preventDefault();



        const datos = {
            propsmensaje: this.state.propsmensaje,
            input_message : this.input_message.current.value,
            id_user_login : this.id_user_login.current.value,
            id_user_interesado : this.id_user_interesado.current.value,
        }
        

        

        if(datos.input_message===''){
            swal("No puedes mandar mensajes vacios", "Favor de verificar", "error");
        }else{



        var data_form = new FormData();
    data_form.append('input_message',datos.input_message);
    data_form.append('id_user_login',datos.id_user_login);
    data_form.append('id_user_interesado',datos.id_user_interesado);
    data_form.append('propsmensaje',datos.propsmensaje);



            axios({
            method: 'post',
            url: 'https://turnmyapp.com/ws_turnmyapp/get/insertar_msj__chat/validacion',
            data: data_form,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

            e.currentTarget.reset();




            setTimeout(function () {
            //Axios Gerentes por usuario
      //Axios Muestra mensajes por id del producto
      axios.get("https://turnmyapp.com/ws_turnmyapp/get/msj_by_autos_agente/"+this.state.propsmensaje+"").then(response => {
        this.setState({
            msj_autos: response.data
        })
      }).catch(error => {
        console.log(error);
      });

    }.bind(this), 1000)



    


                

            }





        }





    render() {
        return (
            <div>
            <Sidebar />
            <div className="main">
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
                                                <form onSubmit={this.onSubmit} >
                                                <div className="msj-rta macro">
                                                    <div className="text text-r" style={{background:'whitesmoke !important;'}}>
                                                        <input type="text" ref={this.input_message} className="mytext" placeholder="Ingresa mensaje"/>
                                                        <input type="hidden" ref={this.id_user_login} className="mytext" value={this.state.id_user_login} />
                                                        <input type="hidden" ref={this.id_user_interesado} className="mytext" value={this.state.id_user_interesado} />
                                                    </div>  

                                                </div>
                                                <div className="div_btn_send_chat">
                                                <button type="submit" className="btn btn-primary btn_form_turn">
                                                    <span className="span_btn_send_chat"><img src={image_send_chat} /></span>
                                                </button>
                                                    
                                                </div>   
                                                </form>

                                            </div>
                                        </div>



                                        </div>
                            </div>



                        </div>

                </div>
                

                </div>
            </div>
            </div>
        );
    }
}

export default Mensajes;
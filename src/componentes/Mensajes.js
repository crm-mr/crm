import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import image_send_chat from '../img/arrow_send_chat.png';

class Mensajes extends Component {


    constructor(props){
        super(props);
        this.state = {
            propsmensaje : this.props.mensajeId,
            msj_autos : [],
            id_user_login : sessionStorage.getItem("id"),
            id_user_interesado: [],
            id_user_conversation: [],
            id_users_msj_by_product: [],
            id_users_msj_by_product_chat: [],
            modal: false
        }

        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);


        


        // *** VIENDO QUE ID DE USUARIOS MANDARON MENSAJE DE ESTE ID DE PRODUCTO O AUTO ***
        const datos_msj_user = {
            propsmensaje_datos_msj_user: this.state.propsmensaje,
            iduserlogin_datos_msj_user : sessionStorage.getItem("id")
        }

        var data_form_msj_user = new FormData();
        data_form_msj_user.append('propsmensaje_datos_msj_user',datos_msj_user.propsmensaje_datos_msj_user);
        data_form_msj_user.append('iduserlogin_datos_msj_user',datos_msj_user.iduserlogin_datos_msj_user);



            
            axios({
            method: 'post',
            url: 'https://turnmyapp.com/ws_turnmyapp/get/get_users_by_product_msj/validacion',
            data: data_form_msj_user,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                this.setState({id_users_msj_by_product: response.data});

       

            })
            .catch((e) => 
            {
                console.error(e);
            });


            // *** FIN DE VIENDO QUE ID DE USUARIOS MANDARON MENSAJE DE ESTE ID DE PRODUCTO O AUTO ***








/*
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
            id_user_interesado: response.data
        })
      }).catch(error => {
        console.log(error);
      })
      */



      
    } // FIN DE CONSTRUCTOR


    toggle(id_user_chat, conversation_id) {


        this.setState(prevState => ({
          modal: !prevState.modal,
          id_user_conversation: conversation_id,
          id_user_interesado: id_user_chat
        }));



        // *** VIENDO QUE ID DE USUARIOS MANDARON MENSAJE DE ESTE ID DE PRODUCTO O AUTO ***
        const datos_msj_user_chat = {
            propsdatos_msj_user_chat: this.state.propsmensaje,
            iduser_datos_msj_user_chat : id_user_chat
        }

        var data_form_msj_user_chat = new FormData();
        data_form_msj_user_chat.append('propsmensaje_datos_msj_user',datos_msj_user_chat.propsdatos_msj_user_chat);
        data_form_msj_user_chat.append('iduserlogin_datos_msj_user',datos_msj_user_chat.iduser_datos_msj_user_chat);



            axios({
            method: 'post',
            url: 'https://turnmyapp.com/ws_turnmyapp/get/get_user_by_product_chat/validacion',
            data: data_form_msj_user_chat,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                this.setState({id_users_msj_by_product_chat: response.data});

       

            })
            .catch((e) => 
            {
                console.error(e);
            });

            // *** FIN DE VIENDO QUE ID DE USUARIOS MANDARON MENSAJE DE ESTE ID DE PRODUCTO O AUTO ***




            setInterval(function(){


                axios({
                method: 'post',
                url: 'https://turnmyapp.com/ws_turnmyapp/get/get_user_by_product_chat/validacion',
                data: data_form_msj_user_chat,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then((response) => {
                    this.setState({id_users_msj_by_product_chat: response.data});
    
           
    
                })
                .catch((e) => 
                {
                    console.error(e);
                });

                data_form_msj_user_chat='';
                data_form_msj_user_chat = new FormData();
                data_form_msj_user_chat.append('propsmensaje_datos_msj_user',this.state.propsmensaje);
                data_form_msj_user_chat.append('iduserlogin_datos_msj_user',this.state.id_user_interesado);
    
           }.bind(this), 1000)

            







        
      }






      toggle2() {


        this.setState(prevState => ({
          modal: !prevState.modal
        }));

    }






    componentWillMount(){

        if((sessionStorage.getItem("email")=='') || sessionStorage.getItem("email")== null){
            window.location.href = "/";
        }



    }










    input_message = React.createRef();
    id_user_login = React.createRef();
    id_user_interesado = React.createRef();
    id_user_conversation = React.createRef();





    onSubmit = (e) => {
        e.preventDefault();



        const datos = {
            propsmensaje: this.state.propsmensaje,
            input_message : this.input_message.current.value,
            id_user_login : this.id_user_login.current.value,
            id_user_interesado : this.id_user_interesado.current.value,
            id_user_conversation : this.id_user_conversation.current.value
        }
        

        

        if(datos.input_message===''){
            swal("No puedes mandar mensajes vacios", "Favor de verificar", "error");
        }else{



        var data_form = new FormData();
    data_form.append('input_message',datos.input_message);
    data_form.append('id_user_login',datos.id_user_login);
    data_form.append('id_user_interesado',datos.id_user_interesado);
    data_form.append('propsmensaje',datos.propsmensaje);
    data_form.append('id_user_conversation',datos.id_user_conversation);



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
      const datos_msj_user_chat = {
        propsdatos_msj_user_chat: this.state.propsmensaje,
        iduser_datos_msj_user_chat : this.id_user_interesado.current.value
    }

    var data_form_msj_user_chat = new FormData();
    data_form_msj_user_chat.append('propsmensaje_datos_msj_user',datos_msj_user_chat.propsdatos_msj_user_chat);
    data_form_msj_user_chat.append('iduserlogin_datos_msj_user',datos_msj_user_chat.iduser_datos_msj_user_chat);

      axios({
        method: 'post',
        url: 'https://turnmyapp.com/ws_turnmyapp/get/get_user_by_product_chat/validacion',
        data: data_form_msj_user_chat,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            this.setState({id_users_msj_by_product_chat: response.data});

   

        })
        .catch((e) => 
        {
            console.error(e);
        });

    }.bind(this), 1000)



    


                

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


                                    <div className="row">

                                        

                                            { this.state.id_users_msj_by_product.map((datos,i) =>
                                            <div className="col-sm-12 col-md-4">
                                            <div className="card" style={{width:"20rem;margin:20px 0 24px 0"}}>
                                                <img key={datos} className="card-img-top" style={{width:"20%;"}} src={`https://turnmyapp.com/files/users/${datos.image}`} alt={datos.name} />
                                                <div className="card-body">
                                                <h4 className="card-title" key={datos} >{datos.name}</h4>
                                                <p className="card-text">{datos.email}</p>
                                                <button type="button" className="btn btn-primary" onClick={() => this.toggle(datos.sender_id, datos.conversation_id)} >Chat</button>
                                                </div>
                                            </div>
                                            </div>
                                            )}




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



                <Modal isOpen={this.state.modal} toggle={this.toggle2} className={this.props.className}>
                <ModalHeader toggle={this.toggle2}>CHAT</ModalHeader>
                <ModalBody>
                    
                <div className="col-sm-12 frame">
                <ul>
                                            { this.state.id_users_msj_by_product_chat.map((datos,i) =>
                                            <li style={{width:"100%"}}>
                                                    <div className="msj macro">
                                                        <div className="avatar">
                                                        <img key={datos} className="img-circle" style={{width:"100%;"}} src={`https://turnmyapp.com/files/users/${datos.image}?sz=48`} alt={datos.name} />
                                                        </div>
                                                        <div className="text text-l">
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
                                                        <input type="hidden" ref={this.id_user_conversation} className="mytext" value={this.state.id_user_conversation} />
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
                </ModalBody>

                </Modal>





            </div>
        );
    }
}

export default Mensajes;
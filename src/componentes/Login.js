import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'; 
import '../css/login.css';

class Login extends Component {
 
    componentWillMount(){
        if(sessionStorage.getItem("email")!= null){
            window.location.href = "/Dashboard"; 
        }  

    }
    
    emailRef = React.createRef();
    passwordRef = React.createRef();



    onSubmit = (e) => {
        e.preventDefault();
        
        const datos = {
            email : this.emailRef.current.value,
            password : this.passwordRef.current.value
        }


        // Validando campos
        let regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

        if(datos.email===''){
            swal("Campo correo vacio", "Favor de verificar", "error");
        }else if (regex.test(datos.email.trim())==false) {
            swal("Campo correo invalido", "Favor de verificar", "error");
            return false;
        }else if(datos.password===''){
            swal("Campo contraseña vacio", "Favor de verificar", "error");
        }else{

            var data_form = new FormData();
    data_form.append('email',datos.email);
    data_form.append('password',datos.password);
        }


        axios({
            method: 'post',
            url: 'https://turnmyapp.com/ws_turnmyapp/get/validar_user_login/validacion',
            data: data_form,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {

                if(response.data=='invalid_mail'){
                    swal("El correo es incorrecto", "Intenta nuevamente", "error");
                    console.log(response.data)
                }else if(response.data=='invalid_password'){
                    swal("La contraseña es incorrecta", "Intenta nuevamente", "error");
                    console.log(response.data)
                }else{
                    // SI LOS DATOS SON CORRECTOS 
                    sessionStorage.setItem("email", response.data[0][1]);
                    sessionStorage.setItem("name", response.data[0][3]);
                    sessionStorage.setItem("lastname", response.data[0][4]);
                    sessionStorage.setItem("role_id", response.data[0][5]);
                    sessionStorage.setItem("id", response.data[0][0]);
                    console.log(response.data[0][1]);
                    window.location.href = "/Dashboard";
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });


    }

    render() {
        return (
                   <div className="main">

                <div className="container">
                    <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                    <h2>Admin Login</h2>
                    <p>Por favor ingresa tu correo y contraseña</p>
                    </div>
                        <form id="Login" onSubmit={this.onSubmit}>

                            <div className="form-group">


                                <input type="text" ref={this.emailRef} className="form-control" id="email" name="email" placeholder="Email Address" />

                            </div>

                            <div className="form-group">

                                <input type="password" ref={this.passwordRef} className="form-control" id="password" name="password" placeholder="Password" />

                            </div>
                            <div className="forgot"></div>
                            <button type="submit" className="btn btn-primary">Login</button>

                        </form>
                        </div>
                      </div> 
                    </div>
                </div>
                 );
    }
}

export default Login;
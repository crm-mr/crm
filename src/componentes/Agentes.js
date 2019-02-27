import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import Sidebar from "./Sidebar.js";

class Agentes extends Component {
  constructor() {
    super();
    this.state = {
      gerentes_user: []
    };

    this.eliminarAgente = this.eliminarAgente.bind(this);
  } // FIN DE CONSTRUCTOR

  componentWillMount() {
    if (sessionStorage.getItem("email") == "") {
      window.location.href = "/";
    }

    //Axios Gerentes por usuario
    axios
      .get(
        "https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_gerentes_user/" +
          sessionStorage.getItem("id") +
          ""
      )
      .then(response => {
        this.setState({
          gerentes_user: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  correoRef = React.createRef();
  passwordRef = React.createRef();

  onSubmit = e => {
    e.preventDefault();

    const datos = {
      nombre: this.nombreRef.current.value,
      apellido: this.apellidoRef.current.value,
      correo: this.correoRef.current.value,
      password: this.passwordRef.current.value
    };

    let regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (datos.nombre === "") {
      swal("Campo nombre vacio", "Favor de verificar", "error");
    } else if (datos.apellido === "") {
      swal("Campo apellido vacio", "Favor de verificar", "error");
    } else if (datos.correo === "") {
      swal("Campo correo vacio", "Favor de verificar", "error");
    } else if (regex.test(datos.correo.trim()) == false) {
      swal("Campo correo invalido", "Favor de verificar", "error");
      return false;
    } else if (datos.password === "") {
      swal("Campo contraseña vacio", "Favor de verificar", "error");
    } else {
      let id_sessin_agente = sessionStorage.getItem("id");
      var data_form = new FormData();
      data_form.append("nombre", datos.nombre);
      data_form.append("apellido", datos.apellido);
      data_form.append("correo", datos.correo);
      data_form.append("password", datos.password);
      data_form.append("id_sessin_agente", id_sessin_agente);

      axios({
        method: "post",
        url:
          "https://turnmyapp.com/ws_turnmyapp/get/insertar_agente_by_gerente/validacion",
        data: data_form,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(function(response) {
          if (response.data == "correo_invalid") {
            swal(
              "El correo ya se encuentra registrado",
              "Intenta con otro diferente",
              "error"
            );
          } else {
            swal("Agente guardado con exito", "", "success");
          }
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });

      e.currentTarget.reset();

      setTimeout(
        function() {
          //Axios Gerentes por usuario
          axios
            .get(
              "https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_gerentes_user/" +
                sessionStorage.getItem("id") +
                ""
            )
            .then(response => {
              this.setState({
                gerentes_user: response.data
              });
            })
            .catch(error => {
              console.log(error);
            });
        }.bind(this),
        3000
      );

      /*   setTimeout(function () {

                        /*    //Axios Gerentes por usuario
                            axios.get("https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_gerentes_user/"+sessionStorage.getItem("id")+"").then(response => {
                            this.setState({
                                gerentes_user: response.data
                            })
                        }).catch(error => {
                            console.log(error);
                        })


                        fetch("https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_gerentes_user/"+sessionStorage.getItem("id")+"")
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    // ...then we update the users state
    .then(data =>
      this.setState({
        gerentes_user: data,
      })
    )
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));

                            // window.location.reload();
                
                        }.bind(this), 3000)*/
    }
  };

  // FUNCION ELIMINAR AGENTE
  eliminarAgente = e => {
    let retVal = window.confirm("¿Deseas eliminar este agente?");
    if (retVal == true) {
      let id_agente_table = e;

      var data_form_delete = new FormData();
      data_form_delete.append("id_agente", id_agente_table);

      axios({
        method: "post",
        url:
          "https://turnmyapp.com/ws_turnmyapp/get/update_delete_agente_by_gerente/validacion",
        data: data_form_delete,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(function(response) {
          swal("Agente eliminado con exito", "", "success");
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });

      setTimeout(
        function() {
          fetch(
            "https://turnmyapp.com/ws_turnmyapp/get/turnmyapp_gerentes_user/" +
              sessionStorage.getItem("id") +
              ""
          )
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data =>
              this.setState({
                gerentes_user: data
              })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));

          // window.location.reload();
        }.bind(this),
        3000
      );

      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div>
        <Sidebar />
        <div className="main">
          <div className="mx-auto col-sm-12">
            <div className="row">
              <div className="BoxWrapper ">
                <div className="text-left titles">
                  <h2>
                    <i class="fa fa-user" aria-hidden="true" />
                    <span class="heading tablestitles"> Agentes de ventas </span>
                  </h2>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="div_after_table_dashboard">
                        <table className="table table-light">
                          <thead>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Apellido</th>
                              <th scope="col">Correo</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.gerentes_user.map((datos, i) => (
                              <tr>
                                <th scope="row" key={datos}>
                                  {datos.name}
                                </th>
                                <th key={datos}>{datos.lastname}</th>
                                <th key={datos}>{datos.email}</th>
                                <th key={datos}>
                                  <button className=" rad-txt-dange"
                                    onClick={this.eliminarAgente.bind(
                                      this,
                                      datos.id
                                    )}
                                  >
                                    Eliminar
                                  </button>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header">
                          <div className="text-left  ">
                            <h2> 
                              <span class="heading ">Alta Agentes </span>
                            </h2>
                          </div>
                          <h4 className="mb-0 title_main_formulario">
                            INGRESE LOS SIGUIENTES DATOS
                          </h4>
                        </div>
                        <div className="card-body">
                          <form className="form" onSubmit={this.onSubmit}>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-control-label">
                                    Nombre
                                  </label>
                                  <div className="">
                                    <input
                                      ref={this.nombreRef}
                                      className="form-control"
                                      type="text"
                                      name="nombre"
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="form-control-label">
                                    Apellido
                                  </label>
                                  <div className="">
                                    <input
                                      ref={this.apellidoRef}
                                      className="form-control"
                                      type="text"
                                      name="apellido"
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="form-control-label">
                                    Correo
                                  </label>
                                  <div className="">
                                    <input
                                      ref={this.correoRef}
                                      className="form-control"
                                      type="text"
                                      name="correo"
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="form-control-label">
                                    Contraseña
                                  </label>
                                  <div className="">
                                    <input
                                      ref={this.passwordRef}
                                      className="form-control"
                                      type="password"
                                      name="password"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <button
                                type="submit"
                                className="btn btn-primary btn_form_turn"
                              >
                                {" "}
                                GUARDAR{" "}
                              </button>{" "}
                              <br />
                              <br />
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
      </div>
    );
  }
}

export default Agentes;

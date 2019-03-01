import React, { Component } from 'react'; //imrc
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Productos from './Productos';
import Agentes from './Agentes';
import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import Autos from './Autos';
import Mensajes from './Mensajes';
import SingleProducto from './SingleProducto';
import Error from './Error';
import infoProductos from '../datos/datos.json';


//cc
class Router extends Component {


    componentWillMount(){

        this.setState({
            productos : infoProductos
        })

    }

    render() {
        return (
            <BrowserRouter>
                <div className="contenedor contenedor_main_router">
                <Header />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Route exact path="/agentes" component={Agentes} />
                    <Route exact path="/producto/:productoId" render={(props) => {
                        let idProducto = props.location.pathname.replace('/producto/' , '');
                        return(
                            <SingleProducto 
                            producto={this.state.productos[idProducto]}
                            />
                        )
                    }} />
                    <Route exact path="/autos" component={Autos} />
                    <Route exact path="/mensajes/:id" render={(props) => {
                        let idMensaje = props.location.pathname.replace('/mensajes/' , '');
                        return(
                            <Mensajes 
                            mensajeId={idMensaje}
                            />
                        )
                    }} />
                    <Route component={Error} />
                </Switch>
                </div>

            </BrowserRouter> 
        );
    }
}

export default Router;
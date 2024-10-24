import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import jQuery from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPasse: ''
        }
    }

    changeusername = (event) => {
        this.setState({
            userName: event.target.value
        });
    }

    changeuserpasse = (event) => {
        this.setState({
            userPasse: event.target.value
        });
    }

    connect = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/ConnectUtilisateur.php',
            type: 'POST',
            data: {
                userName: this.state.userName,
                userPasse: this.state.userPasse
            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.connexion == "OK") {
                    toast.success('✅ Bienvenue dans HOODA APP !', { containerId: 'A' });
                    document.location = "/Menu"
                }
                else if (code_html.connexion == "KO") {
                    toast.error('⛔ Veuillez vérifier votre login et mot de passe !', { containerId: 'A' });
                }
            }
        });
    }

    render() {
        return (
            <section id="wrapper" className="login-register">
                <div style={{ background: '#fff', position: 'absolute', width: '420px', marginLeft: '35%', marginTop: '5%', height: '53px' }}>
                    <div className="white-box">
                        <form className="form-horizontal m-t-20" action="index.html">
                            <div className="form-group ">
                                <div style={{ display: 'flex', justifyContent: 'center' }} className="col-xs-12">
                                    <img style={{ width: '50%' }} src="images/hooda.jpg" alt="HOODA" />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div style={{ display: 'flex', alignItems: 'center' }} className="col-xs-12">
                                    <div style={{ backgroundColor: '#338CA0', height: '38px', display: 'flex', alignItems: 'center', width: '25px', justifyContent: 'center' }}>
                                        <i style={{ color: 'white' }} className="fas fa-envelope-square"></i>
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <input style={{ borderColor: '#006F88' }} className="form-control" type="text" required placeholder="Login" onChange={this.changeusername} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div style={{ display: 'flex', alignItems: 'center' }} className="col-xs-12">
                                    <div style={{ backgroundColor: '#338CA0', height: '38px', display: 'flex', alignItems: 'center', width: '25px', justifyContent: 'center' }}>
                                        <i style={{ color: 'white' }} className="fas fa-lock"></i>
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <input style={{ borderColor: '#006F88' }} className="form-control" type="password" required placeholder="Password" onChange={this.changeuserpasse} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-center m-t-40">
                                <div className="col-xs-12">
                                    <button onClick={this.connect} style={{ width: '40%', backgroundColor: '#006F88', borderColor: '#006F88', fontSize: '16px', borderRadius: '5px', marginTop: '-25px' }} className="btn btn-success btn-lg btn-block text-uppercase waves-effect waves-light" type="button">Connexion</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer transition={Flip} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} autoClose={2500} />
            </section>
        );
    }
}
export default Login;
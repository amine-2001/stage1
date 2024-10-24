import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'

class AjoutAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            login: '',
            pswd: ''
        }
    }

    addNom = (event) => {
        this.setState({
            nom: event.target.value
        });
    }

    addLogin = (event) => {
        this.setState({
            login: event.target.value
        });
    }

    addPswd = (event) => {
        this.setState({
            pswd: event.target.value
        });
    }

    ajout = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/AddAdmin.php',
            type: 'POST',
            data: {
                nom: this.state.nom,
                login: this.state.login,
                pswd: this.state.pswd
            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.Result == "OK") {
                    this.props.history.push('/GestionAdmin');
                }
                else if (code_html.Result == "KO") {
                    alert("erreur,l'un de vos champs est vide!!");
                }
            }
        });
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Ajout admin</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/GestionAdmin" > <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Nom</label>
                                            <input type="text" className="form-control" placeholder="Nom" onChange={this.addNom} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Login</label>
                                            <input type="text" className="form-control" placeholder="Login" onChange={this.addLogin} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Pswd</label>
                                            <input type="text" className="form-control" placeholder="Pswd" onChange={this.addPswd} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <button style={{ borderRadius: '5px' }} type="button" className="btn btn-success" onClick={this.ajout}>Confirmer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AjoutAdmin);
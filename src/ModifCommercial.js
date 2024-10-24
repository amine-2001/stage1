import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class ModifCommercial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCommercial: '',
            nom: '',
            tel: '',
            login: '',
            pswd: ''
        }
    }

    componentDidMount() {
        var idCommercial = this.props.location.state.idCommercial;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetCommercialById.php?id=' + idCommercial).then(res => {
            this.setState({
                idCommercial: idCommercial,
                nom: res.data.nom,
                tel: res.data.tel,
                login: res.data.login,
                pswd: res.data.pswd
            })
        })
    }

    updNom = (event) => {
        this.setState({
            nom: event.target.value
        });
    }

    updTel = (event) => {
        this.setState({
            tel: event.target.value
        });
    }

    updLogin = (event) => {
        this.setState({
            login: event.target.value
        });
    }

    updPswd = (event) => {
        this.setState({
            pswd: event.target.value
        });
    }

    modif = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/UpdCommercial.php?id=' + this.state.idCommercial,
            type: 'POST',
            data: {
                nom: this.state.nom,
                tel: this.state.tel,
                login: this.state.login,
                pswd: this.state.pswd
            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.Result == "OK") {
                    this.props.history.push('/Commerciaux');
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
                            <h4 className="page-title">Modification commercial</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/Commerciaux" > <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Nom</label>
                                            <input type="text" className="form-control" value={this.state.nom} onChange={this.updNom} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tel</label>
                                            <input type="text" className="form-control" value={this.state.tel} onChange={this.updTel} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Login</label>
                                            <input type="text" className="form-control" value={this.state.login} onChange={this.updLogin} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Pswd</label>
                                            <input type="text" className="form-control" value={this.state.pswd} onChange={this.updPswd} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <button style={{ borderRadius: '5px' }} type="button" className="btn btn-success" onClick={this.modif}>Confirmer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ModifCommercial);
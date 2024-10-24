import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'

class AjoutArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Article: '',
            format: '',
            poids: '',
            papier: '',
            prepresse: '',
            impression: '',
            finition: '',
            faconnage: '',
            paquetage: '',
            livraison: '',
            Montant:0,
        }
    }

    addArticle = (event) => {
        this.setState({
            Article: event.target.value
        });
    }
    addMontant = (event) => {
        this.setState({
            Montant: event.target.value
        });
    }
    addformat = (event) => {
        this.setState({
            format: event.target.value
        });
    }
    addpoids = (event) => {
        this.setState({
            poids: event.target.value
        });
    }
    addprepresse = (event) => {
        this.setState({
            prepresse: event.target.value
        });
    }
    addimpression = (event) => {
        this.setState({
            impression: event.target.value
        });
    }
    addfinition = (event) => {
        this.setState({
            finition: event.target.value
        });
    }
    addfaconnage = (event) => {
        this.setState({
            faconnage: event.target.value
        });
    }
    addpaquetage = (event) => {
        this.setState({
            paquetage: event.target.value
        });
    }
    addlivraison = (event) => {
        this.setState({
            livraison: event.target.value
        });
    }
    addpapier = (event) => {
        this.setState({
            papier: event.target.value
        });
    }

    ajout = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/AddArticle.php',
            type: 'POST',
            data: {
                Article: this.state.Article,
                Montant: this.state.Montant,
                format: this.state.format,
                poids: this.state.poids,
                papier: this.state.papier,
                prepresse: this.state.prepresse,
                impression: this.state.impression,
                finition: this.state.finition,
                faconnage: this.state.faconnage,
                paquetage: this.state.paquetage,
                livraison: this.state.livraison

            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.Result == "OK") {
                    this.props.history.push('/Articles');
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
                            <h4 className="page-title">Ajout Article</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/Articles" > <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Article</label>
                                            <input type="text" className="form-control" placeholder="Article" onChange={this.addArticle} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Montant</label>
                                            <input type="text" className="form-control" placeholder="Montant" onChange={this.addMontant} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Format</label>
                                            <input type="text" className="form-control" placeholder="Format" onChange={this.addformat} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Poids</label>
                                            <input type="text" className="form-control" placeholder="Poids" onChange={this.addpoids} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Papier</label>
                                            <input type="text" className="form-control" placeholder="Papier" onChange={this.addpapier} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Prepresse</label>
                                            <input type="text" className="form-control" placeholder="Prepresse" onChange={this.addprepresse} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Impression</label>
                                            <input type="text" className="form-control" placeholder="Impression" onChange={this.addimpression} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Finition</label>
                                            <input type="text" className="form-control" placeholder="Finition" onChange={this.addfinition} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Faconnage</label>
                                            <input type="text" className="form-control" placeholder="Faconnage" onChange={this.addfaconnage} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Paquetage</label>
                                            <input type="text" className="form-control" placeholder="Paquetage" onChange={this.addpaquetage} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Livraison</label>
                                            <input type="text" className="form-control" placeholder="Livraison" onChange={this.addlivraison} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
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

export default withRouter(AjoutArticle);
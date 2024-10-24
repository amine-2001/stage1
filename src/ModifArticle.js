import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class ModifArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idArticle: '',
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
            Montant:0
        }
    }

    componentDidMount() {
        var idArticle = this.props.location.state.idArticle;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetArticleById.php?id=' + idArticle).then(res => {
            this.setState({
                idArticle: idArticle,
                Article: res.data.nom,
                Montant: res.data.montant,  // Mettez à jour l'état de Montant avec res.data.montant
                format: res.data.format,  // Mettez à jour l'état de Montant avec res.data.montant
                poids: res.data.poids,  // Mettez à jour l'état de Montant avec res.data.montant
                papier: res.data.papier,  // Mettez à jour l'état de Montant avec res.data.montant
                prepresse: res.data.prepresse,  // Mettez à jour l'état de Montant avec res.data.montant
                impression: res.data.impression , // Mettez à jour l'état de Montant avec res.data.montant
                finition: res.data.finition,  // Mettez à jour l'état de Montant avec res.data.montant
                faconnage: res.data.faconnage , // Mettez à jour l'état de Montant avec res.data.montant
                paquetage: res.data.paquetage, // Mettez à jour l'état de Montant avec res.data.montant
                livraison: res.data.livraison , // Mettez à jour l'état de Montant avec res.data.montant
            })
        })
    }

    updArticle = (event) => {
        this.setState({
            Article: event.target.value
        });
      };
      
    updMontant = (event) => {
        this.setState({
            Montant: event.target.value
        });
    }
    updformat = (event) => {
        this.setState({
            format: event.target.value
        });
    }
    updpoids = (event) => {
        this.setState({
            poids: event.target.value
        });
    }
    updpapier = (event) => {
        this.setState({
            papier: event.target.value
        });
    }
    updprepresse = (event) => {
        this.setState({
            prepresse: event.target.value
        });
    }
    updimpression = (event) => {
        this.setState({
            impression: event.target.value
        });
    }
    updfinition = (event) => {
        this.setState({
            finition: event.target.value
        });
    }
    updfaconnage = (event) => {
        this.setState({
            faconnage: event.target.value
        });
    }
    updpaquetage = (event) => {
        this.setState({
            paquetage: event.target.value
        });
    }
    updlivraison = (event) => {
        this.setState({
            livraison: event.target.value
        });
    }

    modif = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/UpdArticle.php?id=' + this.state.idArticle,
            type: 'POST',
            data: {
                Article: this.state.Article,
                Montant:this.state.Montant,
                format:this.state.format,
                poids:this.state.poids,
                papier:this.state.papier,
                prepresse:this.state.prepresse,
                impression:this.state.impression,
                finition:this.state.finition,
                faconnage:this.state.faconnage,
                paquetage:this.state.paquetage,
                livraison:this.state.livraison,
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
                            <h4 className="page-title">Modification Article</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/Articles"> <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Articles</label>
                                            <input type="text" className="form-control" value={this.state.Article} onChange={this.updArticle} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Montant</label>
                                            <input type="text" className="form-control" value={this.state.Montant} onChange={this.updMontant} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Format</label>
                                            <input type="text" className="form-control" value={this.state.format} onChange={this.updformat} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Poids</label>
                                            <input type="text" className="form-control" value={this.state.poids} onChange={this.updpoids} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Papier</label>
                                            <input type="text" className="form-control" value={this.state.papier} onChange={this.updpapier} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Prepresse</label>
                                            <input type="text" className="form-control" value={this.state.prepresse} onChange={this.updprepresse} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Impression</label>
                                            <input type="text" className="form-control" value={this.state.impression} onChange={this.updimpression} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Finition</label>
                                            <input type="text" className="form-control" value={this.state.finition} onChange={this.updfinition} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Faconnage</label>
                                            <input type="text" className="form-control" value={this.state.faconnage} onChange={this.updfaconnage} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Paquetage</label>
                                            <input type="text" className="form-control" value={this.state.paquetage} onChange={this.updpaquetage} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>livraison</label>
                                            <input type="text" className="form-control" value={this.state.livraison} onChange={this.updlivraison} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
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

export default withRouter(ModifArticle);
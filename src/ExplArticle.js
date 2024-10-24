import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';

class ExplClient extends Component {
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
                livraison: res.data.livraison ,
            })
        })
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Exploration Article</h4>
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
                                            <label>Articles</label>
                                            <input type="text" className="form-control" disabled value={this.state.Article} onChange={this.updArticle} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Montant</label>
                                            <input type="text" className="form-control" disabled value={this.state.Montant}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Format</label>
                                            <input type="text" className="form-control" disabled value={this.state.format}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Poids</label>
                                            <input type="text" className="form-control" disabled value={this.state.poids}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Papier</label>
                                            <input type="text" className="form-control" disabled value={this.state.papier}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Prepresse</label>
                                            <input type="text" className="form-control" disabled value={this.state.prepresse}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Impression</label>
                                            <input type="text" className="form-control" disabled value={this.state.impression}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Finition</label>
                                            <input type="text" className="form-control" disabled value={this.state.finition}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Faconnage</label>
                                            <input type="text" className="form-control" disabled value={this.state.faconnage}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Paquetage</label>
                                            <input type="text" className="form-control" disabled value={this.state.paquetage}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>livraison</label>
                                            <input type="text" className="form-control" disabled value={this.state.livraison}  style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
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

export default withRouter(ExplClient);
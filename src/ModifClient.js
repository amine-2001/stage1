import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

class ModifClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idClient: '',
            raisonSocial: '',
            responsable: '',
            telephone: '',
            adresse: '',
            mf: '',
            Commerciaux: [],
            selectedCommercial: '',
            villes: [],
            selectedVille: '',
            email: ''
        }
    }

    componentDidMount() {
        var idClient = this.props.location.state.idClient;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetClientById.php?id=' + idClient).then(res => {
            this.setState({
                idClient: idClient,
                raisonSocial: res.data.raisonSocial,
                responsable: res.data.responsable,
                telephone: res.data.telephone,
                adresse: res.data.adresse,
                mf: res.data.mf,
                email: res.data.email,
                selectedCommercial: res.data.commercial,
                selectedVille: res.data.ville
            })
        })
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectCommerciaux.php').then(res => {
            console.log(res)
            this.setState({
                Commerciaux: res.data
            })
        })
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectVilles.php').then(res => {
            console.log(res)
            this.setState({
                villes: res.data
            })
        })
    }

    updRaisonSocial = (event) => {
        this.setState({
            raisonSocial: event.target.value
        });
    }

    updResponsable = (event) => {
        this.setState({
            responsable: event.target.value
        });
    }

    updTelephone = (event) => {
        this.setState({
            telephone: event.target.value
        });
    }

    updAdresse = (event) => {
        this.setState({
            adresse: event.target.value
        });
    }

    updMf = (event) => {
        this.setState({
            mf: event.target.value
        });
    }
    updemail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    updCommercial = selectedCommercial => {
        this.setState({ selectedCommercial: selectedCommercial });
    };

    updVille = selectedVille => {
        this.setState({ selectedVille: selectedVille });
    };

    modif = () => {
        if (this.state.selectedCommercial != '' && this.state.selectedVille != ''&& this.state.email != '') {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/UpdClient.php?id=' + this.state.idClient,
            type: 'POST',
            data: {
                raisonSocial: this.state.raisonSocial,
                responsable: this.state.responsable,
                telephone: this.state.telephone,
                adresse: this.state.adresse,
                mf: this.state.mf,
                email: this.state.email,
                idCommercial: this.state.selectedCommercial.value,
                idVille: this.state.selectedVille.value
            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.Result == "OK") {
                    this.props.history.push('/Clients');
                }
                else if (code_html.Result == "KO") {
                    alert("erreur,l'un de vos champs est vide!!");
                }
            }
        });
        }else{
            toast.error('⛔ Veuillez verifier les champs commercial,ville et email  !!', { containerId: 'A' });
        }    
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Modification client</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/Clients" > <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Raison-social</label>
                                            <input type="text" className="form-control" value={this.state.raisonSocial} onChange={this.updRaisonSocial} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Responsable</label>
                                            <input type="text" className="form-control" value={this.state.responsable} onChange={this.updResponsable} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tel</label>
                                            <input type="text" className="form-control" value={this.state.telephone} onChange={this.updTelephone} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Adresse</label>
                                            <input type="text" className="form-control" value={this.state.adresse} onChange={this.updAdresse} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Matricule-fiscale</label>
                                            <input type="text" className="form-control" value={this.state.mf} onChange={this.updMf} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" value={this.state.email} onChange={this.updemail} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Commercial</label>
                                            <Select
                                                value={this.state.selectedCommercial}
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.updCommercial}
                                                options={this.state.Commerciaux}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Ville</label>
                                            <Select
                                                value={this.state.selectedVille}
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.updVille}
                                                options={this.state.villes}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <button style={{ borderRadius: '5px' }} type="button" className="btn btn-success" onClick={this.modif}>Confirmer</button>
                                </div>
                            </div>
                            <ToastContainer transition={Flip} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} autoClose={2500} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ModifClient);
import React, { Component } from 'react'
import axios from 'axios'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

class AjoutClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    addRaisonSocial = (event) => {
        this.setState({
            raisonSocial: event.target.value
        });
    }

    addResponsable = (event) => {
        this.setState({
            responsable: event.target.value
        });
    }

    addTelephone = (event) => {
        this.setState({
            telephone: event.target.value
        });
    }

    addAdresse = (event) => {
        this.setState({
            adresse: event.target.value
        });
    }

    addMf = (event) => {
        this.setState({
            mf: event.target.value
        });
    }
    addemail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    addCommercial = selectedCommercial => {
        this.setState({ selectedCommercial: selectedCommercial });
    };

    addVille = selectedVille => {
        this.setState({ selectedVille: selectedVille });
    };

    ajout = () => {
        if (this.state.selectedCommercial != '' && this.state.selectedVille != ''&& this.state.email != '') {
            jQuery.ajax({
                url: process.env.REACT_APP_API_URL + 'Back_hooda/AddClient.php',
                type: 'POST',
                data: {
                    raisonSocial: this.state.raisonSocial,
                    responsable: this.state.responsable,
                    telephone: this.state.telephone,
                    adresse: this.state.adresse,
                    email: this.state.email,
                    mf: this.state.mf,
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
        }
        else {
            toast.error('⛔ Veuillez verifier les champs commercial,ville et email  !!', { containerId: 'A' });
        }
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Ajout client</h4>
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
                                            <input type="text" className="form-control" placeholder="Raison-social" onChange={this.addRaisonSocial} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Responsable</label>
                                            <input type="text" className="form-control" placeholder="Responsable" onChange={this.addResponsable} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tel</label>
                                            <input type="text" className="form-control" placeholder="Tel" onChange={this.addTelephone} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Adresse</label>
                                            <input type="text" className="form-control" placeholder="Adresse" onChange={this.addAdresse} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Matricule-fiscale</label>
                                            <input type="text" className="form-control" placeholder="Matricule-fiscale" onChange={this.addMf} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" placeholder="Email" onChange={this.addemail} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Commercial</label>
                                            <Select
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.addCommercial}
                                                options={this.state.Commerciaux}
                                                placeholder="Sélectionnez un commercial..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Ville</label>
                                            <Select
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.addVille}
                                                options={this.state.villes}
                                                placeholder="Sélectionnez une ville..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <button style={{ borderRadius: '5px' }} type="button" className="btn btn-success" onClick={this.ajout}>Confirmer</button>
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

export default withRouter(AjoutClient);
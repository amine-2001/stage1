import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';

class ExplClient extends Component {
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
            latitude: '',
            longitude: '',
            photo: '',
            email:''
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
                selectedVille: res.data.ville,
                latitude: res.data.latitude,
                longitude: res.data.longitude,
                photo: res.data.photo
            })
        })
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Exploration client</h4>
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
                                            <input type="text" className="form-control" disabled value={this.state.raisonSocial} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Responsable</label>
                                            <input type="text" className="form-control" disabled value={this.state.responsable} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tel</label>
                                            <input type="text" className="form-control" disabled value={this.state.telephone} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Adresse</label>
                                            <input type="text" className="form-control" disabled value={this.state.adresse} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Matricule-fiscale</label>
                                            <input type="text" className="form-control" disabled value={this.state.mf} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" disabled value={this.state.email} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Commercial</label>
                                            <Select
                                                isDisabled={true}
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
                                                isDisabled={true}
                                                value={this.state.selectedVille}
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.updVille}
                                                options={this.state.villes}
                                            />
                                        </div>
                                    </div>
                                    {this.state.latitude != null && this.state.longitude != null ? (
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Emplacement-Maps</label>
                                                <Link to={{ pathname: '/Maps', state: { idClient: this.state.idClient } }}><input disabled type="text" className="form-control" value={"Voir emplacement"} style={{ cursor: 'pointer', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} /></Link>
                                            </div>
                                        </div>) : (null)}
                                    {this.state.photo != null ? (
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Photo</label>
                                                <img src={"https://hoodaimprimerie.mtd-app.com/Back_hooda/mobile/images/" + this.state.photo} alt="photo" />
                                            </div>
                                        </div>) : (null)}
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
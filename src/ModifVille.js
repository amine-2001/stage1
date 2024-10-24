import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class ModifVille extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idVille: '',
            ville: ''
        }
    }

    componentDidMount() {
        var idVille = this.props.location.state.idVille;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetVilleById.php?id=' + idVille).then(res => {
            this.setState({
                idVille: idVille,
                ville: res.data.nom
            })
        })
    }

    updVille = (event) => {
        this.setState({
            ville: event.target.value
        });
    }

    modif = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/UpdVille.php?id=' + this.state.idVille,
            type: 'POST',
            data: {
                ville: this.state.ville
            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.Result == "OK") {
                    this.props.history.push('/Villes');
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
                            <h4 className="page-title">Modification ville</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/Villes"> <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Villes</label>
                                            <input type="text" className="form-control" value={this.state.ville} onChange={this.updVille} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
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

export default withRouter(ModifVille);
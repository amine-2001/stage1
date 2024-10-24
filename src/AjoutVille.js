import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'

class AjoutVille extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ville: ''
        }
    }

    addVille = (event) => {
        this.setState({
            ville: event.target.value
        });
    }

    ajout = () => {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/AddVille.php',
            type: 'POST',
            data: {
                ville: this.state.ville
            },
            dataType: 'json',
            success: (code_html, statut) => {
                if (code_html.Result == "OK") {
                    this.props.history.push('/villes');
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
                            <h4 className="page-title">Ajout ville</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/villes" > <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>ville</label>
                                            <input type="text" className="form-control" placeholder="ville" onChange={this.addVille} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
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

export default withRouter(AjoutVille);
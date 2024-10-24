import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'

class ExplRappVisite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayPhoto: [],
            date: '',
            magasin: '',
            commercial_id: '',
            client_id: '',
            remarque: ''
        }
    }

    componentDidMount() {
        var idRappVisite = this.props.location.state.idRappVisite;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetRapportVisiteById.php?id=' + idRappVisite).then(res => {
            this.setState({
                arrayPhoto: res.data.photo,
                date: res.data.date,
                commercial: res.data.commercial,
                client: res.data.client,
                remarque: res.data.remarque
            })
        })
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Rapport visite</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/RapportVisite"> <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input type="text" className="form-control" disabled value={this.state.date} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Client</label>
                                            <input type="text" className="form-control" disabled value={this.state.client} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Commercial</label>
                                            <input type="text" className="form-control" disabled value={this.state.commercial} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Remarque</label>
                                            <input type="text" className="form-control" disabled value={this.state.remarque} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="row">
                                    {this.state.arrayPhoto.length > 0 ? (
                                        this.state.arrayPhoto.map(el =>
                                            <div class="card" className="col-md-3">
                                                <img class="card-img-top" style={{ width: '350px', height: '350px' }} src={"https://hoodaimprimerie.mtd-app.com/Back_hooda/mobile/images/" + el} />
                                            </div>
                                        )
                                    ) : (null)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ExplRappVisite);
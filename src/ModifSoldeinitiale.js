import React, { Component } from 'react'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import DatePicker from "react-datepicker";

class ModifSoldeinitiale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSoldeinitiale: '',
            clients: [],
            selectedClients: '',
            date: '',
            dates:"",
            Montantinitial:0,
        }
    }

    componentDidMount() {
        var idSoldeinitiale = this.props.location.state.idSoldeinitiale;
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/GetSoldeinitialeById.php?id=' + idSoldeinitiale).then(res => {
            this.setState({
                idSoldeinitiale: idSoldeinitiale,
                Montantinitial:res.data.Montantinitial,
                date: new Date(res.data.date),
                selectedClients: res.data.client
            })
        })
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsCommande.php').then(res => {
            console.log(res)
            this.setState({
                clients: res.data
            })
        })
    }

    updSoldeinitial = (event) => {
        this.setState({
            Montantinitial: event.target.value
        });
    }
    upddate = (event) => {
        this.setState({
            date: event.target.value
        });
    }
    searchDate = d => {
        this.setState({
            date: d
        });
    };
    

    updClients = selectedClients => {
        this.setState({ selectedClients: selectedClients });
    };

   

    modif = () => {
        if (this.state.date != null && this.state.selectedClients !== '') {
            
            var date = this.state.date
            let monthOne = '' + (date.getMonth() + 1);
            let dayOne = '' + date.getDate();
            let yearOne = date.getFullYear();
            if (monthOne.length < 2 && monthOne.length === 0)
                monthOne = '0' + monthOne;
            if (dayOne.length < 2 && dayOne.length===0)
                dayOne = '0' + dayOne;
            var convertDate = [yearOne, monthOne, dayOne].join('-');
            jQuery.ajax({
                url: process.env.REACT_APP_API_URL + 'Back_hooda/UpdSoldeinitiale.php?id=' + this.state.idSoldeinitiale,
                type: 'POST',
                data: {
                    idClients: this.state.selectedClients.value,
                    Montantinitial:this.state.Montantinitial,
                    date: convertDate
                    
                },
                dataType: 'json',
                success: (code_html, statut) => {
                    if (code_html.Result == "OK") {
                        this.props.history.push('/Soldeinitiale');
                    }
                    else if (code_html.Result == "KO") {
                        alert("erreur,l'un de vos champs est vide!!");
                    }
                }
            });
        }else{
            toast.error('⛔ Veuillez verifier le champs client et date !!', { containerId: 'A' });
        }    
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Modification Client : {this.state.selectedClients.label}</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/Soldeinitiale" > <button style={{ background: '#DC143C', border: '1px solid #DC143C', borderRadius: '5px' }} type="button" className="btn btn-info"> <i style={{ paddingRight: '5px' }} className="fas fa-arrow-circle-left"></i>Retour</button></Link>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Solde Initial</label>
                                            <input type="text" className="form-control" value={this.state.Montantinitial} onChange={this.updSoldeinitial} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />
                                        </div>
                                    </div>
                                <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Date</label>
                                            {/*<input type="text" className="form-control" value={this.state.date} onChange={this.upddate} style={{ borderRadius: '5px', border: 'solid 1px #B3B3B3' }} />*/}
                                            <DatePicker class="form-control ddate" style={{ border: 'none' }}
                                                    selected={this.state.date}
                                                    onChange={this.searchDate}
                                                    dateFormat="dd/MM/yyy"
                                                    placeholderText='JJ/MM/YYYY'/>
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

export default withRouter(ModifSoldeinitiale);
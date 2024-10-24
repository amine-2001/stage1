import React, { Component, Fragment } from 'react'
import axios from 'axios'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

import 'rc-checkbox/assets/index.css';


class SolderClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomEns: '',
            client: [],
            selectedEns: '',
         ladate:new Date().getFullYear(),
            regEnsNv: [],
            regEnsAnc: [],
            initStatus: 1,
            blockRegl: false,
            blockPaiement: false,
            disabledForAnc: false,
            disabledCycleAnc: false,
            disabledSurveilAnc: false,
            disabledForNv: false,
            disabledCycleNv: false,
            disabledSurveilNv: false,
            datePaiement: new Date(),
            tabModPay: [{ modPay: '', mntModPay: '', numCheque: '', echeanceChec: new Date() }],
            modal: false,
            indexLignASupprimer: '',
            disbut: true,
            solde: 0 ,
            date:'',
            // Ajoutez cette ligne pour le solde initial
        }
    }

    /*componentDidMount() {
        
        
             
                jQuery.ajax({
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsReg.php',
                    type: 'POST',
                    data: {
                        
                    },
                    dataType: 'json',
                    success: (code_html, statut) => {
                        this.setState({
                            client: code_html
                        })
                    }
                });
              
          
    }*/
    

    addEns = (selectedEns) => {
        if (selectedEns!==null  ) {
        this.setState({ selectedEns: selectedEns });
        const clientId = selectedEns.value;
        // Effectuez une requête AJAX pour récupérer le solde initial du client
            jQuery.ajax({
                url: process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsReg.php',
                type: 'POST',
                data: {
                    clientId: clientId
                },
                dataType: 'json',
                success: (code_html) => {
                    console.log(code_html)
                    this.setState({
                        solde: code_html[0].solde,
                        date: code_html[0].date,
                        
                    });
                }
            });
        }else  {
            toast.error('⛔ Veuillez verifier le champs Client !!', { containerId: 'A' });
        }   
    }






    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsCommande.php').then(res => {
            console.log(res)
            this.setState({
                client: res.data
            })
        })
        /*var idSoldeinitiale = this.props.location.state.idSoldeinitiale;*/
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsReg.php'/*?id= + idSoldeinitiale*/).then(res => {
            this.setState({
                solde:res.data.solde,
                
            })
        })
    }    
    


   

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Reglement Client</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div className="row">
                                    <table className="table table-bordered">
                                            
                                            
                                            <tbody >
                                            
                                            <tr >
                                                <td className="col-md-6" style={{ textAlign: "center",width: '15%', whiteSpace: 'normal' }}>
                                                <label>Client</label>
                                            <Select
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.addEns }    
                                                options={this.state.client}
                                            />
                                            {this.state.selectedEns && (
                                                <div>
                                                    <h5  style={{  color: 'blue',  display: 'flex', justifyContent: 'flex-start',fontFamily: "Montserrat, sans-serif" }}>
                                                    Solde initial du client {this.state.selectedEns.label} = {this.state.solde!=undefined  ? `${this.state.solde}` + 'd' + '    ' + ' à la date ' + '  ' + `${this.state.date}` : '0 d' + ' à la date '+'     '+ `${this.state.date}`}
                                                    </h5>       
                                                </div>
                                            )}
                                        <ToastContainer transition={Flip} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} autoClose={2500} />
                        
                    
                                            </td>
                                                <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                                                </td>
                                                <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                                                </td>
                                                <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                                                </td>
                                                </tr>
                                                </tbody>
                                            
                                    </table>
             
                                  
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
export default withRouter(SolderClient);
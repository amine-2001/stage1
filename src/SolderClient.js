import React, { Component, Fragment } from 'react'
import axios from 'axios'
import jQuery from 'jquery'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class SolderClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomEns: '',
            reglement:[],
            selectedclient: '',
            soldeclient:'',
            solde:"",
            datei:"",
            affich:"false",
            disabledForAnc: false,
            total:0,
            client_id:"",
            mntAPayer:0,reste:0,
            id:"",
            disbut: true,
            comercial_id:'',
            datePaiement: new Date(),
            modal: false,
            indexLignASupprimer: '',
            tabModPay: [{ modPay: '', mntModPay: '', numCheque: '', echeanceChec: new Date() }],
        
        }
    }

    componentDidMount() {
        
        
             
                jQuery.ajax({
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsReg.php',
                    type: 'POST',
                    data: {
                        
                    },
                    dataType: 'json',
                    success: (code_html, statut) => {
                        this.setState({
                            client: code_html,
                            comercial_id:code_html[0].idcomercial
                        })
                    
                    },
                })
                axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectModePaiement.php').then(res => {
                    console.log(res)
                    this.setState({
                        listModPay: res.data
                    })
                })
                
                this.setState({
                    total: 1000
                })      
    }



    addEns = (selectedclient) => {
       
        if (selectedclient != null) {
            this.setState(
                {
                    selectedclient: selectedclient,
                }, () => {
                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_hooda/GetReglemntyId.php',
                        type: 'POST',
                        data: {
                            id: this.state.selectedclient.value,
                            
                        },
                        dataType: 'json',
                        success: (code_html, statut) => {
                            this.setState({
                                reglement:code_html,
                                id:code_html.client_id,
                               
                                

                                
                            },
                          
                            
                             () => {
                                
                                this.setState({
                                    affich: "true"
                                });
                            },
                            )
                        }
                    });
                },
            )
            }else{
                 {
                    this.setState({
                        affich: "false"
                    });
                }
            }
        }
        //recuperer montant
        
        
    
        addModPay = (selectedModPay, indexModPay) => {
            if (selectedModPay != null) {
                let modPay = selectedModPay;
                this.setState({
                    tabModPay: this.state.tabModPay.map((el, id) => (id === indexModPay ? Object.assign(el, { modPay: modPay }) : el))
                });
            }
        }

        addEcheanceChec = (d, indexModPay) => {
            let dateChec = d;
            this.setState({
                tabModPay: this.state.tabModPay.map((el, id) => (id === indexModPay ? Object.assign(el, { echeanceChec: dateChec }) : el))
            });
        }
        
    addMntModPay = (event, indexModPay) => {
        let mntModPay = event.target.value;
        this.setState({
            tabModPay: this.state.tabModPay.map((el, id) => (id === indexModPay ? Object.assign(el, { mntModPay: mntModPay }) : el))
        });
    }

    addNumChec = (event, indexModPay) => {
        let numCheque = event.target.value;
        this.setState({
            tabModPay: this.state.tabModPay.map((el, id) => (id === indexModPay ? Object.assign(el, { numCheque: numCheque }) : el))
        });
    }

    toggleLign = (index) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            indexLignASupprimer: index
        }));
    }

    deleteLign = () => {
        this.state.tabModPay.splice(this.state.indexLignASupprimer, 1)
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    additionLign = () => {
        let element = { modPay: '', mntModPay: '', numCheque: '', echeanceChec: new Date() }
        this.setState({
            tabModPay: [...this.state.tabModPay, element]
        })
    }

    nonDeleteLign = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    mntPayerForAnc = (event, index) => {
        var mntPayFor = event.target.value
        console.log(mntPayFor)
        //alert(this.state.reglement[index].mntTotal >= parseInt(mntPayFor) + parseInt(this.state.reglement[index].totalPayer))
        if (this.state.reglement[index].mntTotal >= parseInt(mntPayFor) + parseInt(this.state.reglement[index].totalPayer)) {
            var arrayFor = this.state.reglement
            var elFor = arrayFor[index]
            elFor: Object.assign(elFor, { mntAPayer: mntPayFor })
            this.setState({
                reglement: arrayFor
            }, () => {
          
                var mntRest = this.state.reglement[index].mntTotal - (parseInt(this.state.reglement[index].totalPayer) + parseInt(this.state.reglement[index].mntAPayer))
                var arrayFor = this.state.reglement
                var elFor = arrayFor[index]
                elFor: Object.assign(elFor, { reste: mntRest })
                this.setState({
                    reglement: arrayFor
                });
            });
        }
        else {
            
            toast.error('⛔ Le montant saisie est supérieur !!', { containerId: 'A' });
        }
    }

    addPayTotReg = (e, index) => {
        console.log('Checkbox checked:', (e.target.checked));
        if (e.target.checked === true) {
            var arrayFor = this.state.reglement
            var mntPayFor = arrayFor[index].reste
           
            var elFor = arrayFor[index]
            
            elFor: Object.assign(elFor, { mntAPayer: mntPayFor })
            this.setState({
                reglement: arrayFor
            }, () => {
              
              
                var mntRest= this.state.reglement[index].mntTotal - (parseInt(this.state.reglement[index].totalPayer) + parseInt(this.state.reglement[index].mntAPayer))
                
                var arrayFor = this.state.reglement
                var elFor = arrayFor[index]
                elFor: Object.assign(elFor, { reste: mntRest })
                this.setState({
                    reglement: arrayFor
                });
            });
        }
        else {
            
            var arrayFor = this.state.reglement
            var mntPayFor = 0
            var elFor = arrayFor[index]
            elFor: Object.assign(elFor, { mntAPayer: mntPayFor })
            this.setState({
                reglement: arrayFor
            }, () => {
                var mntRest = this.state.reglement[index].mntTotal - (this.state.reglement[index].totalPayer + parseInt(this.state.reglement[index].mntAPayer))
                var arrayFor = this.state.reglement
                var elFor = arrayFor[index]
                elFor: Object.assign(elFor, { reste: mntRest })
                this.setState({
                    reglement: arrayFor
                });
            });
        }
    }

    ajout = () => {
        this.setState({ disbut: false }, () => {
            // verifier la somme payer par rapport a la somme de mode de paiement
            var sommeForAnc = 0
            var sommePaiement = 0
        
            
            // Ancienne année 
            if (this.state.reglement.length > 0) {
                for (var i = 0; i < this.state.reglement.length; i++) {
                    // Formation 
                    if (this.state.reglement.length > 0) {
                        sommeForAnc += parseInt(this.state.reglement[i].mntAPayer)
                    }
                   
                   
                }
            }
           
            
            
            sommePaiement =  sommeForAnc
            var sommeReg = 0
            for (var i = 0; i < this.state.tabModPay.length; i++) {
                sommeReg += parseInt(this.state.tabModPay[i].mntModPay)
            }
            if (sommePaiement !== sommeReg) {
                toast.error('⛔ Veuillez vérifier les sommes saisie !', { containerId: 'A' });
            }
            else {
                var userPermissions = JSON.parse((localStorage.getItem('userPermissions')));
                
                // convert date paiement
                let datePaiement = this.state.datePaiement
                let month = '' + (datePaiement.getMonth() + 1);
                let day = '' + datePaiement.getDate();
                let year = datePaiement.getFullYear();
                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                var convertDatePaiement = [year, month, day].join('-');
                jQuery.ajax({
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/AddReglement.php',
                    type: 'POST',
                    data: {
                        datePay: convertDatePaiement,
                        clientId: this.state.selectedclient.value,
                        comercialId:this.state.comercial_id,
                        sommeTot: sommePaiement,
                        reglement: this.state.reglement,
                        
                        modPay: this.state.tabModPay,
                        // echeanceChec: convertDateEcheChec,
                       
                    },
                    dataType: 'json',
                    success: (code_html, statut) => {
                        if (code_html.Result == "OK") {
                            this.props.history.push('/consulteReglementclient');
                        }
                        else if (code_html.Result == "KO") {
                            alert("erreur,l'un de vos champs est vide!!");
                        }
                    }
                });
            }
        })
    }
    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Reglement client</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Client</label>
                                            <Select
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={this.addEns}
                                                
                                                options={this.state.client}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div>
                                   
                                       {this.state.affich=="true" ?(
                                        
                                        
                                        this.state.montanti != 0 ?(
                                            <div>

                                     {/* <strong><p style={{textAlign:"start",paddingLeft:"70px",paddingTop:"10px"}}> LE Client      {this.state.selectedclient.label}    Son Solde Initiale Est   :  {Number.parseFloat(this.state.montanti).toFixed(3)}   à La Date   { this.state.datei}</p></strong>*/}
                                       
                                     
                                     
                                       <Fragment>
                                           <h3 style={{ paddingLeft: '10px' }}></h3>
                                           <table style={{ marginTop: '50px' }} className="table table-bordered">
                                           {this.state.reglement.map((el, index) =>
                                                   <tbody>
                                                       <td style={{ paddingLeft: '10px', color: 'salmon', fontWeight: 'bold' }}>
                                                           
                                                               <table style={{ width: '100%' }}>
                                                                   <thead>
                                                                       <tr>
                                                                       <th style={{ textAlign: 'center', color: '#00CED1', fontWeight: 'bold' }} scope="col"></th>
                                                                           <th style={{ textAlign: 'center', color: '#00CED1', fontWeight: 'bold' }} scope="col"></th>
                                                                           
                                                                           
                                                                           <th style={{ textAlign: 'center', color: '#00CED1', fontWeight: 'bold' }} scope="col">Cocher</th>
                                                                       </tr>
                                                                   </thead>
                                                    <tbody>
                                                    
                                                    {el.date}
                                                            <tr>
                                                         
                                                                <td style={{ textAlign: 'center' }}>
                                                                          
                                                                    <p style={{ textAlign: 'center', color: '#565656' }}> Montant Total</p>
                                                                            
                                                                </td>

                                                                    <td style={{ textAlign: 'center' }}>
                                                                       <p style={{ color: '#565656' }}>{Number.parseFloat(el.mntTotal).toFixed(3)}</p>
                                                                       </td>
                                                                       
                                                                       
                                                                       <td>
                                                                        
                                                                               <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                                   <Checkbox
                                                                                         onChange={(e) => this.addPayTotReg(e, index)}
                                                                                       disabled={this.state.disabledForAnc}
                                                                                   />
                                                                               </div>
                                                                       </td>
                                                                   </tr>
                                                                   <tr>
                                                                   <td style={{ textAlign: 'center' }}>
                                                                          
                                                                          <p style={{ textAlign: 'center', color: '#565656' }}>Reste</p>
                                                                      
                                                                  </td>
                                                                 
                                                                   <td style={{ textAlign: 'center' }}>
                                                                       
                                                                   
                                                                                   
                                                                       <input type="number" style={{ textAlign: 'center', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} value={Number.parseFloat(el.reste).toFixed(3)}/>
                                                                   
                                                       
                                                       </td>
                                                                   </tr>
                                                         <tr>
                                                                   <td style={{ textAlign: 'center' }}>
                                                                          
                                                                          <p style={{ textAlign: 'center', color: '#565656' }}>mntAPayer</p>
                                                                      
                                                                  </td>
                                                                 
                                                                   <td style={{ textAlign: 'center' }}>
                                                                       
                                                                   
                                                                  
                                                                                            <input type="number" onChange={(e) => this.mntPayerForAnc(e, index)} style={{ textAlign: 'center', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} value={Number.parseFloat(el.mntAPayer).toFixed(3)}/>
                                                                                            
                                                                       
                                                                   
                                                       
                                                       </td>
                                                     
                                                                   </tr>
                                                                  
                                              
                                                               </tbody>
                                                               </table>
                                                       </td>
                                                   </tbody>
                                           )}
                                                   <Fragment>
                                       <h3 style={{ paddingLeft: '15px' }}>Mode de paiement :</h3>
                                       <table style={{ marginTop: '10px' }} className="table table-bordered">
                                           <thead>
                                               <tr>
                                                   <th style={{ textAlign: 'center' }} scope="col">Mode paiement</th>
                                                   <th style={{ textAlign: 'center' }} scope="col">Montant Paiement</th>
                                                   <th style={{ textAlign: 'center' }} scope="col">Numéro cheque</th>
                                                   <th style={{ textAlign: 'center' }} scope="col">Echéance cheque</th>
                                                   <th style={{ textAlign: 'center' }} scope="col">Suppression</th>
                                               </tr>
                                           </thead>
                                           {this.state.tabModPay.map((el, index) =>
                                               <tbody>
                                                   <tr>
                                                       <td className="col-md-3"><Select
                                                           value={el.modPay}
                                                           isClearable={true}
                                                           isSearchable={true}
                                                           onChange={(e) => this.addModPay(e, index)}
                                                           options={this.state.listModPay}
                                                       />  </td>
                                                       <td className="col-md-3" style={{ textAlign: 'center' }}><input type="number" value={el.mntModPay} onChange={(e) => this.addMntModPay(e, index)} style={{ textAlign: 'center', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} /></td>
                                                       {this.state.tabModPay[index].modPay.value == 2 ?
                                                           (<Fragment>
                                                               <td className="col-md-3" style={{ textAlign: 'center' }}><input type="number" value={el.numCheque} onChange={(e) => this.addNumChec(e, index)} style={{ textAlign: 'center', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} /></td>
                                                               <td className="col-md-2" style={{ textAlign: 'center' }}><DatePicker class="form-control ddate" style={{ border: 'none' }} dateFormat="dd/MM/yyy" selected={el.echeanceChec} onChange={(e) => this.addEcheanceChec(e, index)} /></td>
                                                               <td className="col-md-1" style={{ textAlign: 'center' }}><button style={{ backgroundColor: '#D9534F', borderRadius: '5px' }} onClick={() => this.toggleLign(index)}><i style={{ color: 'white' }} className="fas fa-trash-alt"></i></button></td>
                                                           </Fragment>) :
                                                           (<Fragment>
                                                               <td className="col-md-3" style={{ textAlign: 'center' }}><input type="number" disabled style={{ textAlign: 'center', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} /></td>
                                                               <td className="col-md-2" style={{ textAlign: 'center' }}><input type="number" disabled style={{ textAlign: 'center', borderRadius: '5px', border: 'solid 1px #B3B3B3' }} /></td>
                                                               <td className="col-md-1" style={{ textAlign: 'center' }}><button style={{ backgroundColor: '#D9534F', borderRadius: '5px' }} onClick={() => this.toggleLign(index)}><i style={{ color: 'white' }} className="fas fa-trash-alt"></i></button></td>
                                                           </Fragment>)}
                                                   </tr>
                                               </tbody>
                                           )}
                                       </table>
                                       <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '15px' }}>
                                           <Button style={{ borderRadius: '5px' }} onClick={this.additionLign} color="secondary"><i className="fas fa-plus-circle"></i>Ajouter ligne</Button>
                                       </div>
                                       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                           <button disabled={!this.state.disbut} style={{ borderRadius: '5px' }} type="button" className="btn btn-success" onClick={this.ajout}>Confirmer</button>
                                       </div>
                                   </Fragment>
                                           </table> </Fragment>
                               
                                      </div> ):(<p style={{color:"red"}}>{this.state.selectedclient.label } :  Solde initiale est 0</p>)
                                      
                                     
                                       ):(<h5>Choisir un client</h5>)}
                                        
                                    </div>
                                    
                                    
                                    
                                </div>
                                <Modal isOpen={this.state.modal} toggle={this.nonDeleteLign} className={this.props.className} fade={false}>
                                    <ModalHeader toggle={this.nonDeleteLign}> <div style={{ display: 'flex', justifyContent: 'center', width: '465px' }}><img width='30%' src="./images/deleteModal.png" alt=".." /></div></ModalHeader>
                                    <ModalBody>
                                        <div style={{ fontFamily: 'Montserrat, sans-serif', FontSize: '14px', FontWeight: '700', LineHeight: '18.375px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <p>Êtes-Vous sûr de vouloir supprimer ce mode de paiement ?</p>
                                            </div>
                                            <div className='hvr-push' style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                                                <div><button onClick={() => this.deleteLign()} style={{ backgroundColor: '#00FF7F', borderRadius: '5px', color: 'white' }}><i style={{ color: 'white' }} className="far fa-thumbs-up"></i>Oui</button></div>
                                                <div><button onClick={() => this.nonDeleteLign()} style={{ backgroundColor: '#D9534F', borderRadius: '5px', color: 'white' }}><i style={{ color: 'white' }} className="far fa-thumbs-down"></i>Non</button></div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </Modal>
                                <ToastContainer transition={Flip} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} autoClose={2500} />
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(SolderClient);
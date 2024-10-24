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

class ConsulterReglement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomEns: '',
            reglement:[],
            selectedclient: '',
            s:0,
            solde:"",
            datei:"",
            affich:"false",
            total:0,
            mntAPayer:0,
            reste:0,
            montanti:0,
            client_id:'',
              dateDebut: '',
            dateFin: '',
            affich:"false",

          
        
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
                            client: code_html
                        })
                    
                    },
                })
                
                
                this.setState({
                    total: 1000
                })      
    }



    addEns = (selectedclient) => {
         // convertir date debut
         
        if (selectedclient != null) {
            this.setState(
                {
                    selectedclient: selectedclient,
                }
                
                , 
            )
            }else{
                 {
                    this.setState({
                        affich: "false"
                    });
                }
            }
        }
        //recuperer date
        
        searchDateDebut = d => {
            this.setState({
                dateDebut: d
            });
        };
    
        searchDateFin = d => {
            this.setState({
                dateFin: d
            });
        };
 recherche =()=>{
    if (this.state.dateDebut != '') {
        var dateDebut = this.state.dateDebut
        let monthOne = '' + (dateDebut.getMonth() + 1);
        let dayOne = '' + dateDebut.getDate();
        let yearOne = dateDebut.getFullYear();
        if (monthOne.length < 2)
            monthOne = '0' + monthOne;
        if (dayOne.length < 2)
            dayOne = '0' + dayOne;
        var convertDateDebut = [yearOne, monthOne, dayOne].join('-');
    }
    else {
        var convertDateDebut = '';
    }

    //convert date fin
    if (this.state.dateFin != '') {
        var dateFin = this.state.dateFin
        let monthTwo = '' + (dateFin.getMonth() + 1);
        let dayTwo = '' + dateFin.getDate();
        let yearTwo = dateFin.getFullYear();
        if (monthTwo.length < 2)
            monthTwo = '0' + monthTwo;
        if (dayTwo.length < 2)
            dayTwo = '0' + dayTwo;
        var convertDateFin = [yearTwo, monthTwo, dayTwo].join('-');
    }
    else {
        var convertDateFin = '';
    }
    if (this.state.selectedclient != null) {
        this.setState(
            {
                selectedclient: this.state.selectedclient,
            })

                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_hooda/GetsoldebyId.php',
                        type: 'POST',
                        data: {
                            client: this.state.selectedclient.value,
                            
                        },
                        dataType: 'json',
                        success: (code_html, statut) => {
                            this.setState({
                                soldeclient:code_html,
                                id:code_html.id,
                                montanti:code_html.montant,
                                datei:code_html.date,
                                

                                
                            },()=>
                            jQuery.ajax({
                                url: process.env.REACT_APP_API_URL + 'Back_hooda/GetReglemnt.php',
                                type: 'POST',
                                data: {
                                    id: this.state.selectedclient.value,
                                    dateDebut: convertDateDebut,
                                    dateFin: convertDateFin,
                                   
                                },
                                dataType: 'json',
                                success: (code_html, statut) => {
                                    this.setState({
                                      
                                        reglement:code_html,
                                      
                    
                                    },
                                    () => {
                                
                                        this.setState({
                                            affich: "true"
                                           
                                        });
                                       
                                    }
                                    
                                    )
                              },
                            
                                          }),
                            
                            )
                        }
                    });
                }
    
        

 
    
                }
        imprimer = () => {
            if (this.state.dateDebut != '') {
                var dateDebut = this.state.dateDebut
                let monthOne = '' + (dateDebut.getMonth() + 1);
                let dayOne = '' + dateDebut.getDate();
                let yearOne = dateDebut.getFullYear();
                if (monthOne.length < 2)
                    monthOne = '0' + monthOne;
                if (dayOne.length < 2)
                    dayOne = '0' + dayOne;
                var convertDateDebut = [yearOne, monthOne, dayOne].join('-');
            }
            else {
                var convertDateDebut = '';
            }
        
            //convert date fin
            if (this.state.dateFin != '') {
                var dateFin = this.state.dateFin
                let monthTwo = '' + (dateFin.getMonth() + 1);
                let dayTwo = '' + dateFin.getDate();
                let yearTwo = dateFin.getFullYear();
                if (monthTwo.length < 2)
                    monthTwo = '0' + monthTwo;
                if (dayTwo.length < 2)
                    dayTwo = '0' + dayTwo;
                var convertDateFin = [yearTwo, monthTwo, dayTwo].join('-');
            }
            else {
                var convertDateFin = '';
            }
           var id =this.state.selectedclient.value
            var dateDebut= convertDateDebut
            var dateFin= convertDateFin

            var params = id + '/' + dateDebut + '/' + dateFin
            
                window.open("https://hoodaimprimerie.mtd-app.com/ImprimeExtrait?params=" + params)
            // window.open("http://localhost:3000/ImprimeExtrait?params=" + params)
         
       };    
    
    render() {
        const total2 = this.state.reglement.reduce((acc, ele) => acc + ele.totalPayer*1, 0);
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Consulter Reglement client</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                      
                                </div>
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
                                    <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Date debut</label>
                                                <DatePicker class="form-control ddate" style={{ border: 'none' }}
                                                    selected={this.state.dateDebut}
                                                    onChange={this.searchDateDebut}
                                                    dateFormat="dd/MM/yyy"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Date fin</label>
                                                <DatePicker class="form-control ddate" style={{ border: 'none' }}
                                                    selected={this.state.dateFin}
                                                    onChange={this.searchDateFin}
                                                    dateFormat="dd/MM/yyy"
                                                />
                                            </div>
                                        </div>   
                                       
                                </div>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                        <button style={{ borderRadius: '5px', backgroundColor: '#761C19', borderColor: '#761C19' }} type="button" className="btn btn-success" onClick={this.recherche}>Rechercher</button>
                                    </div>
                                <div>
                                    
                                        
                                        
                                        {this.state.affich=="true"?(
                                        this.state.montanti != 0 ?(
                                            <div>

                                    {/* <strong><p style={{textAlign:"start",paddingLeft:"70px",paddingTop:"10px"}}> LE Client      {this.state.selectedclient.label}    Son Solde Initiale Est   :  {Number.parseFloat(this.state.montanti).toFixed(3)}   à La Date   { this.state.datei}</p></strong>*/}
                                        
                                        
                                        
                                        <Fragment>
                                        
                                        <div style={{display:'flex',justifyContent:'center'}}>
                                        <table style={{ marginTop: '50px' ,width:'70%'}} className="table table-bordered" >
                                        <thead>
                                            <th>Operation</th>
                                            <th>Date</th>
                                            <th>Debit</th>
                                            <th>Credit</th>
                                        </thead>
                                                <tbody>
                                                    {this.state.reglement.length>0?(<tr>
                                                    <td>Solde initiale </td>
                                                    <td>{this.state.datei}</td>
                                                    <td>{Number.parseFloat(this.state.montanti) .toFixed(3)}</td>
                                                    <td></td>
                                                </tr>):null}
                                                
                                                    {this.state.reglement.map((ele, i) =>
                                                <tr>
                                                    <td style={{ paddingLeft: '10px', fontWeight: 'bold' }}>
                                                        Facture N{i+1}
                                                    </td>
                                                    <td>
                                                         {ele.date}
                                                    </td>
                                                    <td>
                                                    {ele.mntTotal} 
                                                    </td>
                                                    <td>
                                                     
                                                    </td>
                                                </tr>
                                                )}
                                                {this.state.reglement.map((ele,i)=>
                                                
                                                <tr>
                                                    <td style={{ paddingLeft: '10px', fontWeight: 'bold' }}>
                                                        Reglement :{ele.typepay==1?('Espese'):('Cheque')}
                                                    </td>
                                                    <td>
                                                        {ele.datreg}
                                                  
                                                   </td>
                                                <td></td>
                                                   
                                                   <td>  {Number.parseFloat(ele.totalPayer).toFixed(3)}</td>
                                                   </tr>
                                                   )}
                                                    <tr>
                                                    <td ><strong><p style={{textAlign:"center"}}>Solde actuel</p></strong></td>
                                                    <td colspan='3'><strong><p style={{textAlign:"center"}}>{Number.parseFloat(total2).toFixed(3)}</p></strong></td>
                                                  
                                                   </tr>
                                               </tbody>
                                       
                                              
                                       </table>
                                       </div>
                                           <div style={{display:"flex",justifyContent:'center'}}>
                                         <button onClick={() => this.imprimer()} style={{ background: '#65180E', border: '1px solid 959EBF', borderRadius: '5px' }} type="button" className="btn btn-info">           <i
            id="print_me_not"
            style={{ fontSize: "20px", cursor: "pointer" }}
          
            class="fas fa-print"
          ></i>Extrait</button>
          </div>
                                            </Fragment>
                                            
                                        </div> ):(    <Fragment>
                                    
                                     
                                            <div style={{display:'flex',justifyContent:'center'}}>
                                            <table style={{ marginTop: '50px' ,width:'70%'}} className="table table-bordered">
                                            <thead>
                                                <th>Operation</th>
                                                <th>Date</th>
                                                <th>Debit</th>
                                                <th>Credit</th>
                                            </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>Solde initiale </td>
                                                        <td></td>
                                                        <td>{Number.parseFloat(this.state.montanti) .toFixed(3)}</td>
                                                        <td></td>
                                                    </tr>
                                                        {this.state.reglement.map((ele, i) =>
                                                    <tr>
                                                        <td style={{ paddingLeft: '10px', fontWeight: 'bold' }}>
                                                            Facture N{i+1}
                                                        </td>
                                                        <td>
                                                            {ele.date}
                                                        </td>
                                                        <td>
                                                            {ele.mntTotal}
                                                        </td>
                                                        <td>
                                                            {ele.totalPayer}
                                                        </td>
                                                        
                                                    </tr>
                                                    )}
                                                    
                                                    {this.state.reglement.map((ele,i)=>
                                                    
                                                    <tr>
                                                        <td style={{ paddingLeft: '10px' , fontWeight: 'bold' }}>
                                                            Reglement :{ele.typepay==1?('Espese'):('Cheque')}
                                                        </td>
                                                        <td>
                                                            {ele.datreg}
                                                      
                                                       </td>
                                                    
                                                       <td></td>
                                                       <td>  {Number.parseFloat(ele.totalPayer).toFixed(3)}</td>
                                                       </tr>
                                                       )}
                                                       <tr>
                                                        <td><strong>Solde actuel</strong></td>
                                                        <td style={{display:"flex",justifyContent:"center"}}><strong>{Number.parseFloat(total2).toFixed(3)}</strong></td>
                                                       <td></td>
                                                       </tr>
                                                   </tbody>
                                           
                                                  
                                           </table>
                                          </div>
                                           <div style={{display:"flex",justifyContent:'center'}}>
                                    <i  
                                      onClick={() => this.imprimer()}          
                                    
                                    id="print_me_not"
            style={{ fontSize: "20px", cursor: "pointer" }}
           
            class="fas fa-print"
          ></i>
          </div>
                                            </Fragment>)
                                                
                                             ):(null)           }
                                        
                                        
                                    </div>
                                    
                                    
                                    
                                </div>
                               
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(ConsulterReglement);
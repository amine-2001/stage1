
import React, { Component, Fragment } from 'react'
import jQuery from "jquery";
import { withRouter } from "react-router-dom";
import Select from 'react-select';
import "./paginate.css";

class ImprimeExtrait extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        data: [],
        email:"",
        nomClient:"",
        idDevis:"",
        nombreTotalElement: 0,
      filterElement: "",
      mycurrentPage: 1,
      resetFirstPage: false,
      nbrEltperPage: 5,
      modal: false,
      idEnseignant: "",
      pending: true,
      detailEnseign: [],
      nomEnseign: "",
      reglement:[],
      finSeance: "",
      dateSeance: "",
      idEnteteAbs: [],
      nbrHeureParMois:0,
      tab: [],
      tabs: [],
      detaildevis:[],
     /*declaration titre*/
      x:1,
      dateDebut: '',
            dateFin: '',

    };
  };


  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
        var userPermissions = JSON.parse(localStorage.getItem("userPermissions"));
      var url = window.location.href;
      var array = url.split("=");
      var params = array[1];
      var arrayInfo = params.split("/");
      var selectedclient= arrayInfo[0];
      var dateDebut= arrayInfo[1];
      var dateFin= arrayInfo[1];
      this.state.dateDebut=dateDebut;
      this.state.dateFin=dateFin
      this.state.selectedclient=selectedclient
      
      
      {
        if (this.state.dateDebut instanceof Date) {
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
            this.state.convertDateDebut=convertDateDebut
        }
    
        //convert date fin
        if (this.state.dateFin instanceof Date) {
            var dateFin = this.state.dateFin
            let monthTwo = '' + (dateFin.getMonth() + 1);
            let dayTwo = '' + dateFin.getDate();
            let yearTwo = dateFin.getFullYear();
            if (monthTwo.length < 2)
                monthTwo = '0' + monthTwo;
            if (dayTwo.length < 2)
                dayTwo = '0' + dayTwo;
            var convertDateFin = [yearTwo, monthTwo, dayTwo].join('-');
            this.state.convertDateFin=convertDateFin
        }
        else {
            var convertDateFin = '';
            this.state.convertDateFin=convertDateFin
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
                        client: this.state.selectedclient,
                        
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
                            url: process.env.REACT_APP_API_URL + 'Back_hooda/GetReglemntimp.php',
                            type: 'POST',
                            data: {
                                id: this.state.selectedclient,
                                dateDebut: this.state.convertDateDebut,
                                dateFin: this.state.convertDateFin,
                               
                            },
                            dataType: 'json',
                            success: (code_html, statut) => {
                                this.setState({
                                  
                                    reglement:code_html,
                                    client_id:code_html[0].client_id
                
                                },
                                
                                )
                          }
                        
                                      }),
                        
                         () => {
                            
                            this.setState({
                                affich: "true"
                            });
                        })
                    }
                });
    
     
                        }
                    }
  }

     
  imprimer = () => {
    window.print();
  };


  render() {
    const total2 = this.state.reglement.reduce((acc, ele) => acc + ele.totalPayer*1, 0);
    return  (
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
                             
                                
                                    
                                   
                            </div>
                          
                            <div>
                                
                                    
                                    
                                    
                                    {this.state.montanti != 0 ?(
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
                                                <tr>
                                                    <td>Solde initiale </td>
                                                    <td>{this.state.datei}</td>
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
                                                    <td>{this.state.datei}</td>
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
                                                    {Number.parseFloat(ele.mntTotal) .toFixed(3)}
                                                    
                                                    </td>
                                                    <td>
                                                    {Number.parseFloat(ele.totalPayer) .toFixed(3)} 
                                                     
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
                                                   <td ><strong><p style={{textAlign:"center"}}>Solde actuel</p></strong></td>
                                                    <td colspan='3'><strong><p style={{textAlign:"center"}}>{Number.parseFloat(total2).toFixed(3)}</p></strong></td>
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
                                            
                                                    }
                                  
                                    
                                </div>
                                
                                
                                
                            </div>
                           
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default withRouter (ImprimeExtrait);




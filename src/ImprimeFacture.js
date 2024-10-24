
import React, { Component, Fragment } from 'react'
import jQuery from "jquery";
import { withRouter } from "react-router-dom";
import Select from 'react-select';
import "./paginate.css";

class ImprimeFacture extends Component {
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

    };
  };


  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
        var userPermissions = JSON.parse(localStorage.getItem("userPermissions"));
      var url = window.location.href;
      var array = url.split("=");
      var params = array[1];
      var arrayInfo = params.split("-");
      var selectedclient= arrayInfo[0];

      
      
 
        
    if (selectedclient != null) {
        this.setState(
            {
                selectedclient: selectedclient,
            }, () => {
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
                        },
                    
                        
                         )
                    }
                });
            },
        )
        }
  }

     
  imprimer = () => {
    window.print();
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
                               
                                
                            </div>
                            <div>
                                
                                    
                                    
                                    
                                        <Fragment>
                                
                                    <p style={{ paddingLeft: '10px', color: 'salmon', fontWeight: 'bold',fontSize:'16px' }}> Solde initiale est : {Number.parseFloat(this.state.montanti) .toFixed(3)} </p>
                                        <h3 style={{ paddingLeft: '10px' }}></h3>
                                        <table style={{ marginTop: '50px' }} className="table table-bordered">
                                        
                                                <tbody>
                                                
                                                    {this.state.reglement.map((ele, i) =>
                                                <tr>
                                                    <td style={{ paddingLeft: '10px', color: 'salmon', fontWeight: 'bold' }}>
                                                        Facture N{i+1}
                                                    </td>
                                                    <td>
                                                        {ele.mntTotal}
                                                    </td>
                                                    <td>
                                                        {ele.totalPayer}
                                                    </td>
                                                    <td>
                                                        {ele.date}
                                                    </td>
                                                </tr>
                                                )}
                                                
                                                <tr>
                                                    <td style={{ paddingLeft: '10px', color: 'salmon', fontWeight: 'bold' }}>
                                                        Reglement
                                                    </td>
                                                    <td>
                                                   {Number.parseFloat(total2).toFixed(3)}
                                                   </td>
                                                   </tr>
                                               </tbody>
                                       
                                              
                                       </table>
                                       <div style={{display:"flex",justifyContent:'center'}}>
                                   <i
                                id="print_me_not"
        style={{ fontSize: "20px", cursor: "pointer" }}
       
        class="fas fa-print"
        onClick={() => this.imprimer()}></i>
      </div>
                                        </Fragment>
                                            
                                 
                               
                                    
                                </div>
                                
                                
                                
                            </div>
                           
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default withRouter (ImprimeFacture);




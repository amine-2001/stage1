import React, { Component } from "react";
import jQuery from "jquery";
import { withRouter } from "react-router-dom";
import "./paginate.css";

class ImprimeDevis extends Component {
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
      mois: "",
      nbrPratique: "",
      nbrTheorique: "",
      nbrCycle: "",
      modalModif: false,
      ligneModif: [],
      groupeEnseign: "",
      departSeance: "",
      finSeance: "",
      dateSeance: "",
      idEnteteAbs: [],
      nbrHeureParMois:0,
      tab: [],
      tabs: [],
      detaildevis:[],
     total:'',
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
      var id= arrayInfo[0];
     
  
     
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/GetDevis.php',
            type: 'POST',
            data: {
                query: '',
                limit: this.state.nbrEltperPage,
                page: 1
            },
            dataType: 'json',
            success: (code_html, statut) => {
                console.log(code_html)
                this.setState({
                    nombreTotalElement: code_html.total,
                    data: code_html.data,
                    nomClient:code_html.data.nomClient,
                    
                    pending: false
                });
            }
        });
        
        jQuery.ajax({
          url:
            process.env.REACT_APP_API_URL + "Back_hooda/getdetaildevisbyid.php",
          type: "POST",
          data: {
            id: id,
          
          },
          dataType: "json",
          success: (code_html, statut) => {
            console.log(code_html);
            this.setState(
              {
                detaildevis: code_html,
                nomclient: code_html[0].nomClient,
                email:code_html[0].email,
                idDevis:code_html[0].idDevis
              },
             
            );
          },
        });
  }      
  impr = () => {
    window.print();
  };
  render() {
    const Prix = this.state.detaildevis.reduce((acc, ele) => acc + ele.Montant_article*ele.quantite, 0);
    const q = this.state.detaildevis.reduce((acc, ele) => acc + ele.quantite*1, 0);
    return (
      <div className="white-box">
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",marginTop: "2%"
          }}
          className="row"
        >
          <div className="form-group">
            <img src="images/hooda.jpg" alt="" width={"150px"} />
          </div>
        </div>
        <p style={{ display: "flex", paddingLeft: "80px" }}>
           <strong>
              <p >
                <strong>
                    <p style={{paddingLeft:"90px"}}>Abidjan le, {new Date().toLocaleString("fr-FR", { day : '2-digit'})} {new Date().toLocaleString("fr-FR",{ month: "long" })} {new Date().getFullYear()}</p>
                    {this.state.nomEnseign.replace(/%20/g, " ")}
                </strong>
              </p>
            <p style={{ paddingLeft: "90px" }}>Devis N° : {this.state.idDevis}</p>
            <p style={{ paddingLeft: "90px" }}>Contact :  {this.state.email}</p>
            {this.state.nomEnseign.replace(/%20/g, " ")} </strong>
        </p>
        <p style={{ display: "flex", justifyContent: "center", marginTop: "1%"}}>
        </p>
        <p style={{ textAlign: "center"}}><strong> Hooda Graphics Numérique vous remercie de votre demande et vous prie de bien vouloir trouver notre meilleure proposition pour:</strong></p>
        <div style={{ display: "center", justifyContent: "flex-end", marginTop: "1%",marginLeft:'0.5%'}}>
        {this.state.detaildevis.map((ele, id) => (
                    ele.format!=null || ele.paquetage!=null ||ele.poids!=null || ele.livraison!=null || ele.papier!=null || ele.prepresse!=null || ele.impression!=null || ele.finition!=null || ele.faconnage!=null?(
                      <table style={{ border: "solid", width: "100%", color: "black",marginTop:'30px' }}>
                    <thead >
                      <tr style={{  border: "solid", borderColor: "black" ,height:"20px"}}>
                                          <th colSpan={3} style={{ textAlign: "center", border: "solid", borderBottom: "none", color: "black", borderColor: "black" }} >
                                            <strong style={{color:'blue',fontSize:'25px',fontFamily:'Open Sans, Arial, sans-serif'}}>{ele.nomarticle} - {ele.quantite} exemplaire</strong>
                                          </th>
                                        </tr>
                    </thead>
                    <tbody>
                    {ele.format!=null?(
                      <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                            <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                              <p style={{padding: '10px  ', margin: 0, width:"100px",marginBottom:'25px'}}>Format:</p>
                                              <p style={{padding:'10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.format}</p>
                                              </td>
                                              <td></td>
                                              <td style={{display:'flex',justifyContent:'flex-end',width:"10px",height:"10px"}}>
                                              <p style={{paddingLeft: '400px'}}>Paquetage:</p>
                                            <p style={{paddingLeft: '30px'}}>{ele.paquetage}</p>
                                          </td>
                                          </tr>
                         ):null}
                            {ele.poids!=null?(
                      <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                            <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                              <p style={{padding: '10px ', margin: 0, width:"100px",marginBottom:'25px'}}>Poids:</p>
                                              <p style={{padding: '10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.poids}</p>
                                              </td>
                                              <td></td>
                                              <td style={{display:'flex',justifyContent:'flex-end', width:"10px",height:"10px"}}>
                                              <p style={{paddingLeft: '400px'}}>Livraison:</p>
                                            <p style={{paddingLeft: '50px'}}>{ele.livraison}</p>
                                          </td>
                      </tr>
                         ):null}
                            {ele.papier!=null?(
                      <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                            <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                              <p style={{padding: '10px ', margin: 0, width:"100px",marginBottom:'25px'}}>Papier:</p>
                                              <p style={{padding: '10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.papier}</p>
                                              </td>
                                              <td></td>
                                              <td style={{display:'flex',justifyContent:'flex-end', width:"10px",height:"10px"}}>
                                              <p style={{paddingLeft: '400px', margin: 0}}></p>
                                            <p style={{paddingLeft: '50px', margin: 0,textAlign:'center'}}></p>
                                          </td>
                      </tr>
                         ):null}
                            {ele.prepresse!=null?(
                      <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                            <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                              <p style={{padding: '10px ', margin: 0, width:"100px",marginBottom:'25px'}}>Prepresse:</p>
                                              <p style={{padding: '10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.prepresse}</p>
                                              </td>
                                              <td></td>
                                              <td style={{display:'flex',justifyContent:'flex-end', width:"10px",height:"10px"}}>
                                              <p style={{paddingLeft: '400px', margin: 0}}></p>
                                            <p style={{paddingLeft: '50px', margin: 0,textAlign:'center'}}></p>
                                          </td>
                      </tr>
                      ):null}
                      {ele.impression!=null?(
               <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                      <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                        <p style={{padding: '10px ', margin: 0, width:"100px",marginBottom:'25px'}}>Impression:</p>
                                        <p style={{padding: '10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.impression}</p>
                                        </td>
                                        <td></td>
                                        <td style={{display:'flex',justifyContent:'flex-end', width:"10px",height:"10px"}}>
                                        <p style={{paddingLeft: '400px', margin: 0}}></p>
                                      <p style={{paddingLeft: '50px', margin: 0,textAlign:'center'}}></p>
                                    </td>
                </tr>
                   ):null}
                      {ele.finition!=null?(
                <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                      <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                        <p style={{padding: '10px ', margin: 0, width:"100px",marginBottom:'25px'}}>Finition:</p>
                                        <p style={{padding: '10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.finition}</p>
                                        </td>
                                        <td></td>
                                        <td style={{display:'flex',justifyContent:'flex-end', width:"10px",height:"10px"}}>
                                        <p style={{paddingLeft: '400px', margin: 0}}></p>
                                      <p style={{paddingLeft: '50px', margin: 0,textAlign:'center'}}></p>
                                    </td>
                </tr>
                   ):null}
                      {ele.faconnage!=null?(
                <tr style={{height:"10px",whiteSpace: 'nowrap'}}>
                                      <td style={{display:'flex',justifyContent:'flex-start', width:"300px",height:"10px",marginBottom:'25px'}} >
                                        <p style={{padding: '10px ', margin: 0, width:"100px",marginBottom:'25px'}}>Faconnage:</p>
                                        <p style={{padding: '10px ', margin: 0, width:"150px",marginBottom:'25px'}}>{ele.faconnage}</p>
                                        </td>
                                        <td></td>
                                        <td style={{display:'flex',justifyContent:'flex-end',alignItems:'center',textAlign:"center", width:"10px",height:"10px"}}>
                                        <p style={{paddingLeft: '400px', margin: 0}}></p>
                                      <p style={{paddingLeft: '50px', margin: 0,textAlign:'center'}}></p>
                                    </td>
                </tr>
                   ):null}
                   <tr>
                   <td  colSpan={3} style={{  width:"103.5%",display: "flex", justifyContent: "flex-end", border: "solid",borderBottom:'none',borderColor:'black',borderLeft:'none',borderRight:'none'}}>
                   <strong style={{color:'blue',fontSize:'16px',fontFamily:'Open Sans, Arial, sans-serif'}}>Pour {ele.quantite} exemplaire H.T</strong>
                   <strong style={{color:'blue',fontSize:'14.5px',fontFamily:'Open Sans, Arial, sans-serif',display:'flex',justifyContent:'flex-end'}}><p style={{ paddingLeft:"50px",paddingRight:'10px'}}>{ele.Montant_article*ele.quantite}</p></strong>
                   </td>
                </tr>
                <tr>
                   <td  colSpan={3} style={{  width:"103.5%",display: "flex", justifyContent: "flex-end"}}>
                   <strong style={{color:'blue',fontSize:'16px',fontFamily:'Open Sans, Arial, sans-serif'}}>Prix unitaire H.T</strong>
                   <strong style={{color:'blue',fontSize:'14.5px',fontFamily:'Open Sans, Arial, sans-serif',display:'flex',justifyContent:'flex-end'}}><p style={{ paddingLeft:"50px",paddingRight:'10px'}}>{ele.Montant_article}</p></strong>
                   </td>
                </tr>
                </tbody>
                   </table>  ):(
                   <table style={{ border: "solid", width: "100%", color: "black",marginTop:'30px' }}>
              <thead >
                <tr style={{height:"20px"}}>
                                    <th colSpan={3} style={{ textAlign: "center"}} >
                                      <strong style={{color:'blue',fontSize:'25px',fontFamily:'Open Sans, Arial, sans-serif'}}>{ele.nomarticle} - {ele.quantite} exemplaire</strong>
                                    </th>
                                  </tr>
              </thead>
              <tbody>
                <tr ><td></td></tr>
                <tr>
                   <td  colSpan={3} style={{  width:"100%",display: "flex", justifyContent: "flex-end", border: "solid",borderBottom:'none',borderColor:'black',borderLeft:'none',borderRight:'none'}}>
                   <strong style={{color:'blue',fontSize:'16px',fontFamily:'Open Sans, Arial, sans-serif'}}>Pour {ele.quantite} exemplaire H.T</strong>
                   <strong style={{color:'blue',fontSize:'14.5px',fontFamily:'Open Sans, Arial, sans-serif',display:'flex',justifyContent:'flex-end'}}><p style={{ paddingLeft:"50px",paddingRight:'10px'}}>{ele.Montant_article*ele.quantite}</p></strong>
                   </td>
                </tr>
                <tr>
                   <td  colSpan={3} style={{  width:"103.5%",display: "flex", justifyContent: "flex-end"}}>
                   <strong style={{color:'blue',fontSize:'16px',fontFamily:'Open Sans, Arial, sans-serif'}}>Prix unitaire H.T</strong>
                   <strong style={{color:'blue',fontSize:'14.5px',fontFamily:'Open Sans, Arial, sans-serif',display:'flex',justifyContent:'flex-end'}}><p style={{ paddingLeft:"50px",paddingRight:'63px'}}>{ele.Montant_article}</p></strong>
                   </td>
                </tr>
                </tbody>
                   </table>)
          ))}
          <div style={{ display: "flex", justifyContent: "center",paddingLeft:'100px'}}>
            <strong><p>Total géneral HT: {Prix}</p></strong>
          </div>
    </div>
  <div style={{ display: "flex", justifyContent: "center"  ,padding:"20px"}}>
    <i
      id="print_me_not"
      style={{ fontSize: "30px", cursor: "pointer" }}
      onClick={this.impr}
      class="fas fa-print"
    ></i>
  </div>
</div>
);
}
}
export default withRouter (ImprimeDevis);
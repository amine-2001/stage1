import React, { Component } from "react";
import jQuery from "jquery";
import { withRouter } from "react-router-dom";
import "./paginate.css";

class ImprimeCommande extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        data: [],
        email:"",
        nomClient:"",
        idCommande:"",
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
      detailcommande:[],
     
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
            url: process.env.REACT_APP_API_URL + 'Back_hooda/GetCommande.php',
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
            process.env.REACT_APP_API_URL + "Back_hooda/getdetailscommandebyid.php",
          type: "POST",
          data: {
            id: id,
          
          },
          dataType: "json",
          success: (code_html, statut) => {
            console.log(code_html);
            this.setState(
              {
                detailcommande: code_html,
                nomclient: code_html[0].nomClient,
                email:code_html[0].email,
                idCommande:code_html[0].commande
              
              },
              
            );
          },
        });
  }      
  impr = () => {
    window.print();
  };


  render() {
    
    const total = this.state.detailcommande.reduce((acc, ele) => acc + ele.quantite * ele.Montant_article, 0);
    const total1 = this.state.detailcommande.reduce((acc, ele) => acc + ele.quantite*1, 0);
    const total2 = this.state.detailcommande.reduce((acc, ele) => acc + ele.Montant_article*1, 0);
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
            <p style={{ paddingLeft: "90px" }}>Commande N° : {this.state.idCommande}</p>
            <p style={{ paddingLeft: "90px" }}>Contact :  {this.state.email}</p> 
            {this.state.nomEnseign.replace(/%20/g, " ")} </strong>
        </p>
        <p style={{ display: "flex", justifyContent: "center", marginTop: "1%"}}>
                       
        </p>
        <p style={{ textAlign: "center"}}><strong> Hooda Graphics Numérique vous remercie de votre demande et vous prie de bien vouloir trouver notre meilleure proposition pour:</strong></p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1%"}}>
          <table style={{border:'solid',width:'80%',color:'black'}}>
                <thead>
                  <tr>
                    <th className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black'}}> Article</th>
                    <th className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black'}}>Quantité</th>
                    <th className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black' ,borderColor:'black'}}>Prix Unitaire</th>
                    <th className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.detailcommande.map((ele, id) => (
                    <tr key={id} >
                      <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black' }}>{ele.nomarticle}</td>
                      <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black' }}>{ele.quantite}</td>
                      <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black' }}>{ele.Montant_article}</td>
                      <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal',border:'solid',color:'black',borderColor:'black' }}>{(ele.quantite*ele.Montant_article)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="col-md-4" style={{ textAlign: "center", width: "10%", whiteSpace: "normal", border: "solid",color:'black',borderColor:'black' }}>
                    <strong>Totale</strong>
                    </td>
                   <td className="col-md-4" style={{ textAlign: "center", width: "10%", whiteSpace: "normal", border: "solid",color:'black',borderColor:'black' }}><strong>{total1}</strong></td>
                   <td className="col-md-4" style={{ textAlign: "center", width: "10%", whiteSpace: "normal", border: "solid",color:'black' ,borderColor:'black'}}><strong>{total2}</strong></td>
                   <td className="col-md-4" style={{ textAlign: "center", width: "10%", whiteSpace: "normal", border: "solid",color:'black',borderColor:'black' }}>
                   <strong>{total}</strong>
                  </td>
                  </tr>
                </tbody>
              </table>
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

export default withRouter (ImprimeCommande);




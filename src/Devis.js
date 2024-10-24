import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import jQuery from 'jquery'
import './paginate.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";

 
class Devis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            detaildevis:[],
            nomclient:'',
            data: [],
            columns: [
                
            
                {
                    name: 'Client',
                    selector: 'nomClient',
                    sortable: false,
                    center: true,
                    width:"300px"
                },
                {
                    name: 'Commercial',
                    selector: 'nomCommercial',
                    sortable: false,
                    center: true,
                  
                },
                {
                  name: 'Montant',
                  selector: 'MontantDevis',
                  sortable: false,
                  center: true,
                
              },
              {
                name: 'date',
                selector: 'date',
                sortable: false,
                center: true,
              
            },
                {
                    name: "détail",
                    cell: (row) =>
                     
                        <div
                          onClick={() => this.detail(row.idDevis)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}

                        >
                            <button style={{ backgroundColor: '#D9534F', borderRadius: '5px' }}><i style={{ color: 'white' }} className="fas fa-info"></i></button>
                            </div>,
                        
                     
                        width:"250px",
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                  },
                  {
                    name: "imprimer",
                    cell: (row) =>
                     
                        <div
                          
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}

                        >
 <button
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#7375BB",
                        borderColor: "#761C19",
                      }}
                      type="button"
                      className="btn btn-success"
                      onClick={() => this.imprimer(row.idDevis)}
                     
                    >
                      <i
                        style={{ color: "white"}}
                        class="fas fa-print"
                      ></i>
                      
                    </button>
                            </div>,
                        
                     
                        width:"200px",
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                  },
               
                {
                    name: "etat",
                    cell: (row) =>
                      row.etat == 0 ? (
                        <div
                          onClick={() => this.toggleAct(row.idDevis)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <label> En Attente</label>
                          <i
                            style={{
                              color: "red",
                              backgroundColor: "white",
                              bordeRadius: "5px",
                              borderColor: "white",
                              marginLeft: "5px",
                            }}
                            className="fas fa-times-circle"
                          ></i>
                        </div>
                      ) : ( 
                        <div  
                         //onClick={() => this.toggleDect(row.idDevis)} 
                         style={{ display: "flex", alignItems: "center" }}>
                          <label>Validé</label>
                          <i
                            style={{
                              color: "green",
                              backgroundColor: "white",
                              bordeRadius: "5px",
                              borderColor: "white",
                              marginLeft: "5px",
                            }}
                            className="fas fa-check-circle"
                          ></i>
                        </div>
                      ),
                      width:"250px",
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                  },
                 
                
            ],
            nombreTotalElement: 0,
            filterElement: '',
            mycurrentPage: 1,
            resetFirstPage: false,
            nbrEltperPage: 5,
            modal: false,
            idDevis: '',
            pending: true
        }
       
       
    }

    componentDidMount() {
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
        
    }

    newElement(page, totalRows) {
      this.setState({
          pending: true
      },
          function () {
              console.log(page)
              console.log(totalRows)
              jQuery.ajax({
                  url: process.env.REACT_APP_API_URL + 'Back_hooda/GetDevis.php',
                  type: 'POST',
                  data: {
                      query: this.state.filterElement,
                      limit: this.state.nbrEltperPage,
                      page: page
                  },
                  dataType: 'json',
                  success: (code_html, statut) => {
                      console.log(code_html)
                      this.setState({
                          nombreTotalElement: code_html.total,
                          data: code_html.data,
                          pending: false
                      });
                  }
              });
          }.bind(this)
      )
  }

  perPage(currentRowsPerPage, currentPage) {
      this.setState(
          {
              nbrEltperPage: currentRowsPerPage,
              pending: true
          }
          , function () {
              console.log(currentRowsPerPage)
              console.log(currentPage)
              jQuery.ajax({
                  url: process.env.REACT_APP_API_URL + 'Back_hooda/GetDevis.php',
                  type: 'POST',
                  data: {
                      query: this.state.filterElement,
                      limit: currentRowsPerPage,
                      page: currentPage
                  },
                  dataType: 'json',
                  success: (code_html, statut) => {
                      console.log(code_html)
                      this.setState({
                          nombreTotalElement: code_html.total,
                          data: code_html.data,
                          pending: false
                      });
                  }
              });
          }
      );
  }

  filterSearch(event) {
      this.setState({
          filterElement: event.target.value,
          resetFirstPage: !this.state.resetFirstPage,
          pending: true
      },
          function () {
              jQuery.ajax({
                  url: process.env.REACT_APP_API_URL + 'Back_hooda/GetDevis.php',
                  type: 'POST',
                  data: {
                      query: this.state.filterElement,
                      limit: this.state.nbrEltperPage,
                      page: 1
                  },
                  dataType: 'json',
                  success: (code_html, statut) => {
                      console.log(code_html)
                      this.setState({
                          nombreTotalElement: code_html.total,
                          data: code_html.data,
                          pending: false
                      });
                  }
              })
          }
      );
  }

    detail = (id) => {
   
        this.setState((prevState) => ({
          modal: !prevState.modal,
        }));
        
       
       
        this.setState({
          id: id,
          query: this.state.filterElement,
                    limit: this.state.nbrEltperPage,
        });
        jQuery.ajax({
          url:
            process.env.REACT_APP_API_URL + "Back_hooda/getdetaildevis.php",
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
               
              },
             
            );
          },
        });
      };

   



    toggletwo = (idDevis) => {
        this.setState((prevState) => ({
          modal: !prevState.modal,
          idDevis: idDevis,
        }));
      };
    
      toggletwoactif = (idDevis) => {
        this.setState((prevState) => ({
          modalAbon: !prevState.modalAbon,
          idDevis: idDevis,
        }));
      };
    
      toggle = () => {
        this.setState((prevState) => ({
          modal: !prevState.modal,
        }));
      };
      togglem = (idDevis) => {
        
        this.setState((prevState) => ({
          modal: !prevState.modal,
        }));
      };
    
    
      toggleAct = (idDevis) => { 
        this.setState((prevState) => ({
          modalAct: !prevState.modalAct,
          idDevis: idDevis,
        }));
      };
    
      toggleDect = (idDevis) => { 
        this.setState((prevState) => ({
          modalDesact: !prevState.modalDesact,
          idDevis: idDevis,
        }));
      };
      toggleDes = (idDevis) => {
        this.setState((prevState) => ({
          modalDes: !prevState.modalDes,
          idDevis: idDevis,
        }));
      };
      toggleDesactiver = () => {
        this.setState((prevState) => ({
          modalDes: !prevState.modalDes,
        }));
      };
    
      toggleActiver = () => {
        this.setState((prevState) => ({
          modalAct: !prevState.modalAct,
        }));
      };  
    
      toggleDectiver = (idDevis) => { 
        this.setState((prevState) => ({
          modalDesact: !prevState.modalDesact,
          idDevis: idDevis,
        }));
      };
      activer = () => {
        
        jQuery.ajax({
          url: process.env.REACT_APP_API_URL + "Back_hooda/ValideDevis.php",
          type: "POST",
          data: {
            id: this.state.idDevis,
          },
          dataType: "json",
          success: (code_html, statut) => {
            this.setState(
              {
                modalAct: false,
              },
             
              () => {
                jQuery.ajax({
                  url: process.env.REACT_APP_API_URL + "Back_hooda/envoi_mail2.php",
                  type: "POST",
                  data: {
                    
                  },
                  dataType: "json",
                  success: (code_html, statut) => {
                    console.log(code_html);
                    this.setState({
                      nombreTotalElement: code_html.total,
                      data: code_html,
                    });
                  },
                });
              },
              () => {
                jQuery.ajax({
                  url: process.env.REACT_APP_API_URL + "Back_hooda/GetDevis.php",
                  type: "POST",
                  data: {
                    query: this.state.filterElement,
                    limit: this.state.nbrEltperPage,
                    page: 1,
                  },
                  dataType: "json",
                  success: (code_html, statut) => {
                    console.log(code_html);
                    this.setState({
                      nombreTotalElement: code_html.total,
                      data: code_html,
                    });
                  },
                });
              }
            );
          },
        });
      };
    
      desactiver = () => {
        jQuery.ajax({
          url: process.env.REACT_APP_API_URL + "Back_hooda/desacDevi.php",
          type: "POST",
          data: {
            id: this.state.idDevis,
          },
          dataType: "json",
          success: (code_html, statut) => {
            this.setState(
              {
                modalDesact: false,
              },
              () => {
                jQuery.ajax({
                  url: process.env.REACT_APP_API_URL + "Back_hooda/GetDevis.php",
                  type: "POST",
                  data: {
                    query: this.state.filterElement,
                    limit: this.state.nbrEltperPage,
                    page: 1,
                  },
                  dataType: "json",
                  success: (code_html, statut) => {
                    console.log(code_html);
                    this.setState({
                      nombreTotalElement: code_html.total,
                      data: code_html,
                    });
                  },
                });
              }
            );
          },
        });
      };

      imprimer = (row) => {
       
        
        var id=row
       
        
       
            //window.open("https://hoodaimprimerie.mtd-app.com/ImprimeDevis?id=" + id)
         window.open("http://localhost:3000/ImprimeDevis?id=" + id)
     
   };    

    

    render() {
      const total = this.state.detaildevis.reduce((acc, el) => acc + el.quantite * el.Montant_article, 0);
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Devis</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                
                                <div className="mb-0 form-group">
                                    <div className="input-group-alternative input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-search"></i>
                                            </span>
                                            <input onChange={(currentRowsPerPage, currentPage) => this.filterSearch(currentRowsPerPage, currentPage)} placeholder="Search" type="text" className="search" />
                                        </div>
                                    </div>
                                </div>
                                <DataTable
                                    columns={this.state.columns}
                                    data={this.state.data}
                                    highlightOnHover={true}
                                    pagination={true}
                                    paginationServer={true}
                                    onChangePage={(page, totalRows) => this.newElement(page, totalRows)}
                                    paginationTotalRows={this.state.nombreTotalElement}
                                    paginationPerPage={this.state.nbrEltperPage}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                    onChangeRowsPerPage={(currentRowsPerPage, currentPage) => this.perPage(currentRowsPerPage, currentPage)}
                                    paginationResetDefaultPage={this.state.resetFirstPage}
                                    paginationComponentOptions={{ rowsPerPageText: 'Elements par page:', rangeSeparatorText: 'de', noRowsPerPage: false }}
                                    progressPending={this.state.pending}
                                />
                            </div>
                        </div>
                        {/*<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} fade={false}>
                            <ModalHeader toggle={this.toggle}> <div style={{ display: 'flex', justifyContent: 'center', width: '465px' }}><img width='30%' src="./images/deleteModal.png" alt=".." /></div></ModalHeader>
                            <ModalBody>
                                <div style={{ fontFamily: 'Montserrat, sans-serif', FontSize: '14px', FontWeight: '700', LineHeight: '18.375px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <p>Êtes-Vous sûr de vouloir supprimer ce client ?</p>
                                    </div>
                                    <div className='hvr-push' style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                                        <div><button onClick={() => this.deleteClient()} style={{ backgroundColor: '#00FF7F', borderRadius: '5px', color: 'white' }}><i style={{ color: 'white' }} className="far fa-thumbs-up"></i>Oui</button></div>
                                        <div><button onClick={() => this.toggle()} style={{ backgroundColor: '#D9534F', borderRadius: '5px', color: 'white' }}><i style={{ color: 'white' }} className="far fa-thumbs-down"></i>Non</button></div>
                                    </div>
                                </div>
                            </ModalBody>
                         </Modal>*/}
                        
                    </div>
                      <Modal
                    isOpen={this.state.modalAct}
                    toggle={this.toggleActiver}
                    className={this.props.className}
                    fade={false}
                >
                    <ModalHeader toggle={this.toggleActiver}>
                        {" "}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "465px",
                            }}
                        >
                            <img width="30%" src="images/hooda.jpg" alt=".." />
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div
                            style={{
                                fontFamily: "Montserrat, sans-serif",
                                FontSize: "14px",
                                FontWeight: "700",
                                LineHeight: "18.375px",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <p>Êtes-Vous sûr de vouloir validé ce devis ?</p>
                            </div>
                            <div
                                className="hvr-push"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    marginBottom: "15px",
                                }}
                            >
                                <div>
                                    <button
                                        onClick={() => this.activer()}
                                        style={{
                                            backgroundColor: "#00FF7F",
                                            borderRadius: "5px",
                                            color: "white",
                                        }}
                                    >
                                        <i
                                            style={{ color: "white" }}
                                            className="far fa-thumbs-up"
                                        ></i>
                                        Oui
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => this.toggleActiver()}
                                        style={{
                                            backgroundColor: "#D9534F",
                                            borderRadius: "5px",
                                            color: "white",
                                        }}
                                    >
                                        <i
                                            style={{ color: "white" }}
                                            className="far fa-thumbs-down"
                                        ></i>
                                        Non
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                </div>

                
                <Modal
            isOpen={this.state.modal}
            toggle={this.togglem}
            className={this.props.className}
            style={{ maxWidth: "800px", width: "100%" }}
            fade={false}
          >
            <ModalHeader toggle={this.toggle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <i
                    style={{ color: "#87B87F", paddingRight: "5px" }}
                    className="fas fa-money-check-alt"
                  ></i>
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <p>
                    {"Detail devis du client :       "  + this.state.nomclient}
                  </p>{" "}
               
                  
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }} scope="col">
                      Article
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      Montant
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      Quantité
                    </th>
                    <th style={{ textAlign: "center" }} scope="col">
                      Totale
                    </th>
                  
                    
                  </tr>
                </thead>

                {this.state.detaildevis.map((el,i) => (
                
                <tbody key ={i}>
                  
                  <tr >
                    <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                      {el.nomarticle}
                    </td>
                    <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                      {el.Montant_article}
                    </td>
                    <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                      {el.quantite}
                    </td>
                    <td className="col-md-4" style={{ textAlign: "center",width: '10%', whiteSpace: 'normal' }}>
                      {el.quantite*el.Montant_article}
                    </td>
                   
                  
                    </tr>
                    </tbody>
                    ))}
              </table>
              <table className="table table-bordered">
              <tbody>
                <tr>
                  <td
                    className="col-md-4"
                    style={{ textAlign: "center", width: '10%', whiteSpace: 'normal' }}
                  >
                    <strong>TOTALE</strong>
                  </td>
                  <td
                    className="col-md-4"
                    style={{ textAlign: "center", width: '10%', whiteSpace: 'normal' }}
                  >
                    {/* Display the total sum */}
                    <strong>{total}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
              
              <div
                className="hvr-push"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <button
                    onClick={() => this.togglem()}
                    style={{
                      backgroundColor: "#D9534F",
                      borderRadius: "5px",
                      color: "white",
                      width: "40px ",
                    }}
                  >
                    <i
                      style={{ color: "white" }}
                      className="fas fa-sign-out-alt"
                    ></i>
                  </button>
                </div>
              </div>
            </ModalBody>
          </Modal>
                <div>
                <Modal
                    isOpen={this.state. modalDesact}
                    toggle={this.toggleDectiver}
                    className={this.props.className}
                    fade={false}
                >
                    <ModalHeader toggle={this.toggleDectiver}>
                        {" "}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "465px",
                            }}
                        >
                       
                            <img width="30%" src="images/hooda.jpg" alt=".." />
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div
                            style={{
                                fontFamily: "Montserrat, sans-serif",
                                FontSize: "14px",
                                FontWeight: "700",
                                LineHeight: "18.375px",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <p>Êtes-Vous sûr de vouloir desactiver ce devis ?</p>
                            </div>
                            <div
                                className="hvr-push"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    marginBottom: "15px",
                                }}
                            >
                                <div>
                                    <button
                                        onClick={() => this.desactiver()}
                                        style={{
                                            backgroundColor: "#00FF7F",
                                            borderRadius: "5px",
                                            color: "white",
                                        }}
                                    >
                                        <i
                                            style={{ color: "white" }}
                                            className="far fa-thumbs-up"
                                        ></i>
                                        Oui
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => this.toggleDectiver()}
                                        style={{
                                            backgroundColor: "#D9534F",
                                            borderRadius: "5px",
                                            color: "white",
                                        }}
                                    >
                                        <i
                                            style={{ color: "white" }}
                                            className="far fa-thumbs-down"
                                        ></i>
                                        Non
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                </div>
        <ToastContainer
          transition={Flip}
          enableMultiContainer
          containerId={"A"}
          position={toast.POSITION.TOP_RIGHT}
          autoClose={2500}
        />
                </div>
            
        );
    }
}

export default Devis;


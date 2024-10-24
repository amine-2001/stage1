import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import jQuery from 'jquery'
import './paginate.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Commande extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            detailcommande:[],
            nomclient:'',
            data: [],
            columns: [
                {
                    name: 'Commande',
                    selector: 'commande',
                    sortable: false,
                    center: true
                },
                {
                    name: 'Client',
                    selector: 'nomClient',
                    sortable: false,
                    center: true
                },
                {
                    name: 'Commercial',
                    selector: 'nomCommercial',
                    sortable: false,
                    center: true
                },
                {
                    name: 'Account',
                    selector: 'account',
                    sortable: false,
                    center: true
                },
                {
                    name: "détail",
                    cell: (row) =>
                     
                        <div
                          onClick={() => this.detail(row.id)}
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
                      onClick={() => this.imprimer(row.id)}
                     
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
              
                
            ],
            nombreTotalElement: 0,
            filterElement: '',
            mycurrentPage: 1,
            resetFirstPage: false,
            nbrEltperPage: 5,
            modal: false,
            idClient: '',
            pending: true
        }
    
    }

    componentDidMount() {
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetCommande.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetCommande.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetCommande.php',
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
            process.env.REACT_APP_API_URL + "Back_hooda/getdetailcommande.php",
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
               
              },
             
            );
          },
        });
      };

      togglem = (idcommande) => {
        
        this.setState((prevState) => ({
          modal: !prevState.modal,
        }));
      };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    imprimer = (row) => {
       
        
        var id=row
       
        
       
            //window.open("https://hoodaimprimerie.mtd-app.com/ImprimeCommande?id=" + id)
         window.open("http://localhost:3000/ImprimeCommande?id=" + id)
     
   };    

    

    render() {
        const total = this.state.detailcommande.reduce((acc, el) => acc + el.quantite * el.Montant_article, 0);
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Commande</h4>
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
                    {"Detail commande du client :       "  + this.state.nomclient}
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
                      Quantite
                    </th>   
                    <th style={{ textAlign: "center" }} scope="col">
                      Totale
                    </th>   
                  </tr>
                </thead>

                {this.state.detailcommande.map((el,i) => (
                
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
                </div>
            </div>
        );
    }
}

export default Commande;


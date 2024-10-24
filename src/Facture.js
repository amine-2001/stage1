import React, { Component } from 'react'
import DataTable from 'react-data-table-component';
import jQuery from 'jquery'
import './paginate.css'


class Facture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    name: 'Facture ',
                    selector: 'facture',
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
                    name: 'montant total',
                    selector: 'montantTotal',
                    sortable: false,
                    center: true
                },
                {
                    name: 'montant reglé',
                    selector: 'montantRegle',
                    sortable: false,
                    center: true
                },
                {
                    name: 'date',
                    selector: 'date',
                    sortable: false,
                    center: true
                },
               /* {
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
                      onClick={() => this.imprimer(row.idfacture)}
                     
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
                  },*/
              
                
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
        this.newElement = this.newElement.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
    }

    componentDidMount() {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/GetFacture.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetFacture.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetFacture.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetFacture.php',
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

    /*toggletwo = (idDevis) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            idDevis: idDevis
        }));
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }*/
    imprimer = (row) => {
       
        
        var id=row
       
        
       
            //window.open("https://hoodaimprimerie.mtd-app.com/ImprimeFacture?id=" + id)
         window.open("http://localhost:3000/ImprimeFacture?id=" + id)
     
   };    

    

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Facture</h4>
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
                </div>
            </div>
        );
    }
}

export default Facture;


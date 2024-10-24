import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import jQuery from 'jquery'
import './paginate.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    name: 'Article',
                    selector: 'nom',
                    sortable: false,
                    center: true
                },
                {
                    name: 'prix',
                    selector: 'montant',
                    sortable: false,
                    center: true
                },
                {
                    name: 'Explorer',
                    cell: row => <Link to={{
                        pathname: '/ExplArticle',
                        state: { idArticle: row.idArticle }
                    }}><button className='buttonExplorer'><i style={{ color: 'white' }} className="far fa-eye"></i></button></Link>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
                {
                    name: 'Modifier',
                    cell: row => <Link to={{
                        pathname: '/ModifArticle',
                        state: { idArticle: row.idArticle }
                    }}><button className='buttonModifier'><i style={{ color: 'white' }} className="fas fa-pencil-alt"></i></button></Link>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
                {
                    name: 'Desactiver',
                    cell: row => <button className='buttonSupprimer' onClick={() => this.toggletwo(row.idArticle)}><i style={{ color: 'white' }} className="fas fa-trash-alt"></i></button>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                }
            ],
            nombreTotalElement: 0,
            filterElement: '',
            mycurrentPage: 1,
            resetFirstPage: false,
            nbrEltperPage: 5,
            modal: false,
            idArticle: '',
            pending: true
        }
        this.newElement = this.newElement.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
    }

    componentDidMount() {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/GetArticles.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetArticles.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetArticles.php',
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
                    url: process.env.REACT_APP_API_URL + 'Back_hooda/GetArticles.php',
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

    toggletwo = (idArticle) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            idArticle: idArticle
        }));
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    deleteArticle() {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + "Back_hooda/DeleteArticle.php?id=" + this.state.idArticle,
            type: 'POST',
            dataType: 'json',
            success: (code_html, statut) => {
                this.setState({
                    modal: false
                }, () => {
                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_hooda/GetArticles.php',
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
                                data: code_html.data
                            });
                        }
                    });
                })
            }
        });
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Articles</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px', marginRight: '20px' }}>
                                    <Link to="/AjoutArticle" > <button style={{ background: '#3A3F51', border: '1px solid #3A3F51', borderRadius: '5px' }} type="button" className="btn btn-info"> <i className="fas fa-plus"></i>Ajout Article</button></Link>
                                </div>
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
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} fade={false}>
                            <ModalHeader toggle={this.toggle}> <div style={{ display: 'flex', justifyContent: 'center', width: '465px' }}><img width='30%' src="./images/deleteModal.png" alt=".." /></div></ModalHeader>
                            <ModalBody>
                                <div style={{ fontFamily: 'Montserrat, sans-serif', FontSize: '14px', FontWeight: '700', LineHeight: '18.375px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <p>Êtes-Vous sûr de vouloir supprimer cette Article ?</p>
                                    </div>
                                    <div className='hvr-push' style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                                        <div><button onClick={() => this.deleteArticle()} style={{ backgroundColor: '#00FF7F', borderRadius: '5px', color: 'white' }}><i style={{ color: 'white' }} className="far fa-thumbs-up"></i>Oui</button></div>
                                        <div><button onClick={() => this.toggle()} style={{ backgroundColor: '#D9534F', borderRadius: '5px', color: 'white' }}><i style={{ color: 'white' }} className="far fa-thumbs-down"></i>Non</button></div>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default Articles;


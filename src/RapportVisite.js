import React, { Component, Fragment } from 'react'
import { Link, BrowserRouter as Router, Route, Switch, withRouter, HashRouter, Redirect } from 'react-router-dom'
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios'
import jQuery from 'jquery'
import './paginate.css'
import Collapsible from 'react-collapsible';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RapportVisite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    name: 'Date',
                    selector: 'date',
                    sortable: false,
                    center: true,
                    style: { width: '20%' }
                },
                {
                    name: 'Details',
                    cell: row =>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="col-md-12" style={{ textAlign: 'center' }} scope="col">Detail visite</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-md-12" style={{ textAlign: 'center' }}>
                                        <Collapsible trigger={<button style={{ backgroundColor: '#D9534F', borderRadius: '5px' }}><i style={{ color: 'white' }} className="fas fa-info"></i></button>}>
                                            <table style={{ tableLayout: 'fixed' }} className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: 'center' }} scope="col">Commercial</th>
                                                        <th style={{ textAlign: 'center' }} scope="col">Client</th>
                                                        <th style={{ textAlign: 'center' }} scope="col">Date</th>
                                                        <th style={{ textAlign: 'center' }} scope="col">Remarque</th>
                                                        <th style={{ textAlign: 'center' }} scope="col">Explorer</th>
                                                    </tr>
                                                </thead>
                                                {row.detail.map(ele =>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '10%' }}>{ele.commercial}</td>
                                                            <td style={{ width: '10%', whiteSpace: 'normal' }}>{ele.client}</td>
                                                            <td style={{ width: '10%', whiteSpace: 'normal' }}>{ele.date}</td>
                                                            <td style={{ width: '65%', whiteSpace: 'normal' }}>{ele.remarque}</td>
                                                            <td style={{ width: '5%' }}><Link to={{
                                                                pathname: '/ExplRappVisite',
                                                                state: { idRappVisite: ele.idRappVisite }
                                                            }}><button className='buttonExplorer'><i style={{ color: 'white' }} className="far fa-eye"></i></button></Link></td>
                                                        </tr>
                                                    </tbody>
                                                )}
                                            </table>
                                        </Collapsible>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    width: '80%'
                }
            ],
            nombreTotalElement: 0,
            filterElement: '',
            mycurrentPage: 1,
            resetFirstPage: false,
            nbrEltperPage: 5,
            pending: true,
            // search
            Commerciaux: [],
            selectedCommercial: '',
            clients: [],
            selectedClient: '',
            dateDebut: '',
            dateFin: '',

        }
        this.newElement = this.newElement.bind(this);
    }

    componentDidMount() {
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/RapportVisite.php',
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
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectCommerciauxVisite.php').then(res => {
            console.log(res)
            this.setState({
                Commerciaux: res.data
            })
        })
        axios.get(process.env.REACT_APP_API_URL + 'Back_hooda/SelectClientsVisite.php').then(res => {
            console.log(res)
            this.setState({
                clients: res.data
            })
        })
    }

    newElement(page, totalRows) {
        if (this.state.selectedClient == '' && this.state.selectedCommercial == '' && this.state.dateDebut == '' && this.state.dateFin == '') {
            this.setState({
                pending: true
            },
                () => {
                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_hooda/RapportVisite.php',
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
                }
            )
        }
        else {
            this.setState({
                pending: true
            },
                () => {
                    if (this.state.selectedClient != '') {
                        var clientId = this.state.selectedClient.value
                    }
                    else {
                        var clientId = ''
                    }
                    if (this.state.selectedCommercial != '') {
                        var commercialId = this.state.selectedCommercial.value
                    }
                    else {
                        var commercialId = ''
                    }
                    // convertir date debut
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
                    // convertir date fin
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
                    //
                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_magasin/RapportVisiteSearch.php',
                        type: 'POST',
                        data: {
                            clientId: clientId,
                            commercialId: commercialId,
                            dateDebut: convertDateDebut,
                            dateFin: convertDateFin,
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
                }
            )
        }
    }

    perPage(currentRowsPerPage, currentPage) {
        if (this.state.selectedClient == '' && this.state.selectedCommercial == '' && this.state.dateDebut == '' && this.state.dateFin == '') {
            this.setState(
                {
                    nbrEltperPage: currentRowsPerPage,
                    pending: true
                }
                , () => {
                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_hooda/RapportVisite.php',
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
        else {
            this.setState(
                {
                    nbrEltperPage: currentRowsPerPage,
                    pending: true
                }
                , () => {
                    if (this.state.selectedClient != '') {
                        var clientId = this.state.selectedClient.value
                    }
                    else {
                        var clientId = ''
                    }
                    if (this.state.selectedCommercial != '') {
                        var commercialId = this.state.selectedCommercial.value
                    }
                    else {
                        var commercialId = ''
                    }
                    // convertir date debut
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
                    // convertir date fin
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
                    //
                    jQuery.ajax({
                        url: process.env.REACT_APP_API_URL + 'Back_magasin/RapportVisiteSearch.php',
                        type: 'POST',
                        data: {
                            clientId: clientId,
                            commercialId: commercialId,
                            dateDebut: convertDateDebut,
                            dateFin: convertDateFin,
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
    }

    searchCommercial = selectedCommercial => {
        if (selectedCommercial !== null) {
            this.setState({ selectedCommercial: selectedCommercial });
        }
        else {
            this.setState({
                selectedCommercial: ''
            });
        }
    };

    searchClient = selectedClient => {
        if (selectedClient !== null) {
            this.setState({ selectedClient: selectedClient });
        }
        else {
            this.setState({
                selectedClient: ''
            });
        }
    };

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

    recherche = () => {
        if (this.state.selectedClient != '') {
            var clientId = this.state.selectedClient.value
        }
        else {
            var clientId = ''
        }
        if (this.state.selectedCommercial != '') {
            var commercialId = this.state.selectedCommercial.value
        }
        else {
            var commercialId = ''
        }
        // convertir date debut
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
        // convertir date fin
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
        //
        jQuery.ajax({
            url: process.env.REACT_APP_API_URL + 'Back_hooda/RapportVisiteSearch.php',
            type: 'POST',
            data: {
                clientId: clientId,
                commercialId: commercialId,
                dateDebut: convertDateDebut,
                dateFin: convertDateFin,
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

    afficherTout = () => {
        this.setState({
            selectedClient: '',
            selectedCommercial: '',
            dateDebut: '',
            dateFin: ''
        }, () => {
            jQuery.ajax({
                url: process.env.REACT_APP_API_URL + 'Back_hooda/RapportVisite.php',
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
        });
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Rapport visite</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div className="row">
                                    <h4 style={{ paddingLeft: '10px' }}>Critères de recherche</h4>
                                    <Fragment>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Client</label>
                                                <Select
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    onChange={this.searchClient}
                                                    options={this.state.clients}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Commercial</label>
                                                <Select
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    onChange={this.searchCommercial}
                                                    options={this.state.Commerciaux}
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
                                    </Fragment>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div>
                                        <button style={{ borderRadius: '5px', backgroundColor: '#761C19', borderColor: '#761C19' }} type="button" className="btn btn-success" onClick={this.recherche}>Rechercher</button>
                                    </div>
                                    <div>
                                        <button style={{ borderRadius: '5px', backgroundColor: '#761C19', borderColor: '#761C19' }} type="button" className="btn btn-success" onClick={this.afficherTout}>Afficher tout</button>
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

export default RapportVisite;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

class MenuParametrage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barreNavParam: [{ titre: 'Paramétrage', element: [{ nomElement: "Comptes admin", iconElement: 'fas fa-user-edit', linkElement: '/GestionAdmin', sousPermission: 0, arraySousElement: [] },
             { nomElement: "Villes", iconElement: 'fas fa-map-marked-alt', linkElement: '/Villes', sousPermission: 0, arraySousElement: [] },
             { nomElement: "Articles", iconElement: 'fas fa-shopping-basket', linkElement: '/Articles', sousPermission: 0, arraySousElement: [] },
             { nomElement: "Commerciaux", iconElement: 'fas fa-truck-moving', linkElement: '/Commerciaux', sousPermission: 0, arraySousElement: [] },
             { nomElement: "Gestion Clients", iconElement: '', linkElement: '/Clients', sousPermission: 0, arraySousElement:
             [{nomSousElement: "Clients", iconSousElement: 'fas fa-users', linkSousElement: '/Clients', sousSousPermission: 0, arraySousSousElement:[]},
             {nomSousElement: "Solde Initiale", iconSousElement: 'far fa-credit-card', linkSousElement: '/Soldeinitiale', sousSousPermission: 0,arraySousSousElement:[]}] },
             { nomElement: "Rapport visites", iconElement: 'fas fa-clipboard-list', linkElement: '/RapportVisite', sousPermission: 0, arraySousElement: [] }, 
             { nomElement: "Devis", iconElement: 'fas fa-clipboard-check', linkElement: '/Devis', sousPermission: 0, arraySousElement: [] },
             { nomElement: "Commande", iconElement: 'fas fa-box-open', linkElement: '/Commande', sousPermission: 0, arraySousElement: [] },
             { nomElement: "Facture", iconElement: 'fas fa-paste', linkElement: '/Facture', sousPermission: 0, arraySousElement: [] },
             {
                nomElement: "Reglement",
                iconElement: "",
                linkElement: "",
                sousPermission: 0,
                arraySousElement: [
                  {
                    nomSousElement: "Consulter reglement",
                    linkSousElement: "/consulteReglementclient",
                    sousSousPermission: 0,
                    iconSousElement: "fas fa-eye",
                    arraySousSousElement: [],
                  },
                  {
                    nomSousElement: "Ajout Reglement",
                    linkSousElement: "/SolderClient",
                    sousSousPermission: 0,
                    iconSousElement: "fas fa-coins",
                    arraySousSousElement: [],
                  },
                ],
              },
            ],iconTitre: 'fas fa-align-left', permission: 0 }]
                
    
                
                
        }
    }

    render() {
        return (
            <div id="page-wrapper" style={{ minHeight: '263px', marginLeft: '0px' }}>
                <div className="container-fluid">
                    <div className="row bg-title">
                        <div className="col-lg-12">
                            <h4 className="page-title">Paramétrage</h4>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box" >
                                <div className="row">
                                    {this.state.barreNavParam.map((el, index) =>
                                        <div className="col-md-3">
                                            <div className="white-box" style={{ border: 'solid 1px', borderRadius: '5px' }}>
                                                <h3 style={{ border: 'solid 1px', backgroundColor: 'black', color: 'white' }}><i style={{ paddingRight: '5px', paddingLeft: '5px' }} className={el.iconTitre}></i>{el.titre}</h3>
                                                <div className="myadmin-dd dd" id="nestable">
                                                    <ol className="dd-list">
                                                        {el.element.map((ele, indice) =>
                                                            <div>
                                                                {
                                                                    (ele.arraySousElement.length > 0) ?
                                                                        // Noeud Parent Ayant des Fils Feuilles
                                                                        (<Fragment>
                                                                            <li className="dd-item" data-id={index}>
                                                                                <div style={{ border: '1px solid rgba(120,130,140,.13)', padding: '8px 16px', height: 'auto', fontWeight: '600', color: '#2b2b2b' }}><i style={{ paddingRight: '5px' }} className={ele.iconElement}></i>{ele.nomElement}</div>
                                                                                <ol className="dd-list">
                                                                                    {ele.arraySousElement.map(elm =>
                                                                                        <li className="dd-item" data-id={index + 1}>
                                                                                            <Link style={{ color: '#2b2b2b' }} to={elm.linkSousElement}><div style={{ border: '1px solid rgba(120,130,140,.13)', padding: '8px 16px', height: 'auto', fontWeight: '600' }}><i style={{ paddingRight: '5px' }} className={elm.iconSousElement}></i>{elm.nomSousElement}</div></Link>
                                                                                            {elm.arraySousSousElement.length > 0 ? (
                                                                                                <ol className="dd-list">
                                                                                                    {elm.arraySousSousElement.map(ellm =>
                                                                                                        <li className="dd-item" data-id={index + 1}>
                                                                                                            <Link style={{ color: '#2b2b2b' }} to={ellm.linkSousSousElement}><div style={{ border: '1px solid rgba(120,130,140,.13)', padding: '8px 16px', height: 'auto', fontWeight: '600' }}><i style={{ paddingRight: '5px' }} className={ellm.iconSousSousElement}></i>{ellm.nomSousSousElement}</div></Link>
                                                                                                        </li>)}
                                                                                                </ol>) : (null)}
                                                                                        </li>)}
                                                                                </ol>
                                                                            </li> </Fragment>) :
                                                                        // Noeud Feuille (Terminaison)
                                                                        (<Link style={{ color: '#2b2b2b' }} to={ele.linkElement}><div style={{ border: '1px solid rgba(120,130,140,.13)', padding: '8px 16px', height: 'auto', fontWeight: '600' }}><i style={{ paddingRight: '5px' }} className={ele.iconElement}></i>{ele.nomElement}</div></Link>)
                                                                }
                                                            </div>
                                                        )}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuParametrage;




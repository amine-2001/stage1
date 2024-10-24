import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './paginate.css'

class StatiquePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    clearStorage = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div id="wrapper">
                {/* Navigation */}
                <nav className="navbar navbar-default navbar-static-top" style={{ marginBottom: 0 }}>
                    <div className="navbar-header" style={{ backgroundColor: '#3a3f51' }}> <a className="navbar-toggle hidden-sm hidden-md hidden-lg " href="javascript:void(0)" data-toggle="collapse" data-target=".navbar-collapse"><i className="ti-menu" /></a>
                        <div className="top-left-part"><a href="/Menu" className="logo"><img style={{ backgroundColor: 'white' }} className="img-circle" width='30px' height='30px' src="images/hooda.jpg" alt="HOODA" />&nbsp;<span style={{ fontSize: '13px' }} className="hidden-xs">HOODA APP</span></a></div>
                        <ul className="nav navbar-top-links navbar-left hidden-xs">
                            <li className="dropdown"> <a href='/MenuParametrage' style={{ color: 'white' }}><i style={{ marginRight: '5px', color: 'white' }} className="fas fa-align-left"></i>Paramétrage</a></li>
                        </ul>
                        <ul className="nav navbar-top-links navbar-right pull-right">
                            <li>
                                <div onClick={this.clearStorage} className='hvr-shrink'><span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="profile-pic"> <img src="images/users/logout.png" alt="user-img" width={25} className="img-circle" /><b style={{ color: 'white' }} className="hidden-xs">Déconnexion</b> </span></div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(StatiquePage);
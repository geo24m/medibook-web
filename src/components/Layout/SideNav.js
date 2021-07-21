import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu" id="menu">
                        <li className="menu-title">Main</li>
                        <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="ti-home"></i><span> Tableau de bord </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="email-inbox" className="waves-effect"><i className="ti-receipt"></i><span> Mes rendez-vous </span></Link>
                        </li>
                        <li>
                            <Link to="agenda" className="waves-effect"><i className="ti-calendar"></i><span> Mon agenda </span></Link>
                        </li>
                    </ul>
                </div>

            </React.Fragment>
        );
    }
}


export default SideNav;
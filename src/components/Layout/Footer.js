import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    © {new Date().getFullYear()}  Medibook <span className="d-none d-sm-inline-block"> - Créer avec <i className="mdi mdi-heart text-danger"></i> par IT-Medicalis</span>.
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;







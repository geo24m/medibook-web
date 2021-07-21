import React, { Component } from 'react';
import { Alert, Button, Col, Row, Card } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLogin } from '../../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import logosm from '../../images/logo-sm.png';

class Pageslogin extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event, values) {
        this.props.checkLogin(values.username, values.password, this.props.history);
    }

    render() {

        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
                </div>

                <div className="wrapper-page">

                    <Card className="overflow-hidden account-card mx-3">

                        <div className="bg-primary p-4 text-white text-center position-relative">
                            <h4 className="font-20 m-b-5">Welcome Back !</h4>
                            <p className="text-white-50 mb-4">Sign in to continue to Veltrix.</p>
                            <Link to="/" className="logo logo-admin"><img src={logosm} height="24" alt="logo" /></Link>
                        </div>
                        <div className="account-card-content">

                           {this.props.user && <Alert color="success">
                                    Your Login is successfull.</Alert>}

                            {this.props.loginError && <Alert color="danger">
                                {this.props.loginError}</Alert>}

                            <AvForm className="form-horizontal m-t-30" onValidSubmit={this.handleSubmit} >
                                <AvField name="username" label="Email" value={this.state.username} placeholder="Enter Email" type="text" required />
                                <AvField name="password" label="Password" value={this.state.password} placeholder="Enter Password" type="password" required />

                                <Row className="form-group m-t-20">
                                    <Col sm="6">

                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                    </Col>
                                </Row>

                                <Row className="form-group m-t-10 mb-0">
                                    <Col md="12" className="m-t-20">
                                        <Link to="/forget-password"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
                                    </Col>
                                </Row>
                            </AvForm>
                        </div>
                    </Card>

                    <div className="m-t-40 text-center">
                        <p>Don't have an account ? <Link to="/register" className="font-500 text-primary"> Signup now </Link> </p>
                        <p>© {new Date().getFullYear()} Veltrix. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { user, loginError, loading } = state.Login;
    return { user, loginError, loading };
}

export default withRouter(connect(mapStatetoProps, { checkLogin })(Pageslogin));




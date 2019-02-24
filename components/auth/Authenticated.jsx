import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Logout from './Logout';
import Loading from '../meta/Loading';
import { AUTHENTICATED } from '../../apollo/queries';
import { renderModal } from '../../apollo/clientWrites';
class Authenticated extends Component {
    render() {
        return (
            <Query query={AUTHENTICATED} ssr={false} >
                {({ loading, data }) => {
                    if (loading) return (
                        <div className="navbar-item has-text-centered">
                            <div><Loading size="2x" /></div>
                        </div>)
                    return data && data.authenticated ? <Logout deactivateMenu={this.props.deactivateMenu} /> : <>
                        <div className="navbar-item has-text-centered">
                            <a className="button is-info " onClick={() => { renderModal({ display: 'Register', message: '', active: true }); this.props.deactivateMenu() }}>
                                <strong>Sign up</strong>
                            </a>
                        </div>
                        <div className="navbar-item has-text-centered">
                            <a className="button is-info " onClick={() => { renderModal({ display: 'Login', message: '', active: true }); this.props.deactivateMenu() }}>
                                Log in
                            </a>
                        </div>
                    </>
                }}
            </Query>
        );
    }
}

export default Authenticated;

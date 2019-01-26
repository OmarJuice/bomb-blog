import React, { Component } from 'react';
import Link from 'next/link'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const USER = gql`
    query CurrentUser{
        user{
            id
            username
        }
    }
`

class User extends Component {
    render() {
        return (
            <Query query={USER}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>{error.message.replace(/GraphQL error: /g, '')}</p>;
                    return (
                        <>
                            <Link href={{ pathname: '/profile', query: { id: data.user.id } }}>
                                <a id="greeting">
                                    <p><em>Hey there, </em><strong>{data.user.username}</strong>!</p>
                                </a>
                            </Link>
                            <style jsx>{`
                                p{
                                    margin-right: 10px;
                                }
                                `}</style>
                        </>
                    )
                }}
            </Query>
        );
    }
}

export default User;
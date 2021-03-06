import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import moment from 'moment'
import { shortenNumber } from '../../utils';
import ErrorIcon from '../meta/ErrorIcon';
import UnlikePost from '../posts/UnlikePost';
import LikePost from '../posts/LikePost';
import { LIKES } from '../../apollo/queries';
import LinkWrap from '../global/LinkWrap';
import LoadingMedia from '../meta/LoadingMedia';


class Likes extends Component {
    render() {
        return (
            <>
                <h1 className="title is-2 is-size-4-mobile font-1">
                    Likes
                </h1>
                <Query query={LIKES} variables={{ id: this.props.userId }}>
                    {({ loading, error, data }) => {

                        if (loading) return <LoadingMedia />
                        if (error) return <ErrorIcon color="primary" size="4x" style="margin-top: 10px" />;
                        if (data.user.likedPosts.length < 1) {
                            return (
                                <div>
                                    <span className="icon has-text-primary"><i className="far fa-5x fa-heart"></i></span>
                                    <hr />
                                    <h1 className="subtitle font-1">
                                        {data.user.isMe ?
                                            <>
                                                <span>You have no likes. </span>
                                                <br />
                                                <Link href="/"><a>Go show some love.</a></Link>
                                            </> : `${data.user.username} doesn't like anything...`}</h1>
                                </div>
                            )
                        }

                        return (
                            <div className="columns is-centered is-mobile">
                                <div className="column is-full-mobile is-four-fifths-tablet is-8-desktop">
                                    {data.user.likedPosts.map(({ id, title, author, caption, numLikes, numComments, created_at, iLike, image }) => {
                                        const likes = shortenNumber(numLikes)
                                        const comments = shortenNumber(numComments)
                                        const likesMargin = String(likes.length * .25) + 'rem'
                                        const commentsMargin = String(comments.length * .4) + 'rem'
                                        const timeMargin = String(comments.length * .25) + 'rem'
                                        return (
                                            <article key={id} className="media has-text-centered">
                                                <figure className="media-left">
                                                    <p className="image is-48x48">
                                                        <img src={author.profile.photo_path || "/static/user_image.png"} />
                                                    </p>
                                                </figure>
                                                <div className="media-content">
                                                    <div className="content">
                                                        <div>
                                                            <LinkWrap post={{ id, title }}>
                                                                <a className="has-text-dark">
                                                                    <strong className="font-1 is-size-5-mobile has-text-dark">
                                                                        {title}
                                                                    </strong>
                                                                </a>
                                                            </LinkWrap>
                                                            <br />
                                                            By <LinkWrap profile={author} >
                                                                <a>

                                                                    {author.isMe ? <strong>You</strong> : <em>{author.username}</em>}
                                                                </a>
                                                            </LinkWrap>
                                                            <br />

                                                            <nav className="level is-mobile">
                                                                <div className="level-left">
                                                                    <a className="level-item  has-text-primary has-text-weight-bold"
                                                                        onClick={() => renderModal({ display: 'Likers', message: 'Users who like this', active: true, info: { type: 'post', id } })}>
                                                                        <span className="icon"><i className="fas fa-bomb"></i> </span>
                                                                        {likes}
                                                                    </a>
                                                                    <LinkWrap post={{ id, title }} comments={true}>
                                                                        <a className="level-item has-text-weight-bold has-text-grey">
                                                                            <span className="icon "><i className="fas fa-comments"></i> </span>
                                                                            {comments}
                                                                        </a>
                                                                    </LinkWrap>
                                                                    <span className="level-item">{moment.utc(Number(created_at)).local().format('MMMM Do YYYY')}</span>
                                                                </div>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="media-right columns is-multiline is-mobile is-centered">
                                                    <div className="column is-half has-text-centered">
                                                        {iLike ? <UnlikePost size="2x" postId={id} pageDetails={{ page: "profile", userId: this.props.userId }} /> :
                                                            <LikePost size="2x" postId={id} pageDetails={{ page: "profile", userId: this.props.userId }} />}
                                                    </div>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </>
        );
    }
}

export default Likes;

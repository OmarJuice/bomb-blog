import React, { Component } from 'react';
import moment from 'moment'
import { shortenNumber } from '../../utils';
import BombSVG from '../svg/bomb';
import LikeComment from '../posts/comments/LikeComment';
import UnlikeComment from '../posts/comments/UnlikeComment';
import { renderModal, setSearch } from '../../apollo/clientWrites';
import LinkWrap from '../global/LinkWrap';

class SearchComments extends Component {
    render() {
        const { data } = this.props
        return (
            <>
                {data.results.map((comment, i) => {
                    const { id, post_id, commenter, created_at, last_updated, comment_text, numLikes, tags, iLike, numReplies, post } = comment
                    return <article key={id}
                        className="media">
                        <figure className="media-left">
                            <span>{i + 1}</span>
                            <p className="image is-64x64">
                                <img src={commenter.profile.photo_path || "/static/user_image.png"} />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                {<div>
                                    <LinkWrap profile={commenter} >
                                        <a>
                                            {commenter.isMe ? <em>You</em> : <strong>{commenter.username}</strong>}
                                        </a>
                                    </LinkWrap>
                                    <br />
                                    <span className="icon"><i className="fas fa-long-arrow-alt-right"></i></span> <LinkWrap post={post}>
                                        <a className="font-1">
                                            {post.title}
                                        </a>
                                    </LinkWrap>
                                    <br />
                                    {comment_text}

                                    <br />
                                    {tags.map((tag, i) => (
                                        <a onClick={() => setSearch({ addToInput: ` #${tag.tag_name}`, active: true })} key={tag.id} className={`tag font-1 ${this.props.inputTags.includes(tag.tag_name) ? 'is-primary' : ''}`}>{tag.tag_name}</a>
                                    ))}
                                    <br />
                                    <small>{iLike ? <UnlikeComment commentId={id} postId={post_id} /> :
                                        <LikeComment commentId={id} postId={post_id} />} · {last_updated ? <i className="fas fa-pen-square"></i> : ''}
                                        {moment.utc(Number(last_updated || created_at)).local().fromNow(true)}</small> ·
                                <a onClick={() => renderModal({ display: 'Likers', message: 'Users who like this', active: true, info: { type: 'comment', id } })}
                                        className="has-text-primary">
                                        <span className="icon">{iLike ? <BombSVG lit={true} scale={1.2} /> : <BombSVG lit={false} scale={1.2} />}</span>
                                        <span className="has-text-primary">{shortenNumber(numLikes)}</span>
                                    </a> ·
                                        <span className="icon has-text-grey">
                                        <i className="fas fa-reply"></i>
                                    </span>
                                    <span className="has-text-grey">{shortenNumber(numReplies)}</span>
                                </div>}
                            </div>
                        </div>

                    </article>
                })}
                {this.props.end ? <article className="media">
                    <figure className="media-left">
                        <div className="image is-64x64">
                            <BombSVG lit={false} face={{ happy: false }} />
                        </div>
                    </figure>
                    <div className="media-content font-1 has-text-centered">
                        <div className="content has-text-centered">
                            <h3 className="subtitile is-3">
                                No {data.results.length > 0 ? 'more' : ''} Comments to show...
                        </h3>

                        </div>
                    </div>
                </article> : ''}
            </>
        );
    }
}

export default SearchComments;

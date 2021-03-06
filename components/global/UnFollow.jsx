import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import ErrorIcon from '../meta/ErrorIcon';
import Follow from './Follow';
import { FOLLOWING, CURRENT_USER, USER_PROFILE, FOLLOWERS } from '../../apollo/queries';
import { UNFOLLOW } from '../../apollo/mutations';

const update = (id, bool) => {
    return (proxy, { data: { deleteFollow } }) => {
        if (!bool || !deleteFollow) return;
        const currentUser = proxy.readQuery({ query: CURRENT_USER, variables: { id } })
        const unfollowedUser = proxy.readQuery({ query: USER_PROFILE, variables: { id } })
        let followerData;
        try {
            followerData = proxy.readQuery({ query: FOLLOWERS, variables: { id } })
            followerData.user.followers = followerData.user.followers.filter(follower => follower.id !== currentUser.user.id)
            proxy.writeQuery({ query: FOLLOWERS, variables: { id }, data: followerData })
        } catch (e) { }
        let followingData;
        try {
            followingData = proxy.readQuery({ query: FOLLOWING, variables: { id: currentUser.user.id } })
            followingData.user.following = followingData.user.following.filter(followee => followee.id !== id)
            proxy.writeQuery({ query: FOLLOWING, variables: { id: currentUser.user.id }, data: followingData })
        } catch (e) { }
        unfollowedUser.user.imFollowing = false;
        unfollowedUser.user.numFollowers--;
        proxy.writeQuery({ query: USER_PROFILE, variables: { id }, data: unfollowedUser })
    }
}

class Unfollow extends Component {
    render() {
        const { userId } = this.props
        const size = this.props.size === 'large' ? 'fa-3x' : 'fa-lg'
        return <Mutation mutation={UNFOLLOW} variables={{ user_id: userId }}
            update={update(userId, this.props.page === 'profile')}
            optimisticResponse={{ __typename: "Mutation", deleteFollow: true }}>
            {(deleteFollow, { error, data }) => {
                if (error) return <ErrorIcon size={size} color="primary" />
                if (!data || !data.deleteFollow) return (
                    <a onClick={deleteFollow}>
                        <span className="icon hover-icon">
                            <i className={`fas ${size} fa-user-minus has-text-primary`}></i>
                        </span>
                    </a>
                )
                if (data && data.deleteFollow) {
                    return <Follow size={this.props.size} userId={userId} />
                }
            }}
        </Mutation>
    }
}

export default Unfollow;
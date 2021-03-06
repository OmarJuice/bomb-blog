import gql from "graphql-tag";

export const FOLLOW = gql`
    mutation CreateFollow($user_id: Int!){
        createFollow(user_id: $user_id)
    }
`
export const UNFOLLOW = gql`
    mutation DeleteFollow($user_id: Int!){
        deleteFollow(user_id: $user_id)
    }
`
export const LOGIN = gql`
    mutation Login($username: String, $password: String){
        login(username: $username, password: $password)
    }
`
export const LOGOUT = gql`
    mutation Logout{
        logout
    }
`
export const REGISTER = gql`
    mutation Register($input: Register!){
        register(input: $input)
    }
`
export const CREATE_SECRET = gql`
    mutation CreateSecret($question: String!, $answer: String! ){
        createSecret(question: $question, answer: $answer )
    }
`
export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($input: ProfileDetails){
            updateProfile(input: $input){
                user_id
                about
                photo_path
                last_updated
            }
    }
`
export const LIKE_POST = gql`
    mutation LikePost($post_id: Int!){
        likePost(post_id:$post_id)
  }`
export const UNLIKE_POST = gql`
    mutation UnlikePost($post_id: Int!){
        unlikePost(post_id:$post_id)
  }`
export const LIKE_COMMENT = gql`
    mutation LikeComment($comment_id: Int!){
        likeComment(comment_id: $comment_id)
  }
`
export const UNLIKE_COMMENT = gql`
    mutation UnlikeComment($comment_id: Int!){
        unlikeComment(comment_id: $comment_id)
    }
`
export const CREATE_COMMENT = gql`
    mutation CreateComment($post_id: Int!, $comment_text: String!, $tags:[String]!){
        createComment(post_id: $post_id, comment_text: $comment_text, tags: $tags){
            id
            post_id
            created_at
            last_updated
            comment_text
            tags{
                id
                tag_name
            }
        }
    }
`
export const UPDATE_COMMENT = gql`
    mutation UpdateComment($comment_id: Int!, $comment_text: String!, $modTags: ModTags){
        updateComment(comment_text: $comment_text, comment_id: $comment_id, modTags: $modTags){
            id
            tags{
                id
                tag_name
            }
            comment_text
            created_at
            last_updated
            }
    }
`
export const DELETE_COMMENT = gql`
    mutation DeleteComment($comment_id: Int!){
        deleteComment(comment_id: $comment_id)
    }
`


export const CREATE_REPLY = gql`
    mutation CreateReply($comment_id: Int!, $reply_text: String!){
        createReply(comment_id: $comment_id, reply_text: $reply_text){
            id
            comment_id
            reply_text
            created_at
            last_updated
        }
    }
`
export const DELETE_REPLY = gql`
    mutation DeleteReply($reply_id: Int!){
        deleteReply(reply_id: $reply_id)
    }
`
export const UPDATE_REPLY = gql`
    mutation UpdateReply($reply_id: Int!, $reply_text: String!){
        updateReply(reply_id: $reply_id, reply_text: $reply_text){
            id
            comment_id
            reply_text
            last_updated
        }
    }
`
export const CREATE_POST = gql`
    mutation CreatePost($input: PostDetails!){
        createPost(input: $input){
            id
        }
    }
`
export const UPDATE_POST = gql`
    mutation UpdatePost($input: PostDetails, $id: Int!){
        updatePost(id: $id, input: $input){
            id
            user_id 
            created_at
            last_updated 
            title
            caption
            post_content
            tags{
                id
                tag_name
            }
            image
        }
    }
`
export const DELETE_POST = gql`
    mutation DeletePost($id: Int!){
        deletePost(id:$id)
    }
`
export const FEATURE_POST = gql`
    mutation FeauturePost($id: Int!){
        featurePost(id: $id)
    }
`
export const UNFEATURE_POST = gql`
    mutation UnfeaturePost($id: Int!){
        unfeaturePost(id: $id)
    }
`
export const UPLOAD_IMAGE = gql`
    mutation UploadImage($image: Upload!, $type: String!){
        uploadImage(image: $image, type: $type)
    }
`
export const PASSWORD_RESET = gql`
    mutation PasswordReset($id: Int!, $secretAnswer: String!, $newPassword: String!){
        passwordReset(id: $id, secretAnswer: $secretAnswer, newPassword: $newPassword)
    }
`
export const SET_LAST_READ = gql`
    mutation SetLastRead($lastRead: Int!){
        setLastRead(lastRead: $lastRead)
    }
`
export const authRefetch = [`Authenticated`, `CurrentUser`, `UserProfile`, `Comments`, `Replies`, `UserPhoto`, `ILike`, `PostAuthor`, `UserPosts`, `UserLikes`, `Followers`, `Following`, `Likers`, `Notifications`, `FolloweePosts`, `IsAdmin`]

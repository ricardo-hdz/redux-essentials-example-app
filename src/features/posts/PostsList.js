import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
    selectAllPosts,
    fetchPosts,
    selectPostIds,
    selectPostById
 } from './postsSlice'


let PostExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))
    return (
        <article className="post-excerpt" key={post.id} post={post}>
            <h3>{ post.title }</h3>
            <p>{ post.content ? post.content.substring(0,100) : '' }</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
            <PostAuthor userId={post.user}></PostAuthor>
            <TimeAgo></TimeAgo>
            <ReactionButtons post={post}></ReactionButtons>
        </article>
    )
}
// Memoize
PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
    const dispatch = useDispatch()
    // const posts = useSelector(selectAllPosts)
    const orderedPosts = useSelector(selectPostIds)

    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content
    if (postStatus === 'loading') {
        content = <div className="loader">Loading</div>
    } else if (postStatus === 'succeeded') {
        // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        
        // content = orderedPosts.map(post => (
        //     <article className="post-excerpt" key={post.id} post={post}>
        //         <h3>{ post.title }</h3>
        //         <p>{ post.content ? post.content.substring(0,100) : '' }</p>
        //         <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
        //         <PostAuthor userId={post.user}></PostAuthor>
        //         <TimeAgo></TimeAgo>
        //         <ReactionButtons post={post}></ReactionButtons>
        //     </article>
        // ))
        content = orderedPosts.map(postId => (
            <PostExcerpt key={postId} postId={postId}></PostExcerpt>
        ))
    } else if (postStatus === 'error') {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

// export default PostsList
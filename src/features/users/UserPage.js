import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

export const UserPage = ({ match }) => {
    const { userId } = match.params

    const user = useSelector(state => selectUserById(state, userId))

    const postsUser = useSelector(state => selectPostsByUser(state))

    const postTitles = postsUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    )
}
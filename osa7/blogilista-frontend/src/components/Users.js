import { useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'

const Users = () => {


    const users = useSelector(state => state.users)

    return (
        <div>
            {users ?
                <table>
                    <tbody>
                        {users ?
                            users.map(user =>
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                                    </td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            )
                            : <></>}
                    </tbody>
                </table>
            : <></>}
        </div>
    )
}

export default Users

import { useLoaderData } from "react-router-dom";
import UserCard from "./UserCard";

import { UserResponse } from "./types";

const Users = () => {
  const users = useLoaderData() as Array<UserResponse>;

  return (
    <div className="container">
        <h1 className="page-title">Users</h1>
        <div className="card-grid">
            {users.map((user) => {
                return <UserCard {...user} key={user.id}/>
            })}
        </div>
    </div>
  )
}

export default Users;

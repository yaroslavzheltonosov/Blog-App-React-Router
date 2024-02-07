import { useLoaderData } from "react-router-dom";
import PostCard from "./PostCard";

import { PostsResponse, TodosResponse, UserResponse } from "./types";
import Todo from "./Todo";

const User = () => {
    const [UserObject, UserPosts, UserTodos] = useLoaderData() as [UserResponse, PostsResponse[], TodosResponse[]];
    const {
      id,
      name,
      company: { name: companyName },
      email,
      website,
      address: { street, suite, city, zipcode }
    } = UserObject;

    return (
      <div className="container" key={id}>
        <h1 className="page-title">{name}</h1>
        <div className="page-subtitle">{email}</div>
        <div><b>Company:</b> {companyName}</div>
        <div><b>Website:</b> {website}</div>
        <div><b>Address:</b> {street} {suite}, {city}, {zipcode}</div>
        <h3 className="mt-4 mb-2">Posts</h3>
        <div className="card-grid">
          {UserPosts.map(({body, title, id}) => {
            return <PostCard body={body} title={title} id={id} key={id}/>
          })}
        </div>
        <h3 className="mt-4 mb-2">Todos</h3>
        <ul>
          {UserTodos.map(({title, completed, id}) => {
            return <Todo title={title} completed={completed} key={id}/>
          })}
        </ul>
      </div>
    )
  }
  
  export default User;
  
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Comments from "./Comments";

import { BASE_URL } from "./Navbar/router";
import { PostsResponse, CommentsResponse } from "./types";

const Post = () => {
    const [ name, setName ] = useState<string>('Loading...');
    const [ {id, title, body, userId}, comments ] = useLoaderData() as [PostsResponse, CommentsResponse[]];

    useEffect(() => {
      fetch(`${BASE_URL}/users/${userId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        }).then((response) => {
          return setName(response.name)
        });
    }, [userId]);

    return (
      <div className="container" key={id}>
        <h1 className="page-title">
          {title}
          <div className="title-btns">
            <Link className="btn btn-outline" to="./edit">Edit</Link>
          </div>
        </h1>
        <span className="page-subtitle">By: <Link to={`/users/${userId}`}>{name}</Link></span>
        <div>
          {body}
        </div>
        <h3 className="mt-4 mb-2">Comments</h3>
        <div className="card-stack">
          <Comments comments={comments} />
        </div>
      </div>
    )
  }
  
  export default Post;
  
import { Form, Link, useLoaderData } from "react-router-dom";
import PostCard from "./PostCard";

import { PostsQueryResponse } from "./types";
import { useEffect, useRef } from "react";

const Posts = () => {
  const {searchParams: { query, userId }, posts, users} = useLoaderData() as PostsQueryResponse;
  const queryRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (queryRef.current) queryRef.current.value = query || '';
  }, [query])

  useEffect(() => {
    if (userIdRef.current) userIdRef.current.value = userId || '';
  }, [userId])

  return (
    <div className="container">
        <h1 className="page-title">
          Posts
          <div className="title-btns">
            <Link to="./new" className="btn btn-outline">New</Link>
          </div>
        </h1>
        <Form className="form mb-4">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="query">Query</label>
              <input type="search" name="query" id="query" ref={queryRef} />
            </div>
            <div className="form-group">
              <label htmlFor="userId">Author</label>
              <select name="userId" id="userId" ref={userIdRef}>
                <option value="">Any</option>
                {users.map(({name, id}) => {
                  return <option key={id} value={id}>{name}</option>
                })}
              </select>
            </div>
            <button className="btn">Filter</button>
          </div>
        </Form>
        <div className="card-grid">
            {posts.map(({title, body, id}) => {
                return <PostCard title={title} body={body} id={id} key={id} />
            })}
        </div>
    </div>
  )
}

export default Posts;

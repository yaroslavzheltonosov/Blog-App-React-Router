import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import Posts from "../Posts";
import Post from "../Post";
import Users from "../Users";
import User from "../User";
import Todos from "../Todos";
import NavbarLayout from "./NavbarLayout";
import Error from "../Error";
import NewPost from "../NewPost";
import EditPost from "../EditPost";

import { Errors, Params } from "../types";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchJSON = (url: string, signal: AbortSignal) => {
    return fetch(url, { signal }).then((res) => {
        if (res.ok) {
            return res.json();
        }
    });
};

const handleFormSubmit = async (formData: FormData, signal: AbortSignal, postId = '') => {
    const title = formData.get("title");
    const body = formData.get("body");
    const userId = formData.get("userId");
    const errors: Errors = {};
  
    if (title === '') {
      errors.titleError = 'Title is Required.';
    }
    if (body === '') {
      errors.bodyError = 'Body is Required.';
    }
  
    if (Object.keys(errors).length > 0) {
      return errors;
    }
  
    const method = postId ? 'PUT' : 'POST';
    const url = postId ? `${BASE_URL}/posts/${postId}` : `${BASE_URL}/posts`;
  
    const post = await fetch(url, {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, userId })
    }).then((response) => response.json());
    return postId ? redirect(`/posts/${postId}`) : redirect(`/posts/${post.id}`);
};

export const router = createBrowserRouter([
    {
        element: <NavbarLayout />, children: [
        { path: '/', element: <Navigate to='/posts' /> },
        { path: '/posts', errorElement: <Error />, children: [
            { index: true, element: <Posts />, loader: ({request: { signal, url }}) => {
                const searchParams = new URL(url).searchParams;
                const query = searchParams.get("query") || "";
                const userId = searchParams.get("userId") || "";
                const filterParams: Params = { q: query };
                if (userId !== "") filterParams.userId = userId;
                const params = new URLSearchParams(filterParams);
                const postsQueryResult = fetchJSON(`${BASE_URL}/posts?${params.toString()}`, signal);
                const getUser = fetchJSON(`${BASE_URL}/users`, signal);
                return Promise.all([postsQueryResult, getUser]).then((results) => {
                    const [posts, users] = results;
                    return {
                        searchParams: { query, userId },
                        posts,
                        users,
                    }
                })
            }},
            { path: ':postId', children: [
                {index: true, element: <Post />, loader: ({params, request: { signal }}) => {
                    const getPost = fetchJSON(`${BASE_URL}/posts/${params.postId}`, signal);
                    const getComments = fetchJSON(`${BASE_URL}/posts/${params.postId}/comments`, signal);
                    return Promise.all([getPost, getComments]);
                }},
                {path: 'edit', element: <EditPost />, loader: ({params: { postId }, request: { signal }}) => {
                    const getUsers = fetchJSON(`${BASE_URL}/users`, signal);
                    const getPost = fetchJSON(`${BASE_URL}/posts/${postId}`, signal);
                    return Promise.all([getUsers, getPost]).then(([userList, post]) => {
                        return {
                          userList,
                          post,
                        };
                    });
                }, action: async ({params, request}) => {
                    const formData = await request.formData();
                    return handleFormSubmit(formData, request.signal, params.postId)
                }}
            ]},
            { path: 'new', element: <NewPost />, action: async ({request}) => {
                const formData = await request.formData();
                return handleFormSubmit(formData, request.signal);
            }, loader: ({request: { signal }}) => {
                return fetch(`${BASE_URL}/users`, { signal });
            }}
        ]},
        { path: '/users', errorElement: <Error />, children: [
            { index: true, element: <Users />, loader: ({request: { signal }}) => {
                return fetch(`${BASE_URL}/users`, { signal });
            }},
            { path: ':userId', element: <User />, loader: ({params, request: { signal }}) => {
                const getUser = fetchJSON(`${BASE_URL}/users/${params.userId}`, signal);
                const getUserPosts = fetchJSON(`${BASE_URL}/posts?userId=${params.userId}`, signal);
                const getUserTodos = fetchJSON(`${BASE_URL}/todos?userId=${params.userId}`, signal);
                return Promise.all([getUser, getUserPosts, getUserTodos]);
            }}
        ]},
        { path: '/todos', errorElement: <Error />, element: <Todos />, loader: ({request: { signal }}) => {
            return fetch(`${BASE_URL}/todos`, { signal });
        }}
        ]
    }
])
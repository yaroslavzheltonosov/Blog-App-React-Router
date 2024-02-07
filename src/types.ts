export type Params = {
    q: string;
    userId?: string;
}

export type Errors = {
    titleError?: string;
    bodyError?: string;
}

export type PostsResponse = {
    body: string;
    title: string;
    readonly id: number;
    readonly userId?: number;
}

export type PostsQueryResponse = {
    posts: Array<PostsResponse>;
    searchParams: { query: string, readonly userId: string };
    users: Array<UserResponse>;
}

export type CommentsResponse = {
    body: string;
    email: string;
    readonly id: number;
    name: string;
    postId: number;
}

export type UserResponse = {
    readonly id: number;
    name: string;
    email: string;
    website: string;
    company: { name: string };
    address: { street: string, suite: string, city: string, zipcode: string };
}

export type TodosResponse = {
    title: string;
    completed: boolean;
    readonly id?: number;
    readonly userId?: number;
}
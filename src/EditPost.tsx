import { useActionData, useLoaderData, useNavigation } from "react-router-dom";

import { Errors, PostsResponse, UserResponse } from "./types";
import SubmitPost from "./SubmitPost";

const EditPost = () => {
    const { state } = useNavigation();
    const isSubmitting = state === 'submitting';
    const errors: Errors = useActionData() || [];
    const {userList, post} = useLoaderData() as {userList: UserResponse[], post: PostsResponse};

    return (
        <div className="container">
            <h1 className="page-title">Edit Post</h1>
            <SubmitPost
                method="PUT"
                userList={userList}
                errors={errors}
                isSubmitting={isSubmitting}
                defaultValues={post}
            />
        </div>
    )
}

export default EditPost;

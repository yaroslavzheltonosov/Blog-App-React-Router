import { useActionData, useLoaderData, useNavigation } from "react-router-dom";

import { Errors, UserResponse } from "./types";
import SubmitPost from "./SubmitPost";

const NewPost = () => {
    const { state } = useNavigation();
    const isSubmitting = state === 'submitting';
    const errors: Errors = useActionData() || [];
    const userList = useLoaderData() as Array<UserResponse>;

    return (
        <div className="container">
            <h1 className="page-title">New Post</h1>
            <SubmitPost
                method="POST"
                userList={userList}
                errors={errors}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default NewPost;

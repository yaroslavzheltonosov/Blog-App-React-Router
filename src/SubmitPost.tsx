import { Form, Link } from "react-router-dom";

import { UserResponse, Errors, PostsResponse } from "./types";

type Props = {
    method: "POST" | "PUT";
    userList: Array<UserResponse>;
    errors: Errors;
    isSubmitting: boolean;
    defaultValues?: PostsResponse;
}

const SubmitPost = (props: Props) => {
    const { method, userList, errors: { titleError, bodyError }, isSubmitting, defaultValues = {} as PostsResponse } = props;
    return (
        <Form method={method} className="form">
            <div className="form-row">
                <div className={`form-group ${titleError && 'error'}`}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={defaultValues.title} />
                    <div className={titleError && "error-message"}>{titleError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="userId">Author</label>
                    <select name="userId" id="userId" defaultValue={defaultValues.userId}>
                        {userList.map(({name, id}) => {
                            return <option key={id} value={id}>{name}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className={`form-group ${bodyError && 'error'}`}>
                    <label htmlFor="body">Body</label>
                    <textarea name="body" id="body" defaultValue={defaultValues.body}></textarea>
                    <div className={bodyError && "error-message"}>{bodyError}</div>
                </div>
            </div>
            <div className="form-row form-btn-row">
                <Link className="btn btn-outline" to="..">Cancel</Link>
                <button className="btn" disabled={isSubmitting}>Save</button>
            </div>
        </Form>
    )
}

export default SubmitPost;
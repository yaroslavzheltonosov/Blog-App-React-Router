import { Link } from "react-router-dom";

import { PostsResponse } from "./types";

const PostCard = ({title, body, id: postId}: PostsResponse) => {
    return (
        <div className="card">
            <div className="card-header">
                {title}
            </div>
            <div className="card-body">
                <div className="card-preview-text">
                    {body}
                </div>
            </div>
            <div className="card-footer">
                <Link to={`/posts/${postId.toString()}`} className="btn">View</Link>
            </div>
        </div>
    )
}

export default PostCard;

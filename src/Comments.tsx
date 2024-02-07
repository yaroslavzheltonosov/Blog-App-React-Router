import { CommentsResponse } from "./types";

type Props = {
    comments: CommentsResponse[];
}

const Comments = ({ comments }: Props) => {
    return (
        comments.map(({email, body, id}) => {
            return (
                <div className="card" key={id}>
                <div className="card-body">
                    <div className="text-sm mb-1">{email}</div>
                    {body}
                </div>
                </div>
            )
        })
    )
}

export default Comments;
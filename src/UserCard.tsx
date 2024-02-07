import { Link } from "react-router-dom";
import { UserResponse } from "./types";

const UserCard = (props: UserResponse) => {
    const {
        id: userId,
        name,
        email,
        website,
        company: { name: companyName }
    } = props;

    return (
      <div className="card">
        <div className="card-header">{name}</div>
        <div className="card-body">
          <div>{companyName}</div>
          <div>{email}</div>
          <div>{website}</div>
        </div>
        <div className="card-footer">
          <Link to={userId.toString()} className="btn">View</Link>
        </div>
      </div>
    )
  }
  
  export default UserCard;
  
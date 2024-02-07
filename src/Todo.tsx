import { TodosResponse } from "./types";

const Todo = ({title, completed}: TodosResponse) => {
    return (
        <li className={completed ? 'strike-through' : ''}>{title}</li>
    )
}

export default Todo;
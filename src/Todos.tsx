import { useLoaderData } from "react-router-dom";
import Todo from "./Todo";

import { TodosResponse } from "./types";

const Todos = () => {
    const todos = useLoaderData() as Array<TodosResponse>;

    return (
      <div className="container">
        <h1 className="page-title">Todos</h1>
        <ul>
          {todos.map(({title, completed, id}) => {
            return <Todo title={title} completed={completed} key={id}/>
          })}
        </ul>
      </div>
    )
  }
  
  export default Todos;
  
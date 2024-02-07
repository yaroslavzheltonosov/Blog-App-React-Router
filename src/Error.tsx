import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError() as { stack: string };
    const isDevEnv = import.meta.env.DEV;

    return (
        <div className="form-group">
            {isDevEnv ? 
                <div className="error-message">{error.stack}</div> :
                <h1 className="error-message">There has been an unknown error, please contact support.</h1>
            }
        </div>
    )
}

export default Error;

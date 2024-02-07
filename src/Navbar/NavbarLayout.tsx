import Loading from "../Loading";
import Navbar from "./Navbar"
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom"

const NavbarLayout = () => {
    const { state } = useNavigation();
    const isLoading = state === "loading";
    return (
        <>
            <Navbar />
            <ScrollRestoration />
            {isLoading ? <Loading /> : <Outlet />}
        </>
    )
}

export default NavbarLayout;
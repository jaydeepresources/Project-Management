import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/clients">Clients</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/meetings">Meetings</Link>
        </nav>
    );
};

export default Navbar;

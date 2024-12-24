import { Link } from "react-router-dom";

function Navbar() {
  return (
   <>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/info">Data Info</Link>
        </li>
      </ul>
    </nav>
   </>
  );
}

export default Navbar;
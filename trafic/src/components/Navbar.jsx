import { Link } from "react-router-dom";
import style from "../modules/navbar.module.css";

function Navbar() {
  return (
   <>
    <nav className={style.navbar}>
      <div>
        <Link to="/">
        <h1>Trafic Data</h1>
        </Link>
      </div>
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
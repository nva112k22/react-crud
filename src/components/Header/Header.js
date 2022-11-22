
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { logOut } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { DiReact } from "react-icons/di";
import { useTranslation, Trans } from "react-i18next";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    navigate('/login')
  }
  const handleRegister = () => {
    navigate('/register')
  }
  const { t } = useTranslation();

  const handleLogOut = async() => {
    let rs = await logOut(account.email, account.refresh_token);
    if(rs && rs.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      navigate('/login');
    } else {
      toast.error(rs.EM);
    }
    console.log('check res', rs)
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">NVA</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          <DiReact className="brand-icon" /> NVA
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("header.user")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("header.admin")}
            </NavLink>
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/admins">Admin</Nav.Link> */}
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  {t("header.login")}
                </button>
                <button className="btn-signup" onClick={() => handleRegister()}>
                  {t("header.signup")}
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item> {t("header.profile")}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("header.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

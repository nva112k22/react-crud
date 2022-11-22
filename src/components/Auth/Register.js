import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import Language from "../Header/Language";
import { useTranslation, Trans } from "react-i18next";


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = () => {
    navigate('/login')
  }
  const handleRegister = async () => {
    //validate
     const isValidEmail = validateEmail(email);

     if (!isValidEmail) {
       toast.error("Invalid email!");
       return;
     }
     if (!password) {
       toast.error("Invalid password!");
       return;
     }
    //submit apis
    let data = await postRegister(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <span>{t("register.already")}</span>
        <button onClick={() => handleLogin()}>Log in</button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">NVA</div>
      <div className="welcome col-4 mx-auto text-center">
        {t("register.start")}
      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>{t("register.username")}</label>
          <input
            type={"username"}
            value={username}
            className="form-control"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label>{t("register.email")}(*)</label>
          <input
            type={"email"}
            value={email}
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>{t("register.password")}(*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            {t("register.submit")}
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            &#60;&#60;{t("register.back")}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;

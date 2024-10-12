

import React from "react";
import "../SignUp/style.css";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();


  return (
    <div className='sign_login_forget_container'>
      <div className='slf_container'>
        <div className="top_titles">
          <h3 className='title_1'>¡Bienvenido a RUMP!</h3>
        </div>

        <form action="" className="signup_form">
          
          <div className="slf_input">
            <input type="text"  placeholder="Ingrese Email o usuario..."/>
          </div>
          <div className="slf_input">
            <input type="password"  placeholder="Password"/>
          </div>
          <button className="slf_button">
          Ingresar
          </button>
        </form>
        <div className="allready_signed" onClick={()=>navigate("/forgetPassword")}>
        Olvidó Password?
        </div>
        <div className="allready_signed" onClick={()=>navigate("/signup")}>
        Crear una Cuenta!
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Login;

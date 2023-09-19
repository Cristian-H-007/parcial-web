import { useState } from "react";
import ButtonLogin from "./ButtonLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioLogin = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  const inicioSesion = async (e) => {
    e.preventDefault();
    console.log(" :", usuario);
    console.log("Password:", password);

    const data = {
      usuario: usuario,
      password: password,
    };

    await axios
      .post("http://89.116.25.43:3500/api/login", data)
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.data.jwt);
        localStorage.setItem("user", resp.data.user);
        localStorage.setItem("username", resp.data.user.usuario);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if ( err.response.status == 404) {
          Swal.fire("Información!", err.response.data.message, "error");
        } else {
          Swal.fire("Información!", "Ocurrio un error!", "error");
        }
      });
  };

  return (
    <main>
      <form>
      <div className="cardform">
        <h4>USER LOGIN</h4>
        <div className="input_user">
          <input
            className="inputs"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          />
        </div>
        <div className="input_pass">
          <input
            className="inputs"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasword(e.target.value);
            }}
          />
        </div>
        <ButtonLogin fnInicioSession={inicioSesion} label={"LOGIN"} />
        <div className="w-full flex justify-end mr-5">
        </div>
      </div>
    </form>
    </main>
    
  );
};

export default FormularioLogin;
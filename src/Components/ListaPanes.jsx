import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Styles/Boxes.css"

const ListaPanes = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);


  const llamarPAnes = async () => {
    await axios
      .get("http://89.116.25.43:3500/api/productos/listar", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((resp) => {
        console.log(resp);
        setData(resp.data.result);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          Swal.fire("Información!", err.response.data.message, "error");
        } else if (err.response.status == 401) {
          Swal.fire("Información!", err.response.data.message, "error");
        } else {
          Swal.fire("Información!", "Ocurrio un error!", "error");
        }
      });
  };

  useEffect(() => {
    llamarPAnes();
  }, []);

  return (
    <div className="boxes">
        {data.map((result) => {
          return (
            <div className="main-boxes" key={result._id}>
                <div>
                    <img className="imagenes" src={result.imagen} alt="imagenes de panes" />
                </div>
                <div className="precio">{ "$" + result.valor}</div>
                <div>{result.descripcion}</div>
            </div>
        )
    })}
    </div>
)
}

export default ListaPanes;
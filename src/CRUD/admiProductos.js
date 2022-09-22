import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import {
  db,
  almacenamiento
} from "./firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import "bootstrap-icons/font/bootstrap-icons.css";
//import { useAuthState } from "react-firebase-hooks/auth";

//import { useForm } from "react-hook-form";
import swal from "sweetalert";


import styles from "./Table.module.css";
import useTable from "./useTable";
import TableFooter from "./TableFooter";


const AdmiProductos = () => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [tipo, setTipo] = useState("");
  const [mostrarE, setMostrarE, setMostrarEliminar] = useState(false);
  const [idFire, setIDFire] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipoD, setTipoD] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);

  const [details, setDetails] = useState({Color: "", Joystick:"", Marca: ""});

  const [idPr, setIDPr] = useState("");
  const [url2, setURL2] = useState("");

  const [image, setImage] = useState("");
  const [imageurl, setimageURL] = useState("");



  const [isLoading, setIsloading] = useState(false);
  const [url, setUrl] = useState([]);



  const [currentID, setCurrentID] = useState({
    id: null,
      name: "",
      description: "",
      category: "",
      stock: "",
      price: "",
      Color: "",
      Joystick: "",
      Marca: "",
      pictureUrl:""
  });
  const [mostrarM, SetmostrarM] = useState(false);



  const getDocumentos2 = async () => {
    db.collection("items").onSnapshot(function (data) {
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };


  const elegirTipo = async () => {
    const temp = [];

    var opcion = tipo;

    const docEmpleados = db.collection("items");

    const snapshot = await docEmpleados.where("Tipo", "==", opcion).get();
    if (snapshot.empty) {
      alert("No hay resultados");

      return;
    } else {
      snapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp);

    }
  };
 
  const handleFileSubmit = (e) => {
    if (
      !(
        e.target.files[0].name.toLowerCase().endsWith(".png") ||
        e.target.files[0].name.toLowerCase().endsWith(".jpg")
      )
    ) {
      swal({
        title: "Formato de archivo no aceptable",
        text: "El archivo subido no es una foto, por favor asegurarse de subir una imagen formato png o jpeg",
        icon: "warning",
        button: "Aceptar",
      });
      e.target.value = null;
      setimageURL(null);
      setImage(null);
      return;
    }
    setimageURL(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  

  useEffect(() => {
    //if (loading) return;
    // if (user === null) window.location.assign("/Login");
    const getDocumentos = async () => {
      const temp = [];
      var cad = "Eligir Opcion";

      if (tipo === cad || tipo === "") {
        getDocumentos2();
      } else {
        elegirTipo();
      }
    };
    getDocumentos();
  });


  const editRow = (productos) => {
    obtener(productos);
    setURL2(productos.url);
   


    if (mostrarM === false) {
      SetmostrarM(!mostrarM);
    } else {
      SetmostrarM(!mostrarM);
    }
  };

  const obtener = (productos) => {
    setIDPr(productos.id);

    setCurrentID({
      id: productos.id,
      name: productos.name,
      description: productos.description,
      category: productos.category,
      stock: productos.stock,
      price: productos.price,
      Color: productos.details.Color,
      Joystick: productos.details.Joystick,
      Marca: productos.details.Marca,
      pictureUrl: productos.pictureUrl,


    });

    setimageURL(productos.pictureUrl);
    console.log(imageurl);
    
    
  };



  const modificar = async (e) => {
    e.preventDefault();
    const producto = doc(db, "items", idPr);

    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var category = document.getElementById("tipo").value;
    var stock = document.getElementById("cantidad").value;
    var color = document.getElementById("color").value;
    var marca = document.getElementById("marca").value;
    var Joystick = document.getElementById("op_joy").value;
    var price = document.getElementById("price").value;

    details.Color =color;
    details.Joystick =Joystick;
    details.Marca =marca;
    


    

    if (nombre === " " || descripcion === " " || category === " " || url2 === "" ) {
      swal({
        title: "No se realizo",
        text: "No se modifico el documento, verifique los campos",
        icon: "warning",
        button: "Aceptar",
      });

      return;
    } else {
      await updateDoc(producto, {
        name: nombre,
        description: descripcion,
        details: details, 
        category: category,
        pictureUrl: url,
        stock: stock,
        price: price
      }).catch((error) => {
        swal({
          title: "Surgio un error",
          text: "No se modifico",
          icon: "info",
          button: "Aceptar",
        });
      });

      const uploadtask = almacenamiento
        .ref("/items/" + idPr)
        .put(image);
      uploadtask
        .then((uploadtaskSnapshot) => {
          return uploadtaskSnapshot.ref.getDownloadURL();

        })
        .then((url) => {
          updateDoc(doc(db, "items", idPr), {
            pictureUrl: url,
          });
          setIsloading(false);
        });

        


        

      swal({
        title: "Producto Modificado",
        text: "Se modifico el producto exitosamente",
        icon: "info",
        button: "Aceptar",
      });
    }
  }; //Fin

  



  const { slice, range } = useTable(data, page, 5);
  const handleChange = (e) => {
    setTipo(e.target.value);
  };


  return (


    <div className="contentf">
      <div className="text-center" style={{ margin: "50px 0px" }}>
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "1%",
            marginBottom: "80px",
            borderBottom: "2px solid black",
            fontSize: "30px",
          }}
        >
          Administración de Productos
        </h1>
      </div>
      <div className="container">
        <div className="dropdown">
          <label>
            <h5>BUSCAR</h5>
          </label>
          <br />
          <select onChange={(e) => handleChange(e)} id="tipo2">
            <option>Eligir Opcion</option>
            <option>Computacion</option>
            <option>Gaming</option>
            
          </select>
        </div>

        <div className="mt-4 mb-4 table-responsive">
          <table className="table table-dark table-striped">
            <thead className={styles.tableRowHeader}>
              <tr className="align-me">
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">TIPO</th>
                <th scope="col">Stock</th>
                <th scope="col">Precio</th>
                <th scope="col">EDITAR</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((productos, index) => (
                <tr key={index}>
                  <td class="table-primary">{productos.name}</td>

                  <td class="table-primary">{productos.description}</td>
                  <td class="table-primary">{productos.category}</td>
                  <td class="table-primary">{productos.stock}</td>
                  <td class="table-primary">{productos.price}</td>
                  <td class="table-primary">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button
                        onClick={() => editRow(productos)}
                        color="success"
                      >
                        <i class="bi bi-pen"></i>
                      </Button>
                      <Button

                        color="success"
                      >
                        <i class="bi bi-archive"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>


      <Modal isOpen={mostrarM}>
        <ModalHeader>Modificar Documento</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <form onSubmit={(e) => modificar(e)}>
              <label>Nombre: </label>

              <input
                type="text"
                id="nombre"
                className="form-control"
                onChange={(e) => setNombre(e.target.value)}
                defaultValue={currentID && currentID.name}
                name="nombre"
              />

              <br />
              <label>Descripcion: </label>
               <textarea
                type="text"
                id="descripcion"
                className="form-control"
                onChange={(e) => setDescripcion(e.target.value)}
                defaultValue={currentID && currentID.description}
                name="descripcion"
              />

              <br />
              <label>Categoria: </label>
              <select className="form-control"
                id="tipo"
                onChange={(e) => setTipoD(e.target.value)}
                defaultValue={currentID && currentID.tipo}
              >
                <option>Computacion</option>
                <option>Gaming</option>
              
                
              </select>


              <br />
              <label>Stock: </label>
              <input type="number" className="form-control" name="cantidad" id="cantidad"
              onChange={(e)=> setCantidad(e.target.value)}
              defaultValue={currentID && currentID.stock}/>


              <br/>

              <label>Precio: </label>
              <input type="number" className="form-control" name="cantidad" id="price"
              onChange={(e)=> setCantidad(e.target.value)}
              defaultValue={currentID && currentID.price}/>

              <br/>

              <label>Marca: </label>
              <input
                type="text"
                id="marca"
                className="form-control"
                onChange={(e) => setNombre(e.target.value)}
                defaultValue={currentID && currentID.Marca}
                name="nombre"
              />

              <br/>


              <label>Color: </label>
              <input
                type="text"
                id="color"
                className="form-control"
                onChange={(e) => setNombre(e.target.value)}
                defaultValue={currentID && currentID.Color}
                name="color"
              />

              <br/>

              <label>Joystick: </label>
              <select className="form-control"
                id="op_joy"
                onChange={(e) => setTipoD(e.target.value)}
                defaultValue={currentID && currentID.tipo}
              >
                <option>Si</option>
                <option>No</option>
              
                
              </select>



                <label> Foto Item  1</label>
                <br />

                <div>
                  <img id="foto" src={imageurl} class="form-control" />
                </div>
               

                <div class="form-control">
                  <input
                    id="b_file"
                    type="file"
                    class="form-control-file"
                    accept=".jpg,.png"
                    onChange={handleFileSubmit}
                  />
                </div>


                <ModalFooter>
                  <Button
                    type="button"
                    class="btn btn-outline-danger"
                    style={{ background: "red" }}
                    onClick={() => SetmostrarM(false)}
                  >
                    Salir
                  </Button>
                  <Button
                    type="submit"
                    class="btn btn-outline-danger"
                    style={{ background: "rgb(70,130,180)" }}
                  >
                    Modificar
                  </Button>
                </ModalFooter>

            </form>

           

          </div>
        </ModalBody>
      </Modal>

    </div>









  );
};

export default AdmiProductos;

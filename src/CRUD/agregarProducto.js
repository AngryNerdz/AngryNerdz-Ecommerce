import React, { useState, useEffect } from "react";
import {
    almacenamiento,
    dbProducto
} from "./firebase";
import swal from "sweetalert";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import "./estiloAgregarProducto.css";




const AgregarProducto = () => {
    const [image, setImage] = useState("");
    const [imageurl, setimageURL] = useState("");
    const tablaProductosRef = collection(dbProducto, "items");
    const [details, setDetails] = useState({Color: "", Joystick:"", Marca: ""});
    

    


    const [dats, setDatos] = useState({
        name: " ",
        description: " ",
        stock: " ",
        category: " ",
        pictureUrl: "",
        price:""
    });

    const handleInputChance = (event) => {
        setDatos({
            ...dats,
            [event.target.name]: event.target.value,
        });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
         
        var name =  document.getElementById("name").value;
        var descripcion =document.getElementById("descripcion").value;
        var stock =document.getElementById("stock").value;
        var precio =document.getElementById("price").value;

        console.log(name);
        console.log(descripcion);
        console.log(stock);
        console.log(precio);
        
        var tipo =  document.getElementById("tipo").value;
        var color = document.getElementById("color").value;
        var marca = document.getElementById("marca").value;
        var Joystick = document.getElementById("op_joy").value;
        
        details.Color =color;
        details.Joystick =Joystick;
        details.Marca =marca;

        console.log(details);

        if (
            name === " " ||
            descripcion === " " ||
            stock === " " ||
            image === null
            
        ) {
            swal({
                title: "No se realizo",
                text: "No se agregro el producto, verifique los campos",
                icon: "warning",
                button: "Aceptar",
            });
        } else {
            var n_producto_id = null;
           
            await addDoc(tablaProductosRef, {
                name: name,
                description: descripcion,
                price: precio,
                stock: stock,
                category: tipo,
                pictureUrl: dats.pictureUrl,
                details:details
            }).then((n_doc) => {
                console.log(n_doc.id);
                n_producto_id = n_doc.id;
            });
            
            const uploadtask = almacenamiento
                .ref("/items/" + n_producto_id)
                .put(image);
            uploadtask
                .then((uploadtaskSnapshot) => {
                    return uploadtaskSnapshot.ref.getDownloadURL();
                })
                .then((url) => {
                    updateDoc(doc(dbProducto, "items", n_producto_id), {
                        foto: url,
                    });
                    setImage(null);
                    setimageURL(null);
                   /* document.getElementById("name").value = null;
                    document.getElementById("descripcion").value = null;
                    document.getElementById("stock").value = null;
                    document.getElementById("tipo").value = null;*/

                    swal({
                        title: "Realizado",
                        text: "Se agregro el producto",
                        icon: "info",
                        button: "Aceptar",
                    });
                });
        }
    };


  



    return (

        <div class="container rounded">
        <div className="form-group"  >
            <h1 style={{
            width: "100%",
            textAlign: "center",
            marginTop: "1%",
            marginBottom: "20px",
            borderBottom: "2px solid black"
          }}
          >Agregar Producto</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-3">
                <label>Nombre: </label>

                <input
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={handleInputChance}
                    name="nombre"
                />
                </div>

                <br />
                <div class="mb-3">
                <label>Descripcion: </label>
                <textarea
                    type="text"
                    id="descripcion"
                    className="form-control"
                    onChange={handleInputChance}
                    name="descripcion"
                />
                </div>

                <br />
                <div class="mb-3">
                <label>Tipo: </label>
                <select className="form-control"
                    id="tipo"
                    onChange={handleInputChance}

                >
                   <option>Computacion</option>
                    <option>Gaming</option>
                    

                </select>

                </div>


                <br />
                <div class="mb-3">
                <label>Stock: </label>
                <input type="number" className="form-control" name="cantidad" id="cantidad"
                    onChange={handleInputChance}
                    id="stock"
                ></input>
                </div>

              <br />

              <label>Precio: </label>
              <input type="number" className="form-control" name="cantidad" id="price"
              ></input>

              <br/>

              <label>Marca: </label>
              <input
                type="text"
                id="marca"
                className="form-control"
                
                name="nombre"
              />

              <br/>


              <label>Color: </label>
              <input
                type="text"
                id="color"
                className="form-control"
                
                name="color"
              />

              <br/>

              <label>Joystick: </label>
              <select className="form-control"
                id="op_joy"
                
              >
                <option>Si</option>
                <option>No</option>
              
                
              </select>


              

           
                <div class="col-md-6">
                <label> Foto Item </label>
                <br />

                <div>
                    <img id="foto"  src={imageurl}   class="img-responsive img-thumbnail"  />
                

                <div class="mb-3">
                    <input
                        id="b_file"
                        type="file"
                        class="form-control-file"
                        accept=".jpg,.png"
                        onChange={handleFileSubmit}
                        
                    />
                </div>
                </div>

                </div>
                
                <div class="mb-3">
                 <button type="submit" id="b_submit" class="btn btn-lg btn-primary" >Ingresar</button>
                <button type="button" id="b_cancelar" class="btn btn-secondary btn-lg" >Cancelar</button>
                </div>
            </form>
            </div>
             
        </div>


    );
};
export default AgregarProducto;
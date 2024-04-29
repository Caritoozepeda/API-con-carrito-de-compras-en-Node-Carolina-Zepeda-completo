const express = require("express");
const cors = require("cors");
const traducirProductos = require("./data/traductor");
const Productos = require("./data/index"); 
const fs = require("fs");
const translate = require('node-google-translate-skidz');
const { JSDOM } = require('jsdom');
const {cabecera,modal, fin, inicioContenedor, finContenedor, funcionalidad} = require("./componentes");
 
const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, ()=>{
    console.log("en puerto 3000") ;
    
});
 
try{


const getProductosTraducidos = async (callback) => {
 
  Productos((productos) => {
    const productosTraducidos = [];

    
    productos.forEach((producto, index) => {
      const opciones = {
        text: producto.title,
        source: "en",
        target: "es"
      };
 
      translate(opciones, (result) => {
        const tituloTraducido = result.translation;
 
        const opcionesDescripcion = {
          text: producto.description,
          source: "en",
          target: "es"
        };
 
        translate(opcionesDescripcion, (result) => {
          const descripcionTraducida = result.translation;
 
          const productoTraducido = {
            id: producto.id,
            title: tituloTraducido,
            price: producto.price,
            description: descripcionTraducida,
            category: producto.category,
            image: producto.image,
            rating: producto.rating
          };

          productosTraducidos.push(productoTraducido);
 
          if (index === productos.length - 1) {
            callback(productosTraducidos);
          }
        });
      });
    });
  });
};

 
let html = cabecera;
html += inicioContenedor;
html += modal;
app.get("/", (req, res) => {
    getProductosTraducidos((productosTraducidos) => {
      
      
      html += "<div class='listado col-12 row'>";
      productosTraducidos.forEach((producto) => {
  
        var endescuento = producto.category =="electronics" ? true : false;
        var precioProducto = producto.price;
        if(endescuento) {precioProducto = precioProducto - (precioProducto * (10 / 100));}
        else{
          producto.price ;
        }

        
        html += `
                    <div class='col-lg-3 col-md-3 col-sm-12'>
                    <div class="card" style='padding : 2%; margin-bottom:2%; height:400px;'>
                    <img class="card-img-top img-fluid" src="${producto.image}" alt="Card image">
                    <div class="card-body" style="padding:0!important">
                      <h6 class="card-title">${producto.title}</h6>
                      <p class="card-text truncate-text">${producto.description}</p> 
                      <p>Categoría:  ${producto.category} </p>
                      <div class="d-flex justify-content-between align-items-end">
                      <span class="btn btn-warning">$${precioProducto}</span>
                      ${endescuento ? "<span class='btn btn-danger'>10% off! </span>" : ""}
                      
                      <button 
                        class="btn btn-info agregarCarrito" 
                        style="width: 100px!important;" 
                        productId="${producto.id}"
                        productnombre="${producto.title}"
                        productPrice ="${precioProducto }"
                 
                        id="agregar${producto.id}"
                         >Al carrito!</button>
                        </div>
                      </div>
                  </div>
                        
                    </div>
                 `;
      });
      html += "</div>";
      html += finContenedor;
      html += fin;
      html += funcionalidad;
       
      res.send(html);
    });
  });

  app.get("/carrito",   (req, res) => {
     var content = cabecera;
     content += inicioContenedor;
    content+=`<div class="card-body">
    <div class="table-responsive">
      <table class="table table-bordered m-0">
        <thead>
          <tr>
         
            <th class="text-center py-3 px-4" style="min-width: 400px;">Product Name &amp; Details</th>
            <th class="text-right py-3 px-4" style="width: 100px;">Price</th>
            
            <th class="text-center align-middle py-3 px-0" style="width: 40px;"><a href="#" class="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i class="ino ion-md-trash"></i></a></th>
          </tr>
        </thead>
        <tbody>`;


        //borrar esta logica
        var product ={
            title : "test",
            price: "12"
        }
        for (let index = 0; index < 12; index++) {
          
            content +=`<tr>
            <td class="p-4">
              <div class="media align-items-center">
                <img src="${product.image}" class="d-block ui-w-40 ui-bordered mr-4" alt="">
                <div class="media-body">
                  <a   class="d-block text-dark">${product.title}</a>
                   
                </div>
              </div>
            </td>
            <td class="text-right font-weight-semibold align-middle p-4">$${product.price}</td>

            <td class="text-center align-middle px-0"><a href="#" class="shop-tooltip close float-none text-danger" title="" data-original-title="Remove">×</a></td>
          </tr>`;
        }

        content+=`</tbody>
        </table>
      </div>
      <button class="btn btn-success"  ">Comprar!</button> `;

     content +=finContenedor;
     content += fin;
     res.send(content);
  });

}
catch(error){
  console.error(" Intente nuevamente");
}
module.exports = app;
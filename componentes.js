const cabecera = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<style>
.truncate-text {
    white-space: nowrap;  
    overflow: hidden;  
    text-overflow: ellipsis; 
}



   .col-10 h1{
    
   }
        
.card-img-top{
    width:150px;
    height:150px;
    
}
.boton-redondo {
    width: 50px;
    height: 50px;
    border: 2px solid #000;  
    border-radius: 50%; 
    background-color: #fff;  
    cursor: pointer;
    outline: none; 
  }
  
  .boton-redondo i {
    font-size: 24px; 
    color: #000; 
    line-height: 50px; 
  }
  
 
.ui-w-40 {
    width: 40px !important;
    height: auto;
}

.card{
    box-shadow: 0 5px 10px #000;
    background: linear-gradient(transparent 80%, #000), var(--i);   
}
.boton-icono {
    font-size: 24px;
    border: none; 
    cursor: pointer;
    outline: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    transform: scale(.5);
}.carroRow{
    border: #dbd1d1 1px solid;
}
#divCarro{
    -webkit-box-shadow: 0px -1px 39px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -1px 39px 0px rgba(0,0,0,0.75);
    box-shadow: 0px -1px 39px 0px rgba(0,0,0,0.75);
    width: 650px;
    max-height: 500px; 
    position: absolute;
    z-index: 1000;
    top: 8%;
    right: 9%;
    overflow-y:scroll;
    border-radius: 3%;
    display:none;
    background: white;
    max-height: 600px;
}
.btn-danger {
position: absolute;
top: 0;
right: 0;
</style>
}

`;
const inicioContenedor = ` <div class="container">
<div class="row">
    <div class="col-10">
        <h1 style="text-align: center;">La tienda de Caro</h1>
    </div>
    <div class="col-2">
    <button class="boton-redondo" onclick="abrirCarro(this)">
    <i class="fas fa-shopping-cart"></i>
  </button>
    </div>
</div>
<div class="row">`;

const finContenedor = `</div>
</div>`;
const fin = `
</body>
</html> `;

const modal =` <div id="divCarro" class="container-fluid" style=" text-align: center;"><h4 class="text-muted" style="height: 250px;">Carrito vacío</h4></div>`;
 
const funcionalidad = ` <script>
$(()=>{
    
    if(localStorage.getItem("carro")){
        var datos = JSON.parse(localStorage.getItem("carro"));
        var ids =  datos.map(objeto => objeto.id);
        
        rellenarCarrito(datos);

        ids.map(id =>{
          $("#agregar"+id).attr("disabled", "disabled");
          $("#agregar"+id).css({"background":  "pink", "color": "black", "border": "1px solid red"});
          $("#agregar"+id).html("En el carrito");
        })
    }
     
    
  });

  $(".agregarCarrito").on("click", function(){
    var precio = $(this).attr("productPrice");
    var titulo = $(this).attr("productNombre");
    var productoId = $(this).attr("productId");
    var nuevoItem = {
        price : precio,
        title : titulo,
        id : productoId,
        cant : 1
    };

    var productosAgregados = localStorage.getItem("carro")? JSON.parse(localStorage.getItem("carro")) : []; 
    
    productosAgregados.push(nuevoItem); 

    var objetosString = JSON.stringify(productosAgregados); 

    localStorage.setItem("carro", objetosString);

    $(this).css({"background":"pink", color:"black", "border": "1px solid red"});
    $(this).html("En el carrito");
 
    $(this).attr("disabled", "disabled");
    var datos = JSON.parse(localStorage.getItem("carro"));
    rellenarCarrito(datos);
  });

function abrirCarro(button){

    if($(button).hasClass("desplegado")){
        $("#divCarro").css("display" , "none");
        $(button).removeClass("desplegado");
        $(button).css("background", "white");
    }else{
        $("#divCarro").css("display" , "block");
        $(button).addClass("desplegado");
        $(button).css("background", "yellow");


    }

}

const rellenarCarrito = (data) =>{

    if(data.length  === 0 ){
        
           return false;
    }

   
    var contenido ='<div class="row">'+
                    '<div class="col-5" style="text-align:center; font-weight:bold">Artículo</div>'+
                    '<div class="col-1" style="text-align:center; font-weight:bold">Precio</div>'+ 
                    '<div class="col-1" style="text-align:center; font-weight:bold">Cant.</div>'+ 
                    '<div class="col-2" style="text-align:center; font-weight:bold">Subtotal</div>'+ 
                    '<div class="col-3" style="text-align:center; font-weight:bold">Acciones</div>'+
                    '</div>';

     let i = 0;

    data.map(p =>{
         let bg ;
         var mas = "mas";
         var menos = "menos";
         var quitar = "quitar";
          (i % 2 === 0)  ? bg = "antiquewhite" : bg = "aliceblue;";
        
          contenido +=
          '<div class="row carroRow" style="background: ' + bg + ';" id="itemCarro' + p.id + '">' +
          '<div class="col-5" style="text-align:justify; display:flex;">' +
          '<label style="align-self:center;">' + p.title + '</label>' +
          '</div>' +
          '<div class="col-1" style="text-align:justify; display:flex;">' +
          '<label style="align-self:center;">$<span id="price'+p.id+'">' + p.price + '</span></label>' +
          '</div>' +
          '<div class="col-1" style="display:flex;" id="par_cant' + p.id + '"><label id="cant_'+p.id+'" style="align-self: center;">'+ p.cant+'</label></div>' +
          '<div class="col-2" style="display:flex;"><label  style="align-self: center;">$<span class="subtotales" pid="' + p.id + '" id="sub_'+p.id+'"></span> </label></div>' +
          '<div class="col-1"><button id="boton-mas" accion="mas" onclick="acciones(' + p.id + ', this);" class="boton-icono" style="background:green;">' +
          '<i class="fas fa-plus" style="color:white"></i></button></div>' +
          '<div class="col-1"><button id="boton-menos" accion="menos" onclick="acciones(' + p.id + ', this);" class="boton-icono"  style="background:orange;">' +
          '<i class="fas fa-minus" style="color:white"></i></button></div>' +
          '<div class="col-1"><button id="boton-x" accion="quitar" onclick="acciones(' + p.id + ', this);" class="boton-icono"  style="background:red;">' +
          '<i style="color:white" class="fas fa-times"></i></button></div>' +
          '</div>';
      i++;
    });

    contenido += '<div class="row" style="height:100px;">'+
                    '<div class="col-9" style="font-weight:bold;">Total:'+
                    '</div>'+
                    '<div class="col-3" style="font-weight:bold;">$ <span id="total"></span>'+
                    '</div>'+
                    '<div class="col-12"><button class="form-control" onclick="pagar();">Pagar!</button></div>'+
                    '</div>';

    $("#divCarro").html(contenido);

    mostrarSubtotales();
    
}

function mostrarSubtotales(){


    var casillas = $(".subtotales");
 
    if(casillas.length == 0) return false;
     var total = 0;
    for(i=0; i< casillas.length; i++){
        pid = $(casillas[i]).attr("pid");
     
        let cant = parseInt($("#cant_" + pid).html()); 
        let valor = parseFloat($("#price" + pid).html());
        console.log(valor);
        let subtotal = cant * valor;
        $(casillas[i]).html(subtotal.toFixed(2));

        total += subtotal;
    }
    $("#total").html(total.toFixed(2));
}

function acciones(producto, boton) {
 
    var accion = $(boton).attr("accion");
    var productosAgregados = localStorage.getItem("carro") ? JSON.parse(localStorage.getItem("carro")) : [];

    var indiceProducto = productosAgregados.findIndex(item => item.id == producto);
   
    if (indiceProducto !== -1) {  
        if (accion === "mas") {
            
             
         
            productosAgregados[indiceProducto].cant++;
          
        
        } else if (accion === "menos") {
            if (productosAgregados[indiceProducto].cant > 1) {
                productosAgregados[indiceProducto].cant--;
               
            }
        } else if (accion === "quitar") {
            productosAgregados.splice(indiceProducto, 1);
            $("#itemCarro" + producto).remove();

        } 


        localStorage.setItem("carro", JSON.stringify(productosAgregados));

         rellenarCarrito(productosAgregados);
    }
}


const pagar = () =>{
    alert("pagado!");
    localStorage.setItem("carro", []);
    location.reload();
}
</script>`;

module.exports = {modal, funcionalidad, cabecera, fin, inicioContenedor, finContenedor}
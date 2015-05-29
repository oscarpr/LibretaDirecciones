var map;
var longitud;
var latitud;

$("#submit").click(function () {    
    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
        var persona2 = { 
            'nombre': $("#nombre").val(), 
            'telefono': $("#telefono").val(), 
            'email': $("#email").val(),
            'id' : localStorage.clickcount,
            'domicilio': longitud + "," + latitud
        };
        localStorage.setItem("persona"+localStorage.clickcount, JSON.stringify(persona2));        
    } else {
        localStorage.clickcount = 1;
        var persona1 = { 
            'nombre': $("#nombre").val(), 
            'telefono': $("#telefono").val(), 
            'email': $("#email").val(),
            'id' : localStorage.clickcount,
            'domicilio': longitud + "," + latitud
        };
        localStorage.setItem("persona1", JSON.stringify(persona1));        
    }
    var cuerpoTabla = $("#personas").find("tbody");
    cuerpoTabla.empty();
    for(var i = 1; i<localStorage.length; i++){
        var item = JSON.parse(localStorage.getItem("persona"+i));
        strId = item.id;
        strNombre = item.nombre;
        strTelefono = item.telefono;
        strEmail = item.email;
        strDomicilio = item.domicilio;
        var cadena = "<tr>";
        cadena = cadena + "<td>" + strId + "</td>";
        cadena = cadena + "<td>" + strNombre + "</td>";
        cadena = cadena + "<td>" + strTelefono + "</td>";
        cadena = cadena + "<td>" + strEmail + "</td>";
        cadena = cadena + "<td>" + strDomicilio + "</td>";
        cuerpoTabla.append(cadena);
    }    
});

$(document).ready(function (){
    alert("HolaMundo")
    localizame();
    var cuerpoTabla = $("#personas").find("tbody");
    cuerpoTabla.empty();
    for(var i = 1; i<localStorage.length; i++){
        var item = JSON.parse(localStorage.getItem("persona"+i));
        strId = item.id;
        strNombre = item.nombre;
        strTelefono = item.telefono;
        strEmail = item.email;
        strDomicilio = item.domicilio;
        var cadena = "<tr>";
        cadena = cadena + "<td>" + strId + "</td>";
        cadena = cadena + "<td>" + strNombre + "</td>";
        cadena = cadena + "<td>" + strTelefono + "</td>";
        cadena = cadena + "<td>" + strEmail + "</td>";
        cadena = cadena + "<td>" + strDomicilio + "</td>";        
        cadena = cadena + "<td><a class='eliminar'>Eliminar</a></td>";
        cuerpoTabla.append(cadena);
    }
});

 function localizame() {
if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(coordenadas, errores);
    }else{
        alert("Tu navegador no soporta geolocalización.");
    }
}

function coordenadas(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    cargarMapa();
}

function errores(err) {
    /*Controlamos los posibles errores */
    if (err.code == 0) {
      alert("Algo ha salido mal");
    }
    if (err.code == 1) {
      alert("No permites compartir tu posicion");
    }
    if (err.code == 2) {
      alert("No se logró encontrar la posicion actual");
    }
    if (err.code == 3) {
      alert("Se ha superado el tiempo de espera");
    }
}

function cargarMapa() {
    var latlon = new google.maps.LatLng(latitud,longitud); /* Creamos un punto con nuestras coordenadas */
    var myOptions = {
        zoom: 17,
        center: latlon, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($("#map_canvas").get(0), myOptions); 

    var coorMarcador = new google.maps.LatLng(latitud,longitud); 

    var marcador = new google.maps.Marker({
        position: coorMarcador,
        map: map,
        title: "Dónde estoy?" 
    });
}
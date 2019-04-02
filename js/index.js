/*
traer imagenes
https://api.themoviedb.org/3/movie/157336/images?api_key=d2f75c50a366b48f468d9a270511e992

http://image.tmdb.org/t/p/w185/ + ruta
doc:https://developers.themoviedb.org/3/getting-started/images
examples:https://www.themoviedb.org/documentation/api/discover?language=es-ES
*/

/*
inicializar Jqery


*/

$(document).ready(function(){
    console.log('jquery inicializado')
})

const URL_API = "https://api.themoviedb.org/3/movie/550?"
const API_KEY = "api_key=d2f75c50a366b48f468d9a270511e992"
const IMG_URL = "http://image.tmdb.org/t/p/original/"


const URL_MOVIES_POPULARES ="https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc"
const CLASE_CAROUSEL = "carousel-item"

function getData(url){
    return new Promise(function(resolve,reject){
        var xhttp =  new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState==4){
                if(this.status==200){
                    resolve(JSON.parse(this.responseText))
                }else{
                    reject(`Error ${this.status}`)
                }
            }
        }
        xhttp.open('GET',url,true)
        xhttp.send()
    })
}

async function enviarPromesas(){
    var arrUrl = obtenerArrayUrl()
    var promesas = arrUrl.map(function(url){
        return getData(url)
    })

    var datos = await Promise.all(promesas)
    datos.forEach(movie => {
        mostrarPersonaje(movie)
    });
    console.log(datos)
}

function obtenerArrayUrl(){
    var vector = []
    for (let index = 0; index <= 5; index++) {
         vector.push(URL_API+API_KEY)
    }
    return vector
}
function mostrarPersonaje(movie){
    document.getElementById('contenedor').innerHTML += `
    <div class="col-md rowPlus">
    <div class="card" style="width: 18rem;">
        <img src=${ IMG_URL+ movie.poster_path} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${movie.original_title}</h5>
                <p class="card-text">${movie.overview}</p>
            </div>
        </div>
    </div>
    `
}





/*
Consultar las peliculas mas populares
https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc

*/


function peliculasPopulares() {
   getData(URL_MOVIES_POPULARES).then(recorrerArrayPeliculasPopulares).catch()
}

function recorrerArrayPeliculasPopulares(vector){
    vector.results.forEach((movie,index) => { 
        console.log(index)
       if(index===1){
        document.getElementById('lista-carousel').innerHTML +=`
        <div class="carousel-item active">
            <img src=${IMG_URL+ movie.poster_path} class="d-block w-100" alt="...">
            <div class="container overlay text-center">
                <h1>${movie.original_title}</h1>
                
            </div>
        </div>`
       }else if(index>1){
        document.getElementById('lista-carousel').innerHTML +=`
        <div class="carousel-item">
            <img src=${IMG_URL+ movie.poster_path} class="d-block w-100" alt="...">
            <div class="container overlay text-center">
                <h1>${movie.original_title}</h1>
                
            </div>
        </div>
        `
       } 
       document.getElementById('lita-peliculas-populares').innerHTML +=`
        <div id="col-peliculas-populares" class="col-6 mt-4">
            <div class="card mb-3" >
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${IMG_URL+ movie.poster_path}  class="card-img" alt="...">
                    </div>
                    <div class="col-md-8" >
                        <div class="card-body" >
                            <h5 class="card-title">${movie.original_title}</h5>
                            <p id="parrafo"class="card-text">${movie.overview}</p>
                            <small class="card-text"><small class="text-muted">${movie.release_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `     
    });
}



function nombre(n){
console.log(n)
}

peliculasPopulares()


/*
Uso de jquery para ocultar el (main) que tiene las peliculas populares
para que se pueda hacer una busqueda

*/

$('#btnBuscarTituloMovie').click(function(){
    $('#peliculasPopulares').hide('slow');
    //hacer consulta a la API
    getData(URL_API+API_KEY).then(mostrarPelicula)
})

function mostrarPelicula(movie){
    document.getElementById('peliculaConsultada').innerHTML +=`
    <div class="container">
            <div class="row">
                <div class="col text-center text-uppercase">
                    <h2>Resultado</h2>
                </div>
            </div>
    </div>
    <div class="col-6 offset-md-3 mt-4">
        <div class="card mb-3" >
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src=${IMG_URL+ movie.poster_path}  class="card-img" alt="...">
                </div>
                <div class="col-md-8" >
                    <div class="card-body" >
                        <h5 class="card-title">${movie.original_title}</h5>
                        <p id="parrafo"class="card-text">${movie.overview}</p>
                        <small class="card-text"><small class="text-muted">${movie.release_date}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `     
}
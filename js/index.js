/*
*/

$(document).ready(function(){
    console.log('jquery inicializado')
})

const URL_API = "https://api.themoviedb.org/3/movie/550?"
const API_KEY = "api_key=d2f75c50a366b48f468d9a270511e992"
const IMG_URL = "http://image.tmdb.org/t/p/original/"
const URL_QUERY_MOVIE = "https://api.themoviedb.org/3/search/movie?api_key=d2f75c50a366b48f468d9a270511e992&query="
const URL_MOVIES_POPULARES ="https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc"

function peliculasPopulares() {
   getData(URL_MOVIES_POPULARES).then(recorrerArrayPeliculasPopulares).catch()
}

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

function recorrerArrayPeliculasPopulares(vector){
    vector.results.forEach((movie,index) => { 
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

peliculasPopulares()


/*
Uso de jquery para ocultar el (main) que tiene las peliculas populares
para que se pueda hacer una busqueda Por nombre de pelicula

*/

$('#btnBuscarTituloMovie').click(function(){
    $('#peliculasPopulares').hide('slow');
    var nombrePelicula = $('#inputTituloMovie').val()
    getData(URL_QUERY_MOVIE+nombrePelicula,nombrePelicula).then(recorrerArrayPeliculaConsultada)
})

function recorrerArrayPeliculaConsultada(vector){
    $('#peliculaConsultada').html(` 
    <div class="container">
        <div class="row">
            <div class="col text-center text-uppercase">
                <small> Peliculas</small>
                <h2> Relacionadas</h2>
            </div>
        </div>
    </div>`) 
   
    vector.results.forEach((movie,index) => { 
    document.getElementById('peliculaConsultada').innerHTML +=`
    <div class="col-6 mt-4">
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


//Mostrar peliculas Populares despues de haber estado ocultas

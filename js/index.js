$(document).ready(function(){
    console.log('jquery inicializado')
})
$('#buscarPorActor').hide('slow')

const URL_API = "https://api.themoviedb.org/3/movie/550?"
const API_KEY = "api_key=d2f75c50a366b48f468d9a270511e992"
const IMG_URL = "http://image.tmdb.org/t/p/original/"
const URL_QUERY_MOVIE = "https://api.themoviedb.org/3/search/movie?api_key=d2f75c50a366b48f468d9a270511e992&query="
const URL_MOVIES_POPULARES ="https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc"
const URL_GENEROS = "https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc&with_genres=18"//"https://api.themoviedb.org/3/genre/movie/list?api_key=d2f75c50a366b48f468d9a270511e992&language=en-US"
const GENEROS= [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
const URL_ACTOR = "https://api.themoviedb.org/3/search/person?api_key=d2f75c50a366b48f468d9a270511e992&query="
var arrPeliculasPopulares
function peliculasPopulares() {
    getData(URL_MOVIES_POPULARES).then(recorrerArrayPeliculasPopulares)
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
    arrPeliculasPopulares = vector
    vector.results.forEach((movie,index) => { 
        if(index===1){
        document.getElementById('lista-carousel').innerHTML +=`
        <div class="carousel-item active">
            <img src=${IMG_URL+ movie.poster_path} class="d-block w-100" alt="...">
            <div class="container overlay text-center">
                
                
            </div>
        </div>`
       }else if(index>1){
        document.getElementById('lista-carousel').innerHTML +=`
        <div class="carousel-item">
            <img src=${IMG_URL+ movie.poster_path} class="d-block w-100" alt="...">
            <div class="container overlay text-center">
                
                
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
                            <p id="parrafo" class="card-text">${movie.overview}</p>
                            <p id="parrafo" class="card-text">${movie.popularity}</p>
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
    $('#main').hide('slow')
    $('#peliculasPopulares').hide('slow');
    $('#buscarPorActor').hide('slow')
    $('#peliculaConsultada').show()
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

$('#hrefPeliculasPopulares').click(function(){
    $('#inputTituloMovie').val('') 
    $('#main').show('slow')
    $('#peliculasPopulares').show('slow');
    $('#buscarPorActor').hide('slow')
    $('#peliculaConsultada').empty()
    $('#peliculaConsultada').show()
    
})



// 2. FUNCION DE ORDENAR DE LA MAS RECIENTE A LA MAS ANTIGUA DE LAS PELICULAS

$('#ordenarMasMenosReciente').click(function(){
    $('#inputOrdenar').val('De mas a menos reciente')
    ordenarMasMenosReciente(arrPeliculasPopulares.results,'mayor')
})

$('#ordenarMenosMasReciente').click(function(){
    $('#inputOrdenar').val('De menos a mas reciente')
    ordenarMasMenosReciente(arrPeliculasPopulares.results,'menor')
})


function ordenarMasMenosReciente(vector,tipo){
    console.log('vector de fechas')
    
   for (let i = 0; i < vector.length-1; i++) {
       for (let j = 0; j < vector.length-1; j++) {
           if(converFechaAMili(vector[j].release_date) < converFechaAMili(vector[j+1].release_date)){
               let temp = vector[j+1]
               vector[j+1] = vector[j]
               vector[j] = temp
           }
       }
   }

   $('#lita-peliculas-populares').empty()

   if(tipo==='mayor'){
    for (let index = 0; index < vector.length; index++) {
        document.getElementById('lita-peliculas-populares').innerHTML +=`
        <div id="col-peliculas-populares" class="col-6 mt-4">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${IMG_URL+ vector[index].poster_path}  class="card-img" alt="...">
                    </div>
                    <div class="col-md-8" >
                        <div class="card-body" >
                            <h5 class="card-title">${vector[index].original_title}</h5>
                            <p id="parrafo"class="card-text">${vector[index].overview}</p>
                            <p id="parrafo" class="card-text">${vector[index].popularity}</p>
                            <small class="card-text"><small class="text-muted">${vector[index].release_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `            
    }

   }else{
    for (let index = vector.length-1; index >= 0; index--) {
        document.getElementById('lita-peliculas-populares').innerHTML +=`
        <div id="col-peliculas-populares" class="col-6 mt-4">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${IMG_URL+ vector[index].poster_path}  class="card-img" alt="...">
                    </div>
                    <div class="col-md-8" >
                        <div class="card-body" >
                            <h5 class="card-title">${vector[index].original_title}</h5>
                            <p id="parrafo"class="card-text">${vector[index].overview}</p>
                            <p id="parrafo" class="card-text">${vector[index].popularity}</p>
                            <small class="card-text"><small class="text-muted">${vector[index].release_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `     
    }
   }
   
   
}


function converFechaAMili(cadena){
    let arrfecha = String(cadena).split('-')
    return new Date(arrfecha[0],arrfecha[1],arrfecha[2])
}
// 3. MOSTRAR SEGUN EL PUNTAJE LAS MEJORES PELICULAS

$('#ordenarMayorMenorPopularidad').click(function(){
    $('#inputOrdenar').val('De mayor a menor popularidad')
    ordenarSegunPopularidad(arrPeliculasPopulares.results,'mayor')
})
$('#ordenarMenorMayorPopularidad').click(function(){
    $('#inputOrdenar').val('De menor a mayor popularidad')
    ordenarSegunPopularidad(arrPeliculasPopulares.results,'menor')
})

function ordenarSegunPopularidad(vector,tipo){

   for (let i = 0; i < vector.length-1; i++) {
       for (let j = 0; j < vector.length-1; j++) {
           if(vector[j].popularity < vector[j+1].popularity){
               let temp = vector[j+1]
               vector[j+1] = vector[j]
               vector[j] = temp
           }
       }
   }
   console.log(vector.results)

   $('#lita-peliculas-populares').empty()

   if(tipo==='mayor'){
    for (let index = 0; index < vector.length; index++) {
        document.getElementById('lita-peliculas-populares').innerHTML +=`
        <div id="col-peliculas-populares" class="col-6 mt-4">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${IMG_URL+ vector[index].poster_path}  class="card-img" alt="...">
                    </div>
                    <div class="col-md-8" >
                        <div class="card-body" >
                            <h5 class="card-title">${vector[index].original_title}</h5>
                            <p id="parrafo"class="card-text">${vector[index].overview}</p>
                            <p id="parrafo"class="card-text">${vector[index].popularity}</p>
                            <small class="card-text"><small class="text-muted">${vector[index].release_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `            
    }

   }else{
    for (let index = vector.length-1; index >= 0; index--) {
        document.getElementById('lita-peliculas-populares').innerHTML +=`
        <div id="col-peliculas-populares" class="col-6 mt-4">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${IMG_URL+ vector[index].poster_path}  class="card-img" alt="...">
                    </div>
                    <div class="col-md-8" >
                        <div class="card-body" >
                            <h5 class="card-title">${vector[index].original_title}</h5>
                            <p id="parrafo"class="card-text">${vector[index].overview}</p>
                            <p id="parrafo"class="card-text">${vector[index].popularity}</p>
                            <small class="card-text"><small class="text-muted">${vector[index].release_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `     
    }
   }
   
   
}

// 4. BUSCAR POR ACTOR Y LUEGO SI UN ACTOR HA TRABAJADO CON OTRO
$('#hrefActores').click(function(){
    $('#main').hide('slow')
    $('#peliculasPopulares').hide('slow');
    $('#peliculaConsultada').hide('slow');
    $('#buscarPorActor').show('slow')
})
var arrPeliculasPorNombreActor
$('#btnBuscarPeliculaPorActor').click(function(){
    let nombreActor = $('#nombreActor').val()   
    arrPeliculasPorNombreActor = getData(URL_ACTOR+nombreActor).then(recorrerArrayActorDePelicula)
    $('#listadoDePeliculasDeUnActor').empty();
})


function recorrerArrayActorDePelicula(vector){
    arrPeliculasPorNombreActor = vector
    $('#peliculasDeActorConsultado').html(` 
    <div class="container">
        <div class="row">
            <div class="col text-center text-uppercase">
                <small> Peliculas</small>
                <h2> Relacionadas</h2>
            </div>
        </div>
    </div>`) 
   
    vector.results.forEach((actor,index) => { 
    document.getElementById('peliculasDeActorConsultado').innerHTML +=`
    <div class="col-3 mt-4" onclick="mostrarPeliculasDeUnActor(${index})">
        <div class="card mb-3" >
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src=${IMG_URL+ actor.profile_path}  class="card-img" alt="...">
                </div>
                <div class="col-md-8" >
                    <div class="card-body" >
                        <h5 class="card-title"> ${actor.name}</h5>
                        <p id="parrafo" class="card-text">Popularity:${actor.popularity}</p>
                        <p id="parrafo"class="card-text">Pleiculas:${actor.known_for.length}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `    
    return vector
    });
}

function mostrarPeliculasDeUnActor(index){
    $('#listadoDePeliculasDeUnActor').empty();
    var peliculasDeActor = arrPeliculasPorNombreActor.results[index]
   $('#nombreActor').val(`${peliculasDeActor.name}`)
    peliculasDeActor.known_for.forEach((movie,index) => { 
    document.getElementById('listadoDePeliculasDeUnActor').innerHTML +=`
    <div class="col-6 mt-4" ">
        <div class="card mb-3" >
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src=${IMG_URL+ movie.poster_path}  class="card-img" alt="...">
                </div>
                <div class="col-md-8" >
                    <div class="card-body" >
                        <h5 class="card-title"> ${movie.original_title}</h5>
                        <p id="parrafo" class="card-text">Popularity:${movie.popularity}</p>
                        <p id="parrafo"class="card-text">Pleiculas:${movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `    
})

}



// 5. Mostrar el detalle de cada pelicula


// 6. Buscar Por genero de pelicula


// Cada pelicula debe mostrar su genero y al dar click llevarnos a la lista de pelis de esa categoria



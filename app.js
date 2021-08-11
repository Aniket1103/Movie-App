const API_key = 'api_key=ad02540ecbc53eb6d120d267cbd9493b';
const baseUrl = 'https://api.themoviedb.org/3';
const APIUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&' + API_key;
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.querySelector("#search");
const searchUrl = baseUrl + '/search/movie?' + API_key;

getMovies(APIUrl);

function getMovies(url){
  fetch(url)
    .then(response => response.json())
    .then(data =>{

      showMovies(data.results);
      console.log(data.results);
    })
}

function showMovies(data){
  main.innerHTML = '';

  data.forEach(movie =>{
    const {title, poster_path, backdrop_path, vote_average, overview} = movie;
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
    <img src="${imgUrl+poster_path}" alt="${title}" class="movie-img">

    <div class="movie-head">
      <h3 class="movie-name">
        ${title}
      </h3>
      <span class="rating ${getColor(vote_average)}">
        ${vote_average}
      </span>
    </div>

    <div class="movie-info">
      <h4 class="overview">Overview</h4>
      ${overview}
    </div>
  </div>
    
    `

    main.appendChild(movieCard);

  })
}

function getColor(rating){
  if(rating >= 8){
    return 'green';
  }
  else if(rating >= 5){
    return 'orange';
  }
  else{
    return 'red';
  }
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm){
    getMovies(searchUrl + "&query=" +searchTerm);
  }
})
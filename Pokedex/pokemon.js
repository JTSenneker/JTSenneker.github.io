const MAX_POKEMON = 1008;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemon = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}&offset=0`)
.then((response) => response.json())
.then((data) =>{
    allPokemon = data.results;
    displayPokemon(allPokemon);
})

async function fetchPokemonDataBeforeRedirect(id){
    try{
        const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) =>res.json()),
    ffetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) =>res.json())
])
return true
    } catch(error){
        console.error("Failed to fetch pokemon data before redirect");
    }
}

function displayPokemon(pokemon){
    listWrapper.innerHTML = "";

    pokemon.forEach((pokemon)=>{
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "list-item";

        var imgURL = "./assets/Pokemon/Pokemon_"+pokemonID+".png";

        
        listItem.innerHTML = `
            <div class="number-wrap">
                <p class="caption-fonts">#${pokemonID}</p>
            </div>
            <div class="image-wrap">
                <img src="${imgURL}" onerror='this.src= "./assets/Pokemon/error.png"; console.clear();' alt="${pokemon.name}" class="pokemon-image">
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">${pokemon.name}</p>
            </div>
        `;

        listWrapper.appendChild(listItem);
        
    })
}

function checkImage(url,callback){
    const img = new Image();
    img.onload = () =>{
        callback(true);
    };
    img.onerror = () =>{
        callback(false);
    };
    img.src = url;
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch(){
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPokemon;

   if(nameFilter.checked){
        filteredPokemon = allPokemon.filter((pokemon)=>
            pokemon.name.toLowerCase().startsWith(searchTerm)
        );
    }else{
        filteredPokemon = allPokemon;
    }

    displayPokemon(filteredPokemon);

    if(filteredPokemon.length === 0){
        notFoundMessage.style.display = "block";
    }else{
        notFoundMessage.style.display = "none";
    }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch(){
    searchInput.value = "";
    displayPokemon(allPokemon);
    notFoundMessage.style.display = "none";
}
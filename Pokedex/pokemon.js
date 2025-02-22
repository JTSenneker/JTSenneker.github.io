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
        listItem.innerHTML = `
            <div class="number-wrap">
                <p class="caption-fonts">#${pokemonID}</p>
            </div>
            <div class="image-wrap">
                <img src="./assets/Pokemon/Pokemon_${pokemonID}.png" alt="${pokemon.name}" class="pokemon-image">
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">${pokemon.name}</p>
            </div>
        `;

        /*listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success){
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });*/

        listWrapper.appendChild(listItem);
    })
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
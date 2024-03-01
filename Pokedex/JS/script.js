const numPokemons = 150

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

async function contagemPokemons() {
    const pokeContainer = document.getElementById("pokeContainer")
    for (let i = 1; i <= numPokemons; i++) {
        await pokemon(pokeContainer, i);
    }
    pokemonTypes()
}

function primeiraLetraMaiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

async function pokemon(pokeContainer, id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url);
    const data = await resp.json();

    const divPokemon = document.createElement("div");
    divPokemon.classList.add("pokemon");
    pokeContainer.appendChild(divPokemon);

    const divImgContainer = document.createElement("div");
    divImgContainer.classList.add("imgContainer");
    divPokemon.appendChild(divImgContainer);

    const imgTag = document.createElement("img");
    imgTag.src = data.sprites.front_default;
    divImgContainer.appendChild(imgTag);

    const divInfo = document.createElement("div");
    const spanNumber = document.createElement("span");
    const h3Name = document.createElement("h3");
    const smallType = document.createElement("small");
    const spanType = document.createElement("span");

    divInfo.classList.add("info");
    spanNumber.classList.add("number");
    h3Name.classList.add("name");
    smallType.classList.add("type");
    spanType.classList.add("typeColor")

    divInfo.appendChild(spanNumber)
    divInfo.appendChild(h3Name)
    divInfo.appendChild(smallType)
    smallType.appendChild(document.createTextNode("Type: "));
    smallType.appendChild(spanType)
    divPokemon.appendChild(divInfo)

    const pokeTypes = data.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];
    spanType.style.backgroundColor = color;

    spanNumber.textContent = `# ${data.id}`
    h3Name.textContent = primeiraLetraMaiuscula(data.name);
    spanType.textContent = `${primeiraLetraMaiuscula(data.types[0].type.name)}`

}

function pokemonTypes(){ 
    const pokeTypeElement = document.getElementsByClassName("typeColor")
    const pokeTypes = Array.from(pokeTypeElement).map(element => element.textContent);
    console.log(pokeTypes);
    
}

contagemPokemons();




const url = "https://rickandmortyapi.com/api/character"

const characterId = document.querySelector("#characterId")
const btn = document.querySelector("#btn")
const content = document.querySelector(".content")
const img = document.querySelector("#img")

async function fetchApi(id) {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    return data
}

btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const name = document.createElement("h2")
    const status = document.createElement("p")
    const img = document.createElement("img")


    if (characterId.value > 0 && characterId.value <= 550) {
        event.preventDefault();
        const res = await fetchApi(characterId.value)
        img.src = res.image
        name.textContent = `${res.name}`;
        status.textContent = `Status: ${res.status}`;

        content.innerHTML = "";

        content.appendChild(name)
        content.appendChild(status)
        content.appendChild(img)

    } else{
        
        const error = document.createElement("h2")
        error.textContent = "Personagem Inexistente"
        content.innerHTML = "";
        content.appendChild(error)
    }

})

fetchApi()
const url = "https://jsonplaceholder.typicode.com/posts";

//Pagina principal
const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

//Procura do ID
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id")

//Pagina de posts
const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const comentContainer = document.querySelector("#coments-container")

const commentForm = document.querySelector("#comment-form")
const emailInput = document.querySelector("#email")
const bodyInput = document.querySelector("#body")

//Função da pagina principal
async function getAllPosts(){
    const res = await fetch(url)
    const data = await res.json()

    loadingElement.classList.add("hide")

    data.map((post) => {
        const divPosts = document.createElement("div")
        const titlePosts = document.createElement("h2")
        const bodyPosts = document.createElement("p")
        const linkPosts = document.createElement("a")

        titlePosts.innerText = post.title;
        bodyPosts.innerText = post.body;
        linkPosts.innerText = "Ler";
        linkPosts.setAttribute("href", `/post.html?id=${post.id}`)

        divPosts.appendChild(titlePosts);
        divPosts.appendChild(bodyPosts);
        divPosts.appendChild(linkPosts);

        postsContainer.appendChild(divPosts)
    })
}

//Função da pagina de posts
async function getPost(id){
    const responsePost = await fetch(`${url}/${id}`)
    const responseComments = await fetch(`${url}/${id}/comments`)
    const dataPost = await responsePost.json()
    const dataComments = await responseComments.json()

    loadingElement.classList.add("hide")
    postPage.classList.remove("hide")

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPost.title;
    body.innerText = dataPost.body;

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComments.map((comment) => {
        createComment(comment);
        
    })
}

function createComment(comment){
    const div = document.createElement("div")
    const email = document.createElement("h3")
    const body = document.createElement("p")

    email.innerText = comment.email
    body.innerText = comment.body


    div.appendChild(email)
    div.appendChild(body)
    comentContainer.appendChild(div)
}

//Function post comment

async function postComment(comment){

    const response = await fetch(`${url}/${postId}/comments`,{
        method: "POST",
        body: comment,
        headers: {
            "content-type": "application/json",
        },
    });

    const data = await response.json()
    createComment(data)
}

if(!postId){
    getAllPosts()
} else {
    getPost(postId)
    
    //Add comment
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        };

        comment = JSON.stringify(comment)

        postComment(comment)
    })
}

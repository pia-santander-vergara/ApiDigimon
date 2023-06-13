const API_URL = "https://digimon-api.vercel.app/api/digimon";
let digimons = [];

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultContainer = document.getElementById('results-container');
const showAllButton = document.getElementById('show-all-button');
const home = document.getElementById('home');
const digimonList = document.getElementById('digimon-list');

async function renderDigimon(digimons){
    digimonList.innerHTML = "";

    await digimons.forEach((digimon) => {
        let digiCard = `
            <div class="card m-2 col-lg-3 col-md-4 col-sm-6 col-12">
            <img class="card-img-top" src="${digimon.img}"/>
                <div class="card-body">
                    <h5 class="card-tittle">
                        ${digimon.name}
                    </h5>
                    <p class="card-text">
                        ${digimon.level}
                    </p>
                </div>
        `;

        resultContainer.innerHTML = "";
        digimonList.innerHTML += digiCard;
    });
}

async function getDigimons() {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        digimons = data;
        return digimons;
    } catch (error) {
        console.error(error);
    }
}

showAllButton.addEventListener("click", async () => {
    const loader = document.getElementById("loader");
    loader.classList.remove("d-none");

    const digimons = await getDigimons();
    renderDigimon(digimons);

    loader.classList.add("d-none");
});

home.addEventListener("click", () => {
    location.reload();
});

form.addEventListener('submit', event =>{
    event.preventDefault();

    const query = input.value;

    fetch(API_URL + `/name/${query}`)
        .then((response) => response.json())
        .then((data) => {
            const searchCard = `
                <div class="text-center">Su Digimon es: </div>
                <div class="d-flex justify-content-center">
                    <div class="card m-2 col-lg-3 col-md-4 col-sm-6 col-12">
                        <img class="card-img-top img-fluid" src="${data[0].img}"/>
                        <div class="card-body">
                            <h5 class="card-title">${data[0].name}</h5>
                            <p class="card-text">${data[0].level}</p>
                        </div>
                    </div>
                </div>
            `;

            digimonList.innerHTML = "";
            resultContainer.innerHTML = searchCard;
        })
        .catch((e) => {
            const errorMsg = `
                <div class="text-center">
                    No encontrado
                </div>
            `;
        
            digimonList.innerHTML = "";
            resultContainer.innerHTML = errorMsg;
        });

    form.reset();
});
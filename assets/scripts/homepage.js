const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjUxYWY0YmQ0NzAwMTU4NWIxZGYiLCJpYXQiOjE3NjI1MDYwMTAsImV4cCI6MTc2MzcxNTYxMH0._g0AHG_64pdYaiGxD1kwyYlRHjRN_Now3NSzP6PTOz0"

const urlAPI = 'https://striveschool-api.herokuapp.com/api/product/'

//RECUPERO I DATI DALL'API
const getGuitars = function(){
     
    //Recuperiamo gli oggetti dall'API
    fetch(urlAPI, {
        headers: {
            'Authorization': auth,},
    })
    .then((res) => {
        if(res.ok){
            console.log('Chitarre recuperate!')
            return res.json()
        } else {
            throw new Error(`${res}. Problema nel recupero dei dati.`)
        }
    })
    .then((listOfGuitars) =>{
        console.log('Lista dei prodotti', listOfGuitars)
        const guitarRow = document.getElementById('row-guitar-cards')

        listOfGuitars.forEach((guitar) => {
            guitarRow.innerHTML += `
                <div class="col">
                    <div class="card h-100 d-flex flex-column pt-0">
                    <a class="text-dark link-underline link-underline-opacity-0" href="./details.html?productId=${guitar._id}">
                        <img src="${guitar.imageUrl}" class="card-img-top my-2" alt="guitar-image" height="166px" >
                        <div class="card-body bg-dark-subtle row align-content-between m-0 p-0 pb-3">
                        <div class="card-body col align-content-between">
                        <h5 class="card-title mb-3">${guitar.name}</h5>
                        <p class="card-text">${guitar.description}</p> 
                        </div>
                        <div class="card-body>
                        <p class="card-text">${guitar.price},00 €</p>
                        <a href="./back-office.html?productId=${guitar._id}" class="btn btn-primary">Modifica</a>
                        </div>
                        </div>
                        </a
                    </div>
                </div>
            `
        })
    })
    .catch((err) => 
        console.log('Problema nel recupero dei prodotti', err))
}

getGuitars()




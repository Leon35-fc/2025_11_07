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
                <div class="card h-100 d-flex flex-column">
                <img src="${guitar.imageUrl}" class="card-img-top my-3" alt="guitar-image">
                <div class="card-body flex-grow-1">
                    <h5 class="card-title">${guitar.name}</h5>
                    <p class="card-text">${guitar.description}</p>
                    <p class="card-text">€${guitar.price},00</p>
                    <a href="./details.html?productId=${guitar._id}" class="btn btn-primary">Dettagli</a>
                    </div>
                </div>
                </div>
            `
        })
    })
    .catch((err) => 
        console.log('Problema nel recupero dei prodotti', err))
}

getGuitars()




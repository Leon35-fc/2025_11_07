const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjUxYWY0YmQ0NzAwMTU4NWIxZGYiLCJpYXQiOjE3NjI1MDYwMTAsImV4cCI6MTc2MzcxNTYxMH0._g0AHG_64pdYaiGxD1kwyYlRHjRN_Now3NSzP6PTOz0"

const urlAPI = 'https://striveschool-api.herokuapp.com/api/product/'

//Recupero l'ID prodotto dall'url
const url = location.search
const urlParameters = new URLSearchParams(url)
const id = urlParameters.get('productId')
console.log('ID', id)

//Modifico un oggetto nell'API
    fetch(urlAPI + "/" + id, {
        headers: {
            'Authorization': auth},
    })
    .then((res) => {
        if(res.ok){
            console.log('Prodotto recuperato!', res.json())
            return res.json()
        } else {
            throw new Error(`Problem: ${res}`)
        }
    })
    .then((guitarDetails) => {
        const detailsRow = document.getElementById('details-row')
        console.log("Chitarra",guitarDetails)
        detailsRow.innerHTML=`
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
    .catch((err) => 
        console.log('Problema nel recupero', err))
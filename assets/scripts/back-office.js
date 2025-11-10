const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjUxYWY0YmQ0NzAwMTU4NWIxZGYiLCJpYXQiOjE3NjI1MDYwMTAsImV4cCI6MTc2MzcxNTYxMH0._g0AHG_64pdYaiGxD1kwyYlRHjRN_Now3NSzP6PTOz0"

const urlAPI = 'https://striveschool-api.herokuapp.com/api/product/'

//CREAZIONE DI UN NUOVO ARTICOLO "CHITARRA"

//Creo un oggetto "chitarra"
class guitar {
    constructor(_name,_description,_brand,_imageUrl,_price){
        this.name = _name
        this.description = _description
        this.brand = _brand
        this.imageUrl = _imageUrl 
        this.price = _price
    }
}

//RECUPERO I DATI DAL FORM
const form = document.getElementById('product-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    //Recupero i dati dai campi del form
    const nameInput = document.getElementById('name')
    const descriptionInput = document.getElementById('description')
    const brandInput = document.getElementById('brand')
    const imageInput = document.getElementById('image-url')
    const priceInput = document.getElementById('price')

    console.log(nameInput.value, descriptionInput.value, brandInput.value, imageInput.value, priceInput.value)

    //creo un NUOVO oggetto "chitarra"
    const newGuitar = new guitar(nameInput.value, descriptionInput.value, brandInput.value, imageInput.value, priceInput.value)

    //Inviamo il nuovo oggetto all'API
    fetch(urlAPI + "/" + id, {
        method: id ? 'PUT' : 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'},
        body: JSON.stringify(newGuitar)
    })
    .then((res) => {
        if(res.ok){
            id ? alert('Prodotto modificato!') : alert('Prodotto salvato!') 
            form.reset()
        } else {
            throw new Error(`${res.status}`)
        }
    })
    .catch((err) => 
        console.log('Problema nel salvataggio', err))
})

//MODIFICO UN OGGETTO GIA ESISTENTE
//Recupero l'ID prodotto dall'url
const url = location.search
const urlParameters = new URLSearchParams(url)
const id = urlParameters.get('productId')

//Recupero le informazione del prodotto e le inserisco nel form
if(id){
    fetch(urlAPI + "/" + id, {
        headers: {
            'Authorization': auth,},
    })
    .then((res) => {
        if(res.ok){
            console.log('Chitarre recuperate!')
            return res.json()
        } else {
            throw new Error(`${res.status}. Problema nel recupero dei dati.`)
        }
    })
    .then((guitar) => {
    document.getElementById('name').value = guitar.name
    document.getElementById('description').value = guitar.description
    document.getElementById('brand').value = guitar.brand
    document.getElementById('image-url').value = guitar.imageUrl
    document.getElementById('price').value = guitar.price
    })
}

//ELIMINO UN OGGETTO GIA ESISTENTE
const deleteItem = function(id) {
    fetch(urlAPI + '/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': auth},
    })
    .then((res) => {
        if(res.ok){
            console.log('Prodotto eliminato!')
            location.assign('./homepage.html')
        } else {
            throw new Error(`Problem: ${res.status}`)
        }
    })
    .catch((err) => 
        console.log('Problema nell\'eliminazione', err))
}

//RESETTO TUTTI I CAMPI DEL PRODOTTO
const resetForm = function (){
    document.getElementById('product-form').reset()
}

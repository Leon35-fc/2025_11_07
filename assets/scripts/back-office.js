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
    fetch(urlAPI, {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'},
        body: JSON.stringify(newGuitar)
    })
    .then((res) => {
        if(res.ok){
            alert('Prodotto salvato!')
            form.reset()
        } else {
            throw new Error(`Problem: ${res}`)
        }
    })
    .catch((err) => 
        console.log('Problema nel salvataggio', err))
})

//MODIFICO UN OGGETTO GIA ESISTENTE

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
        } else {
            throw new Error(`Problem: ${res.status}`)
        }
    })
    .catch((err) => 
        console.log('Problema nell\'eliminazione', err))
}

const resetForm() = function (){
    document.getElementById('product-form').reset()
}

//Recupero l'ID prodotto dall'url
const url = location.search
const urlParameters = new URLSearchParams(url)
const id = urlParameters.get('productId')

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
    .then(())
}
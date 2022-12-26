const img = document.querySelector('img')
const btn = document.getElementById('boton')

const API = 'https://api.thecatapi.com/v1/images/search'

// fetch(API)
//         .then(res => res.json)
//             .then(data => {
//                 img.src = data[0].url
//                 })

async function changeCat(){
    try{
    const res = await fetch(API)
    const data = await res.json()
    img.src = data[0].url
    } catch{
            console.log('error');
    }
    
}
changeCat()

btn.addEventListener('click', changeCat)




const img = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const error = document.getElementById('error')
const btn = document.getElementById('boton')

const API_KEY = 'api_key=live_NKUNKal1REFZQFPdaqX7EmVQXp63CsG668PZNgfWPVojynVwNaZk1UOFk5SqJd3L'
const API = `https://api.thecatapi.com/v1/images/search?limit=3&${API_KEY}` 
const API_FAV = `https://api.thecatapi.com/v1/favourites?&${API_KEY}`


async function changeCat(){
    try{
    const res = await fetch(API)

    if (res.status == 200){
        const data = await res.json()
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
    }else {
        error.innerText = "Hubo un error al cargar los Datos" + res.status
    }
    
    } catch{
            console.log('error');
    }
    
}
changeCat()

btn.addEventListener('click', changeCat)


async function loadFavorites(){

    try{
    const res = await fetch(API_FAV)
   
    
        if (res.status == 200){       
        const data = await res.json()
        const favimg= document.getElementById('favimg')
        favimg.src = data[0].url
        console.log(data[0]);
    }else {
        error.innerHTML = "Hubo un error al cargar los Datos, ERROR " + res.status
    }
    }catch (e){
        console.log(e);
    }
    
}
loadFavorites()


//SOLICITUD DE TIPO POST

async function agregarFavorito(){

}
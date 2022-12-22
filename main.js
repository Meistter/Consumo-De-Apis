const img = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const error = document.getElementById('error')
const exito = document.getElementById('exito')
const btn = document.getElementById('boton')
const section = document.getElementById('favoritesMichis')

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')


//usando Axios para hacer las solicitudes al servidor
const miApi = axios.create({
    baseURL: 'https://miApi.thecatmiApi.com/v1'
})

miApi.defaults.headers.common['X-API-KEY'] = 'live_NKUNKal1REFZQFPdaqX7EmVQXp63CsG668PZNgfWPVojynVwNaZk1UOFk5SqJd3L'


const API_KEY = 'live_NKUNKal1REFZQFPdaqX7EmVQXp63CsG668PZNgfWPVojynVwNaZk1UOFk5SqJd3L'
const API = `https://miApi.thecatmiApi.com/v1/images/search?limit=3` 
const API_FAV = `https://miApi.thecatmiApi.com/v1/favourites?` //Aqui ya no llamo la ${API_KEY} por que la pondre en el header
const API_DEL = (id) => `https://miApi.thecatmiApi.com/v1/favourites/${id}?&miApi_key=${API_KEY}`//aqui ya no es necesario pasar el API_KEY por que lo envío en el header
function API_D(id){`https://miApi.thecatmiApi.com/v1/favourites/${id}&miApi_key=${API_KEY}`} //igual a lo de arriba
const API_UP = `https://miApi.thecatmiApi.com/v1/images/upload` 

btn.addEventListener('click', changeCat)

async function changeCat(){
    try{
    const res = await fetch(API)

    if (res.status == 200){
        const data = await res.json()
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
        btn1.addEventListener('click', () => agregarFavorito(data[0].id)) //aqui usamos un arrow function para
        btn2.addEventListener('click', () => agregarFavorito(data[1].id)) // que cuando cargue no se ejecute
        btn3.addEventListener('click', () => agregarFavorito(data[2].id)) //automaticamente la funcion agregarFavorito, lo que estamos haciendo es meter agregarFavorito dentro de otra funcion, de esta forma no se ejecuta automaticamente
                                                                          //pero de forma basica lo q hacemos aqui es que en el evento click llama la funcion agregarFavorito y le manda como parametro el ID
    }else {
        error.innerText = "Hubo un error al cargar los Datos" + res.status
    }
    
    } catch{
            console.log('error');
    }
    
}
changeCat()


async function loadFavorites(){

    try{
    const res = await fetch(API_FAV, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    })
   
    if (res.status == 200){   
        const data = await res.json()
        section.innerHTML = ""  //esto lo usamos para limpiar el html antes de ciclar para que al llamar a loadFavorites nuevamente mas adelante no se dupliquen datos en el dom
        data.forEach(gato => {
            
            const article = document.createElement('article')
            const imgx = document.createElement('img')
            const btnx = document.createElement('button')
            const btnText = document.createTextNode('Quitar de Favoritos')

            btnx.appendChild(btnText)
            imgx.src = gato.image.url
            imgx.height = 150
            article.append(imgx, btnx)
            section.appendChild(article)

            btnx.addEventListener('click', () => deleteMichis(gato.id)) 
        })

    }else {
        error.innerHTML = "Hubo un error al cargar los Datos, ERROR " + res.status
    }
    }catch (e){
        console.log(e);
    }
    
}
loadFavorites()


//SOLICITUD DE TIPO POST
async function agregarFavorito(id){
   
        //Aqui hacemos la solicitud usando fetch

        // const res = await fetch(API_FAV,{
        // method: 'POST', 
        // headers: {'Content-Type': 'application/json',
        //           'X-API-KEY': API_KEY
        // },

        // body: JSON.stringify({image_id: id})  //esto es necesario porq no sabemos si el backend esta hecho en javascript por lo que lo enviamos en string
        // })

     //   Aqui hacemos la solicitud con AXIOS

        const res = await miApi.post('/favourites',{image_id: id}) //no es necesario el stringify ya que el axios lo hace automaticamente


        if (status == 200){ //aqui ya no es necesario llamar res.status ya que el axios nos guarda en status directamente el status de la respuesta
            loadFavorites()
            exito.innerHTML = "Imagen de Gatito Linda Guardada Exitosamente " + res.status
           
        }else{
            exito.innerHTML = "Error al guardar " + res.status
        }
      
}

//SOLICITUD DE TIPO DELETE

async function deleteMichis(id){
    try{
        const res = await fetch(API_DEL(id),{
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json',
                  'X-API-KEY': API_KEY
                },
        body: JSON.stringify({image_id: id})
        })
        if (res.status == 200){
            exito.innerHTML = "Imagen de Gatito Linda Eliminada Exitosamente " + res.status
            loadFavorites()
        }else{
            exito.innerHTML = "Error al Eliminar " + res.status
        }
    }catch{

    }
}

async function uploadPic(){
const form = document.getElementById('uploadingForm')
const formData = new FormData(form)

// console.log(formData.get('file'));
   const res = await fetch(API_UP,{
        method: "POST",
        headers: {
            "x-miApi-key": API_KEY,
        },
        body: formData,
        })

        const data = await res.json()

        if (res.status == 201){
            exito.innerHTML = 'Gatito subido exitosamente'
            console.log(data.url);
            agregarFavorito(data.id) //agregamos el gato a favoritos para verlo en la página principal
        }else{
            error.innerHTML = 'Error al Cargar el Michi' + res.status + data.message
        }
}

const btnsubmit = document.getElementById('btnsubmit')
btnsubmit.addEventListener('click', uploadPic)
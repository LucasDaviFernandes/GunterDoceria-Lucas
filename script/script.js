import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJgpaaWWlPISCY5O1UMI_q6xRDiTbMyJk",
  authDomain: "gunter-doceria.firebaseapp.com",
  projectId: "gunter-doceria",
  storageBucket: "gunter-doceria.appspot.com",
  messagingSenderId: "120428004344",
  appId: "1:120428004344:web:e5fd0a9ef30ac849b30c0d",
  measurementId: "G-RXEYSMSHBB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

const login = document.querySelector('.login');
const botao = document.querySelector('.activation');
const loginRef = doc(db, "Login", "Login");
const loginRefdoix = await getDoc(loginRef);

botao.addEventListener('click', () => {
    login.classList.toggle('on')
})

const acessar = document.querySelector('.acessar');
acessar.addEventListener('click', () => {
    const user = document.getElementById('nome').value;
    const senha = document.querySelector('#senha').value;


    if (user === loginRefdoix.data().Usuario && senha === loginRefdoix.data().Senha){
        window.open('Administrador/MenuAdministrador.html', '_blank');
    }
    else{
        alert('Usuário e/ou Senha Incorreto(s)')
    }
})


function criar(nome, descricao, image, preco){

const botao = document.createElement('button')
    botao.classList.add('button')
    botao.innerText = 'Comprar já'
const carreta = document.querySelector('.swiper-wrapper')
// parametros
const Imagem =  document.createElement('img')
    Imagem.setAttribute("id", 'imagem-swipers')
    Imagem.src = `${image}`

const NomePreco = document.createElement('h2')
    NomePreco.innerText = nome

const Descricao = document.createElement('p');
    Descricao.innerText = descricao

const Preco = document.createElement('p')
    Preco.innerText = preco
// texto
const textCard = document.createElement('div');
    textCard.classList.add('text-card');
    textCard.appendChild(NomePreco)
    textCard.appendChild(Descricao)
    textCard.appendChild(Preco)
    textCard.appendChild(botao)

const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    textContainer.appendChild(textCard)


// slide
const imagecard = document.createElement('div');
    imagecard.classList.add('image-card')
    imagecard.appendChild(Imagem)
    
const card  = document.createElement('span');
    card.classList.add('card')
    card.appendChild(imagecard)
    card.appendChild(textContainer)

const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container')
    cardContainer.appendChild(card)

const swiperParent = document.createElement('div');
    swiperParent.classList.add('swiper-slide')
    swiperParent.appendChild(cardContainer)


    return{
        nome: NomePreco,
        descricao: Descricao,
        imagem: Imagem,
        preco: Preco,

        colocar(){
            carreta.appendChild(swiperParent);
        }
    }
}

async function carregarProdutos() {
  const querySnapshot = await getDocs(collection(db, "Informacoes"));
  querySnapshot.forEach((doc) => {
    const dados = doc.data();
    doc = criar(dados.nomePreco, dados.texto, dados.imagem, dados.preco);
    doc.colocar()
  });
  swiper.update()
}
window.onload = () => {
  carregarProdutos();
};

// header moviment 

let ultimaPosicaoScroll = window.scrollY;

const header = document.querySelector('header');
window.addEventListener('scroll', function(){
      let posicaoAtual = window.scrollY;
     if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
         header.removeAttribute('class', 'down')
       header.setAttribute('class', 'up')
     }
    else if (posicaoAtual < ultimaPosicaoScroll) {
         header.removeAttribute('class', 'up')
        header.setAttribute('class', 'down')
     }

})

const navbar = document.querySelector('nav')
const navResponsiva = document.querySelectorAll('.butaum')
let ativas = false

navResponsiva.forEach(botao => {
    botao.addEventListener('click', () =>{
        if(ativas){
            navbar.style.marginLeft = '-100vw'
            ativas = false
        }
        else{
            navbar.style.marginLeft = '-10vw'
            ativas = true
        }
    })
})
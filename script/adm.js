// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
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

const enviar = document.getElementById('enviar');

document.getElementById('formul').addEventListener("submit", function(e){
  e.preventDefault()

  if(!this.checkValidity()){
    alert('Preencha todos os campos');
    return
  }

  const data = {
  nomePreco: document.querySelector('#nomePreco').value,

  texto: document.querySelector('#textin').value,

  imagem: document.querySelector('#imagem').value,

  preco: document.querySelector('#preco').value
}

addDoc(collection(db, "Informacoes"), data)
.then(() => {
  alert('Mensagem recebida com sucesso, aguarde a resposta');
})
.catch(error => {
  alert('Falha ao enviar a mensagem, por favor tente novamente' + error.message);
})

})
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// criar produto

function criar(nome, descricao, image, preco){
    
const botao = document.createElement('button')
    botao.classList.add('button') // botao não está indo pra tela
    botao.innerText = 'Comprar jÁ'

const carreta = document.querySelector('.swiper-wrapper')
// parametros
const Imagem =  document.createElement('img')
    Imagem.setAttribute("id", 'imagem-swipers')
    Imagem.src = `${image}`

const NomePreco = document.createElement('h2')
    NomePreco.innerText = nome

const Preco = document.createElement('p')
    Preco.innerText = preco

const Descricao = document.createElement('p');
    Descricao.innerText = descricao
// texto
const textCard = document.createElement('div');
    textCard.classList.add('text-card');
    textCard.appendChild(NomePreco)
    textCard.appendChild(Descricao)
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
}
document.addEventListener('DOMContentLoaded', carregarProdutos);
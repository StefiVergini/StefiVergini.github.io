'use strict';

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 200;

        if(window.scrollY >= top){

            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");
        }

    });

});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});

//menu para celular
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");
    menuBtn.classList.toggle("active");

});

//cerrar menu al seleccionar opcion
document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuBtn.classList.remove("active");

    });

});

//copiar email
const copyBtn = document.getElementById("copyBtn");
const copyTooltip = document.getElementById("copyTooltip");

copyBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            "stefanialvergini@gmail.com"
        );

        copyTooltip.classList.add("show");

        setTimeout(() => {

            copyTooltip.classList.remove("show");

        }, 1500);

    } catch (err) {

        console.error(err);

    }

});

//galeria
const gallery = {

    reparador: [

        "img/elreparador/dashboard.png",
        "img/elreparador/login.png",
        "img/elreparador/calendar.png",
        "img/elreparador/employees.png",
        "img/elreparador/form.png",
        "img/elreparador/WorkFlowRepair-EndToEnd.gif",
        "img/elreparador/DER.png",
        "img/elreparador/ERS.png",
        "img/elreparador/feasibility-study.png",

    ],

    chat:[
        "img/real-time-chat/real-time-two-chats.png",
        "img/real-time-chat/LoginToLogout.gif",
        "img/real-time-chat/login.png",
        "img/real-time-chat/dashboard.png",
        "img/real-time-chat/chat.png",
        "img/real-time-chat/record.png",


    ],

    nutrite:[

        "img/nutrite-dietetic/main-menu.png",
        "img/nutrite-dietetic/supplier-management.png",
        "img/nutrite-dietetic/client-management.png",
        "img/nutrite-dietetic/items-management.png",
        "img/nutrite-dietetic/new-item.png",
        "img/nutrite-dietetic/sales-management.png",
        "img/nutrite-dietetic/invoice.png",

    ],

    smart:[

        "img/smartvanguard/dashboard-business.png",
        "img/smartvanguard/business-cards.png",
        "img/smartvanguard/login.png",
        "img/smartvanguard/dashboard-education.png",
        "img/smartvanguard/education-cards.png",
    ],

    certifications:[
        "img/certifications/Titulo-Analitico.jpg",
        "img/certifications/CFP-Java.png",
        "img/certifications/AWS_Academy_Cloud_Foundations.jpg",
        "img/certifications/AWS_Academy_Cloud_Operations.jpg",
        "img/certifications/EducacionIt-PHP-MySQL.jpg",
        "img/certifications/EducacionIt-Bases-de-Datos-SQL.jpg",
        "img/certifications/EducacionIt-Javascript.jpg",
        "img/certifications/EducacionIt-HTML5.jpg"
    ]
    

};
const modal=document.getElementById("imageModal");

const modalImage=document.getElementById("modalImage");

let currentImages=[];

let currentIndex=0;

//celular touch
let touchStartX = 0;
let touchEndX = 0;

function createDots(){

    const dots = document.getElementById("dots");

    dots.innerHTML = "";

    currentImages.forEach((image, index)=>{

        const dot = document.createElement("span");

        dot.classList.add("dot");

        if(index === currentIndex){

            dot.classList.add("active");

        }

        dot.addEventListener("click", ()=>{

            currentIndex = index;

            updateImage();

        });

        dots.appendChild(dot);

    });

}

function updateImage(){

    modalImage.src = currentImages[currentIndex];

    createDots();

}

//al abrir
document
.querySelectorAll(".project-image")
.forEach(card=>{

    card.addEventListener("click",()=>{

        const project=card.dataset.project;

        currentImages=gallery[project];

        currentIndex=0;

        updateImage();

        modal.classList.add("open");

    });

});

// siguiente
document
.querySelector(".next")
.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex>=currentImages.length){

        currentIndex=0;

    }

    updateImage();

});

//atras
document
.querySelector(".prev")
.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=currentImages.length-1;

    }

    updateImage();

});

//cerrar
document
.querySelector(".close")
.addEventListener("click",()=>{

    modal.classList.remove("open");

});


modalImage.style.opacity = 0;

setTimeout(()=>{

    modalImage.src = currentImages[currentIndex];

    modalImage.style.opacity = 1;

},150);

//cerrar tecla scape
document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.classList.remove("open");

    }

});

// ver imagenes con flechas del teclado
document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("open")) return;

    if (e.key === "ArrowRight") {

        currentIndex++;

        if (currentIndex >= currentImages.length) {

            currentIndex = 0;

        }

        updateImage();

    }

    else if (e.key === "ArrowLeft") {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = currentImages.length - 1;

        }

        updateImage();

    }

    else if (e.key === "Escape") {

        modal.classList.remove("open");

    }

});

//celu detectar touch
//detectar cuando empieza el gesto
modalImage.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

//detectar cuando termina
modalImage.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

//anterior siguiente con el dedo
function handleSwipe(){

    const distance = touchStartX - touchEndX;

    // mínimo para considerar swipe
    if(Math.abs(distance) < 50) return;

    // izquierda
    if(distance > 0){

        currentIndex++;

        if(currentIndex >= currentImages.length){

            currentIndex = 0;

        }

    }

    // derecha
    else{

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = currentImages.length - 1;

        }

    }

    updateImage();

}

//cerrar con cualquier click cancelo
/*modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("open");

    }

});*/
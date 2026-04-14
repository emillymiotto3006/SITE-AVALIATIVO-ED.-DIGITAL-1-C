// --- DATABASE (Simulação de Dados) ---
const waterData = [
    { title: "Consumo Médio", value: "154L", desc: "Uso diário por pessoa no Brasil." },
    { title: "Desperdício", value: "40%", desc: "Da água tratada é perdida em vazamentos." },
    { title: "Reservatórios", value: "15%", desc: "Nível crítico em épocas de estiagem severa." }
];

const regionsInfo = [
    { region: "Sudeste", info: "Dependência de sistemas como o Cantareira, afetado por desmatamento." },
    { region: "Nordeste", info: "Histórico de seca, mitigado parcialmente pela transposição do São Francisco." },
    { region: "Centro-Oeste", info: "O agronegócio demanda alta gestão dos aquíferos locais." }
];

// --- RENDERIZAÇÃO DINÂMICA ---
function initApp() {
    const cardsContainer = document.getElementById('cards-container');
    waterData.forEach(item => {
        cardsContainer.innerHTML += `
            <article class="card">
                <h3>${item.title}</h3>
                <p style="font-size: 2rem; color: var(--primary)">${item.value}</p>
                <p>${item.desc}</p>
            </article>
        `;
    });

    const accordionContainer = document.getElementById('accordion-container');
    regionsInfo.forEach((item, index) => {
        accordionContainer.innerHTML += `
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(${index})">
                    ${item.region}
                </button>
                <div class="accordion-content" id="content-${index}">
                    <p>${item.info}</p>
                </div>
            </div>
        `;
    });
}

// --- ACESSIBILIDADE: CONTROLE DE FONTE ---
let currentFontSize = 100; 
const btnUp = document.getElementById('btn-font-up');
const btnDown = document.getElementById('btn-font-down');

btnUp.addEventListener('click', () => {
    currentFontSize += 10;
    document.documentElement.style.fontSize = `${currentFontSize}%`;
});

btnDown.addEventListener('click', () => {
    currentFontSize -= 10;
    document.documentElement.style.fontSize = `${currentFontSize}%`;
});

// --- ACESSIBILIDADE: ALTO CONTRASTE ---
document.getElementById('btn-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- COMPONENTE: ACORDEÃO ---
function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    const headers = document.querySelectorAll('.accordion-header');
    
    contents[index].classList.toggle('active');
    const isActive = contents[index].classList.contains('active');
    headers[index].setAttribute('aria-expanded', isActive);
}

// --- COMPONENTE: CARROSSEL BÁSICO ---
let currentSlide = 0;
const track = document.getElementById('carousel-track');
const tips = ["Feche a torneira ao escovar os dentes.", "Reduza o tempo de banho.", "Reutilize água da máquina de lavar."];

tips.forEach(tip => {
    track.innerHTML += `<div class="carousel-item"><h3>${tip}</h3></div>`;
});

document.getElementById('next').addEventListener('click', () => {
    if (currentSlide < tips.length - 1) currentSlide++;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentSlide > 0) currentSlide--;
    updateCarousel();
});

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Inicializar
window.onload = initApp;

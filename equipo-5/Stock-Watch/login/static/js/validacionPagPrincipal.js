// ================================
// CARRUSEL CONTROLADO POR BOTONES Y AUTOMÁTICO
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide"); // Selecciona todas las diapositivas
    const prevButton = document.querySelector(".prev"); // Botón de anterior
    const nextButton = document.querySelector(".next"); // Botón de siguiente
    let currentSlide = 0; // Índice de la diapositiva actual

    // Función para mostrar la diapositiva actual
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove("active"); // Elimina la clase activa de todas las diapositivas
            if (i === index) {
                slide.classList.add("active"); // Añade la clase activa a la diapositiva actual
            }
        });
    };

    // Evento para el botón "Anterior"
    prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Mueve al slide anterior
        showSlide(currentSlide);
    });

    // Evento para el botón "Siguiente"
    nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length; // Mueve al siguiente slide
        showSlide(currentSlide);
    });

    // Función para avanzar automáticamente las diapositivas
    const autoSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length; // Mueve al siguiente slide
        showSlide(currentSlide);
    };

    // Configurar el temporizador para cambiar las diapositivas automáticamente cada 5 segundos
    const slideInterval = setInterval(autoSlide, 100000);

    // Mostrar la primera diapositiva al cargar la página
    showSlide(currentSlide);
});

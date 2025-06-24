// =======================
// CONTADOR REGRESIVO
// =======================
function countdown() {
    const fechaBoda = new Date("2025-07-14T10:00:00").getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias >= 0 ? dias : 0;
    document.getElementById("horas").textContent = horas >= 0 ? horas : 0;
    document.getElementById("minutos").textContent = minutos >= 0 ? minutos : 0;
    document.getElementById("segundos").textContent = segundos >= 0 ? segundos : 0;

    if (diferencia < 0) {
        document.querySelector(".contador p").textContent = "¡Ya nos casamos!";
    }
}
setInterval(countdown, 1000);
countdown();

// =======================
// CAMBIO DE FOTO AL HACER SCROLL
// =======================
document.addEventListener('DOMContentLoaded', function () {
    const foto = document.getElementById('fotoScroll');
    const imagenOriginal = 'foto1.jpg';
    const imagenFinal = 'foto2.jpg';

    // Precargar ambas imágenes
    [imagenOriginal, imagenFinal].forEach(src => {
        const img = new Image();
        img.src = src;
    });

    let ticking = false;

    function actualizarImagenPorScroll() {
        const scrollY = window.scrollY;
        const altoPagina = document.body.scrollHeight;
        const altoVentana = window.innerHeight;
        const distanciaAlFinal = altoPagina - (scrollY + altoVentana);

        if (foto) {
            if (distanciaAlFinal < 200 || scrollY > 1500) {
                foto.src = imagenFinal;
            } else {
                foto.src = imagenOriginal;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(actualizarImagenPorScroll);
            ticking = true;
        }
    });
});

// =======================
// BOTÓN PLAY (música) - SIN CAMBIO DE SÍMBOLO
// =======================
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-btn');
    let isPlaying = false;
    let audio = null;

    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // El botón siempre mantiene el símbolo ▶
            this.style.transform = 'scale(0.95)';
            
            // Restaurar el tamaño después de la animación
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            if (!isPlaying) {
                isPlaying = true;
                if (!audio) {
                    audio = new Audio('tu-cancion.mp3');
                    audio.loop = true;
                    audio.volume = 0.5;
                }
                audio.play().catch(e => console.log('Error al reproducir:', e));
                console.log('Reproduciendo música...');
            } else {
                isPlaying = false;
                audio.pause();
                console.log('Pausando música...');
            }
        });
    }
});

// =======================
// CONFIRMACIÓN DE ASISTENCIA - CON WHATSAPP
// =======================
document.addEventListener('DOMContentLoaded', function() {
    const btnConfirmar = document.querySelector('.btn-confirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = 'scale(1)', 150);

            // Abrir enlace de WhatsApp para confirmar asistencia
            window.open('https://chat.whatsapp.com/KBHkYnDqV8H8D8sfOtu43w', '_blank');
        });
    }
});

// =======================
// ANIMACIÓN DE ENTRADA EN SECCIONES
// =======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const secciones = document.querySelectorAll(
        '.tarjeta, .contador, .seccion-padres, .seccion-padrinos, .seccion-lugar, .seccion-itinerario, .seccion-vestimenta, .seccion-confirmacion'
    );
    secciones.forEach(seccion => observer.observe(seccion));
});

// =======================
// BOTÓN "VOLVER ARRIBA"
// =======================
document.addEventListener('DOMContentLoaded', function() {
    let botonArriba = document.querySelector('.btn-volver-arriba');
    if (!botonArriba) {
        botonArriba = document.createElement('button');
        botonArriba.className = 'btn-volver-arriba';
        botonArriba.innerHTML = '↑';
        botonArriba.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #d4af37;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        document.body.appendChild(botonArriba);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            botonArriba.style.opacity = '1';
            botonArriba.style.transform = 'scale(1)';
        } else {
            botonArriba.style.opacity = '0';
            botonArriba.style.transform = 'scale(0.8)';
        }
    });

    botonArriba.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// =======================
// PRECARGAR IMÁGENES
// =======================
function precargarImagenes(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const imagenesImportantes = [
        'foto1.jpg',
        'foto2.jpg',
        'foto-novios.jpg',
        'ceremonia-foto.jpg',
        'foto-confirmacion.jpg'
    ];
    precargarImagenes(imagenesImportantes);
});

// =======================
// ERRORES DE IMÁGENES
// =======================
document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Error al cargar: ${this.src}`);
            // this.src = 'placeholder.jpg'; // Imagen por defecto si falla
        });
    });
});

// =======================
// BOTONES DE MAPAS
// =======================
document.addEventListener('DOMContentLoaded', function() {
    // Botón para ceremonia (si existe)
    const btnMapa = document.querySelector('.seccion-lugar .btn-mapa');
    if (btnMapa) {
        btnMapa.addEventListener('click', function() {
            window.open('https://maps.app.goo.gl/gY84CPCBmhALsq9n9?g_st=iw', '_blank');
        });
    }

    // Botón para recepción
    const btnRecepcion = document.querySelector('.seccion-recepcion .btn-mapa');
    if (btnRecepcion) {
        btnRecepcion.addEventListener('click', function() {
            window.open('https://maps.app.goo.gl/dzp1crM5J7uDDuzx5', '_blank');
        });
    }
});

console.log('✨ Script de invitación cargado correctamente ✨');
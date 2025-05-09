document.addEventListener('DOMContentLoaded', function() {
    // Elementos fadeIn
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Menú móvil
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Cerrar menú móvil si está abierto
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('active');
                }
                
                // Desplazamiento suave
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Cerrar todos los demás elementos
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Abrir/cerrar el elemento actual
                item.classList.toggle('active');
            });
        }
    });
    
    // Carrusel de capturas de pantalla
    const screenshotContainers = document.querySelectorAll('.screenshot-container');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Ocultar todas las capturas
        screenshotContainers.forEach((container, i) => {
            if (i === index) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
        
        // Actualizar dots
        carouselDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentSlide = index;
    }
    
    // Solo inicializar el carrusel si hay más de una pantalla en pantallas pequeñas
    if (screenshotContainers.length > 1 && window.innerWidth < 768) {
        // Mostrar solo la primera captura inicialmente en móviles
        showSlide(0);
        
        // Event listeners para navegación
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = screenshotContainers.length - 1;
                showSlide(newIndex);
            });
            
            nextButton.addEventListener('click', () => {
                let newIndex = currentSlide + 1;
                if (newIndex >= screenshotContainers.length) newIndex = 0;
                showSlide(newIndex);
            });
        }
        
        // Navegación con dots
        carouselDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
            });
        });
    } else {
        // En escritorio, mostrar todas las capturas
        screenshotContainers.forEach(container => {
            container.style.display = 'block';
        });
        
        // Ocultar controles de navegación en escritorio
        if (prevButton && nextButton) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }
    
    // Simulación de chat
    const chatInput = document.querySelector('.chat-input-field');
    const chatSendButton = document.querySelector('.chat-send-button');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatInput && chatSendButton && chatMessages) {
        const handleChat = () => {
            const message = chatInput.value.trim();
            if (message) {
                // Añadir mensaje del usuario
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-message user-message';
                userMsg.textContent = message;
                chatMessages.appendChild(userMsg);
                
                // Limpiar input
                chatInput.value = '';
                
                // Auto scroll
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simular respuesta automática
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-message bot-message';
                    
                    // Respuesta simulada basada en palabras clave
                    if (message.toLowerCase().includes('receta') || message.toLowerCase().includes('comida')) {
                        botMsg.innerHTML = 'Aquí tienes algunas recetas saludables que podrían interesarte:<br><br>1. Bowl de quinoa con verduras asadas y aguacate<br>2. Ensalada de lentejas con atún y huevo duro<br>3. Wrap de pollo con espinacas y hummus';
                    } else if (message.toLowerCase().includes('ejercicio') || message.toLowerCase().includes('entrenar')) {
                        botMsg.innerHTML = 'El ejercicio es un complemento ideal para una buena nutrición. Te recomiendo combinar actividad cardiovascular (30 min, 3-4 veces por semana) con entrenamiento de fuerza (2-3 veces por semana) para obtener mejores resultados.';
                    } else {
                        botMsg.innerHTML = '¡Gracias por tu pregunta! Nuestro asistente IA ha recibido tu consulta. En la versión completa de NutriPlan, recibirías una respuesta personalizada basada en tu perfil nutricional.';
                    }
                    
                    chatMessages.appendChild(botMsg);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        };
        
        chatSendButton.addEventListener('click', handleChat);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChat();
            }
        });
    }
});
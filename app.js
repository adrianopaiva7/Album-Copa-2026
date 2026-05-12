 const numeros = document.querySelectorAll('.numero');

        numeros.forEach(numero => {

            numero.addEventListener('click', () => {

                numero.classList.toggle('marcado');

            });

        });


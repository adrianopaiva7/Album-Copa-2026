 const supabaseUrl = 'https://nqyrhkkshfrrelnnjmcv.supabase.co';

 const supabaseKey = 'sb_publishable_dnl7In0JZxWhTb43tZrq_g_StxArwj6';

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const numeros = document.querySelectorAll('.numero');

numeros.forEach(numero => {

    numero.addEventListener('click', async () => {

        const pais = numero
            .parentElement
            .querySelector('.pais')
            ?.innerText;

        const numeroTexto = numero.innerText;

        // VERIFICA SE ESTÁ MARCADO
        const marcado =
            numero.classList.contains('marcado');

        // SE JÁ ESTIVER MARCADO
        if (marcado) {

            numero.classList.remove('marcado');

            await supabaseClient
                .from('marcacoes')
                .delete()
                .match({
                    pais: pais,
                    numero: numeroTexto
                });

        }

        // SE NÃO ESTIVER
        else {

            numero.classList.add('marcado');

            await supabaseClient
                .from('marcacoes')
                .insert([
                    {
                        pais: pais,
                        numero: numeroTexto,
                        marcado: true
                    }
                ]);

        }

    });

});

async function carregarMarcacoes() {

    const { data, error } = await supabaseClient
        .from('marcacoes')
        .select('*');

    console.log(data);

    data.forEach(item => {

        const todasCelulas =
            document.querySelectorAll('.numero');

        todasCelulas.forEach(celula => {

            const pais = celula
                .parentElement
                .querySelector('.pais')
                ?.innerText;

            const numero = celula.innerText;

            if (
                pais === item.pais &&
                numero == item.numero
            ) {

                celula.classList.add('marcado');

            }

        });

    });

}

carregarMarcacoes();
 const supabaseUrl = 'https://nqyrhkkshfrrelnnjmcv.supabase.co';

 const supabaseKey = 'sb_publishable_dnl7In0JZxWhTb43tZrq_g_StxArwj6';

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const numeros = document.querySelectorAll('.numero');

numeros.forEach(numero => {

    numero.addEventListener('click', async () => {

        numero.classList.toggle('marcado');

        const pais = numero
            .parentElement
            .querySelector('.pais')
            ?.innerText;

        const numeroTexto = numero.innerText;

        const { error } = await supabaseClient
            .from('marcacoes')
            .insert([
                {
                    pais: pais,
                    numero: numeroTexto,
                    marcado: true
                }
            ]);

        console.log(error);

    });

});
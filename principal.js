import { fazerPergunta } from './Modulos/perguntas.js';
import { perguntar } from './Modulos/perguntaLivre.js';
import { consultar } from './Modulos/consultaDestino.js';
import { processaArquivoTxt } from './Modulos/Analise.js';

async function principal() {
  const escolha = await fazerPergunta(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  3. realizar analise de avaliação com dados do destino;
  \nOpção desejada: `);

  if (escolha === '1') {
    await perguntar();
  } else if (escolha === '2') {
    await consultar();
  } else if (escolha === '3') {
    await processaArquivoTxt();
  } else {
    console.log('Escolha inválida.');
  }
}

principal();
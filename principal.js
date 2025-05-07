import { fazerPergunta } from './perguntas.js';
import { perguntar } from './perguntaLivre.js';
import { consultar } from './consultaDestino.js';
import { processaarquivotxt } from './Analise.js';

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
    await processaarquivotxt();
  } else {
    console.log('Escolha inválida.');
  }
}

principal();
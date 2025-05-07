import { GoogleGenAI } from "@google/genai";
import { fazerPergunta } from "./perguntas.js";
import {promises as fs} from "fs"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.0-flash";

export async function processaArquivoTxt() {

  const arquivo = await fazerPergunta("me informe o caminho e nome do arquivo:");
  const dados = await fs.readFile(arquivo, 'utf8');

  const response = await ai.models.generateContent({
    model: model,
    contents: `Analise as opiniões descritas em sequência e resuma os pontos positivos e negativos citados pelos clientes sobre esses destinos. Depois, categorize o percentual de respostas em satisfeito, insatisfeitos ou neutros, colocando no seguinte formato, por exemplo:
      Satisfeitos: 20% - 20 respostas 
      Insatisfeitos: 50% - 50 respostas
      Neutros: 30% - 30 respostas 
      O total de respostas deve coincidir com o total de opiniões lidas utilizando o exemplo. 
      Opiniões: ${dados}`,
  });

  const countTokensResponse = await ai.models.countTokens({
    model: model,
    contents: response,
  });
  console.log("Tokens na resposta:", countTokensResponse.totalTokens);

  console.log(response.text);
}
import { GoogleGenAI } from "@google/genai";
import { fazerPergunta } from "./perguntas.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.0-flash";

export async function perguntar() {
  const pergunta = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");
  
  const tokenCountPergunta = await ai.models.countTokens({
    model: model,
    contents: pergunta,
  });
  console.log("Tokens na pergunta:", tokenCountPergunta.totalTokens);

  const response = await ai.models.generateContent({
    model: model,
    contents: pergunta,
    config: {
      systemInstruction:
        "Você deve se adequar com a liguagem que o usuário está falando" +
        "Você é um site de viagens e deve responder somente sobre esse assunto" +
        "Fazer a pesquisa doque o usuário falar no sentido de ser um local para viajar" + 
        "Exemplo: Flamengo que é um bairro mas também um time de futebol" +
        "Caso o usuário pergunte algo diferente. Diga que não pode responder",
    },
  });

  const countTokensResponse = await ai.models.countTokens({
    model: model,
    contents: response,
  });
  console.log("Tokens na resposta:", countTokensResponse.totalTokens);

  console.log(response.text);
}
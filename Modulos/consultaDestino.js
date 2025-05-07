import { GoogleGenAI } from "@google/genai";
import { fazerPergunta} from "./perguntas.js";

const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

export async function consultar() {

    const categorias = await fazerPergunta("Me fale as catégórias que deseja visualizar sobre o determinado destino: ");
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
    await fazerPergunta("Me fale sobre o destino que deseja conhecer: "),
    config: {
        systemInstruction: 
        "Você deve se adequar com a liguagem que o usuário está falando" + 
        "Você é um site de viagens e deve responder somente sobre esse assunto" +
        "Fazer a pesquisa doque o usuário falar no sentido de ser um local para viajar" + 
        "Caso o usuário pergunte algo diferente. Diga que não pode responder" +
        "Para formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter as categorias: " + categorias +
        "Deve utilizar apenas as categorias informadas aqui é somente exemplos:Gastronomia, Arte e Cultura, História, Praias, Montanhas, Trilhas, Dicas e alertas e etc.",
      },
  });
  console.log(response.text);
}
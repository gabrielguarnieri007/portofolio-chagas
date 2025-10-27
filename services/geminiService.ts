import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

// Fix: Per @google/genai guidelines, initialize the client directly with the API key from process.env.API_KEY. This resolves the TypeScript error by removing the problematic `import.meta.env`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Ask for 7 products, as we will prepend one manually
      contents: "Gere uma lista de 7 produtos fictícios para o portfólo da Chagas Representações. Os produtos devem ser das categorias: pisos, porcelanatos, azulejos, isopor e formas para construção. Para cada produto, forneça um ID único, nome, uma descrição curta e atraente (1-2 frases), um preço realista (entre 30 e 500), uma unidade (como 'por m²', 'por peça', 'por painel'), e uma palavra-chave de imagem em INGLÊS de uma só palavra (ex: 'tile', 'flooring', 'styrofoam', 'concrete-form', 'porcelain'). Garanta que o ID seja uma string única.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.STRING,
                description: 'A unique identifier for the product.'
              },
              name: {
                type: Type.STRING,
                description: 'The name of the product.',
              },
              description: {
                type: Type.STRING,
                description: 'A short, enticing description of the product.'
              },
              price: {
                type: Type.NUMBER,
                description: 'The price of the product.'
              },
              unit: {
                type: Type.STRING,
                description: 'The unit of measurement for the price (e.g., "por m²", "por peça").'
              },
              imageKeyword: {
                type: Type.STRING,
                description: 'A single ENGLISH keyword for generating an image.'
              }
            },
            required: ["id", "name", "description", "price", "unit", "imageKeyword"]
          },
        },
      },
    });

    const productsJson = response.text;
    const parsedProducts = JSON.parse(productsJson) as Product[];
    
    // Basic validation
    if (!Array.isArray(parsedProducts)) {
        throw new Error("API did not return an array of products.");
    }

    const specialProduct: Product = {
        id: 'dom-canela-61x61',
        name: 'Lançamento Porcelanato Dom Canela GR 61x61',
        description: 'Elegância e sofisticação em um porcelanato de alta qualidade, perfeito para ambientes modernos e aconchegantes.',
        price: 92.80,
        unit: 'por m²',
        imageKeyword: 'wood-tile', // Keyword to generate a dynamic image
    };

    // Prepend the special product to the list
    return [specialProduct, ...parsedProducts];

  } catch (error) {
    console.error("Error fetching products from Gemini API:", error);
    throw new Error("Failed to generate product catalog.");
  }
};

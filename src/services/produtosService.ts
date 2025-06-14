import { Produto } from "../types/types";
import { apiRecomender } from "../api/api"; 

interface ReactRecommendationResponse {
  recommended_products: Produto[]; 
}

export async function recomendarProdutos(produto: Produto): Promise<Produto[]> {
  try {
    const response = await apiRecomender.post<ReactRecommendationResponse>('/recommend/products/', {
      product_id: produto.id,
      n_recommendations: 5
    });

    if (response.data && Array.isArray(response.data.recommended_products)) {
      return response.data.recommended_products;
    }

    console.error("Resposta inesperada da API de recomendação:", response.data);
    return [];

  } catch (error) {
    console.error("Erro na chamada do serviço de recomendação:", error);
    return [];
  }
}
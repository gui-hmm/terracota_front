import { Produto } from "../types/types";
import { apiRecomender } from "../api/api"; 

// A interface da resposta da API, que corresponde ao schema que criamos no FastAPI
interface ReactRecommendationResponse {
  recommended_products: Produto[]; // A API já retorna uma lista de 'Produto'
}

export async function recomendarProdutos(produto: Produto): Promise<Produto[]> {
  try {
    // A chamada agora espera a resposta já formatada pelo backend
    const response = await apiRecomender.post<ReactRecommendationResponse>('/recommend/products/', {
      product_id: produto.id,
      n_recommendations: 5
    });

    // A MÁGICA ESTÁ AQUI:
    // Não precisamos mais de '.map()' ou de qualquer outra transformação.
    // O backend já nos enviou os dados no formato exato da interface 'Produto'.
    // Apenas retornamos a lista diretamente.
    if (response.data && Array.isArray(response.data.recommended_products)) {
      return response.data.recommended_products;
    }

    // Fallback de segurança caso a resposta venha malformada
    console.error("Resposta inesperada da API de recomendação:", response.data);
    return [];

  } catch (error) {
    console.error("Erro na chamada do serviço de recomendação:", error);
    return [];
  }
}
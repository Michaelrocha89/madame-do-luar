
import { CONFIG } from './config';

export const criarPagamento = async (email: string, nome: string, plano: 'mensal' | 'anual') => {
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/criar-pagamento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        nome,
        plano,
        preco: plano === 'mensal' ? CONFIG.PRECO_MENSAL : CONFIG.PRECO_ANUAL
      })
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};

export const verificarPremium = async (email: string) => {
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/verificar-premium`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar premium:', error);
    return { premium: false };
  }
};

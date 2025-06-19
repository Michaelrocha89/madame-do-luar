
import { N8N_WEBHOOK } from '../config';

export async function consultarTarotN8N(pergunta: string, numeroConsulta: number, userId: string = 'anonimo'): Promise<string> {
  try {
    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        pergunta,
        numeroConsulta,
        userId,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }

    const data = await response.json();
    return data.resposta || 'As energias estão se realinhando...';
    
  } catch (error) {
    console.error('Erro ao consultar N8N:', error);
    return 'As energias cósmicas estão em turbulência. Por favor, tente novamente em instantes.';
  }
}

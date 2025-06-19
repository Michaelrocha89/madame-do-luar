
export const CONFIG = {
  MENSAGENS: {
    ERRO: 'Ocorreu um erro ao processar o pagamento. Tente novamente.'
  },
  BACKEND_URL: 'https://cs-museums-protocol-girlfriend.trycloudflare.com',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  PRECO_MENSAL: 47.00,
  PRECO_ANUAL: 394.00
};

export const N8N_WEBHOOK = 'http://localhost:5678/webhook/madame-luar-protegido';

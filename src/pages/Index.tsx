import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import FloatingParticles from '@/components/FloatingParticles';
import MysticLogo from '@/components/MysticLogo';
import { Users, Shield, Star, Clock } from 'lucide-react';
import { criarPagamento, verificarPremium } from '../api';
import { CONFIG } from '../config';
import { consultarTarotN8N } from '../services/n8n';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [questionsCount, setQuestionsCount] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [onlineCount, setOnlineCount] = useState(3847);
  const [isShuffling, setIsShuffling] = useState(false);
  const [email, setEmail] = useState('');
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual'>('mensal');
  const [mostrarFormEmail, setMostrarFormEmail] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simula variação no contador de pessoas online
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'approved') {
      setQuestionsCount(999);
      alert('✨ Premium ativado! ✨');
      window.history.replaceState({}, '', '/');
    }
  }, []);

  // Novo useEffect para mostrar o modal após a 3ª resposta
  useEffect(() => {
    if (questionsCount === 3) {
      setTimeout(() => setShowPremiumModal(true), 1500); // Delay de 1.5s após a 3ª resposta
    }
  }, [questionsCount]);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Pergunta necessária",
        description: "Digite sua pergunta ao universo...",
        variant: "destructive",
      });
      return;
    }

    if (questionsCount >= 3) {
      setShowPremiumModal(true);
      return;
    }

    setIsLoading(true);
    setIsShuffling(true);
    
    // Simula o embaralhar das cartas
    setTimeout(() => {
      setIsShuffling(false);
    }, 600);

    try {
      // Chama o N8N com o número correto da consulta
      const numeroConsulta = questionsCount + 1;
      const respostaTarot = await consultarTarotN8N(
        question, 
        numeroConsulta,
        email || 'anonimo'
      );
      
      setAnswer(respostaTarot);
      setQuestionsCount(prev => prev + 1);
      setQuestion('');
      
      toast({
        title: "Resposta recebida",
        description: "O universo respondeu sua pergunta",
      });
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro energético",
        description: "Houve uma interferência cósmica. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ModalBloqueio = () => {
    const processarPagamento = async () => {
      if (!email) {
        alert('Por favor, insira seu email!');
        return;
      }
      
      setProcessandoPagamento(true);
      
      try {
        const { init_point } = await criarPagamento(email, '', planoSelecionado);
        localStorage.setItem('user_email', email);
        window.location.href = init_point;
      } catch (error) {
        alert(CONFIG.MENSAGENS.ERRO);
        setProcessandoPagamento(false);
      }
    };
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
        onClick={() => setShowPremiumModal(false)}
      >
        <div 
          className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-3xl max-w-lg w-full border border-purple-500 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
            🌌 Portal Premium 🌌
          </h2>
          
          <div className="space-y-3 mb-6">
            <label className={`block p-4 rounded-xl border-2 cursor-pointer ${
              planoSelecionado === 'mensal' ? 'border-yellow-400 bg-purple-600' : 'border-purple-600 bg-purple-700'
            }`}>
              <input
                type="radio"
                value="mensal"
                checked={planoSelecionado === 'mensal'}
                onChange={() => setPlanoSelecionado('mensal')}
                className="hidden"
              />
              <div className="flex justify-between">
                <span>Plano Mensal</span>
                <span className="font-bold text-yellow-400">R$ 47/mês</span>
              </div>
            </label>
            
            <label className={`block p-4 rounded-xl border-2 cursor-pointer ${
              planoSelecionado === 'anual' ? 'border-yellow-400 bg-purple-600' : 'border-purple-600 bg-purple-700'
            }`}>
              <input
                type="radio"
                value="anual"
                checked={planoSelecionado === 'anual'}
                onChange={() => setPlanoSelecionado('anual')}
                className="hidden"
              />
              <div className="flex justify-between">
                <span>Plano Anual</span>
                <span className="font-bold text-yellow-400">R$ 394/ano</span>
              </div>
            </label>
          </div>
          
          {!mostrarFormEmail ? (
            <button
              onClick={() => setMostrarFormEmail(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              ACESSAR PORTAL PREMIUM
            </button>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Seu melhor email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus={true}
                className="w-full p-3 bg-purple-800 bg-opacity-50 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={processarPagamento}
                disabled={processandoPagamento || !email}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:transform-none disabled:shadow-lg"
              >
                {processandoPagamento ? 'Processando...' : 'CONFIRMAR PAGAMENTO'}
              </button>
            </div>
          )}
          
          <button 
            onClick={() => setShowPremiumModal(false)} 
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mystic-purple via-mystic-darkPurple to-black text-white font-poppins relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <MysticLogo />
          
          <h1 className="text-3xl md:text-5xl font-cinzel font-bold mb-6 bg-gradient-to-r from-mystic-gold to-yellow-300 bg-clip-text text-transparent leading-tight">
            Descubra as Respostas do Universo
          </h1>
          
          <h2 className="text-xl md:text-2xl font-cinzel mb-4 text-mystic-gold/90">
            com Física Quântica e Tarot Ancestral
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-mystic-gold font-semibold">
            3 Perguntas Grátis • 94.7% de Precisão Comprovada
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8 text-mystic-gold/80">
            <Users className="w-5 h-5" />
            <span className="font-medium">{onlineCount.toLocaleString()} pessoas online agora</span>
          </div>
          
          <Button 
            onClick={() => document.getElementById('questions')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-mystic-gold to-yellow-400 hover:from-mystic-gold/90 hover:to-yellow-400/90 text-mystic-purple font-bold text-lg px-8 py-4 rounded-full animate-pulse-glow transform hover:scale-105 transition-all duration-300"
          >
            FAZER MINHA PRIMEIRA PERGUNTA
          </Button>
        </section>

        {/* Questions Section */}
        <section id="questions" className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto bg-mystic-purple/50 border-mystic-gold/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-mystic-gold/20 rounded-full px-4 py-2 mb-4">
                  <Star className="w-4 h-4 text-mystic-gold" />
                  <span className="text-mystic-gold font-semibold">
                    Pergunta {questionsCount + 1} de 3 grátis
                  </span>
                </div>
              </div>

              <Textarea
                placeholder="Digite sua pergunta ao universo..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mb-6 bg-mystic-darkPurple/50 border-mystic-gold/30 text-white placeholder-mystic-gold/50 min-h-[120px] text-lg font-poppins focus:border-mystic-gold"
                disabled={isLoading}
              />

              <Button
                onClick={handleAskQuestion}
                disabled={isLoading || !question.trim()}
                className={`w-full bg-gradient-to-r from-mystic-gold to-yellow-400 hover:from-mystic-gold/90 hover:to-yellow-400/90 text-mystic-purple font-bold text-lg py-4 rounded-lg transition-all duration-300 ${
                  isShuffling ? 'animate-card-shuffle' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-mystic-purple/30 border-t-mystic-purple rounded-full animate-mystical-spin"></div>
                    Consultando as Cartas...
                  </div>
                ) : (
                  'Consultar as Cartas'
                )}
              </Button>

              {answer && (
                <div className="mt-8 p-6 bg-gradient-to-r from-mystic-gold/10 to-yellow-400/10 rounded-lg border border-mystic-gold/30 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-mystic-gold rounded-full animate-pulse"></div>
                    <span className="text-mystic-gold font-cinzel font-semibold">Resposta do Universo</span>
                  </div>
                  <p className="text-white text-lg leading-relaxed font-poppins">
                    {answer}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="bg-mystic-darkPurple/80 backdrop-blur-sm border-t border-mystic-gold/20 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-mystic-gold/80">
                <Shield className="w-4 h-4" />
                <span className="text-sm">SSL Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-mystic-gold/80">
                <Star className="w-4 h-4" />
                <span className="text-sm">Satisfação Garantida</span>
              </div>
              <div className="flex items-center gap-2 text-mystic-gold/80">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Suporte 24/7</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-mystic-gold/60">
              <a href="#" className="hover:text-mystic-gold transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-mystic-gold transition-colors">Privacidade</a>
              <a href="#" className="hover:text-mystic-gold transition-colors">Contato</a>
            </div>
            
            <div className="text-center mt-6 text-xs text-mystic-gold/40">
              © 2024 Madame do Luar. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>

      {showPremiumModal && <ModalBloqueio />}
    </div>
  );
};

export default Index;

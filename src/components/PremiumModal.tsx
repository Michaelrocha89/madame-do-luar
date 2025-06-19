
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Lock, Zap } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal = ({ isOpen, onClose }: PremiumModalProps) => {
  const handleSubscription = (plan: 'monthly' | 'yearly') => {
    console.log(`Subscription selected: ${plan}`);
    // Aqui seria a integração com Stripe/Mercado Pago
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-mystic-purple to-mystic-darkPurple border-mystic-gold/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-cinzel text-mystic-gold flex items-center justify-center gap-2">
            <Lock className="w-6 h-6" />
            Alinhamento Energético Necessário
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 p-4">
          <div className="text-mystic-gold/90 font-poppins">
            Para receber a resposta final do universo, é necessário um alinhamento energético mais profundo...
          </div>
          
          <div className="space-y-4">
            <div className="bg-mystic-gold/10 rounded-lg p-4 border border-mystic-gold/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-lg text-mystic-gold">Mensal</span>
                <Star className="w-5 h-5 text-mystic-gold" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">R$ 47/mês</div>
              <ul className="text-sm text-mystic-gold/80 space-y-1">
                <li>• Perguntas ilimitadas</li>
                <li>• Leituras personalizadas</li>
                <li>• Suporte prioritário</li>
              </ul>
              <Button
                onClick={() => handleSubscription('monthly')}
                className="w-full mt-3 bg-mystic-gold text-mystic-purple hover:bg-mystic-gold/90 font-poppins font-semibold"
              >
                Escolher Plano Mensal
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-mystic-gold/20 to-yellow-400/20 rounded-lg p-4 border-2 border-mystic-gold/50 relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-mystic-gold text-mystic-purple px-3 py-1 rounded-full text-xs font-bold">
                MAIS POPULAR
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-lg text-mystic-gold">Anual</span>
                <Zap className="w-5 h-5 text-mystic-gold" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">R$ 394/ano</div>
              <div className="text-sm text-green-400 mb-2">Economize R$ 170!</div>
              <ul className="text-sm text-mystic-gold/80 space-y-1">
                <li>• Perguntas ilimitadas</li>
                <li>• Leituras personalizadas</li>
                <li>• Suporte prioritário</li>
                <li>• Relatórios mensais</li>
                <li>• Acesso antecipado</li>
              </ul>
              <Button
                onClick={() => handleSubscription('yearly')}
                className="w-full mt-3 bg-gradient-to-r from-mystic-gold to-yellow-400 text-mystic-purple hover:from-mystic-gold/90 hover:to-yellow-400/90 font-poppins font-semibold animate-pulse-glow"
              >
                Escolher Plano Anual
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-mystic-gold/60 font-poppins">
            Pagamento seguro • Cancele quando quiser • Satisfação garantida
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;

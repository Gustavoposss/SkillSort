
import { useState } from 'react';
import { usePlayers } from '@/hooks/usePlayers';
import { PlayerForm } from '@/components/PlayerForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AddPlayer() {
  const navigate = useNavigate();
  const { addPlayer } = usePlayers();

  const handleSubmit = async (nome: string, estrelas: number) => {
    const success = await addPlayer(nome, estrelas);
    if (success) {
      navigate('/');
    }
    return success;
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <PlayerForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}

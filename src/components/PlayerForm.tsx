
import { useState, useEffect } from 'react';
import { Player } from '@/types/player';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from './StarRating';

interface PlayerFormProps {
  player?: Player;
  onSubmit: (nome: string, estrelas: number) => Promise<boolean>;
  onCancel: () => void;
}

export const PlayerForm = ({ player, onSubmit, onCancel }: PlayerFormProps) => {
  const [nome, setNome] = useState(player?.nome || '');
  const [estrelas, setEstrelas] = useState(player?.estrelas || 3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (player) {
      setNome(player.nome);
      setEstrelas(player.estrelas);
    }
  }, [player]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    setLoading(true);
    const success = await onSubmit(nome.trim(), estrelas);
    setLoading(false);

    if (success) {
      if (!player) {
        setNome('');
        setEstrelas(3);
      }
      onCancel();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="text-center">
          {player ? 'Editar Jogador' : 'Adicionar Jogador'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
              Nome do Jogador *
            </Label>
            <Input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do jogador"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 block mb-3">
              Nível de Habilidade *
            </Label>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <StarRating
                rating={estrelas}
                size="lg"
                interactive
                onRatingChange={setEstrelas}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {estrelas}/5 estrelas
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              disabled={loading || !nome.trim()}
            >
              {loading ? 'Salvando...' : player ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

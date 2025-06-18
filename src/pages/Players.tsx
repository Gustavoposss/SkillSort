
import { useState } from 'react';
import { usePlayers } from '@/hooks/usePlayers';
import { Player } from '@/types/player';
import { PlayerCard } from '@/components/PlayerCard';
import { PlayerForm } from '@/components/PlayerForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, RotateCcw, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Players() {
  const navigate = useNavigate();
  const { players, loading, addPlayer, updatePlayer, deletePlayer, resetAllPlayers } = usePlayers();
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | undefined>();

  const handleSubmit = async (nome: string, estrelas: number) => {
    if (editingPlayer) {
      return await updatePlayer(editingPlayer.id, nome, estrelas);
    } else {
      return await addPlayer(nome, estrelas);
    }
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlayer(undefined);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este jogador?')) {
      await deletePlayer(id);
    }
  };

  const handleReset = async () => {
    if (confirm('Tem certeza que deseja remover TODOS os jogadores? Esta ação não pode ser desfeita.')) {
      await resetAllPlayers();
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <PlayerForm
            player={editingPlayer}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Jogadores
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Stats Card */}
        <Card className="mb-6 border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total de Jogadores</span>
              <span className="text-2xl font-bold text-green-600">{players.length}</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setShowForm(true)}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Jogador
          </Button>
          {players.length > 0 && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          )}
        </div>

        {/* Players List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando jogadores...</p>
          </div>
        ) : players.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum jogador cadastrado
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione jogadores para começar a sortear os times!
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Jogador
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

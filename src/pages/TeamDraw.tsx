
import { useState, useEffect } from 'react';
import { usePlayers } from '@/hooks/usePlayers';
import { balanceTeams } from '@/utils/teamBalancer';
import { Team } from '@/types/player';
import { TeamDisplay } from '@/components/TeamDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Shuffle, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeamDraw() {
  const navigate = useNavigate();
  const { players, loading } = usePlayers();
  const [teams, setTeams] = useState<[Team, Team] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = async () => {
    if (players.length < 2) return;
    
    setIsDrawing(true);
    
    // Adicionar animação de loading
    setTimeout(() => {
      const [teamA, teamB] = balanceTeams(players);
      setTeams([teamA, teamB]);
      setIsDrawing(false);
    }, 1500);
  };

  useEffect(() => {
    if (players.length >= 2 && !teams) {
      handleDraw();
    }
  }, [players]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando jogadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
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
            <Trophy className="w-6 h-6" />
            Sorteio de Times
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {players.length < 2 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Jogadores insuficientes
              </h3>
              <p className="text-gray-500 mb-6">
                É necessário pelo menos 2 jogadores para sortear os times.
              </p>
              <Button
                onClick={() => navigate('/add-player')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Adicionar Jogadores
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Draw Button */}
            <div className="text-center mb-8">
              <Button
                onClick={handleDraw}
                disabled={isDrawing}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-4"
              >
                {isDrawing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sorteando...
                  </>
                ) : (
                  <>
                    <Shuffle className="w-5 h-5 mr-2" />
                    Sortear Novamente
                  </>
                )}
              </Button>
              <p className="text-gray-600 mt-2">
                {players.length} jogadores • Total de {players.reduce((sum, p) => sum + p.estrelas, 0)} estrelas
              </p>
            </div>

            {/* Teams Display */}
            {isDrawing ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <Shuffle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700">
                    Equilibrando os times...
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Distribuindo jogadores de forma equilibrada
                  </p>
                </div>
              </div>
            ) : teams ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-fade-in">
                  <TeamDisplay team={teams[0]} color="green" />
                </div>
                <div className="animate-fade-in animation-delay-200">
                  <TeamDisplay team={teams[1]} color="blue" />
                </div>
              </div>
            ) : null}

            {/* Balance Info */}
            {teams && !isDrawing && (
              <Card className="mt-8 border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">Equilíbrio dos Times</h3>
                    <div className="flex justify-center items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{teams[0].totalStars}</div>
                        <div className="text-sm text-gray-600">Time A</div>
                      </div>
                      <div className="text-gray-400">vs</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{teams[1].totalStars}</div>
                        <div className="text-sm text-gray-600">Time B</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Diferença: {Math.abs(teams[0].totalStars - teams[1].totalStars)} estrela(s)
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

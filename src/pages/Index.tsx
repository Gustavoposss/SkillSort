
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Plus, Shuffle, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayers } from '@/hooks/usePlayers';


const Index = () => {
  const navigate = useNavigate();
  const { players, loading } = usePlayers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">Skillsort</h1>
          </div>
          <p className="text-xl opacity-90">
            Sorteie times equilibrados para seus jogos de futebol!
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {loading ? '...' : players.length}
                </div>
                <div className="text-gray-600">Jogadores Cadastrados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {loading ? '...' : players.reduce((sum, p) => sum + p.estrelas, 0)}
                </div>
                <div className="text-gray-600">Total de Estrelas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Actions */}
        <div className="grid gap-6">
          <Button
            onClick={() => navigate('/players')}
            className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-xl font-semibold shadow-lg"
          >
            <Users className="w-8 h-8 mr-3" />
            Ver Jogadores
          </Button>

          <Button
            onClick={() => navigate('/add-player')}
            className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xl font-semibold shadow-lg"
          >
            <Plus className="w-8 h-8 mr-3" />
            Adicionar Jogador
          </Button>

          <Button
            onClick={() => navigate('/team-draw')}
            disabled={players.length < 2}
            className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-8 h-8 mr-3" />
            Sortear Times
            {players.length < 2 && (
              <span className="ml-2 text-sm opacity-75">
                (Mín. 2 jogadores)
              </span>
            )}
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Como Funciona?</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Cadastre os jogadores com suas habilidades (1-5 estrelas)</li>
                <li>• O algoritmo distribui automaticamente os players</li>
                <li>• Times são balanceados pela soma total de estrelas</li>
                <li>• Sorteios aleatórios para maior diversão!</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Próximos Jogos</h3>
              <div className="text-gray-600 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Segunda-feira</span>
                  <span className="font-medium">19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Quarta-feira</span>
                  <span className="font-medium">19:00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

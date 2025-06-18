
import { Team } from '@/types/player';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from './StarRating';
import { Trophy } from 'lucide-react';

interface TeamDisplayProps {
  team: Team;
  color: 'green' | 'blue';
}

export const TeamDisplay = ({ team, color }: TeamDisplayProps) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600 border-green-500',
    blue: 'from-blue-500 to-blue-600 border-blue-500'
  };

  return (
    <Card className={`border-l-4 ${colorClasses[color]} hover:shadow-lg transition-shadow`}>
      <CardHeader className={`bg-gradient-to-r ${colorClasses[color]} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            {team.name}
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={team.totalStars} maxRating={team.totalStars} size="sm" />
            <span className="font-bold">{team.totalStars}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {team.players.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhum jogador neste time</p>
        ) : (
          <div className="space-y-3">
            {team.players.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colorClasses[color]} text-white flex items-center justify-center font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <span className="font-medium">{player.nome}</span>
                </div>
                <StarRating rating={player.estrelas} size="sm" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

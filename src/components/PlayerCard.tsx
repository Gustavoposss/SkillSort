
import { Player } from '@/types/player';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (id: string) => void;
}

export const PlayerCard = ({ player, onEdit, onDelete }: PlayerCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{player.nome}</h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={player.estrelas} size="sm" />
              <span className="text-sm text-gray-600">({player.estrelas}/5)</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(player)}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(player.id)}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

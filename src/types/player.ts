
export interface Player {
  id: string;
  nome: string;
  estrelas: number;
  created_at: string;
}

export interface Team {
  name: string;
  players: Player[];
  totalStars: number;
}

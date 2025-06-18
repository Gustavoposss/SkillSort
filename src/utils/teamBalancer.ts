
import { Player, Team } from '@/types/player';

export const balanceTeams = (players: Player[]): [Team, Team] => {
  if (players.length === 0) {
    return [
      { name: 'Time A', players: [], totalStars: 0 },
      { name: 'Time B', players: [], totalStars: 0 }
    ];
  }

  // Embaralhar jogadores para randomizar o sorteio
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  
  // Ordenar por estrelas (decrescente) para melhor distribuição
  const sorted = shuffled.sort((a, b) => b.estrelas - a.estrelas);
  
  const teamA: Player[] = [];
  const teamB: Player[] = [];
  let starsA = 0;
  let starsB = 0;

  // Distribuir jogadores alternadamente, sempre no time com menos estrelas
  for (const player of sorted) {
    if (starsA <= starsB) {
      teamA.push(player);
      starsA += player.estrelas;
    } else {
      teamB.push(player);
      starsB += player.estrelas;
    }
  }

  return [
    { name: 'Time A', players: teamA, totalStars: starsA },
    { name: 'Time B', players: teamB, totalStars: starsB }
  ];
};

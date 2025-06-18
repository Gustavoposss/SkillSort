
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Player } from '@/types/player';
import { useToast } from '@/hooks/use-toast';

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jogadores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os jogadores",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addPlayer = async (nome: string, estrelas: number) => {
    try {
      const { data, error } = await supabase
        .from('jogadores')
        .insert([{ nome, estrelas }])
        .select()
        .single();

      if (error) throw error;
      
      setPlayers(prev => [data, ...prev]);
      toast({
        title: "Sucesso!",
        description: `${nome} foi adicionado aos jogadores`,
      });
      return true;
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o jogador",
        variant: "destructive"
      });
      return false;
    }
  };

  const updatePlayer = async (id: string, nome: string, estrelas: number) => {
    try {
      const { data, error } = await supabase
        .from('jogadores')
        .update({ nome, estrelas })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setPlayers(prev => prev.map(p => p.id === id ? data : p));
      toast({
        title: "Sucesso!",
        description: `${nome} foi atualizado`,
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar jogador:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o jogador",
        variant: "destructive"
      });
      return false;
    }
  };

  const deletePlayer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('jogadores')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPlayers(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Sucesso!",
        description: "Jogador removido",
      });
    } catch (error) {
      console.error('Erro ao deletar jogador:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o jogador",
        variant: "destructive"
      });
    }
  };

  const resetAllPlayers = async () => {
    try {
      const { error } = await supabase
        .from('jogadores')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) throw error;
      
      setPlayers([]);
      toast({
        title: "Sucesso!",
        description: "Todos os jogadores foram removidos",
      });
    } catch (error) {
      console.error('Erro ao resetar jogadores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível resetar os jogadores",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPlayers();

    // Configurar realtime
    const channel = supabase
      .channel('jogadores-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jogadores' },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    players,
    loading,
    addPlayer,
    updatePlayer,
    deletePlayer,
    resetAllPlayers,
    refetch: fetchPlayers
  };
};

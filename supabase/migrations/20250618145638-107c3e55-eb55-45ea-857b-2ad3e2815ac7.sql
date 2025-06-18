
-- Criar tabela para os jogadores
CREATE TABLE public.jogadores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  estrelas INTEGER NOT NULL CHECK (estrelas >= 1 AND estrelas <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (permitindo acesso público inicialmente)
ALTER TABLE public.jogadores ENABLE ROW LEVEL SECURITY;

-- Política que permite SELECT público (sem autenticação)
CREATE POLICY "Permitir leitura pública de jogadores" 
  ON public.jogadores 
  FOR SELECT 
  USING (true);

-- Política que permite INSERT público
CREATE POLICY "Permitir inserção pública de jogadores" 
  ON public.jogadores 
  FOR INSERT 
  WITH CHECK (true);

-- Política que permite UPDATE público
CREATE POLICY "Permitir atualização pública de jogadores" 
  ON public.jogadores 
  FOR UPDATE 
  USING (true);

-- Política que permite DELETE público
CREATE POLICY "Permitir exclusão pública de jogadores" 
  ON public.jogadores 
  FOR DELETE 
  USING (true);

-- Habilitar realtime para atualizações em tempo real
ALTER TABLE public.jogadores REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jogadores;

CREATE TABLE public.progresso (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.progresso TO authenticated;
GRANT ALL ON public.progresso TO service_role;
ALTER TABLE public.progresso ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own progresso" ON public.progresso FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.provas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT,
  titulo TEXT NOT NULL,
  data DATE NOT NULL,
  hora TEXT,
  observacao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.provas TO authenticated;
GRANT ALL ON public.provas TO service_role;
ALTER TABLE public.provas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own provas" ON public.provas FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.anotacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT,
  titulo TEXT NOT NULL DEFAULT 'Sem título',
  conteudo TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.anotacoes TO authenticated;
GRANT ALL ON public.anotacoes TO service_role;
ALTER TABLE public.anotacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own anotacoes" ON public.anotacoes FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.preferencias (
  user_id UUID NOT NULL PRIMARY KEY,
  tema TEXT NOT NULL DEFAULT 'caderno',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.preferencias TO authenticated;
GRANT ALL ON public.preferencias TO service_role;
ALTER TABLE public.preferencias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own preferencias" ON public.preferencias FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
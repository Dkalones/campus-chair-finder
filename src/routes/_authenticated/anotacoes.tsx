import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { BY_CODE, DISCIPLINAS } from "@/data/curriculo";

export const Route = createFileRoute("/_authenticated/anotacoes")({
  head: () => ({
    meta: [
      { title: "Anotações — Meu Caderno da Grade" },
      {
        name: "description",
        content: "Anote resumos, dúvidas e lembretes por disciplina.",
      },
      { property: "og:title", content: "Anotações — Meu Caderno da Grade" },
      {
        property: "og:description",
        content: "Caderno de anotações vinculadas às disciplinas do seu curso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnotacoesPage,
});

type Anotacao = {
  id: string;
  code: string | null;
  titulo: string;
  conteudo: string;
  updated_at: string;
};

function AnotacoesPage() {
  const qc = useQueryClient();
  const [selecionada, setSelecionada] = useState<Anotacao | null>(null);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [code, setCode] = useState("");
  const [busca, setBusca] = useState("");
  const salvoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: anotacoes } = useQuery({
    queryKey: ["anotacoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("anotacoes")
        .select("id,code,titulo,conteudo,updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as Anotacao[];
    },
  });

  const criar = useMutation({
    mutationFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) throw new Error("Sessão expirada");
      const { data, error } = await supabase
        .from("anotacoes")
        .insert({
          user_id: uid,
          titulo: "Sem título",
          conteudo: "",
          code: null,
        })
        .select()
        .single();
      if (error) throw error;
      return data as Anotacao;
    },
    onSuccess: (nova) => {
      void qc.invalidateQueries({ queryKey: ["anotacoes"] });
      setSelecionada(nova);
      setTitulo(nova.titulo);
      setConteudo(nova.conteudo);
      setCode(nova.code ?? "");
    },
  });

  const atualizar = useMutation({
    mutationFn: async ({
      id,
      titulo,
      conteudo,
      code,
    }: {
      id: string;
      titulo: string;
      conteudo: string;
      code: string;
    }) => {
      const { error } = await supabase
        .from("anotacoes")
        .update({
          titulo,
          conteudo,
          code: code || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["anotacoes"] }),
  });

  const apagar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("anotacoes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["anotacoes"] });
      setSelecionada(null);
      setTitulo("");
      setConteudo("");
      setCode("");
    },
  });

  // Auto-save com debounce de 1s
  useEffect(() => {
    if (!selecionada) return;
    if (salvoRef.current) clearTimeout(salvoRef.current);
    salvoRef.current = setTimeout(() => {
      atualizar.mutate({ id: selecionada.id, titulo, conteudo, code });
    }, 1000);
    return () => {
      if (salvoRef.current) clearTimeout(salvoRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titulo, conteudo, code]);

  function abrirAnotacao(a: Anotacao) {
    // salva a anterior imediatamente antes de trocar
    if (selecionada && selecionada.id !== a.id) {
      atualizar.mutate({ id: selecionada.id, titulo, conteudo, code });
    }
    setSelecionada(a);
    setTitulo(a.titulo);
    setConteudo(a.conteudo);
    setCode(a.code ?? "");
  }

  const filtradas = (anotacoes ?? []).filter((a) => {
    const t = busca.trim().toLowerCase();
    if (!t) return true;
    return (
      a.titulo.toLowerCase().includes(t) ||
      a.conteudo.toLowerCase().includes(t) ||
      (a.code ?? "").toLowerCase().includes(t)
    );
  });

  function dataFormatada(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-[1440px] px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-semibold">Anotações</h1>
            <p className="mt-1 max-w-[52ch] text-ink/65">
              Escreva resumos, dúvidas e lembretes. Cada nota pode ser vinculada a uma disciplina.
            </p>
          </div>
          <button
            onClick={() => criar.mutate()}
            disabled={criar.isPending}
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-paper disabled:opacity-60 hover:-translate-y-0.5 transition-transform"
          >
            + Nova anotação
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          {/* Lista lateral */}
          <div className="flex flex-col gap-3">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar anotações..."
              className="rounded-lg bg-surface px-4 py-2 text-sm outline-none ring-doodle placeholder:text-ink/40 focus:ring-2 focus:ring-brand/60"
            />
            <div className="flex max-h-[calc(100vh-280px)] flex-col gap-2 overflow-y-auto pr-1">
              {filtradas.length === 0 && (
                <p className="rounded-2xl bg-surface p-4 text-sm text-ink/50 ring-doodle">
                  {busca ? "Nenhuma anotação encontrada." : "Crie sua primeira anotação acima!"}
                </p>
              )}
              {filtradas.map((a) => (
                <button
                  key={a.id}
                  onClick={() => abrirAnotacao(a)}
                  className={`rounded-xl p-3 text-left ring-1 transition-all hover:-translate-y-0.5 ${
                    selecionada?.id === a.id
                      ? "bg-brand/15 ring-2 ring-brand"
                      : "bg-surface ring-ink/15 hover:bg-amber/20"
                  }`}
                >
                  <p className="text-sm font-semibold leading-tight">
                    {a.titulo || "Sem título"}
                  </p>
                  {a.code && (
                    <p className="mt-0.5 text-[11px] text-ink/55">
                      {a.code} · {BY_CODE[a.code]?.nome ?? a.code}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] text-ink/40">{dataFormatada(a.updated_at)}</p>
                  {a.conteudo && (
                    <p className="mt-1 line-clamp-2 text-[11px] text-ink/55">{a.conteudo}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          {selecionada ? (
            <div className="flex flex-col gap-3 rounded-2xl bg-surface p-5 ring-doodle">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="rounded-lg bg-paper px-3 py-2 text-sm outline-none ring-doodle"
                >
                  <option value="">Sem disciplina</option>
                  {DISCIPLINAS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} · {d.nome}
                    </option>
                  ))}
                </select>
                <span className="ml-auto text-[11px] text-ink/40">
                  {atualizar.isPending ? "Salvando..." : "Salvo automaticamente"}
                </span>
                <button
                  onClick={() => {
                    if (confirm("Apagar esta anotação?")) apagar.mutate(selecionada.id);
                  }}
                  className="rounded-lg px-3 py-2 text-sm text-berry ring-1 ring-dashed ring-berry/40 hover:bg-berry/10"
                >
                  Apagar
                </button>
              </div>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da anotação"
                className="rounded-lg bg-paper px-4 py-3 font-display text-2xl font-bold outline-none ring-doodle focus:ring-2 focus:ring-brand/60"
              />
              <textarea
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Escreva aqui seus resumos, dúvidas, fórmulas..."
                rows={18}
                className="flex-1 resize-none rounded-lg bg-paper px-4 py-3 font-body text-sm leading-relaxed text-ink outline-none ring-doodle focus:ring-2 focus:ring-brand/60"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl bg-surface p-10 ring-doodle">
              <p className="text-center text-ink/50">
                Selecione uma anotação ao lado ou crie uma nova.
              </p>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}

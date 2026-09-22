import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import {
  BY_CODE,
  CARGA_TOTAL,
  DEPENDENTES,
  DISCIPLINAS,
  PERIODOS,
  type Disciplina,
} from "@/data/curriculo";

export const Route = createFileRoute("/_authenticated/grade")({
  head: () => ({
    meta: [
      { title: "Grade Curricular — Meu Caderno da Grade" },
      {
        name: "description",
        content:
          "Marque as disciplinas concluídas, veja os pré-requisitos de cada cadeira e quantas horas faltam para concluir.",
      },
      { property: "og:title", content: "Grade Curricular — Meu Caderno da Grade" },
      {
        property: "og:description",
        content: "Progresso por período, pré-requisitos e horas cumpridas do curso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GradePage,
});

type Marcacao = "concluida" | "cursando";
type Estado = Marcacao | "disponivel" | "bloqueada";
type Filtro = "todas" | "disponiveis" | "faltando";

const ESTADO_LABEL: Record<Estado, string> = {
  concluida: "Concluída",
  cursando: "Em andamento",
  disponivel: "Disponível",
  bloqueada: "Bloqueada",
};

const CARD_STYLE: Record<Estado, string> = {
  concluida: "bg-accent-green/15 ring-accent-green/40 text-ink",
  cursando: "bg-brand/15 ring-brand/40 text-ink",
  disponivel: "bg-amber/20 ring-amber/50 text-ink",
  bloqueada: "bg-berry/10 ring-berry/30 text-ink/45",
};

const DOT_STYLE: Record<Estado, string> = {
  concluida: "bg-accent-green",
  cursando: "bg-brand",
  disponivel: "bg-amber",
  bloqueada: "bg-berry",
};

function GradePage() {
  const qc = useQueryClient();
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [destaque, setDestaque] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  const { data: linhas } = useQuery({
    queryKey: ["progresso"],
    queryFn: async () => {
      const { data, error } = await supabase.from("progresso").select("code,status");
      if (error) throw error;
      return data;
    },
  });

  const marcacoes = useMemo(() => {
    const m: Record<string, Marcacao> = {};
    (linhas ?? []).forEach((l) => {
      if (l.status === "concluida" || l.status === "cursando") m[l.code] = l.status;
    });
    return m;
  }, [linhas]);

  const salvar = useMutation({
    mutationFn: async ({ code, marca }: { code: string; marca: Marcacao | null }) => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) throw new Error("Sessão expirada");
      if (marca === null) {
        const { error } = await supabase
          .from("progresso")
          .delete()
          .eq("user_id", uid)
          .eq("code", code);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("progresso")
          .upsert(
            { user_id: uid, code, status: marca, updated_at: new Date().toISOString() },
            { onConflict: "user_id,code" },
          );
        if (error) throw error;
      }
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["progresso"] }),
  });

  const limparTudo = useMutation({
    mutationFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) return;
      const { error } = await supabase.from("progresso").delete().eq("user_id", uid);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["progresso"] }),
  });

  const estados = useMemo(() => {
    const map: Record<string, Estado> = {};
    DISCIPLINAS.forEach((d) => {
      const marca = marcacoes[d.code];
      if (marca) {
        map[d.code] = marca;
        return;
      }
      const liberada = d.prereqs.every((p) => marcacoes[p] === "concluida");
      map[d.code] = liberada ? "disponivel" : "bloqueada";
    });
    return map;
  }, [marcacoes]);

  const stats = useMemo(() => {
    let horasFeitas = 0;
    const contagem: Record<Estado, number> = {
      concluida: 0,
      cursando: 0,
      disponivel: 0,
      bloqueada: 0,
    };
    DISCIPLINAS.forEach((d) => {
      const e = estados[d.code] ?? "bloqueada";
      contagem[e] += 1;
      if (e === "concluida") horasFeitas += d.horas;
    });
    const pct = Math.round((horasFeitas / CARGA_TOTAL) * 100);
    return { horasFeitas, restantes: CARGA_TOTAL - horasFeitas, pct, contagem };
  }, [estados]);

  const relacionadas = useMemo(() => {
    const foco = destaque ?? selecionada;
    if (!foco) return new Set<string>();
    const d = BY_CODE[foco];
    return new Set<string>([...(d?.prereqs ?? []), ...(DEPENDENTES[foco] ?? [])]);
  }, [destaque, selecionada]);

  const termo = busca.trim().toLowerCase();

  function visivel(d: Disciplina) {
    const e = estados[d.code];
    if (termo && !d.nome.toLowerCase().includes(termo) && !d.code.toLowerCase().includes(termo))
      return false;
    if (filtro === "disponiveis") return e === "disponivel";
    if (filtro === "faltando") return e !== "concluida";
    return true;
  }

  function definir(code: string, marca: Marcacao | null) {
    salvar.mutate({ code, marca });
  }

  const atual = selecionada ? BY_CODE[selecionada] : null;

  return (
    <AppShell>
      <section className="mx-auto max-w-[1440px] px-4 pb-3 pt-5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar disciplina..."
            className="rounded-lg bg-surface px-4 py-2 text-sm outline-none ring-doodle placeholder:text-ink/40 focus:ring-2 focus:ring-brand/60"
          />
          {(
            [
              ["todas", "Todas"],
              ["disponiveis", "Disponíveis agora"],
              ["faltando", "Só faltando"],
            ] as [Filtro, string][]
          ).map(([valor, label]) => (
            <button
              key={valor}
              onClick={() => setFiltro(valor)}
              className={
                filtro === valor
                  ? "-rotate-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-paper ring-doodle"
                  : "rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-dashed ring-ink/30 transition-all hover:-rotate-1 hover:bg-amber/30"
              }
            >
              {label}
            </button>
          ))}
          <span className="hidden h-4 w-px bg-ink/10 sm:block" />
          {(["concluida", "cursando", "disponivel", "bloqueada"] as Estado[]).map((e) => (
            <span key={e} className="flex items-center gap-1.5 text-[11px]">
              <i className={`size-2.5 rounded-full ${DOT_STYLE[e]}`} />
              {ESTADO_LABEL[e]} <span className="text-ink/45">({stats.contagem[e]})</span>
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h1 className="max-w-[22ch] text-balance font-display text-4xl font-semibold leading-tight">
              Seu mapa de disciplinas, do 1º ao 10º período
            </h1>
            <p className="mt-2 max-w-[54ch] text-pretty text-base text-ink/65">
              Clique numa disciplina para marcar como concluída. Cada cartão mostra os
              pré-requisitos como na grade oficial.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-3 w-56 overflow-hidden rounded-full bg-surface ring-doodle">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent-green/80 transition-all duration-500"
                  style={{ width: `${stats.pct}%` }}
                />
              </div>
              <p className="text-sm">
                <span className="font-semibold">{stats.pct}%</span> concluído
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-surface px-4 py-3 ring-doodle">
              <p className="text-[11px] uppercase tracking-wide text-ink/45">Cumpridas</p>
              <p className="font-display text-2xl font-semibold text-accent-green">
                {stats.horasFeitas}{" "}
                <span className="text-sm font-medium text-ink/45">/ {CARGA_TOTAL} h</span>
              </p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-3 ring-doodle">
              <p className="text-[11px] uppercase tracking-wide text-ink/45">Restantes</p>
              <p className="font-display text-2xl font-semibold text-ink">
                {stats.restantes} <span className="text-sm font-medium text-ink/45">h</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-4">
        <div className="overflow-x-auto rounded-2xl bg-surface p-1 ring-doodle">
          <div className="grid min-w-[1180px] grid-cols-10 divide-x divide-ink/10">
            {PERIODOS.map((p) => {
              const lista = DISCIPLINAS.filter((d) => d.periodo === p && visivel(d));
              return (
                <div key={p} className="p-2">
                  <div className="mb-2 rounded-lg bg-ink px-2 py-1 text-center font-display text-sm font-bold text-paper">
                    {p}º
                  </div>
                  <div className="flex flex-col gap-2">
                    {lista.map((d) => {
                      const e = estados[d.code] ?? "bloqueada";
                      const ligada = relacionadas.has(d.code);
                      return (
                        <button
                          key={d.code}
                          onClick={() => {
                            setSelecionada(d.code);
                            definir(d.code, marcacoes[d.code] === "concluida" ? null : "concluida");
                          }}
                          onMouseEnter={() => setDestaque(d.code)}
                          onMouseLeave={() => setDestaque(null)}
                          title={
                            d.prereqs.length
                              ? `Pré-requisitos: ${d.prereqs
                                  .map((p2) => BY_CODE[p2]?.nome ?? p2)
                                  .join(", ")}`
                              : "Sem pré-requisitos"
                          }
                          className={`cursor-pointer rounded-xl p-2 text-left ring-1 transition-all duration-200 hover:-translate-y-0.5 ${CARD_STYLE[e]} ${
                            ligada ? "ring-2 ring-ink/60" : ""
                          } ${selecionada === d.code ? "ring-2 ring-brand" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <p className="text-[11px] font-semibold leading-tight">{d.nome}</p>
                            {e === "concluida" && (
                              <span className="text-[11px] text-accent-green">✓</span>
                            )}
                          </div>
                          <p className="text-[10px] text-ink/50">
                            {d.eletiva ? "Variável" : `${d.horas}h`} · {d.code}
                          </p>
                          <p className="mt-1 text-[10px] leading-tight text-ink/55">
                            {d.prereqs.length ? (
                              <>
                                <span className="text-ink/40">Pré:</span> {d.prereqs.join(" · ")}
                              </>
                            ) : (
                              <span className="text-ink/35">sem pré-requisito</span>
                            )}
                          </p>
                        </button>
                      );
                    })}
                    {lista.length === 0 && (
                      <p className="px-1 py-2 text-center text-[10px] text-ink/35">—</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-4 pb-12">
        {atual ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="rounded-2xl bg-ink p-5 text-paper ring-doodle">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-paper/15 px-2.5 py-1 text-[11px] font-semibold">
                  {ESTADO_LABEL[estados[atual.code] ?? "bloqueada"]}
                </span>
                <span className="text-[11px] text-paper/50">
                  Período {atual.periodo} · código {atual.code}
                </span>
              </div>
              <h2 className="mt-3 max-w-[30ch] text-balance font-display text-3xl font-bold">
                {atual.nome}
              </h2>
              <p className="mt-1 text-pretty text-sm text-paper/60">
                {atual.eletiva ? "Carga horária variável" : `${atual.horas}h`} · Campus VIII /
                Araruna-PB
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-paper/45">Pré-requisitos:</span>
                {atual.prereqs.length === 0 && (
                  <span className="text-[11px] text-paper/70">nenhum</span>
                )}
                {atual.prereqs.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelecionada(p)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      estados[p] === "concluida"
                        ? "bg-accent-green/25 text-accent-green"
                        : "bg-berry/25 text-paper"
                    }`}
                  >
                    {p} · {BY_CODE[p]?.nome ?? p}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-paper/45">Libera:</span>
                {(DEPENDENTES[atual.code] ?? []).length === 0 && (
                  <span className="text-[11px] text-paper/70">nenhuma</span>
                )}
                {(DEPENDENTES[atual.code] ?? []).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelecionada(c)}
                    className="rounded-full bg-paper/10 px-2.5 py-1 text-[11px] font-medium"
                  >
                    {BY_CODE[c]?.nome ?? c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <button
                onClick={() => definir(atual.code, "concluida")}
                className="rounded-full bg-accent-green px-4 py-3 text-sm font-semibold text-paper"
              >
                Marcar concluída
              </button>
              <button
                onClick={() => definir(atual.code, "cursando")}
                className="rounded-full bg-brand px-4 py-3 text-sm font-semibold text-paper"
              >
                Em andamento
              </button>
              <button
                onClick={() => definir(atual.code, null)}
                className="rounded-full px-4 py-3 text-sm font-medium ring-1 ring-ink/25 transition-colors hover:bg-mist"
              >
                Limpar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-5 ring-doodle">
            <p className="text-sm text-ink/60">
              Selecione uma disciplina para ver pré-requisitos, o que ela libera e mudar o status.
            </p>
            <button
              onClick={() => limparTudo.mutate()}
              className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-ink/25 transition-colors hover:bg-mist"
            >
              Limpar tudo
            </button>
          </div>
        )}
      </section>
    </AppShell>
  );
}

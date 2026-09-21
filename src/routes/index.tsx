import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BY_CODE,
  CARGA_TOTAL,
  DEPENDENTES,
  DISCIPLINAS,
  PERIODOS,
  type Disciplina,
} from "@/data/curriculo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grade Curricular Interativa — Engenharia Civil UEPB" },
      {
        name: "description",
        content:
          "Marque as disciplinas concluídas, veja pré-requisitos, o que já está liberado e quantas horas faltam para concluir Engenharia Civil na UEPB.",
      },
      { property: "og:title", content: "Grade Curricular Interativa — Engenharia Civil UEPB" },
      {
        property: "og:description",
        content:
          "Acompanhe seu progresso no curso: cadeiras concluídas, em andamento, disponíveis e bloqueadas por pré-requisito.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Marcacao = "concluida" | "cursando";
type Estado = Marcacao | "disponivel" | "bloqueada";
type Filtro = "todas" | "disponiveis" | "faltando";

const STORAGE_KEY = "grade-eng-civil-uepb";

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

function Index() {
  const [marcacoes, setMarcacoes] = useState<Record<string, Marcacao>>({});
  const [carregado, setCarregado] = useState(false);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [destaque, setDestaque] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMarcacoes(JSON.parse(raw));
    } catch {
      /* ignora */
    }
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marcacoes));
  }, [marcacoes, carregado]);

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
    setMarcacoes((prev) => {
      const next = { ...prev };
      if (marca === null) delete next[code];
      else next[code] = marca;
      return next;
    });
  }

  function alternar(code: string) {
    const atual = marcacoes[code];
    definir(code, atual === "concluida" ? null : "concluida");
  }

  const atual = selecionada ? BY_CODE[selecionada] : null;

  return (
    <main className="min-h-screen bg-paper font-body text-ink antialiased">
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur ring-1 ring-black/5">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-semibold text-paper">
                C
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-none">Grade Curricular</p>
                <p className="text-[11px] text-ink/55">Engenharia Civil · UEPB</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar disciplina..."
                className="rounded-full bg-surface px-4 py-2 text-sm outline-none ring-1 ring-black/5 placeholder:text-ink/40 focus:ring-brand/50"
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
                      ? "rounded-full border border-brand bg-brand px-3 py-2 text-sm font-medium text-paper"
                      : "rounded-full px-3 py-2 text-sm font-medium ring-1 ring-black/5 transition-colors hover:bg-mist"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pb-3 sm:gap-3">
            {(["concluida", "cursando", "disponivel", "bloqueada"] as Estado[]).map((e) => (
              <span key={e} className="flex items-center gap-1.5 text-[11px]">
                <i className={`size-2.5 rounded-full ${DOT_STYLE[e]}`} />
                {ESTADO_LABEL[e]} <span className="text-ink/45">({stats.contagem[e]})</span>
              </span>
            ))}
            <span className="hidden h-4 w-px bg-ink/10 sm:block" />
            <div className="flex items-center gap-3">
              <div className="relative h-2.5 w-40 overflow-hidden rounded-full bg-mist">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent-green transition-all duration-500"
                  style={{ width: `${stats.pct}%` }}
                />
              </div>
              <p className="text-sm">
                <span className="font-semibold">{stats.pct}%</span> concluído
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-4 pt-6 pb-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h1 className="max-w-[20ch] text-balance font-display text-4xl font-semibold leading-tight">
              Seu mapa de disciplinas, do 1º ao 10º período
            </h1>
            <p className="mt-2 max-w-[52ch] text-pretty text-base text-ink/65">
              Clique numa disciplina para marcar como concluída. Passe o mouse para ver
              pré-requisitos e o que ela libera.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-surface px-4 py-3 ring-1 ring-black/5">
              <p className="text-[11px] uppercase tracking-wide text-ink/45">Cumpridas</p>
              <p className="font-display text-2xl font-semibold text-accent-green">
                {stats.horasFeitas}{" "}
                <span className="text-sm font-medium text-ink/45">/ {CARGA_TOTAL} h</span>
              </p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-3 ring-1 ring-black/5">
              <p className="text-[11px] uppercase tracking-wide text-ink/45">Restantes</p>
              <p className="font-display text-2xl font-semibold text-ink">
                {stats.restantes} <span className="text-sm font-medium text-ink/45">h</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1440px] px-4 pb-4">
          <div className="overflow-x-auto rounded-2xl bg-surface ring-1 ring-black/5">
            <div className="grid min-w-[1180px] grid-cols-10 divide-x divide-black/5">
              {PERIODOS.map((p) => {
                const lista = DISCIPLINAS.filter((d) => d.periodo === p && visivel(d));
                return (
                  <div key={p} className="p-2">
                    <div className="mb-2 rounded-lg bg-ink px-2 py-1 text-center font-display text-xs font-semibold text-paper">
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
                              alternar(d.code);
                            }}
                            onMouseEnter={() => setDestaque(d.code)}
                            onMouseLeave={() => setDestaque(null)}
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
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-4 pb-12">
        {atual ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="rounded-2xl bg-ink p-5 text-paper ring-1 ring-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    estados[atual.code] === "concluida"
                      ? "bg-accent-green/25 text-accent-green"
                      : estados[atual.code] === "cursando"
                        ? "bg-brand/30 text-paper"
                        : estados[atual.code] === "disponivel"
                          ? "bg-amber/25 text-amber"
                          : "bg-berry/25 text-berry"
                  }`}
                >
                  {ESTADO_LABEL[estados[atual.code] ?? "bloqueada"]}
                </span>
                <span className="text-[11px] text-paper/50">
                  Período {atual.periodo} · código {atual.code}
                </span>
              </div>
              <h2 className="mt-3 max-w-[30ch] text-balance font-display text-2xl font-semibold">
                {atual.nome}
              </h2>
              <p className="mt-1 text-pretty text-sm text-paper/60">
                {atual.eletiva ? "Carga horária variável" : `${atual.horas}h`} · Engenharia Civil ·
                Campus VIII / Araruna-PB
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
                        : "bg-berry/25 text-berry"
                    }`}
                  >
                    {BY_CODE[p]?.nome ?? p}
                  </button>
                ))}
                <span className="ml-2 text-[11px] text-paper/45">Libera:</span>
                {(DEPENDENTES[atual.code] ?? []).length === 0 && (
                  <span className="text-[11px] text-paper/70">nenhuma</span>
                )}
                {(DEPENDENTES[atual.code] ?? []).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelecionada(c)}
                    className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium"
                  >
                    {BY_CODE[c]?.nome ?? c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
                className="rounded-full px-4 py-3 text-sm font-medium ring-1 ring-ink/15 transition-colors hover:bg-mist"
              >
                Limpar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-5 ring-1 ring-black/5">
            <p className="text-sm text-ink/60">
              Selecione uma disciplina para ver pré-requisitos, o que ela libera e mudar o status.
            </p>
            <button
              onClick={() => setMarcacoes({})}
              className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-ink/15 transition-colors hover:bg-mist"
            >
              Limpar tudo
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

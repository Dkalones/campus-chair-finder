import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { BY_CODE, DISCIPLINAS } from "@/data/curriculo";

export const Route = createFileRoute("/_authenticated/calendario")({
  head: () => ({
    meta: [
      { title: "Calendário de provas — Meu Caderno da Grade" },
      {
        name: "description",
        content: "Marque as datas das provas de cada disciplina e veja o que vem pela frente.",
      },
      { property: "og:title", content: "Calendário de provas — Meu Caderno da Grade" },
      {
        property: "og:description",
        content: "Organize as avaliações do semestre por disciplina, dia e horário.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendarioPage,
});

const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function CalendarioPage() {
  const qc = useQueryClient();
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [dia, setDia] = useState<string>(iso(hoje));

  const [titulo, setTitulo] = useState("");
  const [code, setCode] = useState("");
  const [hora, setHora] = useState("");
  const [obs, setObs] = useState("");

  const { data: provas } = useQuery({
    queryKey: ["provas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("provas")
        .select("id,code,titulo,data,hora,observacao")
        .order("data", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const criar = useMutation({
    mutationFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) throw new Error("Sessão expirada");
      const { error } = await supabase.from("provas").insert({
        user_id: uid,
        data: dia,
        titulo: titulo.trim() || (code ? `Prova de ${BY_CODE[code]?.nome ?? code}` : "Prova"),
        code: code || null,
        hora: hora || null,
        observacao: obs || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitulo("");
      setHora("");
      setObs("");
      void qc.invalidateQueries({ queryKey: ["provas"] });
    },
  });

  const apagar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("provas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["provas"] }),
  });

  const porDia = useMemo(() => {
    const m: Record<string, { id: string; titulo: string; hora: string | null }[]> = {};
    (provas ?? []).forEach((p) => {
      (m[p.data] ||= []).push({ id: p.id, titulo: p.titulo, hora: p.hora });
    });
    return m;
  }, [provas]);

  const celulas = useMemo(() => {
    const primeiro = new Date(ano, mes, 1);
    const inicio = primeiro.getDay();
    const total = new Date(ano, mes + 1, 0).getDate();
    const out: (string | null)[] = Array.from({ length: inicio }, () => null);
    for (let d = 1; d <= total; d++) out.push(iso(new Date(ano, mes, d)));
    return out;
  }, [ano, mes]);

  const proximas = useMemo(() => {
    const hojeIso = iso(new Date());
    return (provas ?? []).filter((p) => p.data >= hojeIso).slice(0, 8);
  }, [provas]);

  function mudarMes(delta: number) {
    const d = new Date(ano, mes + delta, 1);
    setMes(d.getMonth());
    setAno(d.getFullYear());
  }

  const doDia = porDia[dia] ?? [];

  return (
    <AppShell>
      <section className="mx-auto max-w-[1440px] px-4 py-6">
        <h1 className="font-display text-4xl font-semibold">Calendário de provas</h1>
        <p className="mt-1 max-w-[56ch] text-ink/65">
          Escolha um dia no calendário e anote a prova da disciplina. Tudo fica salvo na sua conta.
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl bg-surface p-4 ring-doodle">
            <div className="mb-3 flex items-center justify-between">
              <button
                onClick={() => mudarMes(-1)}
                className="rounded-lg px-3 py-1.5 text-sm ring-1 ring-dashed ring-ink/30 hover:bg-amber/30"
              >
                ←
              </button>
              <p className="font-display text-2xl font-bold">
                {MESES[mes]} de {ano}
              </p>
              <button
                onClick={() => mudarMes(1)}
                className="rounded-lg px-3 py-1.5 text-sm ring-1 ring-dashed ring-ink/30 hover:bg-amber/30"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase text-ink/45">
              {DIAS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {celulas.map((c, i) => {
                if (!c) return <span key={`v${i}`} />;
                const lista = porDia[c] ?? [];
                const ehHoje = c === iso(new Date());
                return (
                  <button
                    key={c}
                    onClick={() => setDia(c)}
                    className={`min-h-20 rounded-xl p-1.5 text-left ring-1 transition-all hover:-translate-y-0.5 ${
                      dia === c
                        ? "bg-brand/15 ring-2 ring-brand"
                        : "bg-paper/60 ring-ink/10 hover:bg-amber/20"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-semibold ${ehHoje ? "text-berry" : "text-ink/70"}`}
                    >
                      {Number(c.slice(-2))}
                    </span>
                    <div className="mt-1 flex flex-col gap-0.5">
                      {lista.slice(0, 3).map((p) => (
                        <span
                          key={p.id}
                          className="truncate rounded bg-berry/20 px-1 text-[10px] text-ink"
                        >
                          {p.hora ? `${p.hora} ` : ""}
                          {p.titulo}
                        </span>
                      ))}
                      {lista.length > 3 && (
                        <span className="text-[10px] text-ink/45">+{lista.length - 3}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-surface p-4 ring-doodle">
              <p className="font-display text-xl font-bold">
                Nova prova em {dia.split("-").reverse().join("/")}
              </p>
              <div className="mt-3 flex flex-col gap-2">
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
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título (ex.: 1ª prova)"
                  className="rounded-lg bg-paper px-3 py-2 text-sm outline-none ring-doodle"
                />
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="rounded-lg bg-paper px-3 py-2 text-sm outline-none ring-doodle"
                />
                <textarea
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  rows={2}
                  placeholder="Conteúdo, sala, observações..."
                  className="rounded-lg bg-paper px-3 py-2 text-sm outline-none ring-doodle"
                />
                <button
                  onClick={() => criar.mutate()}
                  disabled={criar.isPending}
                  className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-paper disabled:opacity-60"
                >
                  Adicionar prova
                </button>
              </div>

              {doDia.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-[11px] uppercase tracking-wide text-ink/45">Neste dia</p>
                  {(provas ?? [])
                    .filter((p) => p.data === dia)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex items-start justify-between gap-2 rounded-lg bg-paper px-3 py-2 ring-1 ring-ink/10"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {p.hora ? `${p.hora} · ` : ""}
                            {p.titulo}
                          </p>
                          {p.code && (
                            <p className="text-[11px] text-ink/55">
                              {BY_CODE[p.code]?.nome ?? p.code}
                            </p>
                          )}
                          {p.observacao && (
                            <p className="text-[11px] text-ink/55">{p.observacao}</p>
                          )}
                        </div>
                        <button
                          onClick={() => apagar.mutate(p.id)}
                          className="text-[11px] text-berry underline"
                        >
                          apagar
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-ink p-4 text-paper ring-doodle">
              <p className="font-display text-xl font-bold">Próximas provas</p>
              {proximas.length === 0 && (
                <p className="mt-2 text-sm text-paper/60">Nada marcado por enquanto.</p>
              )}
              <div className="mt-2 flex flex-col gap-2">
                {proximas.map((p) => (
                  <div key={p.id} className="rounded-lg bg-paper/10 px-3 py-2">
                    <p className="text-sm font-semibold">
                      {p.data.split("-").reverse().join("/")} {p.hora ? `· ${p.hora}` : ""}
                    </p>
                    <p className="text-[12px] text-paper/70">
                      {p.titulo}
                      {p.code ? ` — ${BY_CODE[p.code]?.nome ?? p.code}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

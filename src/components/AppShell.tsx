import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTema } from "@/hooks/useTema";
import { TEMAS, type TemaId } from "@/lib/temas";

const ABAS = [
  { to: "/grade", label: "Grade", icone: "✎" },
  { to: "/calendario", label: "Calendário", icone: "🗓" },
  { to: "/anotacoes", label: "Anotações", icone: "🗒" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { tema, setTema } = useTema();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function sair() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-notebook font-body text-ink antialiased">
      <header className="sticky top-0 z-40 border-b-2 border-dashed border-ink/25 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 -rotate-6 place-items-center rounded-lg bg-amber/60 font-display text-2xl font-bold text-ink ring-doodle">
              ✎
            </div>
            <div>
              <p className="font-display text-2xl font-bold leading-none">Meu Caderno da Grade</p>
              <p className="text-[11px] text-ink/55">Engenharia Civil · UEPB</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {ABAS.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-dashed ring-ink/30 transition-all hover:-rotate-1 hover:bg-amber/30"
                activeProps={{
                  className:
                    "-rotate-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-paper ring-doodle hover:rotate-0",
                }}
              >
                <span className="mr-1">{a.icone}</span>
                {a.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={tema}
              onChange={(e) => void setTema(e.target.value as TemaId)}
              className="rounded-lg bg-surface px-3 py-2 text-sm outline-none ring-doodle"
              aria-label="Tema do caderno"
            >
              {TEMAS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
            {email && <span className="hidden text-[11px] text-ink/55 md:inline">{email}</span>}
            <button
              onClick={() => void sair()}
              className="rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-dashed ring-ink/30 transition-colors hover:bg-berry/20"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

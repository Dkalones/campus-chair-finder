import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Meu Caderno da Grade" },
      {
        name: "description",
        content:
          "Entre ou crie sua conta para salvar o progresso das disciplinas, as provas e suas anotações.",
      },
      { property: "og:title", content: "Entrar — Meu Caderno da Grade" },
      {
        property: "og:description",
        content: "Crie sua conta e acompanhe sua grade de Engenharia Civil de qualquer lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/grade" });
    });
  }, [navigate]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setMsg(null);
    setCarregando(true);
    try {
      if (modo === "criar") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { emailRedirectTo: `${window.location.origin}/grade` },
        });
        if (error) throw error;
        if (data.session) void navigate({ to: "/grade" });
        else setMsg("Enviamos um e-mail de confirmação. Confira sua caixa de entrada.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        void navigate({ to: "/grade" });
      }
    } catch (e) {
      const m = e instanceof Error ? e.message : "Não deu certo. Tente de novo.";
      setErro(
        m.includes("Invalid login credentials")
          ? "E-mail ou senha incorretos."
          : m.includes("already registered")
            ? "Esse e-mail já tem conta. Tente entrar."
            : m,
      );
    } finally {
      setCarregando(false);
    }
  }

  async function google() {
    setErro(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setErro("Não foi possível entrar com o Google.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/grade" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-notebook px-4 py-12 font-body text-ink antialiased">
      <div className="w-full max-w-md rotate-[-0.6deg] rounded-2xl bg-surface p-6 ring-doodle">
        <p className="font-display text-3xl font-bold">
          {modo === "entrar" ? "Bora estudar?" : "Criar caderno"}
        </p>
        <p className="mt-1 text-sm text-ink/60">
          Seu progresso, provas e anotações ficam salvos na sua conta.
        </p>

        <button
          onClick={() => void google()}
          className="mt-5 w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
        >
          Continuar com Google
        </button>

        <div className="my-4 flex items-center gap-3 text-[11px] text-ink/45">
          <span className="h-px flex-1 bg-ink/15" /> ou com e-mail
          <span className="h-px flex-1 bg-ink/15" />
        </div>

        <form onSubmit={(e) => void enviar(e)} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="rounded-xl bg-paper px-4 py-3 text-sm outline-none ring-doodle focus:ring-2 focus:ring-brand/60"
          />
          <input
            type="password"
            required
            minLength={6}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="senha (mín. 6 caracteres)"
            className="rounded-xl bg-paper px-4 py-3 text-sm outline-none ring-doodle focus:ring-2 focus:ring-brand/60"
          />
          <button
            type="submit"
            disabled={carregando}
            className="rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-paper disabled:opacity-60"
          >
            {carregando ? "Um instante..." : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        {erro && <p className="mt-3 text-sm text-berry">{erro}</p>}
        {msg && <p className="mt-3 text-sm text-accent-green">{msg}</p>}

        <button
          onClick={() => {
            setModo(modo === "entrar" ? "criar" : "entrar");
            setErro(null);
            setMsg(null);
          }}
          className="mt-4 text-sm text-ink/60 underline underline-offset-4"
        >
          {modo === "entrar" ? "Ainda não tenho conta" : "Já tenho conta"}
        </button>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TEMAS, TEMA_PADRAO, TEMA_STORAGE, aplicarTema, type TemaId } from "@/lib/temas";

const IDS = new Set(TEMAS.map((t) => t.id));

export function useTema() {
  const [tema, setTemaState] = useState<TemaId>(TEMA_PADRAO);

  useEffect(() => {
    const salvo = localStorage.getItem(TEMA_STORAGE);
    if (salvo && IDS.has(salvo as TemaId)) {
      setTemaState(salvo as TemaId);
      aplicarTema(salvo as TemaId);
    } else {
      aplicarTema(TEMA_PADRAO);
    }

    void (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data } = await supabase
        .from("preferencias")
        .select("tema")
        .eq("user_id", auth.user.id)
        .maybeSingle();
      const remoto = data?.tema;
      if (remoto && IDS.has(remoto as TemaId)) {
        setTemaState(remoto as TemaId);
        aplicarTema(remoto as TemaId);
        localStorage.setItem(TEMA_STORAGE, remoto);
      }
    })();
  }, []);

  async function setTema(novo: TemaId) {
    setTemaState(novo);
    aplicarTema(novo);
    localStorage.setItem(TEMA_STORAGE, novo);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    await supabase
      .from("preferencias")
      .upsert({ user_id: auth.user.id, tema: novo, updated_at: new Date().toISOString() });
  }

  return { tema, setTema };
}

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CURSO_PADRAO, CURSOS, type CursoId } from "@/data/curriculo";

const IDS = new Set(CURSOS.map((c) => c.id));
const CURSO_STORAGE = "grade-curso";

interface CursoContextType {
  curso: CursoId;
  setCurso: (novo: CursoId) => void;
}

const CursoContext = createContext<CursoContextType | undefined>(undefined);

export function CursoProvider({ children }: { children: ReactNode }) {
  const [curso, setCursoState] = useState<CursoId>(CURSO_PADRAO);

  useEffect(() => {
    const salvo = localStorage.getItem(CURSO_STORAGE);
    if (salvo && IDS.has(salvo as CursoId)) {
      setCursoState(salvo as CursoId);
    }
  }, []);

  function setCurso(novo: CursoId) {
    setCursoState(novo);
    localStorage.setItem(CURSO_STORAGE, novo);
  }

  return (
    <CursoContext.Provider value={{ curso, setCurso }}>{children}</CursoContext.Provider>
  );
}

export function useCurso() {
  const context = useContext(CursoContext);
  if (context === undefined) {
    throw new Error("useCurso precisa ser usado dentro de um CursoProvider");
  }
  return context;
}

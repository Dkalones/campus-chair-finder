export type TemaId =
  | "caderno"
  | "quadriculado"
  | "pontilhado"
  | "pastel"
  | "kraft"
  | "moderno";

export const TEMAS: { id: TemaId; nome: string; dica: string }[] = [
  { id: "caderno", nome: "Caderno pautado", dica: "Clássico universitário" },
  { id: "quadriculado", nome: "Quadriculado", dica: "Folha de milimetrado" },
  { id: "pontilhado", nome: "Bullet journal", dica: "Pontilhado minimalista" },
  { id: "pastel", nome: "Pastel", dica: "Marca-texto suave" },
  { id: "kraft", nome: "Kraft", dica: "Papel pardo" },
  { id: "moderno", nome: "Moderno escuro", dica: "Foco noturno" },
];

export const TEMA_PADRAO: TemaId = "caderno";
export const TEMA_STORAGE = "grade-tema";

export function aplicarTema(tema: TemaId) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset["tema"] = tema;
}

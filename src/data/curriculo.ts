export type Disciplina = {
  code: string;
  nome: string;
  horas: number;
  periodo: number;
  prereqs: string[];
  eletiva?: boolean;
};

export const CARGA_TOTAL = 3950;

export const DISCIPLINAS: Disciplina[] = [
  // Linha A
  { code: "A1", nome: "Cálculo Diferencial e Integral I", horas: 60, periodo: 1, prereqs: [] },
  { code: "A2", nome: "Álgebra Linear", horas: 60, periodo: 2, prereqs: ["B1"] },
  { code: "A3", nome: "Cálculo Diferencial e Integral III", horas: 60, periodo: 3, prereqs: ["B1", "B2"] },
  { code: "A4", nome: "Cálculo Numérico", horas: 60, periodo: 4, prereqs: ["E1", "A2", "A3"] },
  { code: "A5", nome: "Economia", horas: 60, periodo: 5, prereqs: ["E3"] },
  { code: "A6", nome: "Hidráulica Básica", horas: 60, periodo: 6, prereqs: ["E5"] },
  { code: "A7", nome: "Hidrologia", horas: 60, periodo: 7, prereqs: ["E5", "A6"] },
  { code: "A8", nome: "Concreto Armado I", horas: 60, periodo: 8, prereqs: ["G7"] },
  { code: "A9", nome: "Concreto Armado II", horas: 60, periodo: 9, prereqs: ["A8", "G7", "C8"] },
  { code: "A10", nome: "Estágio Supervisionado", horas: 180, periodo: 10, prereqs: [] },

  // Linha B
  { code: "B1", nome: "Cálculo Vetorial e Geometria Analítica", horas: 60, periodo: 1, prereqs: [] },
  { code: "B2", nome: "Cálculo Diferencial e Integral II", horas: 60, periodo: 2, prereqs: ["A1"] },
  { code: "B3", nome: "Ciências do Ambiente", horas: 60, periodo: 3, prereqs: ["G1"] },
  { code: "B4", nome: "Equações Diferenciais Ordinárias", horas: 60, periodo: 4, prereqs: ["B1", "B2", "A2"] },
  { code: "B5", nome: "Eletrotécnica", horas: 60, periodo: 5, prereqs: ["B4", "D4", "C4"] },
  { code: "B6", nome: "Hidráulica Experimental", horas: 30, periodo: 6, prereqs: ["A6"] },
  { code: "B7", nome: "Instalações Prediais", horas: 90, periodo: 7, prereqs: ["A6", "B5"] },
  { code: "B8", nome: "Empuxos de Terra e Estruturas de Contenção", horas: 60, periodo: 8, prereqs: ["D7", "C7"] },
  { code: "B9", nome: "Direito para Engenharia Civil", horas: 45, periodo: 9, prereqs: ["E3"] },
  { code: "B10", nome: "Trabalho de Conclusão de Curso II", horas: 60, periodo: 10, prereqs: ["I9"] },

  // Linha C
  { code: "C1", nome: "Desenho Técnico", horas: 60, periodo: 1, prereqs: [] },
  { code: "C2", nome: "Desenho Aplicado à Engenharia Civil", horas: 60, periodo: 2, prereqs: ["C1"] },
  { code: "C3", nome: "Física Experimental I", horas: 45, periodo: 3, prereqs: ["D2"] },
  { code: "C4", nome: "Física Experimental II", horas: 45, periodo: 4, prereqs: ["D3"] },
  { code: "C5", nome: "Engenharia Econômica", horas: 60, periodo: 5, prereqs: ["A3"] },
  { code: "C6", nome: "Materiais de Construção Experimental", horas: 30, periodo: 6, prereqs: ["D5"] },
  { code: "C7", nome: "Mecânica dos Solos Experimental II", horas: 30, periodo: 7, prereqs: ["E6"] },
  { code: "C8", nome: "Estabilidade das Construções", horas: 60, periodo: 8, prereqs: ["G7"] },
  { code: "C9", nome: "Fundações", horas: 60, periodo: 9, prereqs: ["D7", "C7", "B8"] },

  // Linha D
  { code: "D1", nome: "Filosofia da Ciência", horas: 30, periodo: 1, prereqs: [] },
  { code: "D2", nome: "Física Geral I", horas: 60, periodo: 2, prereqs: ["A1", "B1"] },
  { code: "D3", nome: "Física Geral II", horas: 60, periodo: 3, prereqs: ["D2"] },
  { code: "D4", nome: "Física Geral III", horas: 60, periodo: 4, prereqs: ["D2", "D3"] },
  { code: "D5", nome: "Materiais de Construção I", horas: 60, periodo: 5, prereqs: ["E2"] },
  { code: "D6", nome: "Materiais de Construção II", horas: 60, periodo: 6, prereqs: ["D5"] },
  { code: "D7", nome: "Mecânica dos Solos II", horas: 60, periodo: 7, prereqs: ["F6"] },
  { code: "D8", nome: "Estruturas Metálicas, Madeira e Novos Materiais", horas: 60, periodo: 8, prereqs: ["G7", "D5"] },
  { code: "D9", nome: "Eletiva", horas: 0, periodo: 9, prereqs: [], eletiva: true },

  // Linha E
  { code: "E1", nome: "Introdução à Ciências da Computação", horas: 60, periodo: 1, prereqs: [] },
  { code: "E2", nome: "Geologia Geral", horas: 60, periodo: 2, prereqs: ["G1"] },
  { code: "E3", nome: "Introdução à Sociologia", horas: 45, periodo: 3, prereqs: [] },
  { code: "E4", nome: "Geomática", horas: 60, periodo: 4, prereqs: ["G3"] },
  { code: "E5", nome: "Mecânica dos Fluidos", horas: 60, periodo: 5, prereqs: ["F3", "B4"] },
  { code: "E6", nome: "Mecânica dos Solos Experimental I", horas: 30, periodo: 6, prereqs: ["F6"] },
  { code: "E7", nome: "Saneamento I", horas: 60, periodo: 7, prereqs: ["A6", "B3"] },
  { code: "E8", nome: "Eletiva", horas: 0, periodo: 8, prereqs: [], eletiva: true },
  { code: "E9", nome: "Planejamento dos Transportes", horas: 80, periodo: 9, prereqs: ["B8"] },

  // Linha F
  { code: "F1", nome: "Introdução à Engenharia Civil", horas: 30, periodo: 1, prereqs: [] },
  { code: "F2", nome: "Leitura e Produção de Textos Téc. p/ Eng. Civil", horas: 45, periodo: 2, prereqs: [] },
  { code: "F3", nome: "Mecânica Geral", horas: 90, periodo: 3, prereqs: ["A1", "D2"] },
  { code: "F4", nome: "Inglês Instrumental", horas: 60, periodo: 4, prereqs: [] },
  { code: "F5", nome: "Probabilidade e Estatística", horas: 60, periodo: 5, prereqs: ["A3"] },
  { code: "F6", nome: "Mecânica dos Solos I", horas: 60, periodo: 6, prereqs: ["E2"] },
  { code: "F7", nome: "Segurança e Saúde no Trabalho", horas: 60, periodo: 7, prereqs: ["F1"] },
  { code: "F8", nome: "Gestão de Recursos Hídricos", horas: 30, periodo: 8, prereqs: ["A7"] },
  { code: "F9", nome: "Eletiva", horas: 0, periodo: 9, prereqs: [], eletiva: true },

  // Linha G
  { code: "G1", nome: "Química Geral", horas: 90, periodo: 1, prereqs: [] },
  { code: "G2", nome: "Química Experimental", horas: 30, periodo: 2, prereqs: ["G1"] },
  { code: "G3", nome: "Topografia Aplicada à Engenharia Civil", horas: 60, periodo: 3, prereqs: ["C1", "C2"] },
  { code: "G4", nome: "Metodologia Científica", horas: 45, periodo: 4, prereqs: ["F2"] },
  { code: "G5", nome: "Resistência dos Materiais I", horas: 60, periodo: 5, prereqs: ["D2", "F3", "B4"] },
  { code: "G6", nome: "Microeconomia e Empreendedorismo", horas: 60, periodo: 6, prereqs: ["A5", "C5"] },
  { code: "G7", nome: "Teoria das Estruturas", horas: 60, periodo: 7, prereqs: ["H6"] },
  { code: "G8", nome: "Pavimentação", horas: 60, periodo: 8, prereqs: ["D6", "C6", "F6"] },
  { code: "G9", nome: "Projeto de Estradas", horas: 60, periodo: 9, prereqs: ["G8"] },

  // Linha H
  { code: "H6", nome: "Resistência dos Materiais II", horas: 60, periodo: 6, prereqs: ["G5"] },
  { code: "H8", nome: "Saneamento II", horas: 60, periodo: 8, prereqs: ["E7"] },
  { code: "H9", nome: "Tecnologia do Gerenciamento das Construções", horas: 90, periodo: 9, prereqs: ["A8"] },

  // Linha I
  { code: "I8", nome: "Sistemas de Drenagem Urbana", horas: 60, periodo: 8, prereqs: ["A6", "A7"] },
  { code: "I9", nome: "Trabalho de Conclusão de Curso I", horas: 60, periodo: 9, prereqs: [] },
];

export const BY_CODE: Record<string, Disciplina> = Object.fromEntries(
  DISCIPLINAS.map((d) => [d.code, d]),
);

export const DEPENDENTES: Record<string, string[]> = DISCIPLINAS.reduce(
  (acc, d) => {
    d.prereqs.forEach((p) => {
      (acc[p] ||= []).push(d.code);
    });
    return acc;
  },
  {} as Record<string, string[]>,
);

export const PERIODOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

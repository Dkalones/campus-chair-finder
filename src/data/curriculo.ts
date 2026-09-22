export type Disciplina = {
  code: string;
  nome: string;
  horas: number;
  periodo: number;
  prereqs: string[];
  eletiva?: boolean;
  curso: "engcivil" | "odonto" | "fisica";
};

// ─── ENGENHARIA CIVIL ─────────────────────────────────────────────────────────
const ENG: Disciplina[] = [
  // Linha A
  { code: "A1",  nome: "Cálculo Diferencial e Integral I",                 horas: 60,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "A2",  nome: "Álgebra Linear",                                   horas: 60,  periodo: 2,  prereqs: ["B1"],                      curso: "engcivil" },
  { code: "A3",  nome: "Cálculo Diferencial e Integral III",               horas: 60,  periodo: 3,  prereqs: ["B1","B2"],                 curso: "engcivil" },
  { code: "A4",  nome: "Cálculo Numérico",                                 horas: 60,  periodo: 4,  prereqs: ["E1","A2","A3"],            curso: "engcivil" },
  { code: "A5",  nome: "Economia",                                         horas: 60,  periodo: 5,  prereqs: ["E3"],                      curso: "engcivil" },
  { code: "A6",  nome: "Hidráulica Básica",                                horas: 60,  periodo: 6,  prereqs: ["E5"],                      curso: "engcivil" },
  { code: "A7",  nome: "Hidrologia",                                       horas: 60,  periodo: 7,  prereqs: ["E5","A6"],                 curso: "engcivil" },
  { code: "A8",  nome: "Concreto Armado I",                                horas: 60,  periodo: 8,  prereqs: ["G7"],                      curso: "engcivil" },
  { code: "A9",  nome: "Concreto Armado II",                               horas: 60,  periodo: 9,  prereqs: ["A8","G7","C8"],            curso: "engcivil" },
  { code: "A10", nome: "Estágio Supervisionado",                           horas: 180, periodo: 10, prereqs: [],                         curso: "engcivil" },
  // Linha B
  { code: "B1",  nome: "Cálculo Vetorial e Geometria Analítica",          horas: 60,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "B2",  nome: "Cálculo Diferencial e Integral II",               horas: 60,  periodo: 2,  prereqs: ["A1"],                      curso: "engcivil" },
  { code: "B3",  nome: "Ciências do Ambiente",                            horas: 60,  periodo: 3,  prereqs: ["G1"],                      curso: "engcivil" },
  { code: "B4",  nome: "Equações Diferenciais Ordinárias",                horas: 60,  periodo: 4,  prereqs: ["B1","B2","A2"],            curso: "engcivil" },
  { code: "B5",  nome: "Eletrotécnica",                                   horas: 60,  periodo: 5,  prereqs: ["B4","D4","C4"],            curso: "engcivil" },
  { code: "B6",  nome: "Hidráulica Experimental",                         horas: 30,  periodo: 6,  prereqs: ["A6"],                      curso: "engcivil" },
  { code: "B7",  nome: "Instalações Prediais",                            horas: 90,  periodo: 7,  prereqs: ["A6","B5"],                 curso: "engcivil" },
  { code: "B8",  nome: "Empuxos de Terra e Estruturas de Contenção",      horas: 60,  periodo: 8,  prereqs: ["D7","C7"],                 curso: "engcivil" },
  { code: "B9",  nome: "Direito para Engenharia Civil",                   horas: 45,  periodo: 9,  prereqs: ["E3"],                      curso: "engcivil" },
  { code: "B10", nome: "Trabalho de Conclusão de Curso II",               horas: 60,  periodo: 10, prereqs: ["I9"],                      curso: "engcivil" },
  // Linha C
  { code: "C1",  nome: "Desenho Técnico",                                 horas: 60,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "C2",  nome: "Desenho Aplicado à Engenharia Civil",             horas: 60,  periodo: 2,  prereqs: ["C1"],                      curso: "engcivil" },
  { code: "C3",  nome: "Física Experimental I",                           horas: 45,  periodo: 3,  prereqs: ["D2"],                      curso: "engcivil" },
  { code: "C4",  nome: "Física Experimental II",                          horas: 45,  periodo: 4,  prereqs: ["D3"],                      curso: "engcivil" },
  { code: "C5",  nome: "Engenharia Econômica",                            horas: 60,  periodo: 5,  prereqs: ["A3"],                      curso: "engcivil" },
  { code: "C6",  nome: "Materiais de Construção Experimental",            horas: 30,  periodo: 6,  prereqs: ["D5"],                      curso: "engcivil" },
  { code: "C7",  nome: "Mecânica dos Solos Experimental II",              horas: 30,  periodo: 7,  prereqs: ["E6"],                      curso: "engcivil" },
  { code: "C8",  nome: "Estabilidade das Construções",                    horas: 60,  periodo: 8,  prereqs: ["G7"],                      curso: "engcivil" },
  { code: "C9",  nome: "Fundações",                                       horas: 60,  periodo: 9,  prereqs: ["D7","C7","B8"],            curso: "engcivil" },
  // Linha D
  { code: "D1",  nome: "Filosofia da Ciência",                            horas: 30,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "D2",  nome: "Física Geral I",                                  horas: 60,  periodo: 2,  prereqs: ["A1","B1"],                 curso: "engcivil" },
  { code: "D3",  nome: "Física Geral II",                                 horas: 60,  periodo: 3,  prereqs: ["D2"],                      curso: "engcivil" },
  { code: "D4",  nome: "Física Geral III",                                horas: 60,  periodo: 4,  prereqs: ["D2","D3"],                 curso: "engcivil" },
  { code: "D5",  nome: "Materiais de Construção I",                       horas: 60,  periodo: 5,  prereqs: ["E2"],                      curso: "engcivil" },
  { code: "D6",  nome: "Materiais de Construção II",                      horas: 60,  periodo: 6,  prereqs: ["D5"],                      curso: "engcivil" },
  { code: "D7",  nome: "Mecânica dos Solos II",                           horas: 60,  periodo: 7,  prereqs: ["F6"],                      curso: "engcivil" },
  { code: "D8",  nome: "Estruturas Metálicas, Madeira e Novos Materiais", horas: 60,  periodo: 8,  prereqs: ["G7","D5"],                 curso: "engcivil" },
  { code: "D9",  nome: "Eletiva",                                         horas: 0,   periodo: 9,  prereqs: [], eletiva: true,           curso: "engcivil" },
  // Linha E
  { code: "E1",  nome: "Introdução à Ciências da Computação",             horas: 60,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "E2",  nome: "Geologia Geral",                                  horas: 60,  periodo: 2,  prereqs: ["G1"],                      curso: "engcivil" },
  { code: "E3",  nome: "Introdução à Sociologia",                         horas: 45,  periodo: 3,  prereqs: [],                         curso: "engcivil" },
  { code: "E4",  nome: "Geomática",                                       horas: 60,  periodo: 4,  prereqs: ["G3"],                      curso: "engcivil" },
  { code: "E5",  nome: "Mecânica dos Fluidos",                            horas: 60,  periodo: 5,  prereqs: ["F3","B4"],                 curso: "engcivil" },
  { code: "E6",  nome: "Mecânica dos Solos Experimental I",               horas: 30,  periodo: 6,  prereqs: ["F6"],                      curso: "engcivil" },
  { code: "E7",  nome: "Saneamento I",                                    horas: 60,  periodo: 7,  prereqs: ["A6","B3"],                 curso: "engcivil" },
  { code: "E8",  nome: "Eletiva",                                         horas: 0,   periodo: 8,  prereqs: [], eletiva: true,           curso: "engcivil" },
  { code: "E9",  nome: "Planejamento dos Transportes",                    horas: 80,  periodo: 9,  prereqs: ["B8"],                      curso: "engcivil" },
  // Linha F
  { code: "F1",  nome: "Introdução à Engenharia Civil",                   horas: 30,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "F2",  nome: "Leitura e Produção de Textos Téc. p/ Eng. Civil", horas: 45,  periodo: 2,  prereqs: [],                         curso: "engcivil" },
  { code: "F3",  nome: "Mecânica Geral",                                  horas: 90,  periodo: 3,  prereqs: ["A1","D2"],                 curso: "engcivil" },
  { code: "F4",  nome: "Inglês Instrumental",                             horas: 60,  periodo: 4,  prereqs: [],                         curso: "engcivil" },
  { code: "F5",  nome: "Probabilidade e Estatística",                     horas: 60,  periodo: 5,  prereqs: ["A3"],                      curso: "engcivil" },
  { code: "F6",  nome: "Mecânica dos Solos I",                            horas: 60,  periodo: 6,  prereqs: ["E2"],                      curso: "engcivil" },
  { code: "F7",  nome: "Segurança e Saúde no Trabalho",                   horas: 60,  periodo: 7,  prereqs: ["F1"],                      curso: "engcivil" },
  { code: "F8",  nome: "Gestão de Recursos Hídricos",                     horas: 30,  periodo: 8,  prereqs: ["A7"],                      curso: "engcivil" },
  { code: "F9",  nome: "Eletiva",                                         horas: 0,   periodo: 9,  prereqs: [], eletiva: true,           curso: "engcivil" },
  // Linha G
  { code: "G1",  nome: "Química Geral",                                   horas: 90,  periodo: 1,  prereqs: [],                         curso: "engcivil" },
  { code: "G2",  nome: "Química Experimental",                            horas: 30,  periodo: 2,  prereqs: ["G1"],                      curso: "engcivil" },
  { code: "G3",  nome: "Topografia Aplicada à Engenharia Civil",          horas: 60,  periodo: 3,  prereqs: ["C1","C2"],                 curso: "engcivil" },
  { code: "G4",  nome: "Metodologia Científica",                          horas: 45,  periodo: 4,  prereqs: ["F2"],                      curso: "engcivil" },
  { code: "G5",  nome: "Resistência dos Materiais I",                     horas: 60,  periodo: 5,  prereqs: ["D2","F3","B4"],            curso: "engcivil" },
  { code: "G6",  nome: "Microeconomia e Empreendedorismo",                horas: 60,  periodo: 6,  prereqs: ["A5","C5"],                 curso: "engcivil" },
  { code: "G7",  nome: "Teoria das Estruturas",                           horas: 60,  periodo: 7,  prereqs: ["H6"],                      curso: "engcivil" },
  { code: "G8",  nome: "Pavimentação",                                    horas: 60,  periodo: 8,  prereqs: ["D6","C6","F6"],            curso: "engcivil" },
  { code: "G9",  nome: "Projeto de Estradas",                             horas: 60,  periodo: 9,  prereqs: ["G8"],                      curso: "engcivil" },
  // Linha H
  { code: "H6",  nome: "Resistência dos Materiais II",                    horas: 60,  periodo: 6,  prereqs: ["G5"],                      curso: "engcivil" },
  { code: "H8",  nome: "Saneamento II",                                   horas: 60,  periodo: 8,  prereqs: ["E7"],                      curso: "engcivil" },
  { code: "H9",  nome: "Tecnologia do Gerenciamento das Construções",     horas: 90,  periodo: 9,  prereqs: ["A8"],                      curso: "engcivil" },
  // Linha I
  { code: "I8",  nome: "Sistemas de Drenagem Urbana",                     horas: 60,  periodo: 8,  prereqs: ["A6","A7"],                 curso: "engcivil" },
  { code: "I9",  nome: "Trabalho de Conclusão de Curso I",                horas: 60,  periodo: 9,  prereqs: [],                         curso: "engcivil" },
];

// ─── ODONTOLOGIA CCTS 2016 ────────────────────────────────────────────────────
// Prefixo "OD" para evitar colisão de códigos
const OD: Disciplina[] = [
  // Período 1
  { code: "OD-00514", nome: "Ciências Sociais Aplicadas em Saúde",                    horas: 60,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-00658", nome: "Concepção e Formação do Corpo Humano I",                 horas: 90,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-02214", nome: "Genética e Evolução Humana",                             horas: 30,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-02621", nome: "Informática Básica",                                     horas: 30,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-02727", nome: "Introdução à Odontologia e Orientação Profissional",     horas: 30,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-02963", nome: "Leitura e Produção Textual",                             horas: 30,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03626", nome: "Morfofisiologia I",                                      horas: 60,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  { code: "OD-04858", nome: "Saúde Coletiva e Promoção de Saúde",                    horas: 60,  periodo: 1,  prereqs: [],                               curso: "odonto" },
  // Período 2
  { code: "OD-00077", nome: "Agressão e Mecanismos de Defesa do Corpo Humano I",     horas: 90,  periodo: 2,  prereqs: [],                               curso: "odonto" },
  { code: "OD-00659", nome: "Concepção e Formação do Corpo Humano II",               horas: 60,  periodo: 2,  prereqs: ["OD-00658"],                     curso: "odonto" },
  { code: "OD-03457", nome: "Metabolismo Humano e Bases Terapêuticas p/ Odont. I",   horas: 60,  periodo: 2,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03472", nome: "Metodologia Científica",                                horas: 60,  periodo: 2,  prereqs: ["OD-02963"],                     curso: "odonto" },
  { code: "OD-03627", nome: "Morfofisiologia II",                                    horas: 60,  periodo: 2,  prereqs: ["OD-03626"],                     curso: "odonto" },
  { code: "OD-04855", nome: "Saúde Coletiva e Epidemiologia",                        horas: 60,  periodo: 2,  prereqs: ["OD-04858"],                     curso: "odonto" },
  // Período 3
  { code: "OD-00078", nome: "Agressão e Mecanismos de Defesa do Corpo Humano II",   horas: 60,  periodo: 3,  prereqs: [],                               curso: "odonto" },
  { code: "OD-00374", nome: "Bioética",                                              horas: 30,  periodo: 3,  prereqs: [],                               curso: "odonto" },
  { code: "OD-00428", nome: "Biossegurança",                                         horas: 30,  periodo: 3,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03389", nome: "Materiais Dentários I",                                 horas: 60,  periodo: 3,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03458", nome: "Metabolismo Humano e Bases Terapêuticas p/ Odont. II",  horas: 60,  periodo: 3,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03628", nome: "Morfofisiologia III",                                   horas: 60,  periodo: 3,  prereqs: ["OD-03627"],                     curso: "odonto" },
  { code: "OD-04857", nome: "Saúde Coletiva e Odontologia Preventiva",               horas: 60,  periodo: 3,  prereqs: ["OD-04858"],                     curso: "odonto" },
  // Período 4
  { code: "OD-00535", nome: "Cirurgia Pré-Clínica e Anestesiologia",                horas: 30,  periodo: 4,  prereqs: ["OD-03628"],                     curso: "odonto" },
  { code: "OD-00809", nome: "Dentística Pré-Clínica",                               horas: 60,  periodo: 4,  prereqs: ["OD-03389","OD-03628"],           curso: "odonto" },
  { code: "OD-01630", nome: "Estomatologia Pré-Clínica",                             horas: 60,  periodo: 4,  prereqs: ["OD-04857"],                     curso: "odonto" },
  { code: "OD-03976", nome: "Patologia Oral Pré-Clínica",                            horas: 90,  periodo: 4,  prereqs: ["OD-00659","OD-00078"],           curso: "odonto" },
  { code: "OD-03996", nome: "Periodontia Pré-Clínica",                               horas: 60,  periodo: 4,  prereqs: ["OD-04857"],                     curso: "odonto" },
  { code: "OD-04761", nome: "Radiologia Odontológica Pré-Clínica",                  horas: 30,  periodo: 4,  prereqs: ["OD-03628"],                     curso: "odonto" },
  { code: "OD-04856", nome: "Saúde Coletiva e Gestão em Saúde",                     horas: 60,  periodo: 4,  prereqs: ["OD-04857"],                     curso: "odonto" },
  { code: "OD-05297", nome: "Terapêutica Odontológica",                              horas: 30,  periodo: 4,  prereqs: [],                               curso: "odonto" },
  // Período 5
  { code: "OD-00556", nome: "Clínica Cirúrgica",                                    horas: 60,  periodo: 5,  prereqs: ["OD-00428","OD-00535"],           curso: "odonto" },
  { code: "OD-00559", nome: "Clínica de Dentística",                                horas: 60,  periodo: 5,  prereqs: ["OD-00428","OD-00535","OD-00809"],curso: "odonto" },
  { code: "OD-00561", nome: "Clínica de Diagnóstico por Imagem",                    horas: 60,  periodo: 5,  prereqs: ["OD-00428","OD-04761"],           curso: "odonto" },
  { code: "OD-00569", nome: "Clínica de Periodontia",                               horas: 60,  periodo: 5,  prereqs: ["OD-00428","OD-03996"],           curso: "odonto" },
  { code: "OD-00574", nome: "Clínica Integrada de Acolhimento e Atenção Básica",    horas: 120, periodo: 5,  prereqs: ["OD-00428","OD-00535","OD-00809","OD-01630","OD-03976","OD-04761","OD-05297"], curso: "odonto" },
  { code: "OD-01237", nome: "Endodontia Pré-Clínica",                               horas: 60,  periodo: 5,  prereqs: ["OD-03628"],                     curso: "odonto" },
  { code: "OD-03726", nome: "Oclusão",                                               horas: 30,  periodo: 5,  prereqs: ["OD-03628"],                     curso: "odonto" },
  // Período 6
  { code: "OD-00530", nome: "Cirurgia Bucomaxilofacial",                             horas: 30,  periodo: 6,  prereqs: ["OD-00556"],                     curso: "odonto" },
  { code: "OD-00562", nome: "Clínica de Endodontia",                                horas: 60,  periodo: 6,  prereqs: ["OD-00428","OD-00535","OD-00561","OD-01237"], curso: "odonto" },
  { code: "OD-01416", nome: "Estágio Supervisionado em Clínica Integrada AB",       horas: 120, periodo: 6,  prereqs: ["OD-00556","OD-00559","OD-00561","OD-00569","OD-00574"], curso: "odonto" },
  { code: "OD-03391", nome: "Materiais Dentários II",                                horas: 60,  periodo: 6,  prereqs: ["OD-03389"],                     curso: "odonto" },
  { code: "OD-03732", nome: "Odontologia Integrada em Atenção Básica",              horas: 30,  periodo: 6,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03735", nome: "Odontologia Legal",                                    horas: 30,  periodo: 6,  prereqs: [],                               curso: "odonto" },
  { code: "OD-04530", nome: "Prótese Fixa Pré-Clínica",                             horas: 60,  periodo: 6,  prereqs: ["OD-00561","OD-01237"],           curso: "odonto" },
  { code: "OD-04533", nome: "Prótese Total e Parcial Removível Pré-Clínica",        horas: 60,  periodo: 6,  prereqs: ["OD-00561"],                     curso: "odonto" },
  // Período 7
  { code: "OD-00577", nome: "Clínica Integrada de Próteses",                        horas: 60,  periodo: 7,  prereqs: ["OD-00428","OD-03726","OD-03391","OD-04530","OD-04533"], curso: "odonto" },
  { code: "OD-01417", nome: "Estágio Sup. em Clínica Integrada AB e Média Compl. I",horas: 60,  periodo: 7,  prereqs: ["OD-01416"],                     curso: "odonto" },
  { code: "OD-01475", nome: "Estágio Sup. em Serviços de Atenção Básica I",         horas: 60,  periodo: 7,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03733", nome: "Odontologia Integrada AB e Média Complexidade I",      horas: 30,  periodo: 7,  prereqs: ["OD-03732"],                     curso: "odonto" },
  { code: "OD-03748", nome: "Odontopediatria Pré-Clínica",                          horas: 60,  periodo: 7,  prereqs: [],                               curso: "odonto" },
  { code: "OD-03860", nome: "Ortodontia Pré-Clínica",                               horas: 60,  periodo: 7,  prereqs: ["OD-03726"],                     curso: "odonto" },
  { code: "OD-04502", nome: "Projetos de Pesquisa",                                 horas: 30,  periodo: 7,  prereqs: ["OD-03472"],                     curso: "odonto" },
  // Período 8
  { code: "OD-00572", nome: "Clínica Integrada da Infância I",                      horas: 60,  periodo: 8,  prereqs: ["OD-00428","OD-03748","OD-03860"],curso: "odonto" },
  { code: "OD-00578", nome: "Clínica Integrada de Próteses e DTM",                  horas: 90,  periodo: 8,  prereqs: ["OD-00577"],                     curso: "odonto" },
  { code: "OD-01418", nome: "Estágio Sup. em Clínica Integrada AB e Média Compl. II",horas:120, periodo: 8,  prereqs: ["OD-01417"],                     curso: "odonto" },
  { code: "OD-01476", nome: "Estágio Sup. em Serviços de Atenção Básica II",        horas: 60,  periodo: 8,  prereqs: ["OD-01475"],                     curso: "odonto" },
  { code: "OD-02593", nome: "Implantodontia",                                        horas: 30,  periodo: 8,  prereqs: ["OD-00556","OD-00569","OD-03726","OD-00577"], curso: "odonto" },
  { code: "OD-03734", nome: "Odontologia Integrada AB e Média Complexidade II",     horas: 30,  periodo: 8,  prereqs: ["OD-03733"],                     curso: "odonto" },
  { code: "OD-03868", nome: "Pacientes com Necessidades Especiais",                 horas: 30,  periodo: 8,  prereqs: ["OD-01417"],                     curso: "odonto" },
  // Período 9
  { code: "OD-00568", nome: "Clínica de Pacientes com Necessidades Especiais",      horas: 60,  periodo: 9,  prereqs: ["OD-00572","OD-01418"],           curso: "odonto" },
  { code: "OD-00573", nome: "Clínica Integrada da Infância II",                     horas: 60,  periodo: 9,  prereqs: ["OD-00572"],                     curso: "odonto" },
  { code: "OD-01419", nome: "Estágio Sup. em Clínica Integrada de Média Compl. I",  horas: 120, periodo: 9,  prereqs: ["OD-01418"],                     curso: "odonto" },
  { code: "OD-01477", nome: "Estágio Sup. em Serviços de Média Complexidade",       horas: 60,  periodo: 9,  prereqs: ["OD-01476"],                     curso: "odonto" },
  { code: "OD-05643", nome: "Trabalho de Conclusão de Curso I",                     horas: 60,  periodo: 9,  prereqs: ["OD-04502"],                     curso: "odonto" },
  // Período 10
  { code: "OD-01359", nome: "Estágio Multidisciplinar em Serviços de Alta Compl.",  horas: 90,  periodo: 10, prereqs: ["OD-01477"],                     curso: "odonto" },
  { code: "OD-01420", nome: "Estágio Sup. em Clínica Integrada de Média Compl. II", horas: 150, periodo: 10, prereqs: ["OD-01419"],                     curso: "odonto" },
  { code: "OD-05648", nome: "Trabalho de Conclusão de Curso II",                    horas: 60,  periodo: 10, prereqs: [],                               curso: "odonto" },
];

// ─── FÍSICA CCTS 2016 ─────────────────────────────────────────────────────────
// Prefixo "FS" para evitar colisão de códigos
const FS: Disciplina[] = [
  // Período 1
  { code: "FS-01853", nome: "Filosofia da Educação",                                 horas: 30,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  { code: "FS-02713", nome: "Introdução à Informática",                              horas: 60,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  { code: "FS-02797", nome: "Introdução às Medidas em Física",                       horas: 60,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  { code: "FS-02964", nome: "Leitura e Produção Textual",                            horas: 90,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  { code: "FS-03472", nome: "Metodologia Científica",                                horas: 60,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  { code: "FS-04285", nome: "Prática Pedagógica em Física I",                        horas: 30,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  { code: "FS-04342", nome: "Pré-Cálculo",                                           horas: 90,  periodo: 1,  prereqs: [],                               curso: "fisica" },
  // Período 2
  { code: "FS-00453", nome: "Cálculo Diferencial e Integral I",                      horas: 60,  periodo: 2,  prereqs: [],                               curso: "fisica" },
  { code: "FS-00467", nome: "Cálculo Vetorial e Geometria Analítica",               horas: 60,  periodo: 2,  prereqs: [],                               curso: "fisica" },
  { code: "FS-00610", nome: "Compreensão Pública da Ciências e suas Críticas",       horas: 30,  periodo: 2,  prereqs: ["FS-02964"],                     curso: "fisica" },
  { code: "FS-01298", nome: "Espaços Não Formais de Ciências",                       horas: 30,  periodo: 2,  prereqs: ["FS-02964"],                     curso: "fisica" },
  { code: "FS-02544", nome: "História e Política da Educação Básica no Brasil",      horas: 60,  periodo: 2,  prereqs: ["FS-02964"],                     curso: "fisica" },
  { code: "FS-03395", nome: "Mecânica Básica",                                       horas: 60,  periodo: 2,  prereqs: ["FS-02797"],                     curso: "fisica" },
  { code: "FS-04287", nome: "Prática Pedagógica em Física II",                       horas: 30,  periodo: 2,  prereqs: ["FS-04285"],                     curso: "fisica" },
  { code: "FS-04712", nome: "Química Geral",                                         horas: 60,  periodo: 2,  prereqs: [],                               curso: "fisica" },
  // Período 3
  { code: "FS-00105", nome: "Álgebra Linear",                                        horas: 60,  periodo: 3,  prereqs: ["FS-00467"],                     curso: "fisica" },
  { code: "FS-00455", nome: "Cálculo Diferencial e Integral II",                     horas: 60,  periodo: 3,  prereqs: ["FS-00453"],                     curso: "fisica" },
  { code: "FS-01920", nome: "Física Geral I",                                        horas: 60,  periodo: 3,  prereqs: ["FS-00453","FS-00467"],           curso: "fisica" },
  { code: "FS-02865", nome: "Laboratório de Física I",                               horas: 30,  periodo: 3,  prereqs: ["FS-03395"],                     curso: "fisica" },
  { code: "FS-04289", nome: "Prática Pedagógica em Física III",                      horas: 60,  periodo: 3,  prereqs: ["FS-04287"],                     curso: "fisica" },
  { code: "FS-04570", nome: "Psicologia do Desenvolvimento e da Aprendizagem",       horas: 60,  periodo: 3,  prereqs: ["FS-04287"],                     curso: "fisica" },
  { code: "FS-05038", nome: "Sociologia da Educação",                                horas: 30,  periodo: 3,  prereqs: ["FS-02544"],                     curso: "fisica" },
  // Período 4
  { code: "FS-00457", nome: "Cálculo Diferencial e Integral III",                    horas: 60,  periodo: 4,  prereqs: ["FS-00467","FS-00455"],           curso: "fisica" },
  { code: "FS-01923", nome: "Física Geral II",                                       horas: 60,  periodo: 4,  prereqs: ["FS-01920"],                     curso: "fisica" },
  { code: "FS-02867", nome: "Laboratório de Física II",                              horas: 30,  periodo: 4,  prereqs: ["FS-02865"],                     curso: "fisica" },
  { code: "FS-03822", nome: "Organização do Trabalho e Currículo na Escola",         horas: 60,  periodo: 4,  prereqs: ["FS-02964"],                     curso: "fisica" },
  { code: "FS-04292", nome: "Prática Pedagógica em Física IV",                       horas: 60,  periodo: 4,  prereqs: ["FS-04289"],                     curso: "fisica" },
  { code: "FS-04367", nome: "Probabilidade e Estatística",                           horas: 60,  periodo: 4,  prereqs: ["FS-00455"],                     curso: "fisica" },
  { code: "FS-05017", nome: "Sociedade e Meio Ambiente",                             horas: 30,  periodo: 4,  prereqs: ["FS-02964"],                     curso: "fisica" },
  // Período 5
  { code: "FS-01010", nome: "Divulgação Científica",                                 horas: 30,  periodo: 5,  prereqs: ["FS-05017"],                     curso: "fisica" },
  { code: "FS-01288", nome: "Equações Diferenciais e Ordinárias",                    horas: 60,  periodo: 5,  prereqs: ["FS-00467","FS-00105","FS-00455"],curso: "fisica" },
  { code: "FS-01867", nome: "Filosofia das Ciências",                                horas: 60,  periodo: 5,  prereqs: ["FS-05017"],                     curso: "fisica" },
  { code: "FS-01909", nome: "Física do Ambiente",                                    horas: 30,  periodo: 5,  prereqs: ["FS-01923"],                     curso: "fisica" },
  { code: "FS-01927", nome: "Física Geral III",                                      horas: 60,  periodo: 5,  prereqs: ["FS-01923"],                     curso: "fisica" },
  { code: "FS-02682", nome: "Introdução à Astronomia",                               horas: 60,  periodo: 5,  prereqs: ["FS-01923"],                     curso: "fisica" },
  { code: "FS-02869", nome: "Laboratório de Física III",                             horas: 30,  periodo: 5,  prereqs: ["FS-02867"],                     curso: "fisica" },
  { code: "FS-04404", nome: "Processo Didático, Planejamento e Avaliação",           horas: 60,  periodo: 5,  prereqs: ["FS-03822"],                     curso: "fisica" },
  // Período 6
  { code: "FS-01210", nome: "Eletromagnetismo",                                      horas: 60,  periodo: 6,  prereqs: ["FS-01288","FS-01927"],           curso: "fisica" },
  { code: "FS-01407", nome: "Estágio Supervisionado de Observação",                  horas: 105, periodo: 6,  prereqs: ["FS-04292","FS-04404"],           curso: "fisica" },
  { code: "FS-01939", nome: "Física-Matemática",                                     horas: 60,  periodo: 6,  prereqs: ["FS-01288"],                     curso: "fisica" },
  { code: "FS-02792", nome: "Introdução às Ciências Atmosféricas",                   horas: 60,  periodo: 6,  prereqs: ["FS-01909"],                     curso: "fisica" },
  { code: "FS-03396", nome: "Mecânica Clássica",                                     horas: 60,  periodo: 6,  prereqs: ["FS-01920","FS-01288"],           curso: "fisica" },
  { code: "FS-04049", nome: "Pesquisa em Ensino de Ciências",                        horas: 30,  periodo: 6,  prereqs: ["FS-02964","FS-03472","FS-04292"],curso: "fisica" },
  // Período 7
  { code: "FS-01400", nome: "Estágio Supervisionado de Intervenção I",               horas: 150, periodo: 7,  prereqs: ["FS-01407"],                     curso: "fisica" },
  { code: "FS-01934", nome: "Física Moderna e Contemporânea",                        horas: 60,  periodo: 7,  prereqs: ["FS-01927","FS-03396"],           curso: "fisica" },
  { code: "FS-02467", nome: "História da Física",                                    horas: 60,  periodo: 7,  prereqs: ["FS-01927"],                     curso: "fisica" },
  { code: "FS-02659", nome: "Instrumentação para o Ensino de Física",                horas: 30,  periodo: 7,  prereqs: ["FS-04292","FS-02869"],           curso: "fisica" },
  { code: "FS-02871", nome: "Laboratório de Física IV",                              horas: 30,  periodo: 7,  prereqs: ["FS-02869"],                     curso: "fisica" },
  { code: "FS-03862", nome: "Ótica Física",                                          horas: 60,  periodo: 7,  prereqs: ["FS-01210"],                     curso: "fisica" },
  { code: "FS-05634", nome: "Trabalho de Conclusão de Curso I",                      horas: 60,  periodo: 7,  prereqs: ["FS-04049"],                     curso: "fisica" },
  // Período 8
  { code: "FS-01401", nome: "Estágio Supervisionado de Intervenção II",              horas: 150, periodo: 8,  prereqs: ["FS-01400"],                     curso: "fisica" },
  { code: "FS-01912", nome: "Física e Cultura",                                      horas: 30,  periodo: 8,  prereqs: ["FS-02467"],                     curso: "fisica" },
  { code: "FS-02973", nome: "LIBRAS",                                                horas: 30,  periodo: 8,  prereqs: ["FS-04404"],                     curso: "fisica" },
  { code: "FS-03409", nome: "Mecânica Quântica",                                     horas: 60,  periodo: 8,  prereqs: ["FS-00105","FS-01927"],           curso: "fisica" },
  { code: "FS-05303", nome: "Termodinâmica",                                         horas: 60,  periodo: 8,  prereqs: ["FS-01923","FS-01288"],           curso: "fisica" },
  { code: "FS-05635", nome: "Trabalho de Conclusão de Curso II",                     horas: 60,  periodo: 8,  prereqs: [],                               curso: "fisica" },
];

// ─── Exports ──────────────────────────────────────────────────────────────────

export const DISCIPLINAS: Disciplina[] = [...ENG, ...OD, ...FS];

export const CARGA_TOTAL_ENG  = 3950;
export const CARGA_TOTAL_OD   = OD.reduce((s, d) => s + d.horas, 0);
export const CARGA_TOTAL_FS   = FS.reduce((s, d) => s + d.horas, 0);
// Mantido para compatibilidade com a grade de Eng Civil (página principal)
export const CARGA_TOTAL = CARGA_TOTAL_ENG;

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

// Helpers por curso
export const DISCIPLINAS_ENG   = DISCIPLINAS.filter((d) => d.curso === "engcivil");
export const DISCIPLINAS_OD    = DISCIPLINAS.filter((d) => d.curso === "odonto");
export const DISCIPLINAS_FS    = DISCIPLINAS.filter((d) => d.curso === "fisica");

export type CursoId = "engcivil" | "odonto" | "fisica";

export const CURSOS: { id: CursoId; nome: string; sigla: string }[] = [
  { id: "engcivil", nome: "Engenharia Civil", sigla: "Eng. Civil" },
  { id: "odonto", nome: "Odontologia", sigla: "Odonto" },
  { id: "fisica", nome: "Física", sigla: "Física" },
];

export const CURSO_PADRAO: CursoId = "engcivil";

export const DISCIPLINAS_POR_CURSO: Record<CursoId, Disciplina[]> = {
  engcivil: DISCIPLINAS_ENG,
  odonto: DISCIPLINAS_OD,
  fisica: DISCIPLINAS_FS,
};

export const CARGA_TOTAL_POR_CURSO: Record<CursoId, number> = {
  engcivil: CARGA_TOTAL_ENG,
  odonto: CARGA_TOTAL_OD,
  fisica: CARGA_TOTAL_FS,
};

export const PERIODOS_POR_CURSO: Record<CursoId, number[]> = {
  engcivil: PERIODOS,
  odonto: Array.from(new Set(DISCIPLINAS_OD.map((d) => d.periodo))).sort((a, b) => a - b),
  fisica: Array.from(new Set(DISCIPLINAS_FS.map((d) => d.periodo))).sort((a, b) => a - b),
};

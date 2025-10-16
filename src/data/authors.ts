export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  bio?: string;
}

export const authors: Record<string, Author> = {
  "eder-silva": {
    id: "eder-silva",
    name: "Eder Silva",
    role: "Especialista em Direito Tributário",
    initials: "ES",
    avatar: "/foto-perfil-eder.jpg",
    bio: "Especialista em direito tributário com ampla experiência em consultoria fiscal e planejamento tributário estratégico.",
  },
  "maria-contadora": {
    id: "maria-contadora",
    name: "Maria Santos",
    role: "Contadora Especialista",
    initials: "MS",
    bio: "Contadora especializada em gestão tributária para pequenas e médias empresas.",
  },
  "joao-consultor": {
    id: "joao-consultor",
    name: "João Oliveira",
    role: "Consultor Fiscal",
    initials: "JO",
    bio: "Consultor fiscal com expertise em adequação à legislação tributária e auditorias.",
  },
};

export const getAuthor = (authorId: string): Author => {
  return authors[authorId] || authors["eder-silva"];
};

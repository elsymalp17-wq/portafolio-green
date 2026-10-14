export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  sector: string;
  duties: string[];
  achievements: string[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
}

export interface CourseItem {
  title: string;
  institution: string;
  year: string;
  category: string;
  description: string;
  inProgress?: boolean;
}

export interface SkillProgressItem {
  name: string;
  level: string;
  percentage: number;
  category: 'software' | 'normativa' | 'tecnica';
}

export const CV_DATA = {
  fullName: "ELSY MELINA MALPARTIDA CARHUAZ",
  preferredName: "Elsy Melina Malpartida Carhuaz",
  shortTitle: "Ing. Ambiental Colegiada (Bachiller)",
  fullTitle: "Bachiller en Ingeniería Ambiental | Permisos y Gestión Ambiental en Minería",
  email: "elsymalp17@gmail.com",
  phone: "+51 918 246 429",
  location: "Cerro de Pasco, Perú",
  availability: "Disponibilidad para trabajo en régimen atípico (14x7 / 20x10) y reubicación a nivel nacional",
  linkedInUrl: "https://www.linkedin.com/in/elsy-malparcar",
  linkedInUser: "linkedin.com/in/elsy-malparcar",
  photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdMojKPwkr4CNd27gMn8vlHm-bUa0DP2YBNONc48qrtUO9mTwJ9ATu3Xv2-CV6adAlC65MfPkaamiZwfwE3XkBelF39-v1YbI6EVxFJcVROPtlmRfMcYDNEFBGp20h7aAVlyzaxrYwSCfrRajPybKiLYRQ8orXacSAfuowgEhRlLuj2XPlWtZeowcUUyhVB0buVIg9UaWNkf_rvE8goc75jKBbhIo7iTgaiFK97c1mul3FNbK01nWJve8R_vnt41vuU1Q",
  inspirationalQuote: "Preservando los recursos naturales a través de la ciencia, la innovación y el compromiso ambiental con las futuras generaciones.",
  summary: "Bachiller en Ingeniería Ambiental con experiencia en gestión ambiental y SSOMA en operaciones mineras. Capacitada en monitoreo ambiental de efluentes, agua y ruido conforme a ECA y LMP vigentes; gestión y segregación de residuos sólidos no municipales; operación y monitoreo de PTARI; y control documentario SSOMA. Conocimiento en normativa ambiental peruana (Ley 29783, D.S. 024-2016-EM, ISO 14001:2015, ISO 45001:2018), instrumentos de gestión ambiental (EIA, DIA, PAMA, PMA) y manejo de herramientas SIG (ArcGIS, AutoCAD, Power BI). Orientada a desarrollarse en gestión de permisos, licencias y títulos habilitantes ambientales, fiscalización y SSOMA a lo largo del ciclo de vida de proyectos mineros (exploración, operación y cierre), en los sectores minería, construcción e hidrocarburos.",
  stats: [
    { label: "Cumplimiento Documentario", value: "100%", description: "Auditorías y requerimientos de seguridad" },
    { label: "Operaciones Mineras", value: "2+", description: "Experiencia en mina y plantas de beneficio" },
    { label: "Monitoreos de Campo", value: "15+", description: "Efluentes PTARI, agua, ruido y residuos" },
    { label: "Normativa & Cursos", value: "6+", description: "Especializaciones y marco regulatorio minero" },
  ],
  highlights: [
    "Operación y monitoreo de PTARI (parámetros fisicoquímicos, pH y LMP)",
    "Monitoreo ambiental de efluentes, agua y ruido conforme a ECA y LMP",
    "Gestión integral de residuos sólidos no municipales (SIGERSOL)",
    "Control documentario SSOMA: Anexo 5, fichas de operadores e IPERC",
    "Instrumentos de gestión ambiental (EIA, DIA, PAMA, PMA) en SEIA",
    "Disponibilidad inmediata para régimen atípico 14x7 / 20x10 a nivel nacional"
  ],
  experiences: [
    {
      id: "beijing-shougang",
      role: "Asistente de Seguridad – SSOMA",
      company: "Beijing Shougang Mine Construction Engineering",
      period: "Marzo 2026",
      location: "Marcona, Ica, Perú",
      sector: "Sector Construcción Minera & Operación",
      duties: [
        "Gestión y control documentario de seguridad: Anexo 5, fichas de operadores y formatos SSOMA.",
        "Recopilación y organización de información para reuniones semanales de SSOMA.",
        "Soporte en cumplimiento de requerimientos de seguridad del cliente (unidad minera).",
        "Gestión de materiales y EPP para operaciones en mina (sector construcción minera)."
      ],
      achievements: [
        "Actualización del Índice de Desempeño de Seguridad (IDS) – marzo 2026.",
        "Organización del 100% de fichas de operadores 2025 y cumplimiento total de requerimientos documentarios de seguridad.",
        "Cumplimiento del 100% de requerimientos documentarios en seguridad."
      ],
      tags: ["SSOMA", "Anexo 5", "Fichas de Operadores", "Construcción Minera", "IDS", "Gestión EPP"]
    },
    {
      id: "bienes-raices",
      role: "Practicante Preprofesional – Área Ambiental",
      company: "Bienes Raíces S.A. (Operación Minera)",
      period: "Marzo 2024 – Mayo 2024",
      location: "Zaruma, Ecuador",
      sector: "Operación Minera & Planta de Beneficio",
      duties: [
        "Monitoreo de efluentes en PTARI (Planta de Tratamiento de Aguas Residuales Industriales): verificación de pH, sólidos y parámetros fisicoquímicos conforme a normativa ambiental.",
        "Gestión, segregación y disposición de residuos sólidos no municipales en mina y planta de beneficio.",
        "Monitoreo de ruido ocupacional en áreas operativas conforme a LMP de ruido.",
        "Elaboración de registros e informes técnicos de monitoreo ambiental, con redacción, edición y síntesis de reportes para revisión de cumplimiento normativo."
      ],
      achievements: [
        "Identificación de aspectos e impactos ambientales en operaciones mineras.",
        "Apoyo en el cumplimiento de instrumentos de gestión ambiental (IGA) conforme al Plan Anual Ambiental.",
        "Informe de monitoreo de efluentes con resultados dentro de LMP; implementación de seguimiento en la segregación de residuos sólidos; registro de monitoreo de ruido sin exceder límites permisibles."
      ],
      tags: ["PTARI", "Monitoreo Efluentes", "Ruido Ocupacional", "ECA & LMP", "Residuos Industriales", "Informes Técnicos"]
    }
  ] as ExperienceItem[],
  education: [
    {
      degree: "Bachiller en Ingeniería Ambiental",
      institution: "Universidad Nacional Daniel Alcides Carrión",
      period: "2020 – 2025",
      location: "Pasco, Perú",
      description: "Formación universitaria integral en ciencias ambientales, remediación, evaluación de impacto ambiental, modelamiento ambiental y gestión en recursos naturales y minería."
    }
  ] as EducationItem[],
  courses: [
    {
      title: "Inteligencia Artificial Aplicada al Medio Ambiente",
      institution: "Equilibria Consulting S.A.C. | Pasco",
      year: "2026 (en proceso)",
      category: "Innovación Tecnológica",
      description: "Modelos predictivos, análisis geoespacial y optimización de monitoreos ambientales con herramientas de IA.",
      inProgress: true
    },
    {
      title: "Instrumentos de Gestión Ambiental (IGA) en el marco del SEIA",
      institution: "Equilibria Consulting S.A.C.",
      year: "2026 (en proceso)",
      category: "Gestión Ambiental & SEIA",
      description: "Identificación, Caracterización y Valoración de Impactos Ambientales conforme al Sistema Nacional de Evaluación del Impacto Ambiental.",
      inProgress: true
    },
    {
      title: "Reglamentos de Gestión y/o Protección Ambiental (RGA) vigentes en el Perú",
      institution: "Equilibria Consulting S.A.C. | Pasco",
      year: "2026 (en proceso)",
      category: "Normativa Peruana",
      description: "Actualización en regulaciones sectoriales de minería e industria (MINEM, OEFA, SENACE y reglamentos de protección ambiental).",
      inProgress: true
    },
    {
      title: "Tratamientos de Aguas Ácidas en Minería",
      institution: "NetCram | Pasco",
      year: "2026",
      category: "Tratamiento de Aguas",
      description: "Neutralización de drenajes ácidos de roca (DAR/DAM), coagulación-floculación y operación de PTARI mineras.",
      inProgress: false
    },
    {
      title: "Cierre de Minas y Pasivos Ambientales",
      institution: "Ecoambiental Group | Pasco",
      year: "2026",
      category: "Minería & Cierre",
      description: "Planes de cierre temporal y definitivo, estabilidad física, química e hidrológica de pasivos ambientales mineros.",
      inProgress: false
    },
    {
      title: "Gestión de Seguridad y Salud en el Trabajo (SST) – MINSUP",
      institution: "Sector Minería | Pasco",
      year: "2023",
      category: "Seguridad y Salud (SSOMA)",
      description: "Implementación práctica de la Ley 29783 y D.S. 024-2016-EM para la prevención de riesgos en operaciones de mina.",
      inProgress: false
    }
  ] as CourseItem[],
  normativaItems: [
    { title: "Ley 29783 (SST)", desc: "Ley de Seguridad y Salud en el Trabajo y su reglamento." },
    { title: "D.S. 024-2016-EM & D.S. 023-2017-EM", desc: "Reglamento de Seguridad y Salud Ocupacional en Minería." },
    { title: "ISO 14001:2015", desc: "Sistemas de Gestión Ambiental y ciclo de mejora continua." },
    { title: "ISO 45001:2018", desc: "Sistemas de Gestión de Seguridad y Salud en el Trabajo." },
    { title: "ECA (Agua, Ruido y Suelo)", desc: "Estándares de Calidad Ambiental vigentes en el Perú." },
    { title: "LMP (Efluentes y Emisiones)", desc: "Límites Máximos Permisibles para el subsector minero." },
    { title: "SEIA – Ley 27446", desc: "Sistema Nacional de Evaluación del Impacto Ambiental." },
    { title: "Ley 28611 (LGA)", desc: "Ley General del Ambiente del Perú." },
    { title: "Ley 27314 / D.L. 1278 (LGRS)", desc: "Gestión Integral de Residuos Sólidos y SIGERSOL." },
    { title: "Norma Técnica G.050", desc: "Seguridad durante los trabajos de construcción." }
  ],
  ssomaItems: [
    "Matriz IPERC (Línea Base y Continuo)",
    "Análisis de Trabajo Seguro (ATS)",
    "Procedimientos Escritos de Trabajo Seguro (PETS)",
    "Planes de Contingencia y Emergencias",
    "Inspecciones de Seguridad de Campo",
    "Investigación de Incidentes y Accidentes",
    "Control Documentario SSOMA (Anexo 5 y Fichas)",
    "Identificación de Aspectos e Impactos Ambientales (IAEIA)"
  ],
  gestionAmbientalItems: [
    "Monitoreo ambiental: Agua, efluentes, ruido y suelo",
    "Operación y monitoreo de PTARI (pH, sólidos, DQO/DBO)",
    "Gestión de residuos sólidos no municipales y manifiestos",
    "Elaboración de informes técnicos de cumplimiento ambiental",
    "Instrumentos de Gestión Ambiental (EIA, DIA, PAMA, PMA)",
    "Nociones básicas de permisos, licencias y títulos habilitantes",
    "Línea base ambiental (componente físico y biológico)",
    "Ciclo de vida de proyectos mineros (exploración a cierre)"
  ],
  softwareSkills: [
    { name: "Microsoft Excel", level: "Intermedio", percentage: 85 },
    { name: "Microsoft Word", level: "Intermedio", percentage: 90 },
    { name: "Microsoft PowerPoint", level: "Intermedio", percentage: 88 },
    { name: "Power BI", level: "Básico", percentage: 70 },
    { name: "ArcGIS Pro / ArcMap", level: "Básico", percentage: 75 },
    { name: "QGIS", level: "Básico", percentage: 75 },
    { name: "AutoCAD", level: "Básico", percentage: 70 },
    { name: "Google Earth Pro", level: "Básico", percentage: 82 },
    { name: "Microsoft Project", level: "Básico", percentage: 68 }
  ],
  languages: [
    {
      name: "Español",
      level: "Nativo / Lengua Materna",
      percentage: 100,
      dots: 5
    },
    {
      name: "Inglés",
      level: "Intermedio (Lectura técnica y reportes)",
      percentage: 65,
      dots: 3
    }
  ],
  leadership: [
    {
      title: "Delegada y Presidenta de Salón",
      institution: "Universidad Nacional Daniel Alcides Carrión",
      period: "2020 – 2022",
      description: "Representación estudiantil ante la dirección de escuela, coordinación académica y liderazgo en actividades de proyección social y ambiental."
    },
    {
      title: "Participación en el XV CONEIA",
      institution: "Congreso Nacional de Estudiantes de Ingeniería Ambiental",
      period: "Arequipa 2022",
      description: "Asistencia y actualización en ponencias magistrales sobre transición energética, minería sostenible y tecnologías de remediación."
    },
    {
      title: "Participación en el XVI CONEIA",
      institution: "Congreso Nacional de Estudiantes de Ingeniería Ambiental",
      period: "Moyobamba 2023",
      description: "Actualización técnica en conservación de ecosistemas amazónicos, bonos de carbono y gestión hídrica."
    }
  ],
  softSkills: [
    "Trabajo en equipo",
    "Liderazgo",
    "Organización",
    "Proactividad",
    "Adaptabilidad al cambio",
    "Comunicación efectiva",
    "Orientación a resultados",
    "Responsabilidad ambiental",
    "Planificación",
    "Aprendizaje continuo",
    "Mejora continua",
    "Resolución de problemas"
  ],
  reference: {
    name: "Ing. César Escobar Mejía",
    role: "Superintendente SSOMA",
    phone: "+51 974 416 085"
  }
};

export type Lang = 'es' | 'en';

export type PostMeta = {
  title: string;
  description: string;
  pubDate: string;
};

export type ProjectMeta = {
  title: string;
  description: string;
  year?: string;
};

type MdModule = {
  frontmatter: Record<string, unknown>;
  default: unknown;
};

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.(md|mdx)$/, '');
}

function loadCollection(
  modules: Record<string, MdModule>,
): Array<{ slug: string; frontmatter: Record<string, unknown>; Content: unknown }> {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      slug: slugFromPath(path),
      frontmatter: mod.frontmatter ?? {},
      Content: mod.default,
    }))
    .sort((a, b) => String(b.frontmatter.pubDate ?? '').localeCompare(String(a.frontmatter.pubDate ?? '')));
}

const postModules = {
  es: import.meta.glob<MdModule>('../content/es/posts/*.{md,mdx}', { eager: true }),
  en: import.meta.glob<MdModule>('../content/en/posts/*.{md,mdx}', { eager: true }),
};

const projectModules = {
  es: import.meta.glob<MdModule>('../content/es/projects/*.{md,mdx}', { eager: true }),
  en: import.meta.glob<MdModule>('../content/en/projects/*.{md,mdx}', { eager: true }),
};

export function getPosts(lang: Lang) {
  return loadCollection(postModules[lang]);
}

export function getPost(lang: Lang, slug: string) {
  return getPosts(lang).find((p) => p.slug === slug);
}

export function getProjects(lang: Lang) {
  return loadCollection(projectModules[lang]);
}

export function getProject(lang: Lang, slug: string) {
  return getProjects(lang).find((p) => p.slug === slug);
}


/** Human-readable date for listings; ES→es-ES, EN→en-US. Uses UTC calendar day. */
export function formatDate(date: string | Date, lang: Lang): string {
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  const raw = typeof date === 'string' ? date : date.toISOString();
  const m = String(raw).match(/^(\d{4})-(\d{2})-(\d{2})/);
  const d = m
    ? new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])))
    : new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

/** Build a path under the configured Astro `base`. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function switchLangPath(currentPath: string, toLang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = currentPath;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/';
  }
  const swapped = path.replace(/^\/(es|en)(?=\/|$)/, `/${toLang}`);
  return withBase(swapped.startsWith('/') ? swapped : `/${swapped}`);
}

export const ui = {
  es: {
    home: 'Inicio',
    posts: 'Escritos',
    projects: 'Proyectos',
    langLabel: 'EN',
    otherLang: 'en' as Lang,
    siteTitle: 'Agustín Damonte',
    postsHeading: 'Escritos',
    projectsHeading: 'Proyectos',
    homeIntro: 'Sitio personal. Notas y proyectos.',
    seeAll: 'Ver todos',
  },
  en: {
    home: 'Home',
    posts: 'Writing',
    projects: 'Projects',
    langLabel: 'ES',
    otherLang: 'es' as Lang,
    siteTitle: 'Agustín Damonte',
    postsHeading: 'Writing',
    projectsHeading: 'Projects',
    homeIntro: 'Personal site. Notes and projects.',
    seeAll: 'See all',
  },
} as const;

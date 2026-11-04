import { links } from "@/data/content/home";

export type Post = { title: string; href: string; date: string; image?: string; blurb?: string };

const decode = (s: string) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&apos;/g, "'")
    .trim();

const tag = (item: string, name: string) => {
  const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

// Reads the public Substack RSS feed. Any failure returns [] so the homepage sections simply stay hidden.
// The feed images are full size (some 4000px wide). Substack's image CDN resizes them when asked.
const small = (url?: string) => url?.replace(/(\$s_![^,!]+!),/, "$1,w_720,c_limit,");

export async function getSubstackPosts(limit = 12): Promise<Post[]> {
  try {
    const res = await fetch(`${links.substack}feed`);
    if (!res.ok) return [];
    const xml = await res.text();
    return xml.split("<item>").slice(1, limit + 1).map((item) => ({
      title: tag(item, "title"),
      href: tag(item, "link"),
      date: new Date(tag(item, "pubDate")).toISOString(),
      image: small(item.match(/<enclosure url="([^"]+)"/)?.[1]),
      blurb: tag(item, "description"),
    })).filter((p) => p.title && p.href);
  } catch {
    return [];
  }
}

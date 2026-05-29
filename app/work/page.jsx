import { R } from "@/components/Reveals";
import FilterableWork from "@/components/FilterableWork";
import CTABlock from "@/components/CTABlock";
import { getAllProjects, getSiteContent } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Work — Tahir Umer" };

export default async function WorkPage() {
  const [projects, content] = await Promise.all([getAllProjects(), getSiteContent()]);
  const { work } = content;

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>004 / Work</span></R>
      <R d={0.1}><h1 className="page-title">{work.title}</h1></R>
      <R d={0.2}>
        <p className="page-sub">{work.sub}</p>
      </R>

      {/* NOTE: do NOT wrap FilterableWork in <R>. Its IntersectionObserver
          (threshold 0.18) never fires for a section taller than ~5x the
          viewport, so the whole grid would stay hidden. Each ProjectCard
          already self-reveals on scroll. */}
      <div style={{ marginTop: "var(--space-md)" }}>
        <FilterableWork projects={projects} showCounts emptyMessage={work.empty} />
      </div>

      <CTABlock />
    </main>
  );
}

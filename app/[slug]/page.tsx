import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/case-study";
import sourceContent from "@/research/content-catalog.json";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

function projectSlug(url: string) {
  return new URL(url).pathname.replace(/^\/+|\/+$/g, "");
}

function findProject(slug: string) {
  return sourceContent.projects.find(
    (project) => projectSlug(project.url) === slug,
  );
}

export function generateStaticParams() {
  return sourceContent.projects.map((project) => ({
    slug: projectSlug(project.url),
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const title = `${project.title} | CustomWebPro`;
  const description = project.description.split(/(?<=[.!?])\s+/)[0];
  const cover = project.images[0];

  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${slug}`,
      images: [
        {
          url: cover.localPath,
          width: cover.width,
          height: cover.height,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const index = sourceContent.projects.indexOf(project);
  const nextProject =
    sourceContent.projects[(index + 1) % sourceContent.projects.length];

  return (
    <CaseStudy
      project={project}
      nextProject={nextProject}
      projectNumber={index + 1}
    />
  );
}

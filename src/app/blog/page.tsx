import { PageIntro } from "@/components/ui";
import { BlogList } from "@/components/blog-list";
import { getArticles } from "@/lib/blog";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Articles and project notes",
  "Notes on building AI and automation projects, including the business problem, implementation choices, test results and limitations.",
  "/blog/",
);
export default function Blog() {
  const articles = getArticles().map(({ content, headings, ...summary }) => {
    void content;
    void headings;
    return summary;
  });
  return (
    <>
      <PageIntro
        label="Notes from the workbench"
        title="Articles and project notes"
      >
        <p>
          Write-ups covering the problem, how I approached it, the code involved
          and what I found when testing.
        </p>
      </PageIntro>
      <section className="container section-bottom">
        <BlogList articles={articles} />
      </section>
    </>
  );
}

import { PageIntro } from "@/components/ui";
import { BlogList } from "@/components/blog-list";
import { getArticles } from "@/lib/blog";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Articles — Notes from the workbench",
  "Practical guides and thoughtful project notes connecting business problems with AI, automation and implementation details.",
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
        title="A little more understanding. A useful next step."
      >
        <p>
          Project notes, practical guides and ideas worth unpacking. Business
          context first, with the technical detail to help you go further.
        </p>
      </PageIntro>
      <section className="container section-bottom">
        <BlogList articles={articles} />
      </section>
    </>
  );
}

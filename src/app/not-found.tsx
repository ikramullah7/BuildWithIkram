import { Button, Eyebrow } from "@/components/ui";
import { Arrow } from "@/components/icons";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 · A small detour</Eyebrow>
      <h1>
        This page hasn’t
        <br />
        been built here.
      </h1>
      <p>
        The link may have changed, or the page may not exist. There’s still
        plenty to explore.
      </p>
      <Button href="/">
        Back to the homepage
        <Arrow />
      </Button>
    </section>
  );
}

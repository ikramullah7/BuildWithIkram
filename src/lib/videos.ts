import { z } from "zod";
import data from "../../content/videos/videos.json";
const schema = z.array(
  z.object({
    id: z.string().regex(/^[\w-]{11}$/),
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    category: z.string(),
    relatedArticle: z.string().optional(),
    relatedProject: z.string().optional(),
  }),
);
export const videos = schema.parse(data);

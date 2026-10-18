import data from "../../content/projects/projects.json";
export const projects = data;
export type Project = (typeof projects)[number];

import * as fs from "./fs-acl";
import path from "node:path";

export const CONTENT_DIR = path.join(fs.CURRENT_DIR, "content");
export const FOLDERS_URL_ROOT = "/folders";
export const NOTES_URL_ROOT = "/notes";

export function isPublicAsset(name: string): boolean {
  return !(name.startsWith(".") || name.startsWith("_"));
}

export function isPrivateAsset(x: string) {
  return !isPublicAsset(x);
}

export function isNote(x: string): boolean {
  return x.endsWith(".md");
}

export function getNoteLink(path: string): string {
  return `/notes/${path.replace(".md", "")}`;
}

export function getRelativeNoteFilePathFromLink(link: string[]): string {
  return path.join(...link) + ".md";
}

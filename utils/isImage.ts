import { Extension } from "./getColorByExtension";

const imageExtensions: Extension[] = ["png", "jpg", "jpeg", "gif", "webp"];

export const isImage = (ext: Extension): boolean =>
  imageExtensions.includes(ext);

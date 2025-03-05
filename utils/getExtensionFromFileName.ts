import { Extension } from "@/utils/getColorByExtension";

export const getExtensionFromFileName = (fileName: string) =>
  fileName.split(".").pop() as Extension;

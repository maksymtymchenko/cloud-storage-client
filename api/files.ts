import axios from "@/core/axios";
import { FileItem } from "@/api/dto/files.dto";

type FileType = "all" | "photos" | "trash";

export const getAll = async (
  type: FileType = "all",
  userId: number
): Promise<FileItem[]> =>
  (await axios.get("/files?type=" + type + "&id=" + userId)).data;

export const remove = async (ids: number[]): Promise<void> =>
  await axios.delete(`/files?id=${ids}`);

export const uploadFile = async (options: any, id: number) => {
  const { onSuccess, onError, file, onProgress } = options;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", id.toString());

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    const { data } = await axios.post("files?id=7", formData, config);

    onSuccess();

    return data;
  } catch (err) {
    onError({ err });
  }
};

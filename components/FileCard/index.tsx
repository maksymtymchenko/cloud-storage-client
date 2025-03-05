import React from "react";
import { FileTextOutlined } from "@ant-design/icons";
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName";
import { isImage } from "@/utils/isImage";
import { getColorByExtension } from "@/utils/getColorByExtension";
import { API_URL } from "@/constants";
import styles from "./FileCard.module.scss";

interface FileCardProps {
  fileName: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  fileName,
  originalName,
}) => {
  const ext = getExtensionFromFileName(fileName);
  const imageUrl = ext && isImage(ext) ? `${API_URL}/uploads/${fileName}` : "";

  const color = getColorByExtension(ext);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          <img className={styles.image} src={imageUrl} alt="File" />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};

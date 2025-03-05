import React from "react";
import styles from "./FileList.module.scss";
import { FileItem } from "@/api/dto/files.dto";
import { FileCard } from "@/components/FileCard";
import Selecto from "react-selecto";

export type FileSelectType = "select" | "unselect";

interface FileListProps {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`${styles.root} files`}>
      {items.map((item) => (
        <div data-id={item.id} key={item.id} className="file">
          <FileCard fileName={item.fileName} originalName={item.originalName} />
        </div>
      ))}

      <Selecto
        container={containerRef.current}
        selectableTargets={[".file"]}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("active");
            onFileSelect(Number(el.dataset["id"]), "select");
          });
          e.removed.forEach((el) => {
            el.classList.remove("active");
            onFileSelect(Number(el.dataset["id"]), "unselect");
          });
        }}
      />
    </div>
  );
};

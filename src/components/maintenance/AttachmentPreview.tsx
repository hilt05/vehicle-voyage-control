
import React, { useRef } from "react";
import { FileText, FileImage } from "lucide-react";

interface Attachment {
  name: string;
  url: string;
  type: string;
}

interface AttachmentPreviewProps {
  attachments: Attachment[];
  onUpload?: (files: FileList) => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachments, onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex gap-2 flex-wrap">
        {attachments.length === 0 ? (
          <span className="text-slate-400 text-xs">No attachments</span>
        ) : (
          attachments.map((att, i) =>
            att.type.startsWith("image") ? (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded hover:shadow w-12 h-12 overflow-hidden"
                title={att.name}
              >
                <img
                  src={att.url}
                  alt={att.name}
                  className="object-cover w-12 h-12"
                />
              </a>
            ) : (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-2 py-1 rounded border border-slate-200 gap-1 text-xs hover:bg-slate-50"
                title={att.name}
              >
                <FileText className="h-4 w-4 text-slate-500" />
                {att.name}
              </a>
            )
          )
        )}
      </div>
      {onUpload && (
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={e => {
              if (e.target.files) onUpload(e.target.files);
            }}
          />
          <button
            type="button"
            className="text-xs text-blue-600 underline cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default AttachmentPreview;

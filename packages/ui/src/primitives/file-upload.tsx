import * as React from "react"
import { UploadCloud, FileText, CheckCircle2, Trash2 } from "lucide-react"
import { cn } from "../utils/cn"
import { Progress } from "./progress"

export interface UploadedFileItem {
  name: string
  size: string
  progress: number
}

export interface FileDropzoneProps {
  className?: string
  initialFiles?: UploadedFileItem[]
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  className,
  initialFiles = [
    { name: "quarterly-report-2026.csv", size: "1.4 MB", progress: 100 },
    { name: "customer-invoices.pdf", size: "420 KB", progress: 76 },
  ],
}) => {
  const [files, setFiles] = React.useState<UploadedFileItem[]>(initialFiles)
  const [isDragging, setIsDragging] = React.useState(false)

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const dropped = Array.from(e.dataTransfer.files)
          if (dropped.length > 0) {
            setFiles((prev) => [
              ...prev,
              ...dropped.map((f) => ({
                name: f.name,
                size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
                progress: 100,
              })),
            ])
          }
        }}
        onClick={() => {
          setFiles((prev) => [
            ...prev,
            {
              name: `attachment-${prev.length + 1}.pdf`,
              size: "310 KB",
              progress: 100,
            },
          ])
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition-colors cursor-pointer",
          isDragging
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
            : "border-zinc-300 bg-zinc-50/50 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
        )}
      >
        <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <UploadCloud className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-[11px] text-zinc-400">
          CSV, PDF, JSON, or PNG up to 25MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="rounded-xl border border-zinc-200 bg-white p-3 space-y-2 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-zinc-400">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.progress >= 100 && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-rose-500 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <Progress
                value={file.progress}
                size="sm"
                variant={file.progress >= 100 ? "emerald" : "blue"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
FileDropzone.displayName = "FileDropzone"


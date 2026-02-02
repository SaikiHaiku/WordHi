import { cn } from "../utils/cn";

interface TextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  maxLength?: number;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  readOnly = false,
  className,
  maxLength = 5000,
}: TextAreaProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className={cn("relative", className)}>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        className={cn(
          "h-48 w-full resize-none rounded-xl border-2 p-4 text-base transition-all focus:outline-none focus:ring-2",
          readOnly
            ? "border-slate-200 bg-slate-50 text-slate-700 focus:border-slate-300 focus:ring-slate-200"
            : "border-slate-200 bg-white text-slate-800 focus:border-indigo-500 focus:ring-indigo-200"
        )}
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        {!readOnly && value && (
          <button
            onClick={handleClear}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            title="Effacer"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {value && (
          <button
            onClick={handleCopy}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            title="Copier"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        )}
      </div>
      {!readOnly && (
        <div className="absolute bottom-3 left-3 text-xs text-slate-400">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

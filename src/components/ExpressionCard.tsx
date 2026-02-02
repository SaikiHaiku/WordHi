import { TranslationResult } from "../services/translationService";

interface ExpressionCardProps {
  expressionInfo: TranslationResult["expressionInfo"];
}

export function ExpressionCard({ expressionInfo }: ExpressionCardProps) {
  if (!expressionInfo) return null;

  return (
    <div className="mt-4 rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
          <svg
            className="h-5 w-5 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-amber-800">
            💡 Expression idiomatique détectée
          </h4>
          <p className="mt-1 text-sm text-amber-700">
            <span className="font-medium">«{expressionInfo.original}»</span>{" "}
            signifie: <span className="italic">{expressionInfo.meaning}</span>
          </p>
          {expressionInfo.equivalentExpression && (
            <p className="mt-2 text-sm text-amber-700">
              <span className="font-medium">Expression équivalente:</span>{" "}
              <span className="rounded bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
                {expressionInfo.equivalentExpression}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

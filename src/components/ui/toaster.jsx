import { AlertCircleIcon, CheckCircle2Icon, XIcon } from 'lucide-react';

import { useToast } from '@/Hooks/Context/useToast';

const toastStyles = {
  error:
    'border-red-200 bg-red-50 text-red-900',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-900',
};

export const Toaster = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-lg ${toastStyles[toast.type] || toastStyles.success}`}
          >
            <div className="flex items-start gap-3">
              {isError ? (
                <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0" />
              )}

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-xs opacity-80">{toast.description}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-md p-1 opacity-70 transition hover:opacity-100"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

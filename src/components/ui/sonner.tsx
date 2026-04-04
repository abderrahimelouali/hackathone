import { useTheme } from "next-themes";
import { toast, Toaster as Sonner } from "sonner";
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/90 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-border/50 group-[.toaster]:shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-none overflow-hidden px-4 py-4 border transition-all duration-300 flex items-start gap-3.5",
          title: "text-sm font-black tracking-tight leading-none mb-1.5",
          description: "group-[.toast]:text-muted-foreground text-[13px] font-medium leading-relaxed opacity-90",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-black rounded-xl px-4 py-2 text-xs transition-all hover:group-[.toast]:bg-primary/90 active:scale-95 shadow-sm",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-black rounded-xl px-4 py-2 text-xs border border-border/50 transition-all active:scale-95",
          closeButton: "group-[.toast]:bg-background/80 group-[.toast]:backdrop-blur-sm group-[.toast]:text-muted-foreground group-[.toast]:border-border/40 group-[.toast]:hover:text-primary transition-all shadow-sm opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 hover:scale-110",
          success: "group-[.toaster]:bg-emerald-50/90 group-[.toaster]:dark:bg-emerald-950/20 group-[.toaster]:border-emerald-200/40 group-[.toaster]:dark:border-emerald-800/20 group-[.toaster]:text-emerald-900 group-[.toaster]:dark:text-emerald-100",
          error: "group-[.toaster]:bg-red-50/90 group-[.toaster]:dark:bg-red-950/20 group-[.toaster]:border-red-200/40 group-[.toaster]:dark:border-red-800/20 group-[.toaster]:text-red-900 group-[.toaster]:dark:text-red-100",
          warning: "group-[.toaster]:bg-amber-50/90 group-[.toaster]:dark:bg-amber-950/20 group-[.toaster]:border-amber-200/40 group-[.toaster]:dark:border-amber-800/20 group-[.toaster]:text-amber-900 group-[.toaster]:dark:text-amber-100",
          info: "group-[.toaster]:bg-blue-50/90 group-[.toaster]:dark:bg-blue-950/20 group-[.toaster]:border-blue-200/40 group-[.toaster]:dark:border-blue-800/20 group-[.toaster]:text-blue-900 group-[.toaster]:dark:text-blue-100",
        },
      }}
      icons={{
        success: (
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-sm border border-emerald-200/50 dark:border-emerald-700/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        ),
        error: (
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0 shadow-sm border border-red-200/50 dark:border-red-700/30">
            <AlertCircle className="w-6 h-6" />
          </div>
        ),
        info: (
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-sm border border-blue-200/50 dark:border-blue-700/30">
            <Info className="w-6 h-6" />
          </div>
        ),
        warning: (
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-sm border border-amber-200/50 dark:border-amber-700/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

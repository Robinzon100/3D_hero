"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import type { Rescue } from "@/data/rescues";
import { ActionDialog, type ActionRequest } from "@/components/action-dialog";

type Toast = { title: string; description?: string };
interface SiteContextValue {
  openAction: (request: ActionRequest) => void;
  notify: (toast: Toast) => void;
  claimedIds: string[];
  claim: (rescue: Rescue) => void;
}
const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [action, setAction] = useState<ActionRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openAction = useCallback((request: ActionRequest) => {
    setAction(request);
    setDialogOpen(true);
  }, []);
  const notify = useCallback((message: Toast) => {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(null), 3000);
  }, []);
  const claim = useCallback(
    (rescue: Rescue) =>
      setClaimedIds((ids) => (ids.includes(rescue.id) ? ids : [...ids, rescue.id])),
    [],
  );
  useEffect(() => () => clearTimeout(timer.current), []);
  const value = useMemo(
    () => ({ openAction, notify, claimedIds, claim }),
    [openAction, notify, claimedIds, claim],
  );

  return (
    <SiteContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <ActionDialog request={action} open={dialogOpen} onOpenChange={setDialogOpen} />
      <div
        className="pointer-events-none fixed inset-x-4 bottom-5 z-[90] flex justify-center sm:inset-x-auto sm:right-7 sm:bottom-7 sm:max-w-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              role="status"
              className="pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-primary/20 bg-card p-4 shadow-lift sm:mr-14"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description && (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Dismiss notification"
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SiteContext.Provider>
  );
}

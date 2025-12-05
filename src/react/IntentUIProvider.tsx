import React, { createContext, useContext } from "react";
import type {
  IntentEngine,
  IntentComponentConfig,
  IntentLayout,
} from "../core/types";

interface IntentUIContextValue {
  engine: IntentEngine;
  registry: Record<string, IntentComponentConfig>;
}

const IntentUIContext = createContext<IntentUIContextValue | null>(null);

interface IntentUIProviderProps {
  engine: IntentEngine;
  components: IntentComponentConfig[];
  children: React.ReactNode;
}

export function IntentUIProvider({
  engine,
  components,
  children,
}: IntentUIProviderProps) {
  const registry = React.useMemo(
    () =>
      components.reduce<Record<string, IntentComponentConfig>>((acc, c) => {
        acc[c.id] = c;
        return acc;
      }, {}),
    [components]
  );

  const value: IntentUIContextValue = { engine, registry };

  return (
    <IntentUIContext.Provider value={value}>
      {children}
    </IntentUIContext.Provider>
  );
}

export function useIntentEngine(): IntentEngine {
  const ctx = useContext(IntentUIContext);
  if (!ctx) {
    throw new Error("useIntentEngine must be used within <IntentUIProvider>");
  }
  return ctx.engine;
}

function useIntentLayoutInternal(): IntentLayout | null {
  const ctx = useContext(IntentUIContext);
  if (!ctx) {
    throw new Error("useIntentLayout must be used within <IntentUIProvider>");
  }
  const { engine } = ctx;

  // useSyncExternalStore keeps React in sync with the engine store
  return (React as any).useSyncExternalStore(
    engine.subscribe,
    () => engine.getLayout(),
    () => engine.getLayout()
  );
}

// Re-exported hook for internal components (grid, state)
export function useIntentLayout(): IntentLayout | null {
  return useIntentLayoutInternal();
}
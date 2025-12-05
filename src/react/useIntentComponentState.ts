import { useIntentEngine } from "./IntentUIProvider";
import { useIntentLayout } from "./IntentUIProvider";
import { useSyncExternalStore } from "react";

export function useIntentComponentState<TState extends object>(
  instanceId: string,
  initialState: TState
): [TState, (updater: TState | ((prev: TState) => TState)) => void] {
  const engine = useIntentEngine();
  const layout = useIntentLayout();

  const getSnapshot = () => {
    const currentLayout = engine.getLayout();
    if (!currentLayout) return initialState;
    for (const region of currentLayout.regions) {
      const inst = region.components.find((c) => c.instanceId === instanceId);
      if (inst && inst.state) {
        return inst.state as TState;
      }
    }
    return initialState;
  };

  const subscribe = (listener: () => void) => engine.subscribe(listener);

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const setState = (updater: TState | ((prev: TState) => TState)) => {
    const current = getSnapshot();
    const next =
      typeof updater === "function"
        ? (updater as (prev: TState) => TState)(current)
        : updater;
    engine.updateComponentState(instanceId, next as Record<string, any>);
  };

  return [state, setState];
}
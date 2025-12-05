import {
  IntentEngine,
  IntentEngineConfig,
  IntentLayout,
} from "./types";

type Listener = () => void;

export function createIntentEngine(config: IntentEngineConfig): IntentEngine {
  let layout: IntentLayout | null = null;
  const listeners = new Set<Listener>();

  const notify = () => {
    for (const l of listeners) l();
  };

  const setLayout = (next: IntentLayout) => {
    layout = normalizeLayout(next);
    notify();
  };

  const updateFromIntent = async (userIntent: string, context: any = {}) => {
    const next = await config.generateLayout({
      userIntent,
      components: config.components,
      previousLayout: layout ?? undefined,
      context,
    });
    setLayout(next);
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getLayout = () => layout;

  const updateComponentState = (
    instanceId: string,
    partialState: Record<string, any>
  ) => {
    if (!layout) return;
    let changed = false;

    const newRegions = layout.regions.map((region) => {
      const newComponents = region.components.map((comp) => {
        if (comp.instanceId !== instanceId) return comp;
        const currentState = comp.state ?? {};
        const nextState = { ...currentState, ...partialState };
        if (nextState === currentState) return comp;
        changed = true;
        return { ...comp, state: nextState };
      });
      return { ...region, components: newComponents };
    });

    if (changed) {
      layout = { ...layout, regions: newRegions };
      notify();
    }
  };

  return {
    updateFromIntent,
    setLayout,
    updateComponentState,
    getLayout,
    subscribe,
  };
}

function normalizeLayout(layout: IntentLayout): IntentLayout {
  // For now just ensure regions array exists and components array exists
  return {
    layoutType: layout.layoutType ?? "grid",
    regions: (layout.regions ?? []).map((region, idx) => ({
      id: region.id ?? `region-${idx}`,
      order: region.order ?? idx,
      components: region.components ?? [],
    })),
  };
}
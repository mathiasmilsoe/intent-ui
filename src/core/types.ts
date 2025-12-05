export type DomainName = string;

export type SchemaType =
  | { kind: "string" }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "enum"; options: string[] }
  | { kind: "domain"; domain: DomainName };

export type PropsSchema = Record<string, SchemaType>;
export type StateSchema = Record<string, SchemaType>;

export type AllowedSize = "full" | "half" | "third" | "quarter";

export interface IntentComponentConfig {
  id: string;
  label: string;
  description?: string;
  allowedSizes?: AllowedSize[];
  propsSchema?: PropsSchema;
  stateSchema?: StateSchema;
}

export interface IntentComponentInstance {
  instanceId: string;
  type: string;
  props?: Record<string, any>;
  state?: Record<string, any>;
  size?: AllowedSize;
  regionId?: string;
}

export interface IntentLayoutRegion {
  id: string;
  order?: number;
  components: IntentComponentInstance[];
}

export interface IntentLayout {
  layoutType: "grid" | "rows" | "custom";
  regions: IntentLayoutRegion[];
}

export interface SelectionContext {
  // free-form bag of context: user/org/etc.
  [key: string]: any;
}

export interface IntentEngineConfig {
  components: IntentComponentConfig[];

  // For v0.0.1, generateLayout is just a function you pass.
  generateLayout: (args: {
    userIntent: string;
    components: IntentComponentConfig[];
    previousLayout?: IntentLayout;
    context: SelectionContext;
  }) => Promise<IntentLayout>;
}

export interface IntentEngine {
  updateFromIntent(userIntent: string, context?: SelectionContext): Promise<void>;
  setLayout(layout: IntentLayout): void;
  updateComponentState(instanceId: string, partialState: Record<string, any>): void;
  getLayout(): IntentLayout | null;
  subscribe(listener: () => void): () => void;
}
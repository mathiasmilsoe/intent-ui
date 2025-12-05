import React from "react";
import type {
  IntentComponentInstance,
  AllowedSize,
} from "../core/types";
import { useIntentLayout } from "./IntentUIProvider";

export interface IntentGridRootProps {
  components: Record<
    string,
    React.ComponentType<{ instanceId: string; props?: any }>
  >;
  className?: string;
  regionClassName?: (regionId: string) => string;
  componentClassName?: (instance: IntentComponentInstance) => string;
}

export function IntentGridRoot({
  components,
  className,
  regionClassName,
  componentClassName,
}: IntentGridRootProps) {
  const layout = useIntentLayout();

  if (!layout) return null;

  return (
    <div className={["iu-grid-root", className].filter(Boolean).join(" ")}>
      {layout.regions
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((region) => {
          const regionCls =
            typeof regionClassName === "function"
              ? regionClassName(region.id)
              : regionClassName ?? "";

          return (
            <div
              key={region.id}
              className={["iu-region", `iu-region-${region.id}`, regionCls]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="iu-region-grid">
                {region.components.map((inst) => {
                  const Comp = components[inst.type];
                  if (!Comp) return null;

                  const sizeClass = sizeToClass(inst.size);
                  const compCls =
                    typeof componentClassName === "function"
                      ? componentClassName(inst)
                      : componentClassName ?? "";

                  return (
                    <div
                      key={inst.instanceId}
                      className={[
                        "iu-component",
                        sizeClass,
                        compCls,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <Comp instanceId={inst.instanceId} props={inst.props} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function sizeToClass(size?: AllowedSize): string {
  switch (size) {
    case "half":
      return "iu-size-half";
    case "third":
      return "iu-size-third";
    case "quarter":
      return "iu-size-quarter";
    case "full":
    default:
      return "iu-size-full";
  }
}
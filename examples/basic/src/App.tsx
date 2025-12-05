import React from "react";
import {
  createIntentEngine,
  IntentUIProvider,
  IntentInput,
  IntentGridRoot,
  type IntentComponentConfig,
  type IntentLayout,
} from "intent-ui";
import "intent-ui/dist/styles/intent-ui.css";

const componentsConfig: IntentComponentConfig[] = [
  { id: "hello-card", label: "Hello Card" },
];

const generateLayout = async ({
  userIntent,
}: {
  userIntent: string;
}): Promise<IntentLayout> => {
  return {
    layoutType: "grid",
    regions: [
      {
        id: "main",
        components: [
          {
            instanceId: "hello-1",
            type: "hello-card",
            props: { message: userIntent },
            size: "full",
          },
        ],
      },
    ],
  };
};

const engine = createIntentEngine({
  components: componentsConfig,
  generateLayout,
});

function HelloCard({ props }: { instanceId: string; props?: any }) {
  return (
    <div style={{ padding: 16, border: "1px solid #eee" }}>
      <h2>Hello from intent-ui</h2>
      <p>Last intent: {props?.message}</p>
    </div>
  );
}

const componentMap = {
  "hello-card": HelloCard,
};

export default function App() {
  return (
    <IntentUIProvider engine={engine} components={componentsConfig}>
      <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "system-ui" }}>
        <h1>Intent UI – basic demo</h1>
        <IntentInput />
        <IntentGridRoot components={componentMap} />
      </div>
    </IntentUIProvider>
  );
}
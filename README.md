# intent-ui

> **Intent-driven UI for the AI era.**  
> A lightweight framework that turns user intent into dynamic layouts, component state, and responsive UIs.  
> Built for React, LLMs, and fast-changing applications.

---

## ⭐️ What is this?

Traditional UIs are navigation-based: menus, pages, buttons.  
AI interfaces today are mostly text-based: chat windows, prompts.

**Intent-UI blends the two worlds**:

- Users express their intent (`"Compliance overview for LumiPump (MDR)"`)
- The system:
  - selects relevant components,
  - arranges them into a layout,
  - sets the right view state,
  - all using fast AI models + developer-defined rules.
- The UI updates **instantly**, visually, and interactively.

This gives you:
- Flexibility of AI  
- Predictability of real UI  
- Zero-manual-navigation user experiences

---

## 🚧 Status

**Extremely early, experimental, everything is subject to change.**

We are building the minimal working slice:

- Component registry  
- Selection-state (developer-controlled domain options)  
- Intent engine  
- React provider & grid renderer  
- Optional OpenAI adapter  

Expect rapid iteration.

---

## 📦 Goals

- Dynamic UI layouts driven by user intent  
- Developer-defined component metadata (`propsSchema`, `stateSchema`, `needsSelection`)  
- Flexible, hierarchical selection-state for precision vs. latency  
- Pluggable LLM providers  
- Reactive grid layout for components  
- Clean developer experience with minimal boilerplate  

---

## 🧩 Roadmap (high-level)

### **v0.0.1 – Minimal Vertical Slice**
- Hardcoded `generateLayout`
- Intent engine store
- React provider
- Grid renderer  
- `useIntentComponentState` hook

### **v0.1 – Selection State**
- `registerSelectionState()`
- Depth-aware slices  
- Pass slices into engine  

### **v0.2 – OpenAI Adapter**
- `@intent-ui/openai`
- JSON schema validation
- Default prompt builder

### **v0.3 – Component Actions & Stability Layer**
- Layout stability rules  
- Component-level semantic actions  

### **v0.4 – Docs & Examples**
- Docs site  
- Example dashboard  
- Example “AI command bar”  

---

## 📜 License

MIT  
Free to use, modify, build on.

---

## 💬 Contributing

Right now: work-in-progress.  
Open issues, PRs, or discussions welcome.

---

## 🙌 Vision

We believe the future of UI is not navigation-driven or chat-driven —  
but **intent-driven**:

> Users describe what they want,  
> Components assemble intelligently,  
> UI adapts instantly.

This repo is the first step.

// Centralized configuration for both state and labels
const trackerConfig = {
  day: { label: "day", type: "number" as const },
  doneThings: { label: "doneThings", type: "number" as const },

  interview: {
    label: "Apply to Open Positions + Send Cold Emails",
    type: "boolean" as const,
  },
  course: {
    label: "1 Harkirat's Course Video from Cohort 2.0",
    type: "boolean" as const,
  },
  course3: {
    label: "Be in-sync with Harkirat's Web3.0 Content + Assignments",
    type: "boolean" as const,
  },
  dsa: {
    label: "2 DSA Questions + Revise Patterns Encountered",
    type: "boolean" as const,
  },
  exercise: {
    label: "1 Hour Physical Activity",
    type: "boolean" as const,
  },
  temple: {
    label: "No Cigarette / Alcohol / Outside Food",
    type: "boolean" as const,
  },
};

// Derive the TrackerState type
export type TrackerState = {
  [K in keyof typeof trackerConfig]: (typeof trackerConfig)[K]["type"] extends "boolean"
    ? boolean
    : number;
};

// Derive the mapper from trackerConfig
export const mapper: Record<keyof TrackerState, string> = Object.keys(
  trackerConfig
).reduce((acc, key) => {
  acc[key as keyof TrackerState] =
    trackerConfig[key as keyof typeof trackerConfig].label;
  return acc;
}, {} as Record<keyof TrackerState, string>);

// Initial State for CheckList.tsx
export const initialTrackerState = (): TrackerState => {
    const initialState: Partial<TrackerState> = {};

    Object.keys(trackerConfig).forEach(key => {
        if (key === "day") {
            initialState[key as keyof TrackerState] = new Date().getDate() as any
        } else if (trackerConfig[key as keyof typeof trackerConfig].type === "boolean") {
            initialState[key as keyof TrackerState] = false as any
        }
    })

    return initialState as TrackerState
}

// Centralized configuration for both state and labels
const trackerConfig = {
  day: { label: "day", type: "number" as const },
  doneThings: { label: "doneThings", type: "number" as const },

  workout: {
    label: "Workout",
    type: "boolean" as const,
  },
  eggs: {
    label: "6 eggs (36g protein)",
    type: "boolean" as const,
  },
  macro: {
    label: "150g chicken breast / 150g paneer (~34g protein)",
    type: "boolean" as const,
  },
  read: {
    label: "Read about coding topics (interview prep)",
    type: "boolean" as const,
  },
  dsa: {
    label: "DSA (3 questions)",
    type: "boolean" as const,
  },
  temple: {
    label: "No Cigarette",
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

  Object.keys(trackerConfig).forEach((key) => {
    if (key === "day") {
      initialState[key as keyof TrackerState] = new Date().getDate() as any;
    } else if (
      trackerConfig[key as keyof typeof trackerConfig].type === "boolean"
    ) {
      initialState[key as keyof TrackerState] = false as any;
    }
  });

  return initialState as TrackerState;
};

export type CardProps = {
  item: TrackerState | null;
  onClick: (item: TrackerState) => void;
  renderPercentage: (item: Partial<TrackerState>) => string;
  renderValue: (
    item: Partial<TrackerState>,
    val: boolean,
    modal?: boolean
  ) => JSX.Element[];
  modalComponent: boolean;
};

export interface TaskState {
  task: {
    value: string;
    placeHolder: string;
  };
  motive: {
    value: string;
    placeHolder: string;
  };
}

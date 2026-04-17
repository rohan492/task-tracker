// Centralized configuration for both state and labels
const trackerConfig = {
  day: { label: "day", type: "number" as const },
  doneThings: { label: "doneThings", type: "number" as const },

  pushup: {
    label: "Pushup",
    type: "boolean" as const,
  },
  squats: {
    label: "Squats",
    type: "boolean" as const,
  },
  crunches: {
    label: "Crunches",
    type: "boolean" as const,
  },
  wake: {
    label: "Wake up at 5:30 AM",
    type: "boolean" as const,
  },
  sleep: {
    label: "Sleep by 10:30 PM",
    type: "boolean" as const,
  },
  cigg: {
    label: "No Cigarettes",
    type: "boolean" as const,
  },
  drink: {
    label: "No Cold Drink",
    type: "boolean" as const,
  },
  coffee: {
    label: "No Coffee / Tea",
    type: "boolean" as const,
  },
  salad: {
    label: "Only Salad for lunch",
    type: "boolean" as const,
  },
  snack: {
    label: "No Evening Snack",
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
  trackerConfig,
).reduce(
  (acc, key) => {
    acc[key as keyof TrackerState] =
      trackerConfig[key as keyof typeof trackerConfig].label;
    return acc;
  },
  {} as Record<keyof TrackerState, string>,
);

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
    modal?: boolean,
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

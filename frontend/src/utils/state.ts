export interface TaskConfig {
  type: "number" | "boolean";
  label: string;
}

export interface DynamicTrackerConfig {
  [key: string]: TaskConfig;
}

export interface TrackerState {
  day: number;
  doneThings?: number;
  taskArray: {
    [key: string]: boolean;
  };
}

// Centralized configuration for dynamic tasks
export const trackerConfig = (
  tasks?: Record<string, TaskConfig>
): DynamicTrackerConfig => {
  const defaultConfig: DynamicTrackerConfig = {
    day: { label: "day", type: "number" },
    doneThings: { label: "doneThings", type: "number" },
  };

  return {
    ...defaultConfig,
    ...(tasks || {}),
  };
};

// Derive the mapper from trackerConfig
export const mapper: (
  config: DynamicTrackerConfig
) => Record<string, string> = (config) => {
  return Object.keys(config).reduce((acc, key) => {
    acc[key] = config[key].label;
    return acc;
  }, {} as Record<string, string>);
};

// Initial State for CheckList.tsx
export const initialTrackerState = (
  config: DynamicTrackerConfig = trackerConfig()
): TrackerState => {
  const initialState: TrackerState = {
    day: new Date().getDate(),
    taskArray: {},
  };

  Object.keys(config).forEach((key) => {
    if (key !== "day" && key !== "doneThings") {
      if (config[key].type === "boolean") {
        initialState.taskArray[key] = false;
      }
    }
  });

  return initialState;
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

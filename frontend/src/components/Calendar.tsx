import { useState, useEffect } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { CalendarData } from "../services/TaskServices";

interface TrackerState {
  day: Number;
  dsa: boolean;
  course: boolean;
  exercise: boolean;
  temple: boolean;
  "6wake": boolean;
  "11sleep": boolean;
  doneThings?: Number;
}

const mapper: Record<keyof TrackerState, string> = {
  doneThings: "doneThings",
  day: "day",
  dsa: "5 DSA Questions",
  course: "1 Harkirat's Course Video from Cohort 2.0",
  exercise: "1 Hour Physical Activity",
  temple: "No Sugar / Cigarette / Alcohol / Fried Outside Food",
  "6wake": "Wake up at 6 AM",
  "11sleep": "Go to Bed at 11 PM",
};

const Calendar = () => {
  const [data, setData] = useState<TrackerState[]>([]);
  const navigate = useNavigate();
  const getData = async () => {
    const response: any = await CalendarData();
    console.log(response?.data);
    if (response?.data) {
      setData(
        response.data?.map((item: TrackerState) => {
          let doneThings: Number = Object.values(item).filter(val => val === true)?.length
          return {
            ...item,
            doneThings
          }
        })?.sort(
          (a: TrackerState, b: TrackerState) =>
            a.day.valueOf() - b.day.valueOf()
        )
      );
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const renderValue = (item: TrackerState, val: boolean) => {
    return Object.entries(item).map(([key, value]: [string, boolean], idx: number) => {
      if (typeof value === "boolean" && value === val) {
        return <div key={idx}>{mapper[key as keyof TrackerState]}</div>;
      }
      return null;
    });
  };
  return (
    <div className="flex flex-col gap-10 p-2">
      <div
        className="px-4 py-2 rounded-md bg-[#609DA1] text-white hover:scale-105 duration-300 ease-in-out cursor-pointer w-fit"
        onClick={() => navigate("/")}
      >
        Create Task
      </div>
      <div className="flex gap-5 items-center flex-wrap">
        {data.map((item: TrackerState, index: number) => (
          <Card key={index} className="flex flex-col gap-2">
            <p>{item.day.valueOf()}</p>
            <p>{item.doneThings?.valueOf()}/6</p>
            <p>Done</p>
            {renderValue(item, true)}
            <p>Not Done</p>
            {renderValue(item, false)}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

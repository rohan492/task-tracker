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
        response.data
          ?.map((item: TrackerState) => {
            let doneThings: Number = Object.values(item).filter(
              (val) => val === true
            )?.length;
            return {
              ...item,
              doneThings,
            };
          })
          ?.sort(
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
    return Object.entries(item).map(
      ([key, value]: [string, boolean], idx: number) => {
        if (typeof value === "boolean" && value === val) {
          return <div key={idx}>{mapper[key as keyof TrackerState]}</div>;
        }
        return null;
      }
    );
  };
  const renderPercentage = (item: TrackerState) => {
    const doneThings = item?.doneThings?.valueOf() ?? 0;
    const percentage = (doneThings / 6) * 100;
    const formattedPercentage =
      percentage % 10 !== 0 ? percentage.toFixed(2) : percentage.toFixed(0);

    return `${formattedPercentage}%`;
  };
  return (
    <div className="flex flex-col gap-10 p-2">
      <div className="flex justify-between items-center">
        <div
          className="px-4 py-2 rounded-md bg-[#609DA1] text-white hover:scale-105 duration-300 ease-in-out cursor-pointer w-fit"
          onClick={() => navigate("/")}
        >
          Add Tasks
        </div>
        <div className="mr-4">
          {data?.filter(it => it?.doneThings === 6)?.length} / 31
        </div>
      </div>
      <div className="flex gap-5 items-center flex-wrap">
        {data.map((item: TrackerState, index: number) => (
          <Card
            key={index}
            className={`flex flex-col gap-2 relative h-72 ${
              item.doneThings === 0
                ? "bg-red-200"
                : item.doneThings === 6
                ? "bg-green-200"
                : "bg-yellow-200"
            }`}
          >
            <p className="text-center">{item.day.valueOf()} July, 2024</p>
            <p className="absolute right-2 top-2 rounded-full bg-white py-2.5 px-1.5">
              {renderPercentage(item)}
            </p>
            {item.doneThings !== 0 && (
              <>
                <p className="underline">Done</p>
                {renderValue(item, true)}
              </>
            )}
            {item.doneThings !== 6 && (
              <>
                <p className="underline mt-5">Not Done</p>
                {renderValue(item, false)}
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

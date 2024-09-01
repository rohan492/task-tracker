import { useState, useEffect } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { CalendarData } from "../../services/TaskServices";
import "./Calendar.css";

import { TrackerState, mapper } from "../../utils/state";

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
  const renderValue = (item: Partial<TrackerState>, val: boolean) => {
    return Object.entries(item).map(([key, value], idx: number) => {
      // Check if value is a boolean before proceeding
      if (typeof value === "boolean" && value === val) {
        const label: string = mapper[key as keyof TrackerState];
        return (
          <div key={idx} className="text-[8px]">
            {label.length > 43 ? label.slice(0, 43) + "..." : label}
          </div>
        );
      }
      return null;
    });
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
      <div className="flex gap-2 items-center flex-wrap">
        {data.map((item: TrackerState, index: number) => (
          <Card
            key={index}
            className={`flex flex-col gap-2 relative h-[11.5rem] w-[13.5] antCard hover:scale-110 duration-300 ease-in-out hover:shadow-md ${
              item.doneThings === 0
                ? "bg-red-200"
                : item.doneThings === 6
                ? "bg-green-200"
                : "bg-yellow-200"
            }`}
          >
            <p className="text-center text-[8px]">{item.day.valueOf()} {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())}, {new Date().getFullYear()}</p>
            <p className="absolute right-2 top-2 rounded-full bg-white py-2.5 px-1.5 text-[8px]">
              {renderPercentage(item)}
            </p>
            {item.doneThings !== 0 && (
              <>
                <p className="underline text-[8px]">Done</p>
                {renderValue(item, true)}
              </>
            )}
            {item.doneThings !== 6 && (
              <>
                <p className={`underline ${item.doneThings !== 0 && 'mt-5'} text-[8px]`}>Not Done</p>
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

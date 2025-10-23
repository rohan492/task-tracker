import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { CalendarData } from "../../services/TaskServices";
import "./Calendar.css";
// import { DateTime } from "luxon";

import { TrackerState, mapper } from "../../utils/state";
import CardComponent from "./CardComponent";

const Calendar = () => {
  const [data, setData] = useState<TrackerState[]>([]);
  const [selectedDay, setSelectedDay] = useState<TrackerState | null>(null);
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
  const renderValue = (
    item: Partial<TrackerState>,
    val: boolean,
    modal?: boolean
  ) => {
    let counter: number = 0;
    return Object.entries(item)
      ?.filter(([_, value]) => typeof value === "boolean" && value === val)
      .map(([key]) => {
        const label: string = mapper[key as keyof TrackerState];
        counter++;
        return (
          <div
            key={key}
            className={`flex items-start gap-1 ${
              modal ? "text-base" : "text-[8px]"
            } pl-1`}
          >
            <span>{counter}. </span>
            <span className="break-words">{label}</span>
          </div>
        );
      });
  };
  const renderPercentage = (item: Partial<TrackerState>) => {
    const doneThings = item?.doneThings?.valueOf() ?? 0;
    const percentage = (doneThings / import.meta.env.VITE_TOTAL_TASKS) * 100;
    const formattedPercentage =
      percentage % 10 !== 0 ? percentage.toFixed(2) : percentage.toFixed(0);

    return `${formattedPercentage}%`;
  };
  return (
    <div className="flex flex-col gap-10 p-2">
      <Modal
        title={
          <p className="text-center text-2xl font-bold">
            {selectedDay?.day.valueOf()}{" "}
            {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
              new Date()
            )}
            , {new Date().getFullYear()}
          </p>
        }
        centered
        open={selectedDay ? true : false}
        onOk={() => setSelectedDay(null)}
        onCancel={() => setSelectedDay(null)}
        footer={null}
      >
        <CardComponent
          item={selectedDay}
          onClick={(item) => setSelectedDay(item)}
          renderPercentage={renderPercentage}
          renderValue={renderValue}
          modalComponent={true}
        />
      </Modal>
      <div className="sticky z-50 top-0 bg-white">
        <div className="flex justify-between items-center p-4">
          <div
            className="px-4 py-2 rounded-md bg-[#609DA1] text-white hover:scale-105 duration-300 ease-in-out cursor-pointer w-fit"
            onClick={() => navigate("/")}
          >
            Add Tasks
          </div>
          <div className="mr-4">
            {
              data?.filter(
                (it) =>
                  it?.doneThings === Number(import.meta.env.VITE_TOTAL_TASKS)
              )?.length
            }{" "}
            / 5{/* / {DateTime.now().daysInMonth} */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 px-10">
        {data.map((item: TrackerState, index: number) => (
          <CardComponent
            key={index}
            item={item}
            onClick={(item) => setSelectedDay(item)}
            renderPercentage={renderPercentage}
            renderValue={renderValue}
            modalComponent={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;

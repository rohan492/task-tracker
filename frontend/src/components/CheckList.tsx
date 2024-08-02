import { useState, useEffect } from "react";
import { Card, Checkbox, message } from "antd";
import type { CheckboxProps } from "antd";
import { GetTask, TaskTrackerService } from "../services/TaskServices.ts";
import { useNavigate } from "react-router-dom";

interface TrackerState {
  day: Number;
  interview: Boolean;
  course: Boolean;
  "course3": Boolean;
  dsa: Boolean;
  exercise: Boolean;
  temple: Boolean;
}

const CheckList = () => {
  const [tracker, setTracker] = useState<TrackerState>({
    day: new Date().getDate(),
    interview: false,
    course: false,
    "course3": false,
    dsa: false,
    exercise: false,
    temple: false
  });
  const getAllTasks = async () => {
    const response: any = await GetTask();
    console.log(response.data);
    if (response?.data) {
      setTracker(response.data);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  const onChange: CheckboxProps["onChange"] = (e) => {
    const { value, checked } = e.target;
    setTracker((prevTracker) => ({
      ...prevTracker,
      [value]: checked,
    }));
  };
  const handleSubmit = async () => {
    console.log(tracker);
    const response: any = await TaskTrackerService(tracker);
    console.log(response?.data?.msg);
    message.success(response?.data?.msg);
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-[90vh] w-full">
      <Card className="bg-indigo-300 flex flex-col gap-5 w-[50%] relative">
        <div
          className="absolute left-2 top-4 px-4 py-2 rounded-md bg-[#609DA1] text-white hover:scale-105 duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate("/calendar")}
        >
          View Tasks
        </div>
        <div className="flex justify-between items-center w-full mb-1">
          <p className="ml-20 underline">Title</p>
          <p className="mb-32">Day {new Date().getDate()}</p>
          <p className="underline">Check List</p>
        </div>
        <div className="-mt-10">
          {[
            { label: "Apply to Open Positions + Send Cold Emails", value: "interview" },
            {
              label: "1 Harkirat's Course Video from Cohort 2.0",
              value: "course",
            },
            {
              label: "Be in-sync with Harkirat's Web3.0 Content & Assignments",
              value: "course3",
            },
            {
              label: "2 DSA Questions + Revise Patterns Encountered",
              value: "dsa",
            },
            { label: "1 Hour Physical Activity", value: "exercise" },
            {
              label: "No Cigarette / Alcohol / Outside Food",
              value: "temple",
            }
          ].map(({ label, value }, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full"
            >
              <p>{label}</p>
              <Checkbox
                onChange={onChange}
                className="mr-6"
                value={value}
                checked={tracker[value as keyof TrackerState] as boolean}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center mt-10">
          <p
            className="px-4 py-2 rounded-md bg-[#E07E65] text-white hover:scale-105 duration-300 ease-in-out cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CheckList;

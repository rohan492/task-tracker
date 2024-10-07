import { Card, Input, message, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import CreateTable from "./CreateTable";
import { DateTime } from "luxon";
import { TaskState } from "../utils/state";

const { TextArea } = Input;

const Create = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskState[]>([
    {
      task: { value: "", placeHolder: "Go to Sleep at 10 PM" },
      motive: { value: "", placeHolder: "To Fix Sleep my Sleep Cycle" },
    },
    {
      task: { value: "", placeHolder: "Do not eat processed food" },
      motive: { value: "", placeHolder: "To Detoxify my Body" },
    },
    {
      task: { value: "", placeHolder: "1 Hour Gym Everyday" },
      motive: { value: "", placeHolder: "To Improve my Physical Health" },
    },
  ]);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const handleFooterClick = (item: string) => {
    if (item === "Cancel") {
      navigate("/");
    } else {
      setOpen(true);
    }
  };
  const handleChange = (val: string, type: keyof TaskState, idx: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const updatedTask = {
        ...prevTasks[idx],
        [type]: {
          ...prevTasks[idx][type],
          value: val,
        },
      };
      updatedTasks[idx] = updatedTask;
      return updatedTasks;
    });
  };
  const handlePlus = () => {
    setTasks([
      ...tasks,
      {
        task: {
          value: "",
          placeHolder: `Task ${tasks?.length + 1}`,
        },
        motive: {
          value: "",
          placeHolder: `Motive for Task ${tasks?.length + 1}`,
        },
      },
    ]);
    setTimeout(() => {
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  };
  const handleDelete = (idx: number) => {
    console.log(idx);
    setTasks(tasks?.filter((_, index) => idx !== index));
  };
  const createOptions = () => {
    const optArr = [];
    for (let i = 0; i < DateTime.now().daysInMonth; i++) {
      optArr.push({
        label: i + 1,
        value: i + 1,
      });
    }
    return optArr;
  };
  return (
    <>
      {open && (
        <Modal
          open={open}
          title={
            <div className="flex flex-col justify-center items-center gap-0">
              <p className="text-xl font-semibold">Configure Tasks</p>
              <p className="text-sm font-normal">
                Drag & Drop according to Priority
              </p>
            </div>
          }
          centered
          onCancel={() => setOpen(false)}
          onOk={() => {
            message.success("Tasks Created Successfully!");
            setOpen(false);
            navigate("/");
          }}
          okText="Save"
        >
          <div className="flex flex-col gap-4 my-4">
            <div className="flex justify-between items-center gap-12">
              <p className="font-bold w-1/2">
                Preferred Name: <Input className="font-normal" />
              </p>
              <p className="font-bold w-1/2">
                Duration (in days):{" "}
                <Select
                  options={createOptions()}
                  className="w-full"
                  defaultValue={30}
                />
              </p>
            </div>
            <CreateTable tasks={tasks} />
          </div>
        </Modal>
      )}
      <div className="flex justify-center items-center h-screen w-full">
        <Card className="bg-indigo-300 w-1/2">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col justify-center items-center gap-0">
              <p className="text-xl font-semibold">Create Tasks</p>
              <p className="text-sm">
                We recommend creating max. 6 tasks at a time
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full grid grid-cols-10">
                <p className="text-normal font-bold underline col-span-1">
                  Sr. No.
                </p>
                <p className="text-normal font-bold underline text-center col-span-4">
                  Task
                </p>
                <p className="text-normal font-bold underline text-center col-span-4">
                  Motive for this Task
                </p>
              </div>
              <div className="h-72 overflow-y-auto flex flex-col gap-4">
                {tasks.map(({ task, motive }, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-10 w-full flex items-center gap-4"
                    ref={idx === tasks?.length - 1 ? ref : null}
                  >
                    <p className="w-1/2 ml-4 col-span-1">{idx + 1}.</p>
                    <TextArea
                      className="col-span-4"
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      placeholder={task?.placeHolder}
                      value={task?.value}
                      onChange={(e) =>
                        handleChange(e.target.value, "task", idx)
                      }
                    />
                    <TextArea
                      className="col-span-4"
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      placeholder={motive?.placeHolder}
                      value={motive?.value}
                      onChange={(e) =>
                        handleChange(e.target.value, "motive", idx)
                      }
                    />
                    <div className="flex justify-start items-center col-span-1">
                      <DeleteOutlined
                        className="text-red-500 hover:scale-110 duration-300 ease-in-out cursor-pointer"
                        onClick={() => handleDelete(idx)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <PlusCircleFilled
                  className="text-lg cursor-pointer hover:scale-110 duration-300 ease-in-out"
                  onClick={handlePlus}
                />
              </div>
            </div>
            <div className="flex justify-end items-center gap-4 mt-4">
              {["Cancel", "Save"].map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-1.5 rounded-md ${
                    index === 0
                      ? "bg-white text-red-500 border border-red-500"
                      : "bg-[#E07E65] border border-[#E07E65] text-white"
                  } hover:scale-105 duration-300 ease-in-out cursor-pointer`}
                  onClick={() => handleFooterClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Create;

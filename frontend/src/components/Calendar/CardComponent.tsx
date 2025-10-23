import { CardProps } from "../../utils/state";
import { Card } from "antd";

const CardComponent = ({
  item,
  onClick,
  renderPercentage,
  renderValue,
  modalComponent,
}: CardProps) => {
  return (
    <Card
      className={`flex flex-col gap-2 relative ${
        !modalComponent &&
        "hover:scale-110 duration-300 ease-in-out hover:shadow-md cursor-pointer"
      } antCard ${
        item?.doneThings === 0
          ? "bg-red-200"
          : item?.doneThings === Number(import.meta.env.VITE_TOTAL_TASKS)
          ? "bg-green-200"
          : "bg-yellow-200"
      }`}
      onClick={!modalComponent && item ? () => onClick(item) : undefined}
    >
      {!modalComponent && (
        <p className="text-center text-[10px] font-bold">
          {item?.day?.valueOf()}{" "}
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            new Date()
          )}
          , {new Date().getFullYear()}
        </p>
      )}
      <p
        className={`absolute right-2 top-2 rounded-full bg-white py-2.5 px-1.5 ${
          modalComponent ? "text-md" : "text-[8px]"
        }`}
      >
        {item ? renderPercentage(item) : ""}
      </p>
      {item?.doneThings !== 0 && (
        <>
          <p
            className={`underline ${
              modalComponent ? "text-lg" : "text-[8px]"
            } font-bold`}
          >
            Done
          </p>
          {item ? renderValue(item, true, modalComponent) : ""}
        </>
      )}
      {item?.doneThings !== import.meta.env.VITE_TOTAL_TASKS && (
        <>
          <p
            className={`underline ${item?.doneThings !== 0 && "mt-5"} ${
              modalComponent ? "text-lg" : "text-[8px]"
            } font-bold`}
          >
            Not Done
          </p>
          {item ? renderValue(item, false, modalComponent) : ""}
        </>
      )}
    </Card>
  );
};

export default CardComponent;

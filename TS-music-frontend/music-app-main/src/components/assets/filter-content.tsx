import React from "react";

interface filterProps {
  id: number;
  title: string;
}

interface dataProps {
  data: filterProps[];
}

function FilterContent({ data }: dataProps) {
  return (
    <div className="flex flex-col gap-2">
      {data
        ? data.map((item) => (
            <div className="flex items-center" key={item.id}>
              <input
                id={`radio-work-content-${item.id}`}
                type="radio"
                value=""
                name="default-radio-work-content"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor={`radio-work-content-${item.id}`}
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                {item.title}
              </label>
            </div>
          ))
        : ""}
    </div>
  );
}

export default FilterContent;

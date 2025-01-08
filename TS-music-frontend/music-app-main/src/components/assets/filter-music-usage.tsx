import React from "react";

interface filterProps {
  id: number;
  title: string;
}

interface dataProps {
  data: filterProps[];
}

function FilterMusicUsage({ data }: dataProps) {
  return (
    <div className="flex flex-col gap-2 mt-6">
      <div className="flex items-center mb-4">
        <input
          id={`radio-music-usage-all`}
          type="radio"
          value=""
          name="default-radio-music-usage"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor={`radio-music-usage-all`}
          className="ms-2 text-sm font-medium text-gray-900 "
        >
          All
        </label>
      </div>
      {data
        ? data.map((item) => (
            <div className="flex items-center" key={item.id}>
              <input
                id={`radio-music-usage-${item.id}`}
                type="radio"
                value=""
                name="default-radio-music-usage"
                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor={`radio-music-usage-${item.id}`}
                className="ms-2 text-xs font-medium text-gray-900 "
              >
                {item.title}
              </label>
            </div>
          ))
        : ""}
    </div>
  );
}

export default FilterMusicUsage;

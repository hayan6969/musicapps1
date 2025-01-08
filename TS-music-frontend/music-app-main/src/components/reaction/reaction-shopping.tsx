import { customSize } from "@/default/reaction";
import React from "react";

interface mainProps {
  id: number;
  icon: string;
  height: number;
  width: number;
  counter?: number;
}

interface ReactionProps {
  main: mainProps;
  sub: mainProps[];
}

interface customSizeDetailProps {
  height: number;
  width: number;
}

interface customSizeProps {
  main: customSizeDetailProps;
  sub: customSizeDetailProps;
}

interface objectProps {
  data: ReactionProps;
  customSize?: customSizeProps;
}

function ReactionShopping({ data, customSize }: objectProps) {
  return (
    <>
      <div className="group relative cursor-pointer">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-0">
            <img
              src={data.main.icon}
              style={{
                height: customSize?.main.height
                  ? customSize.main.height
                  : data.main.height,
                width: customSize?.main.width
                  ? customSize.main.width
                  : data.main.width,
              }}
              className="hover:scale-125 cursor-pointer"
            />
            <p className="text-[0.4rem] text-center max-w-[3rem] !mt-3">
              {data.main?.counter}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-1 invisible z-50 absolute group-hover:visible bg-white divide-gray-100 rounded-lg shadow w-[8rem] h-[3rem] bottom-6 -right-4 dark:bg-gray-700">
          {data?.sub
            ? data.sub.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-center w-full h-full gap-1 items-center hover:rounded-lg hover:bg-gray-100"
                >
                  <img
                    src={item.icon}
                    style={{
                      height: customSize?.sub.height
                        ? customSize.sub.height
                        : item.height,
                      width: customSize?.sub.width
                        ? customSize.sub.width
                        : item.width,
                    }}
                  />
                  <p className="text-[0.6rem] text-center">
                    {item.id > 2 ? (
                      ""
                    ) : (
                      <>
                        US${" "}
                        <span className="text-[0.8rem]">{item.counter}</span>
                      </>
                    )}
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default ReactionShopping;

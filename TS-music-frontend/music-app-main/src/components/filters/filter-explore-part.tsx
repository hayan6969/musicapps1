import React from "react";

function FilterExploreParts() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-1">
        <select
          id="default"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option defaultValue={"Select Language"}>Choose Language</option>
          <option value="EN">English</option>
          <option value="JP">Japanese</option>
          <option value="GR">German</option>
          <option value="FR">French</option>
          <option value="IT">Italian</option>
          <option value="SP">Spanish</option>
          <option value="KR">Korean</option>
          <option value="CH">Chinese</option>
          <option value="AR">Arabic</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <select
          id="default"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option defaultValue={"Select Music Cultural"}>
            Select Cultural Area
          </option>
          <option value="NAE">North America and Europe</option>
          <option value="EA">East Asia</option>
          <option value="SA">South Asia</option>
          <option value="Oc">Oceania</option>
          <option value="WA-NA">West Asia and North Africa</option>
          <option value="AF">Africa</option>
          <option value="LA">Latin America</option>
        </select>
      </div>
    </div>
  );
}

export default FilterExploreParts;

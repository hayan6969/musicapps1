import {
  clearValues,
  addItem,
} from "@/redux/features/selectMultiple/selectMultipleSlice";
import { extractValues } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch } from "react-redux";

interface optionsProps {
  options: any;
  label: string;
  keyState: string;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  selectedValue: any;
}

const SelectMultiple = ({
  options,
  label,
  keyState,
  setFormData,
  selectedValue,
}: optionsProps) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [options, selectedValue, keyState]);

  const valueRenderer = (selected: typeof options) => {
    if (!selected.length) {
      return label;
    }
    return selected.map((option: any) => option.label).join(", "); // Render selected option labels
  };

  const handleChange = (selectedOptions: []) => {
    setSelected(selectedOptions);
    dispatch(addItem({ key: keyState, value: selectedOptions }));
    setFormData((prev: any) => {
      const updatedData = {
        ...prev,
        [keyState]: extractValues(selectedOptions, "value"),
      };
      return updatedData;
    });
  };

  return (
    <div key={keyState}>
      {/* <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        valueRenderer={valueRenderer}
        options={options}
        value={selected}
        // onChange={setSelected}
        onChange={handleChange}
        labelledBy="Select"
      />
    </div>
  );
};

export default SelectMultiple;

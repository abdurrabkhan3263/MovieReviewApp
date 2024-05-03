import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useWishCont } from "../context/wishlistContext";

function Select({ data = [], onChange, className }, ref) {
  const { selectVal } = useWishCont();

  useEffect(() => {
    console.log(selectVal);
  }, [selectVal]);
  return (
    <div className={`w-full flex justify-end ${className}`}>
      <select
        name="rating"
        className="bg-red-600 text-white outline-none border-none rounded sm:h-9 sm:px-3 font-semibold sm:mr-0 mr-2 px-1.5 py-1.5"
        onChange={onChange}
        ref={ref}
      >
        {selectVal &&
          selectVal.optionData &&
          selectVal.optionData.map((value) => (
            <option
              value={value.value || value.selectVal}
              key={value.value || value.selectValue}
            >
              {value.selectValue}
            </option>
          ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);

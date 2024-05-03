import React from "react";

function useGetYear(year) {
  if (!year) return "";
  const dateParts = year.split("-");
  if (dateParts.length >= 1) {
    return dateParts[0];
  } else {
    return "";
  }
}

export default useGetYear;

import React from "react";
import {
  fiveStar,
  fourStar,
  threeStar,
  twoStar,
  oneStar,
  zeroStar,
} from "../component/Assets/index";
function useStar({ review }) {
  let rev = Math.round(review);
  let stars;
  if (rev >= 1 && rev <= 2) {
    stars = oneStar;
  } else if (rev >= 3 && rev <= 4) {
    stars = twoStar;
  } else if (rev >= 5 && rev <= 6) {
    stars = threeStar;
  } else if (rev >= 7 && rev <= 8) {
    stars = fourStar;
  } else if (rev >= 9 && rev <= 10) {
    stars = fiveStar;
  } else {
    stars = zeroStar;
  }
  return stars;
}

export default useStar;

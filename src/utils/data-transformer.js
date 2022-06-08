import { get } from "lodash";
import { hierarchy } from "d3";

export const transformData = (data) => {
  const root = get(data, "data[0]", null);
  console.log(data);
  if (root !== null) {
    return hierarchy(root, (d) => d.Childs);
  } else {
    return null;
  }
};

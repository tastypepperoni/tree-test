import React from "react";

const linkCustom = ({ source, target }, radius) => {
  const breakY = source.y + 140;
  if (source.x === target.x) {
    return `M${source.y + 15} ${source.x} L${target.y - 16} ${target.x} 
            M${target.y - 20} ${target.x + 5} L${target.y - 15} ${target.x} 
            M${target.y - 20} ${target.x - 5} L${target.y - 15} ${target.x}`;
  } else {
    const isClockwise = target.x < source.x;
    return `M${source.y + 15} ${source.x} L${breakY - radius} ${
      source.x
    } a${radius},${radius} 0 0 ${isClockwise ? 0 : 1} ${radius},${
      isClockwise ? -radius : radius
    } L${breakY} ${
      isClockwise ? target.x + radius : target.x - radius
    } a${radius},${radius} 0 0 ${isClockwise ? 1 : 0} ${radius},${
      isClockwise ? -radius : radius
    } L${target.y - 16} ${target.x}
      M${target.y - 20} ${target.x + 5} L${target.y - 15} ${target.x} 
      M${target.y - 20} ${target.x - 5} L${target.y - 15} ${target.x}`;
  }
};

export default (props) => {
  const { links } = props;
  return (
    <g className="d3-tree-links">
      {links.map((link, i) => (
        <g key={i}>
          <path d={linkCustom(link, 8)} />
        </g>
      ))}
    </g>
  );
};

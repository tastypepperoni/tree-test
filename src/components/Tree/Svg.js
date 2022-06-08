import { select, tree, zoom } from "d3";
import React, { useEffect, useRef, useMemo } from "react";
import Links from "./Links";
import Nodes from "./Nodes";

const NODE_SIZE = [45, 210];
const SCALE_RANGE = [0.1, 10];

export default (props) => {
  const { width, height, data, nodeRender } = props;
  const refSvg = useRef();
  const refMain = useRef();

  useEffect(() => {
    const svg = select(refSvg.current);
    const g = select(refMain.current);
    if (width && height) {
      svg.call(
        zoom()
          .extent([
            [0, 0],
            [width, height]
          ])
          .scaleExtent(SCALE_RANGE)
          .on("zoom", ({ transform }) => {
            g.attr("transform", transform);
          })
      );
    }
  }, [width, height]);

  const { nodes, links, translate, scale } = useMemo(() => {
    if (width && height && data) {
      const treeLayout = tree().size([width, height]).nodeSize(NODE_SIZE)(data);
      const nodes = treeLayout.descendants();
      const links = treeLayout.links();
      const translate = [
        width / 2 - (data.height * NODE_SIZE[1]) / 3,
        height / 2
      ];
      const scale = width / ((data.height + 1) * NODE_SIZE[1]);
      return { nodes, links, translate, scale };
    } else {
      return {
        nodes: [],
        links: [],
        translate: [0, 0],
        scale: 1
      };
    }
  }, [data, width, height]);

  console.log(((data.height + 1) * NODE_SIZE[1]) / 4);

  return (
    <svg ref={refSvg}>
      <g className="d3-tree-main" ref={refMain}>
        <g transform={`translate(${translate}) scale(${scale})`}>
          {nodes && <Links links={links} nodes={nodes} />}
          {links && <Nodes nodes={nodes} nodeRender={nodeRender} />}
        </g>
      </g>
    </svg>
  );
};

import React, { Fragment } from "react";
import data from "./mocks/data.json";
import Tree from "./components/Tree";
import "./styles.css";
import { transformData } from "./utils/data-transformer";
import Hex from "./assets/Hex";
import Logo from "./assets/Logo";

const transformedData = transformData(data);

export default function App() {
  return (
    <div className="App">
      <Tree
        data={transformedData}
        nodeRender={(node) => {
          return (
            <Fragment>
              {node.parent ? (
                <Hex className="d3-tree-nodes" />
              ) : (
                <Logo className="d3-tree-nodes" />
              )}
            </Fragment>
          );
        }}
      />
    </div>
  );
}

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from "./components/application/Application";

import X from './xs/x1'
import Y from './ys/x1'
import Z from './zs/x1'

ReactDOM.render(
  <div>
    <div><X /></div>
    <div><Y /></div>
    <div><Z /></div>
    <Application />
  </div>, document.getElementById("root"));

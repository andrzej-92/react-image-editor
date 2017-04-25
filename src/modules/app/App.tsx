import * as React from "react";
import Sidebar from "../image-editor/components/sidebar/Sidebar";
import Canvas from "../image-editor/components/canvas/Canvas";

class App extends React.Component<void, void> {

  render() {

    return (
      <div className="app-wrapper">
        <Canvas width={900} height={550}/>
        <Sidebar/>
      </div>
    );
  }
}

export default App;

import * as React from "react"
import { Tab, Tabs } from 'react-toolbox'
import { connect } from "react-redux"
import Sidebar from "./modules/image-editor/components/sidebar/Sidebar"
import Canvas from "./modules/image-editor/components/canvas/Canvas"
import FilteredCanvas from "./modules/image-editor/components/canvas/FilteredCanvas"
import MixedCanvas from "./modules/image-editor/components/canvas/MixedCanvas"

class App extends React.Component<any, any> {

  constructor (props: any) {
    super(props);

    this.state = {
      index: 0,
    }
  }

  handleTabChange = (index: number) => {
    this.setState({index});
  };

  render() {

    return (
      <div className="app-wrapper">
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Oryginał'>
            <Canvas width={900} height={550}/>
          </Tab>
          <Tab label='Przefiltrowany'>
            <FilteredCanvas width={900} height={550}/>
          </Tab>
          <Tab label='Zmiksowany'>
            <MixedCanvas />
          </Tab>
        </Tabs>
        <Sidebar/>
      </div>
    );
  }
}

export default connect()(App);

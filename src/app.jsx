import React, {Component} from "react";
import ReactDOM from "react-dom";
import './style.css';

import Page from 'components/page';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <Page />
      </div>
      
    )
  }
}

export default App;
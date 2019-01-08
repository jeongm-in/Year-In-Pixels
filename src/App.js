import React from 'react';
import Year from './Components/Year';
import Count from './Components/Count';
import Front from './Components/Front';
import fire from './Fire';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year:'',
    }

  }



  render() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    return (
      <div className="front-bg d-flex flex-row justify-content-around align-items-center">
        <div className="front-box-parent d-flex flex-row justify-content-around align-items-center">
        <div className="d-flex flex-column justify-content-around align-items-center">
        <Front/>
        </div>
        <Year year={currentYear}/>

        </div>
      </div>
    );
  }
}

export default App;

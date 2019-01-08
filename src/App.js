import React from 'react';
import Year from './Components/Year';
import Front from './Components/Front';
import moment from 'moment';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    let currentYear = moment().format('YYYY');
    let today = moment().format("MM[_]DD");
    return (
      <div className="front-bg d-flex flex-row justify-content-around align-items-center">
        <div className="front-box-parent d-flex flex-row justify-content-around align-items-center">
        <div className="d-flex flex-column justify-content-around align-items-center">
        <Front/>
        </div>
        <Year year={currentYear} today={today}/>

        </div>
      </div>
    );
  }
}

export default App;

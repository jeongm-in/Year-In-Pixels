import React from 'react';
import fire from '../Fire';


class Year extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid:{
                '1':[],
                '2':[29,30,31],
                '3':[],
                '4':[31],
                '5':[],
                '6':[31],
                '7':[],
                '8':[],
                '9':[31],
                '10':[],
                '11':[31],
                '12':[],
            },
            month: {
                "1": "Ja", "2": "Fe", "3": "Ma", '4': "Ap", '5': "Ma", "6": 'Ju',
                "7": 'Ju', '8': 'Au', '9': "Se", '10': 'Oc', '11': 'No', '12': 'De'
            },
            mood:{
                '0':['transparent','none'],'1':['#fbc531','Happy'],'2':['#74b9ff','Average'],'3':['#9980FA','Sad'],
                '4':['#ED4C67','Angry'],'5':['#4cd137','Lonely'],'6':['#7f8fa6','Tired'],
            },
            userId:this.props.uid,
            yourMood:{},
            year:this.props.year,
            loaded:false,
        }
        this.onClick = this.onClick.bind(this);
        this.doNothing = this.doNothing.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.loadMoodAndYear = this.loadMoodAndYear.bind(this);
    }

    handleContextMenu=(event)=>{
        event.preventDefault();
        document.getElementById(event.target.id).setAttribute('style',
        'background:'+this.state.mood[0][0]);
        document.getElementById(event.target.id).setAttribute('mood',0);
        fire.database().ref('users/'+ this.state.userId+'/0/mood/'+event.target.id).set(0);
    }



    onClick= (event)=>{
        // console.log(event.target.id);
        let currentMood = event.target.getAttribute('mood');
        currentMood ++;
        currentMood %= 7;
        document.getElementById(event.target.id).setAttribute('style',
        'background:'+this.state.mood[currentMood][0]);
        document.getElementById(event.target.id).setAttribute('mood',currentMood);
        fire.database().ref('users/'+this.state.userId +'/0/mood/'+event.target.id).set(currentMood);
    }

    doNothing=event=>{

    }

    componentDidMount(){
        // this.setState()
        this.loadMoodAndYear(this.state.userId);
    }


    loadMoodAndYear = (who)=>{
        console.log(this.props.uid);
        var refMood = fire.database().ref('users/'+ who+ '/0/mood');
        refMood.on('value',(snapshot)=>{
            // console.log(snapshot.val());
            this.setState({yourMood:snapshot.val(),loaded:true});

        }, function(error){
            console.log('error:'+error.code);
        });
    }


    render() {
        console.log('year says state is ' + this.state.userId);
        let monthTitle = [];
        monthTitle.push(<th className="cell-size" key='first-row' 
        id="first-row">▼</th>)
        for (let m = 1; m < 13; m++) {
            monthTitle.push(<th className="cell-size"
             key={m + '_' + this.state.month[m]}
              id={this.state.month[m]}>{this.state.month[m]}</th>);
        }

        let days = [];
        for (let d = 1; d < 32; d++) {
            let dayBoxes = [];
            for (let i = 1; i < 13; i++) {
                let formatD = d<10?'0'+d:d;
                let formatI = i<10?'0'+i:i;
                let dayID = formatI + '_' + formatD;
                let notRealDate = this.state.invalid[i].includes(d);
                let dayClass = 'cell-size';
                if(notRealDate){
                    dayClass += ' cell-invalid';
                }else if(this.props.today===dayID){
                    dayClass += ' year-today-border'
                }
                dayBoxes.push(<th
                 className= {dayClass}
                 key={'day_' + d + '_' + i} id={dayID} 
                 onClick={notRealDate?this.doNothing:this.onClick}
                 onContextMenu = {notRealDate?this.doNothing:this.handleContextMenu}
                 mood={notRealDate?'-':this.state.yourMood[dayID]}
                 style={this.state.loaded && !notRealDate?{background:this.state.mood[this.state.yourMood[dayID]][0]}:{}}></th>);
            }

            let dRow = (<tr key={"day_day_"+d}>
                <th className="cell-size" key={'day_'+d}>
                    {d < 10 ? '0' + d : d}
                </th>
                {dayBoxes}
            </tr>);
            days.push(dRow);
        }

        let moodLegend = [];
        for(let i = 1; i < 7; i++){
            moodLegend.push(<div key={this.state.mood[i][1]} className="d-flex
            flex-row justify-content-between align-items-center year-legend-row">
                <div className="year-legend-color" style={{'backgroundColor':this.state.mood[i][0]}}>
                </div>
                <div className="year-legend-text">
                {this.state.mood[i][1]}
                </div>    
            </div>);
        }
        
        return (
            <div className="year-pixel d-flex flex-row
             justify-content-around align-items-center">
                <table className="year-table">
                    <tbody>
                        <tr>
                            {monthTitle}
                        </tr>
                        {days}

                    </tbody>
                </table>
                <div className='year-legend d-flex flex-column justify-content-between align-items-center'>
                    <div className = "front-year-text">{this.state.year}</div>
                    <div className = "front-year-legends">{moodLegend}</div>
                </div>
            </div>

        );
    }
}

export default Year;

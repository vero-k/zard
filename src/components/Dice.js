import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import _, { isBuffer } from 'lodash';

import {valueMap, versionMap, versionArray, diceLimit} from '../helpers/Maps.js';

import plack from '../img/placks/plack1.png'
import transparent_img from '../img/transparent/transparent.PNG';

class Dice extends Component {


    constructor(props){
        super(props);
        this.state = {

            prep: true,
            numberDice: 0,
            
            dLimit: Array.from({length: diceLimit.get("" + this.props.specialtype)}, (_, i) => i + 1),

            resultTxtFaces: "",
            resultTxtThrow: null,

            throw: 0,

            keepTrack: false,
            keepTrackRows: [],

            loading: false,

            path: "",
            startNew: false,

            bringForward: -1000,

            
        }

    }

    nrdice = 0;
    justchangedDie = 1;
    justopenedSB = 4;
    tablechange = false;
    random = [];
    version = [];
    dicethrow = [];
    dicestill = ["../dicethrows/" + this.props.specialtype + "/dicestill_1.png",];
    startingstill = "startingstill";
    versionCheck = new Map();

    

    checkpath = () => {
        const type = this.props.specialtype;

        if(this.props.showSideBar){
            this.justopenedSB = 0;
        } 
        if(this.state.path !== this.props.match.path || this.state.startNew){
            this.setState({
                prep: true,
                path: this.props.match.path,
                resultTxtFaces: "",
                resultTxtThrow: null,
                numberDice: 0,
                startNew: false,
                dLimit: Array.from({length: diceLimit.get("" + this.props.specialtype)}, (_, i) => i + 1),

                keepTrack: false,
                keepTrackRows: [],
            })
            //this.gridshow = gridshowarray[(this.state.numberDice > 9)? 10:this.state.numberDice];
            this.nrdice = 1; // problem? 
            this.random = [];
            this.version = [];
            this.startingstill = "startingstill";
            this.dicethrow = [];
            this.justchangedDie = 0;
            this.versionCheck = new Map()
            // maybe reset other class variables too?????
        }
    }

    
    throwprep = () => {

        const dieSides = this.props.numberSides;
        const type = this.props.specialtype;
        
        // only when not sidebar, not loading, not tablechange, not just closed sidebar
        if(this.justchangedDie < 1  || !(this.props.showSideBar || this.justopenedSB < 4 || this.state.loading || this.tablechange)){

            if(this.justchangedDie < 1){
                this.dicestill = ["../dicethrows/" + type + "/dicestill_" + this.nrdice + ".png"];
                this.justchangedDie++;
            } else {

                this.dicestill = [];

                for(var j = 0; j < this.state.numberDice; j++){
                    this.dicestill[j] = "../dicethrows/" + type + "/dicestill_res" + this.random[j] + "_" + this.version[j]  + ".png";
                }


            }

            const dicearrayresults = [];

            for(var i = 1; i <= this.state.numberDice; i++){
                if(parseInt(type)){
                    dicearrayresults.push(Math.floor(Math.random() * dieSides) + 1)
                } else {
                    const randomspecialval = valueMap.get(type)[Math.floor(Math.random() * dieSides)]
                    dicearrayresults.push(randomspecialval)
                    
                }
                
            }
                 
            this.random = dicearrayresults;
            this.dicethrow = [];


            this.versionCheck = new Map();
            // make map
            this.random.forEach((x) => {
                if(!this.versionCheck.has(x)){
                    this.versionCheck.set(x, []);
                } 
            })
            for(var j = 0; j < this.state.numberDice; j++){
                //make sure that if two same results in random, that the versions are different 
                let versionof = 0;
                let oneof = 0;
                if(!parseInt(type)){
                    let random_charreplaced = this.random[j].replaceAll(' ', '_');
                    random_charreplaced = random_charreplaced.replaceAll(',', '_');
                    random_charreplaced = random_charreplaced.replaceAll("'", '_');
                    oneof = versionMap.get(type)[random_charreplaced];
                } else {
                    oneof = versionArray[dieSides][parseInt(this.random[j]) - 1];
                }

                do{
                    versionof = Math.floor(Math.random() * oneof) + 1;
                } while(this.versionCheck.get(this.random[j]).includes(versionof) && this.versionCheck.get(this.random[j]).length < oneof);
                
                this.versionCheck.get(this.random[j]).push(versionof);
                this.version[j] = versionof;
                this.dicethrow[j] = "../dicethrows/" + type + "/dicethrow_res" + this.random[j] + "_" + this.version[j] + ".gif";
                
            }

        } 

         
        if(this.justopenedSB < 4){ 
            this.justopenedSB++;
        }

        if(this.tablechange){
            this.tablechange = false;
        }

    }



    throwDice = (event) => {

        if(!this.state.loading && event.target === event.currentTarget){

        this.startingstill = "";    
        this.setState({
            loading: true,
        })

        const random = this.random;

        let resultTxtFaces = "";
        let total = 0;

        random.forEach((x, i) => {
            total += x; 
            resultTxtFaces += x;
            if(i < random.length - 1){
                resultTxtFaces += ", "
            }
        })


        let resultTxtThrow = null;

        if(parseInt(this.props.specialtype) && this.state.numberDice > 1){
            resultTxtThrow = "" + total;
        }
             

        let updatedKeepTrackRows = _.cloneDeep(this.state.keepTrackRows);
        let nrthrow = this.state.throw;

        
        if(this.state.keepTrack){
                nrthrow++;
                const newRow = <tr>
                    <td>Throw {nrthrow}</td>
                    <td>{resultTxtFaces} {(resultTxtThrow)? " (" + resultTxtThrow + ") " : ""}</td>
                </tr>;
                updatedKeepTrackRows.push(newRow);
        }


        setTimeout(function(){
            this.setState({
                keepTrackRows: updatedKeepTrackRows,

                resultTxtFaces,
                resultTxtThrow,
                throw: nrthrow,
                loading: false,
            })
        }.bind(this), 3200) // gif: 3 seconds 20 frames of 33.33 fps 
        
        } 
    }


    //////////////////////////////////
    ///////// 
    /////////////////////////////////

    bringForward = () => {
        this.tablechange = true;
        this.setState(prevState => {
            return{
                bringForward: prevState.bringForward * -1
            }
        })
    }


    //////////////////////////////////
    ///////// KEEPING TRACK
    /////////////////////////////////


    startKeepingTrack = () => {
        this.tablechange = true;
        this.setState({
            keepTrack: true
        })

    }

    stopKeepingTrack = () => {
        this.tablechange = true;
        this.setState({
            keepTrack: false
        })
    }

    wipeTable = () => {
        this.tablechange = true;
        this.setState({
            keepTrackRows: [],
            throw: 0,
        })
    }


    handleNumberDice = (event) => {
        const x = event.target.value;
        this.nrdice = parseInt(x);
    }


    moveon = () => {
        this.justchangedDie = 0;
        this.setState({
            prep: false,
            numberDice: this.nrdice,
        })
    }

    differentNumberDice = () => {
        this.setState({
            prep: true, 
            startNew: true,
        })
    }

    render(){

        this.checkpath();

        this.throwprep();

        const pointer = this.state.loading? 'pointer-thrown':'pointer-pickup'

        if(this.state.prep){
            return(
                <React.Fragment>

                    <div className='main-part'>
                        
                        <div className="bg-middle"></div>
                        <div className="d-wrapper-main">
    
                            
                            <div className="d-box0" ref={this.testref}>
                                    <img className="plack" src={plack} />
                                    <h1 className="game-title">{this.props.gameTitle}</h1>
                                    
                            </div>  

                            <div className="d-box4">
                                <React.Fragment>
                                    <div className=""> 
                                            <select className="reg-select" onChange={this.handleNumberDice} defaultValue={1}>
                                                <option value={1} disabled={true}>How many dice ?</option>
                                                {
                                                    this.state.dLimit.map(x => {
                                                        return <option key={x} value={x}>{x}</option>
                                                    })
                                                }
                                            </select>
                                        <button onClick={this.moveon} className="reg-bttn">OK</button>
                                    </div>
                                </React.Fragment>
                            </div>   
                        </div>
                    </div>
    
                    {this.props.showSideBar &&
                        <Sidebar 
                            showSideBar={this.props.showSideBar}
                            moveSidebar={this.props.moveSidebar}
                        />
                    }
                </React.Fragment>
            );   
        } else {

        return(
            <React.Fragment>

                <div className='main-part'>
                    
                    <div className="bg-middle"></div>
                    <div className="d-wrapper-main">

                        <div className="d-box0">
                                <img className="plack" src={plack} />
                                <h1 className={`game-title`}>{this.props.gameTitle}</h1>
                                
                        </div>  

                        <div className={`d-box6`}>
                            {(this.state.bringForward > 0)? 
                                <React.Fragment>
                                    {(this.state.numberDice > 1)?
                                        <button className="reg-bttn" onClick={this.bringForward}>
                                            Push Back Dice
                                        </button>
                                        :
                                        <button className="reg-bttn" onClick={this.bringForward}>
                                            Push Back the Die
                                        </button>
                                        }
                                </React.Fragment>
                                :
                                <React.Fragment>
                                        {(this.state.numberDice > 1)?
                                        <button className="reg-bttn" onClick={this.bringForward}>
                                            Bring Forward Dice
                                        </button>
                                        :
                                        <button className="reg-bttn" onClick={this.bringForward}>
                                            Bring Forward the Die
                                        </button>
                                        }
                                </React.Fragment>

                            }
                            
                                
                        </div>

                        <div className={`d-box5`}>
                            {!this.state.keepTrack?
                            <div>
                                <button className="reg-bttn" onClick={this.startKeepingTrack}>
                                    Keep Track of Throws
                                </button>
                            </div>
                            :
                            <div>
                                <div className="keep-track-bttns">

                                    <table className="keep-track-table">
                                        <thead>
                                            <tr>
                                                <th>Game</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.keepTrackRows}
                                        </tbody>
                                    </table>
                                    <div>   
                                <button className="reg-bttn" onClick={this.wipeTable}>
                                            Wipe the Table 
                                </button>
                                </div>

                                <div>
                                <button className="reg-bttn" onClick={this.stopKeepingTrack}>
                                    Stop Keeping Track 
                                </button>
                                </div>

                                    </div>
                                </div>    

                            }
                            
                            

                            
                            
                            {parseInt(this.props.specialtype)?
                                <button className="reg-bttn" onClick={this.differentNumberDice}>
                                    New
                                </button>
                                :
                                <React.Fragment></React.Fragment>
                            }
                        </div>


                        
                        <div className={`d-box4`}>
                            {this.state.loading?
                                <React.Fragment>
                                    <div className="result-grid">
                                        <div className="result-boxing">
                                            <div className="current-player">Face Up</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.resultTxtFaces}</div>
                                        </div>
                                        {this.state.resultTxtThrow &&
                                            <React.Fragment>
                                            <div className="result-boxing">
                                                <div className="current-player">Result (Adding)</div> 
                                            </div>
                                            <div className="result-boxing">
                                                <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.resultTxtThrow}</div>
                                            </div>
                                            </React.Fragment>
                                        }
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className="result-grid">
                                        <div className="result-boxing">
                                            <div className="current-player">Face Up</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content">{this.state.resultTxtFaces}</div>
                                        </div>
                                        {this.state.resultTxtThrow &&
                                            <React.Fragment>
                                            <div className="result-boxing">
                                                <div className="current-player">Result (Adding)</div> 
                                            </div>
                                            <div className="result-boxing">
                                                <div className="result-content">{this.state.resultTxtThrow}</div>
                                            </div>
                                            </React.Fragment>
                                        }
                                    </div>
                                </React.Fragment>
                                
                            }
                            

                            {this.state.loading?
                                <div >
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[0]} 
                                    />
                                    
                                    {(this.state.numberDice > 1) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[1]}/>
                                    }

                                    {(this.state.numberDice > 2) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[2]} />
                                    }
                                    {(this.state.numberDice > 3) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[3]}/>
                                    }
                                    {(this.state.numberDice > 4) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[4]} />
                                    }
                                    {(this.state.numberDice > 5) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[5]} />
                                    }
                                    {(this.state.numberDice > 6) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[6]} />
                                    }

                                    <button className="throw-bttn" >THROW</button>
                                </div>
                                :

                                <div>

                                    <img alt="die-still" className={`topgif ${pointer}`} src={this.dicestill[0]} style={{zIndex: this.state.bringForward}} 
                                    />

                                    {(this.state.numberDice > 1) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[1]} style={{zIndex: this.state.bringForward}}
                                    />
                                    }

                                    {(this.state.numberDice > 2) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[2]} style={{zIndex: this.state.bringForward}}
                                    />
                                    }

                                    {(this.state.numberDice > 3) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[3]} style={{zIndex: this.state.bringForward}}
                                    />
                                    }

                                    {(this.state.numberDice > 4) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[4]} style={{zIndex: this.state.bringForward}}
                                    />
                                    }
                                    
                                    {(this.state.numberDice > 5) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[5]} style={{zIndex: this.state.bringForward}}
                                    />
                                    }

                                    {(this.state.numberDice > 6) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[6]} style={{zIndex: this.state.bringForward}}
                                    />
                                    }

                                    <button className="throw-bttn" onClick={this.throwDice}>THROW</button>
                                </div>

                            }
                        </div>

                    </div>
                </div>


                {this.props.showSideBar &&
                    <Sidebar 
                        showSideBar={this.props.showSideBar}
                        moveSidebar={this.props.moveSidebar}
                    />
                }
            </React.Fragment>
        );
        }
    }
}







export default Dice;




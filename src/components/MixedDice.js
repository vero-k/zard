/// In the End, Replace with Newest version of Dice
/// But change marked regions
// best change it in another doc. then change the name of the doc to MixedDice.js


import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import _ from 'lodash';

import {valueMap, versionMap, versionArray, select, findSides, diceLimit} from '../helpers/Maps.js'

import plack from '../img/placks/plack1.png';
import CrossIcon1 from '../img/cross/CrossIcon1.js';



class MixedDice extends Component {


    constructor(props){
        super(props);
        this.state = {

            prep: true,
            numberDice: 0,
            numberSides: [],
            onlyNumerals: true,

            entries: [], //// EXCLUSIVE TO MIXE DICE
            diceTypes: [], /// EXCLUSIVE TO MIXED DICE

            //// EXCLUSIVE TO MIXED DICE
            

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
    dicestill = [];
    startingstill = "startingstill";
    versionCheck = new Map();
    limitCheck = new Map();
    availableSelect = _.cloneDeep(select);


    /// EXCLUSIVE TO MIXED DICE 
    addNewDie = () => {
        const updatedEntries = _.cloneDeep(this.state.entries);

        updatedEntries.push({
            type: "default",
            selected: false,
            sides: 0,
            selection: _.cloneDeep(this.availableSelect),
        })
        this.setState((prevState) => {
            return{
                ...prevState,
                entries: updatedEntries,
                numberDice: prevState.numberDice + 1,
            }
        })

    
    }


    /// EXCLUSIVE TO MIXED DICE
    removeDie = (index) => {
        const updatedEntries = _.cloneDeep(this.state.entries);
        const alreadyTypeSelected = updatedEntries[index].selected;

        if(alreadyTypeSelected){
            const typelimit = diceLimit.get(updatedEntries[index].type);
            const currentNr = this.limitCheck.get(updatedEntries[index].type);
            
            if(currentNr === typelimit){
                this.availableSelect.push({
                    value: updatedEntries[index].type
                })
            }
            this.limitCheck.set("" + updatedEntries[index].type, currentNr - 1)
        } 

        updatedEntries.splice(index, 1);

        this.setState((prevState) => {
            return{
            ...prevState,
            entries: updatedEntries,
            numberDice: prevState.numberDice - 1,
            }
        })
    }


    /// EXCLUSIVE TO MIXED DIE
    selectDieType = (event, index) => {
        const updatedEntries = _.cloneDeep(this.state.entries);
        updatedEntries[index].selected = true;
        updatedEntries[index].sides = findSides['v' + event.target.value]
        updatedEntries[index].type = event.target.value;

        const typelimit = diceLimit.get("" + event.target.value);
        const currentNr = this.limitCheck.get("" + event.target.value);

        if(currentNr){
            if(currentNr === typelimit - 1){
              // remove this option 
              const index = this.availableSelect.findIndex((element) => element["value"] === event.target.value);
              this.availableSelect.splice(index, 1)
            }
            this.limitCheck.set("" + event.target.value, currentNr + 1)
        } else {
            if(typelimit === 1){
                const index = this.availableSelect.findIndex((element) => element["value"] === event.target.value);
                this.availableSelect.splice(index, 1)
            }
            this.limitCheck.set("" + event.target.value, 1);
        }

        this.setState({
            entries: updatedEntries
        })
    }

    /// PARTLY CHANGED DUE TO MIXED DIE
    moveon = () => {
        let diceTypes = [];
        let numberSides = [];
        let onlyNumerals = true;
        let atLeastOne = false;

        this.state.entries.forEach((x) => {
            diceTypes.push(x.type)
            numberSides.push(parseInt(x.sides))
            if(!parseInt(x.type)){   /// was x before, did it work? 
                onlyNumerals = false;
            }
            atLeastOne = true;
        })

        const numberDice = diceTypes.length;

        if(atLeastOne){
            this.setState({
                prep: false,
                numberDice,
                numberSides,
                diceTypes,
                onlyNumerals,
            })
        }
        
    }


    checkpath = () => {

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


                numberSides: [],
                onlyNumerals: true,

                entries: [], //// EXCLUSIVE TO MIXE DICE
                diceTypes: [], /// EXCLUSIVE TO MIXED DICE

                throw: 0,

                keepTrack: false,
                keepTrackRows: [],

                loading: false,
            })
            this.nrdice = 1; // problem? 
            this.random = [];
            this.version = [];
            this.startingstill = "startingstill";
            this.dicethrow = [];
            this.justchangedDie = 0;
            this.versionCheck = new Map()

            this.dicethrow = [];
            this.dicestill = [];

            this.limitCheck = new Map();
            this.availableSelect = _.cloneDeep(select);
        }
    }

    ///// PARTIAL CHANGES FOR MIXED DICE
    throwprep = () => {

        if(this.justchangedDie < 1 || !(this.props.showSideBar || this.justopenedSB < 4 || this.state.loading || this.tablechange)){
            if(this.justchangedDie < 1){
                this.state.diceTypes.forEach(x => {
                    this.dicestill.push("../dicethrows/" + x + "/dicestill_" + 1 + ".png")
                })
                this.justchangedDie++;
            } else {

                this.dicestill = [];
                if(this.random.length === 0){
                    this.startingstill = ""
                    this.state.diceTypes.forEach((x, j) => {
                        this.dicestill[j] = "../dicethrows/" + x + "/dicestill_" + 1 + ".png";
                    })
                
                } else {
                    this.startingstill = ""
                    this.state.diceTypes.forEach((x, j) => {
                        this.dicestill[j] = "../dicethrows/" + x + "/dicestill_res" + this.random[j] + "_" + this.version[j]  + ".png";
                    })
                }

            }

            const dicearrayresults = [];

            this.state.diceTypes.forEach((x, i) => {
                if(parseInt(x)){
                    dicearrayresults.push(Math.floor(Math.random() * this.state.numberSides[i]) + 1)
                } else {
                    const randomspecialval = valueMap.get(x)[Math.floor(Math.random() * this.state.numberSides[i])]
                    dicearrayresults.push(randomspecialval)
                }
            })

                 
            this.random = dicearrayresults;
            this.dicethrow = [];

            this.versionCheck = new Map();
            // make map
            this.state.diceTypes.forEach((x) => {
                if(!this.versionCheck.has(x)){
                    this.versionCheck.set(x, {});
                } 
            })

            this.random.forEach((x, i) => {
                const type = this.state.diceTypes[i];
                if(!this.versionCheck.get(type)["" + x]){
                    this.versionCheck.get(type)["" + x] = [];
                }
            })


            this.random.forEach((x, j) => {
                //make sure that if two same results in random, that the versions are different 
                let versionof = 0;
                let oneof = 0;
                if(!parseInt(this.state.diceTypes[j])){
                    let random_charreplaced = this.random[j].replaceAll(' ', '_');
                    random_charreplaced = random_charreplaced.replaceAll(',', '_');
                    random_charreplaced = random_charreplaced.replaceAll("'", '_');
                    oneof = versionMap.get(this.state.diceTypes[j])[random_charreplaced];
                } else {
                    oneof = versionArray[this.state.numberSides[j]][parseInt(this.random[j]) - 1];
                }

                do{
                    versionof = Math.floor(Math.random() * oneof) + 1;

                } while(this.versionCheck.get(this.state.diceTypes[j])["" + this.random[j]].includes(oneof) && this.versionCheck.get(this.state.diceTypes[j])["" + this.random[j]].length < oneof)
                
                this.versionCheck.get(this.state.diceTypes[j])["" + this.random[j]].push(versionof);
                this.version[j] = versionof;
                this.dicethrow[j] = "../dicethrows/" + this.state.diceTypes[j] + "/dicethrow_res" + this.random[j] + "_" + this.version[j] + ".gif";
            })

            

        }
         
        if(this.justopenedSB < 4){ 
            this.justopenedSB++;
        }

        if(this.tablechange){
            this.tablechange = false;
        }
    }





    throwDice = (event) => {

        if(!this.state.prep && !this.state.loading && event.target === event.currentTarget){

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

        if(this.state.onlyNumerals && this.state.numberDice > 1){
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
        }.bind(this), 3200) // 4190
        
        }
        
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
        const nrdice = event.target.value;
        this.setState({
            numberDice: nrdice,
        })
    }


    differentNumberDice = () => {

        this.setState({
            prep: true, 
            startNew: true,
            
        })
    }
  
    bringForward = () => {
        this.tablechange = true;
        this.setState(prevState => {
            return{
                bringForward: prevState.bringForward * -1
            }
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
    
                            <div className="d-box0">
                                <img className="plack" src={plack} />
                                <h1 className="game-title">Mixed Dice</h1>
                                    
                            </div>

                            

                            { /* HERE (div d-box4) IS A PART EXCLUSIVE TO MIXED DICE */ }
                            <div className="d-box4">
                                    <React.Fragment>
                                        <div className="custom-list">
                                            <div className="custom-list-entries">
                                                {
                                                    this.state.entries.map((entry, index) => {

                                                            return(
                                                                <React.Fragment key={index} >
                                                                    <div className="added-entry added-entry-type-selected-mixed-dice"> 
                                                                        {console.log("defaultValue " + entry.type)}
                                                                        <select className="reg-select select-entry-type" value={entry.type} onChange={(event) => this.selectDieType(event, index)}> 
                                                                            <option value="default" disabled>Choose...</option> 
                                                                            {
                                                                                entry.selection.map((x, i) => {
                                                                                    return(
                                                                                        <option key={i} value={x.value}>{(typeof x.value === 'string')? x.value.charAt(0).toUpperCase() + x.value.slice(1): "Standard " + x.value} Die</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select> 
                                                                        
                                                                        <button onClick={() => this.removeDie(index)} className="remove-entry"><CrossIcon1 alt="remove entry" className="cross-bttn"/></button>
                                                                        {console.log("index " + index)}
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        
                                                    })
                                                }
                                            </div>

                                            <div className="custom-list-ctrl">
                                                <button onClick={this.addNewDie} className="reg-bttn">Add New Dice</button>
                                                <button onClick={this.moveon} className="reg-bttn">OK</button>
                                            </div>
                                        </div>

                                    </React.Fragment>
                            </div>   
                        </div>
                    </div>
    
                    {this.props.showSideBar?
                        <Sidebar 
                            showSideBar={this.props.showSideBar}
                            moveSidebar={this.props.moveSidebar}
                        />
                        :
                        <React.Fragment></React.Fragment>
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
                                <h1 className={`game-title ${pointer}`}>Mixed Dice</h1>
                                
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


                        <div className={`d-box5 ${pointer}`}>
                            {!this.state.keepTrack?
                            <div>
                                <button className="reg-bttn" onClick={this.startKeepingTrack}>
                                    Keep Track of Dice Throws
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
                            
                            <button className="reg-bttn" onClick={this.differentNumberDice}>
                                    New
                            </button>
                        </div>


                        
                        <div className="d-box4">
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
                                                <div className="current-player">Result ({(this.state.scoreDeterminationThrow)? this.state.scoreDeterminationThrow:"Sum"})</div> 
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
                                                <div className="current-player">Result ({(this.state.scoreDeterminationThrow)? this.state.scoreDeterminationThrow:"Sum"})</div> 
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
                                <div>

                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[0]} />

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
                                    {(this.state.numberDice > 7) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[7]}/>
                                    }
                                    {(this.state.numberDice > 8) &&
                                    <img alt="die-animated" className={`topgif`} src={this.dicethrow[8]} />
                                    }

                                    <button className="throw-bttn" onClick={this.throwDice}>THROW</button>
                                </div>
                                :

                                <div>

                                    <img alt="die-still" className={`topgif`} src={this.dicestill[0]} style={{zIndex: this.state.bringForward}}/>

                                    {(this.state.numberDice > 1) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[1]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 2) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[2]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 3) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[3]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 4) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[4]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 5) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[5]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 6) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[6]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 7) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[7]} style={{zIndex: this.state.bringForward}}/>
                                    }
                                    {(this.state.numberDice > 8) &&
                                    <img alt="die-still" className={`topgif ${this.startingstill}`} src={this.dicestill[8]} style={{zIndex: this.state.bringForward}}/>
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


export default MixedDice;




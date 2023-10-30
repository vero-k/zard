import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import _, { update, isBuffer } from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import animationvid from '../img/animations/customdice/loadinganimation.mp4';

//import animation from '../img/animations/customdice/loadinganimation.gif';
//import still from '../img/animations/customdice/still.png';

/*
    take code from Dice (non prep)
    what about the animation though? 
*/

import plack from '../img/placks/plack1.png';
import cross from '../img/cross/cross1.svg';

//import birdy from '../img/loadinganimation/birdy.gif'
import die_still from '../img/custom/questiondie.png';
import die_throw from '../img/custom/questiondie.gif';

class CustomDice extends Component {


    constructor(){
        super();
        this.state = {

            prep: true,
            entries: [],
            numberDice: 0, 

            probabilityError: false,
            allEmptyProbabilities: true,
            onlyNumerals: true,
            nowinners: false,

            resultTxt: "",

            throw: 0,

            openDialog: false,
            openDialogNewDice: false,

            keepTrack: false,
            keepTrackRows: [],


            loading: false,

            path: "",

        }

        
    }

    justchangedDie = 1;
    justopenedSB = 4;
    tablechange = false;
    random = 0;
    dicethrow = "";
    //dicethrow = '../animations/customdice/loadinganimation.gif';
    dicestill = '../animations/customdice/still.png';


   addNewEntry = () => {
    const updatedEntries = this.state.entries;
    updatedEntries.push({
        selected: false,
        index: null,
        entryType: null,
        entry: null,
        probability: null,
        error: null,
    })
    this.setState({
        entries: updatedEntries
    })
    }


    removeEntry = (index) => {
        const updatedEntries = this.state.entries;
        updatedEntries.splice(index, 1);
        this.setState({
            entries: updatedEntries
        })
    }


    selectType = (event, index) => {
        const updatedEntries = this.state.entries;
        updatedEntries[index].selected = true;
        updatedEntries[index].index = index;
        updatedEntries[index].entryType = event.target.value;
        if(event.target.value === "img url" || event.target.value === "img upload"){
            updatedEntries[index].isImage = true;
        } else {
            updatedEntries[index].isImage = false;
        }
        this.setState({
            entries: updatedEntries
        })
    }


    recordInput = (event, index) => {
        const input = event.target.value;
        
        const isNumber = (input === parseFloat(input));

        const updatedEntries = this.state.entries;
        updatedEntries[index].index = index;
        updatedEntries[index].entry = (isNumber)? parseFloat(input):input;
        updatedEntries[index].isnumeral = isNumber;

        this.setState({
            entries: updatedEntries,
        })
    }


    recordProbability = (event, index) => {
        // control user input and convert it to number
        const input = event.target.value;
        
        if(input === ""){
            const updatedEntries = this.state.entries;
            updatedEntries[index].probability = null;
            updatedEntries[index].error = null;
            this.setState({
                entries: updatedEntries,
            })
        } else {
            const [analysedInput, isNumber] = this.checkInput(input);


            if(isNumber){
                if(analysedInput >= 0 && analysedInput <= 1){
                    // update if everything is ok
                    console.log("everything ok")
                    const updatedEntries = this.state.entries;
                    updatedEntries[index].probability = analysedInput;
                    updatedEntries[index].error = null;
                    this.setState({
                        entries: updatedEntries,
                    })
                } else {
                    // error output
                    const updatedEntries = this.state.entries;
                    updatedEntries[index].probability = null;
                    updatedEntries[index].error = "Out of Range. Only Values between 0 and 1 or percentages between 0% and 100% are in range.";
                    this.setState({
                        entries: updatedEntries,
                    })
                }
            } else {
                // error output
                const updatedEntries = this.state.entries;
                updatedEntries[index].probability = null;
                updatedEntries[index].error = "Invalid Input. Only Number Values between 0 and 1 or percentages between 0% and 100% are valid.";
                this.setState({
                    entries: updatedEntries,
                })
            }
        }
        
    }


    doneAddingEntries = () => {
        let allEmpty= true;
        let totalProbability = 0;
        let hasErrors = false;

        this.state.entries.map((entry) => {
            totalProbability += entry.probability;
            if(entry.error){
                hasErrors = true;
            }
            if(entry.probability){
                allEmpty = false;
            }
            return null;
        })

        if(!hasErrors){
            if(allEmpty){
                this.setState({
                    prep: false,
                    probabilityError: false,
                    allEmptyProbabilities: true,
                })
                
            } else if(totalProbability === 1.0){ /// maybe you'll need to approximate
                // check if all numerals
                let onlyNumerals = true;
                this.state.entries.map((entry) => {
                    if(entry.isnumeral){
                        onlyNumerals = false;
                    }
                    return null;
                })
                // set state
                this.setState({
                    prep: false,
                    probabilityError: false,
                    allEmptyProbabilities: false,
                    onlyNumerals,
                })
            } else {
                this.setState({
                    probabilityError: true,
                })

            }
            
        }
        
    }


    newCustomDie = () => {
        this.setState({
            prep: true,
            entries: [],

            probabilityError: false,
            allEmptyProbabilities: true,
            onlyNumerals: true,

            resultTxt: "",

            throw: 0,

            keepTrack: false,
            keepTrackRows: [],
        })
    }

    isNewCustomDie = () => {
        this.setState({
            openDialogNewDice: true
        })
    }
    
    closeDialogNewDiceStay = () => {
        this.setState({
            openDialogNewDice: false,
        })
        
    }

    closeDialogNewDiceExit = () => {
        this.setState({
            openDialogNewDice: false,
        })
        this.newCustomDie();
    }


////////////////////////////////
////////////////////////////////////////////////


    checkInput = (input) => {
        let parsedInput = parseFloat(input);

        let analysedInput = null;

        // validate user input and check if all are numerics
        let isNumber = true;

        if(parsedInput.toString() === input){
            isNumber = true;
            analysedInput = parsedInput;
        } else if(input.endsWith('%') && parsedInput.toString() === input.slice(0, -1)){
            isNumber = true;
            analysedInput = 1.0 * parsedInput / 100; 
        } else if(isNaN(parsedInput)){
            // not possibly a number, no numbers
            analysedInput = input;
            isNumber = false;
        } 
            
        /*

                const inputChars = input.split('');
                let numberDots = 0;
                

                inputChars.map((char, index) => {
                        if(char === "."){
                            numberDots++;
                        } else if(char === ","){
                            numberDots++;
                            inputChars[index] = ".";
                        } else if(char === "'"){
                            inputChars[index] = "";
                        } else if(!this.isDigit(char)){
                            allnumbers = false;
                        } 
                        return null;

                })


                if(allnumbers && numberDots <= 1){
                    const str = inputChars.join("");
                    analysedInput = parseFloat(str); 

                } else {
                    analysedInput = input;
                }

        */

        

        return [analysedInput, isNumber];
    }


    isDigit = (char) => {
        if(char === "0" ||
        char === "1" ||
        char === "2" ||
        char === "3" ||
        char === "4" ||
        char === "5" ||
        char === "6" ||
        char === "7" ||
        char === "8" ||
        char === "9"
        ) {
            return true;
        } else {
            return false;
        }
    }

//////////////////////////
///////////////////////////


    checkpath = () => {
        //const dieSides = this.props.numberSides;
        console.log("check path exe")
        if(this.props.showSideBar){
            this.justopenedSB = 0;
        } 
        if(this.state.path !== this.props.match.path){
            console.log("inside check path")
            this.setState({
                prep: true,
                path: this.props.match.path,
                resultTxt: "",
                numberDice: 0,
                startNew: false,

                keepTrack: false,
                keepTrackRows: [],
            })
            this.random = 0;
            this.dicethrow = '';
            this.justchangedDie = 0;
        }
    }


    throwprep = () => {
        
        console.log("throwprep exe")

        if(this.justchangedDie < 1 || !(this.props.showSideBar || this.justopenedSB < 4 || this.state.loading || this.tablechange)){
            console.log("inside throwprep ")
            if(this.justchangedDie < 1){
                //this.dicestill = "../dicethrows/" + "" + "/dicestill_" + 1 + ".png";
                this.justchangedDie++;
            } else {
                this.dicestill = [];

                if(this.random){
                        ///this.dicestill[j] = "../dicethrows/" + "" + "/dicestill_" + 1 + ".png";
                
                } else {
                        //this.dicestill[j] = "../dicethrows/" + "" + "/dicestill_res" + this.random[j] + "_" + this.version[j]  + ".png";
                }
            }

        

            this.random = this.getThrow();
            

            //this.dicethrow[j] = "../dicethrows/" + this.state.diceTypes[j] + "/dicethrow_res" + this.random[j] + "_" + this.version[j] + ".gif";

        }
         
        if(this.justopenedSB < 4){ 
            this.justopenedSB++;
        }

        if(this.tablechange){
            this.tablechange = false;
        }
    }


    throwDice = () => {

        console.log("throwDice Execute... ")
        if(!this.state.prep && !this.state.loading){
        console.log("inside throwDice")
        this.setState({
            loading: true,
        })


        let resultTxt = this.random;
    
        let updatedKeepTrackRows = _.cloneDeep(this.state.keepTrackRows);
        let nrthrow = this.state.throw;


        // show score in keeping track table
        if(this.state.keepTrack){
            nrthrow++;
            const newRow = <tr>
                <td>Throw {nrthrow}</td>
                <td>{resultTxt}</td>
            </tr>;
            updatedKeepTrackRows.push(newRow);
        }

        setTimeout(function(){
            this.setState({
                keepTrackRows: updatedKeepTrackRows,

                resultTxt,
                throw: nrthrow, // needed? 
                loading: false,
            })
        }.bind(this), 2210) // 4190
        
        }
    }
    

    getThrow = () => {

        console.log("getThrow exe")
        if(!this.state.prep && !this.state.loading){
            console.log('inside getThrow')
        if(this.state.allEmptyProbabilities){
            return this.state.entries[Math.floor(Math.random() * this.state.entries.length)].entry;
        } else {
            // set up probability array
            let sum = 0;
            const accumulatedProbabilities = [];
            accumulatedProbabilities.push(0);
            this.state.entries.map((entry) => {
                sum += entry.probability;
                accumulatedProbabilities.push(sum);
                return null;
            })


            const randomNumber = Math.random();
            let random = null;        

            for(let i = 1; i < accumulatedProbabilities.length; i++){
                if(randomNumber >= accumulatedProbabilities[i-1] && randomNumber < accumulatedProbabilities[i]){
                    random = this.state.entries[i-1];
                }
            }

            return random.entry;
        }
        }
    }



    closeDialogStay = () => {
        this.setState({
            openDialog: false,
        })
        
    }

    closeDialogExit = () => {
        this.setState({
            openDialog: false,
        })
        this.endMpg();
    }

    //////////////////////////////////
    ///////// KEEPING TRACK
    /////////////////////////////////


    startKeepingTrack = () => {
        this.setState({
            keepTrack: true
        })
    }

    stopKeepingTrack = () => {
        this.setState({
            keepTrack: false
        })
    }

    wipeTable = () => {
        this.setState({
            keepTrackRows: [],
            throw: 0
        })
    }



    render(){

        this.checkpath();
        this.throwprep();

        if(this.state.prep){
            return(
                <React.Fragment>
                    
                    <div className='main-part'>
                        
                        <div className="bg-middle"></div>
                        <div className="d-wrapper-main">
    
                            <div className="d-box0" ref={this.testref}>
                                    <img className="plack" src={plack} />
                                    <h1 className="game-title">Custom Dice</h1>
                                    
                            </div>  
                            
                            <div className="d-box4">
                                <h2 className="game-subtitle">{this.props.gameSubTitle0}</h2>
                                <React.Fragment>
                                    <div className="custom-list">
                                        <div className="custom-list-entries">
                                            {
                                                this.state.entries.map((entry, index) => {

                                                        return(
                                                            <React.Fragment key={index} >
                                                                <div className="added-entry added-entry-type-selected"> 
                                                                    <input type="text" className="reg-input short-txt-input-entry-type custominput" placeholder="Type Entry..." onChange={(event) => this.recordInput(event, index)}/>
                                                                    <input type="text" style={(entry.error)? {backgroundColor: "red"}:{}} className={"short-txt-input-entry-type customprobability"} placeholder="Probability" onChange={(event) => this.recordProbability(event, index)}/>
                                                                    <button onClick={() => this.removeEntry(index)} className="remove-entry"><img alt="remove entry" className="cross-bttn" src={cross}></img></button>
                                                                    
                                                                </div>

                                                                {entry.error?
                                                                    <React.Fragment>
                                                                        <span className="probInput-error">{entry.error}</span>
                                                                    </React.Fragment>
                                                                    :
                                                                    <React.Fragment></React.Fragment>
                                                                }
                                                                
                                                            </React.Fragment>
                                                        )
                                                    
                                                })
                                            }
                                        </div>
                                        {this.state.probabilityError?
                                        <div>
                                            The probablities must add up exactly to 1 or 100%. 
                                        </div>
                                        :
                                        <React.Fragment><div>*Probability Values are Optional. </div></React.Fragment>
                                        }
                                        <div className="custom-list-ctrl">
                                            <button onClick={this.addNewEntry} className="reg-bttn">Add 1 New Entry</button>
                                            <button onClick={this.doneAddingEntries} className="reg-bttn">OK</button>
                                        </div>
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

                        <div className="d-box0" ref={this.testref}>
                            <img className="plack" src={plack} />
                            <h1 className={`game-title`}>Custom Dice</h1>
                                
                        </div>  


                        <div className={`d-box5`}>
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
                                        <tbody id="keep-track-rows">
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
                            
                            <button className="reg-bttn" onClick={this.isNewCustomDie}>
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
                                        <div className="result-boxing flip-in-hor-bottom">
                                            <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.resultTxt}</div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className="result-grid">
                                        <div className="result-boxing">
                                            <div className="current-player">Face Up</div> 
                                        </div>
                                        <div className="result-boxing flip-in-hor-bottom">
                                            <div className="result-content">{this.state.resultTxt}</div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                
                            }
                            

                            {this.state.loading?
                                <div className={``}>
                                    <img alt="die-animated" className={`topgif`} src={die_throw} 
                                    />
                                    <button className="throw-bttn" >THROW</button>
                                </div>
                                :

                                <div className={``}>
                                    <img alt="die-animated" className={`topgif`} src={die_still} 
                                    />
                                    <button className="throw-bttn" onClick={this.throwDice}>THROW </button>
                                </div>
                            }
                        </div>   
                    </div>
                </div>


                <Dialog
                    className={"dialog"}
                    open={this.state.openDialogNewDice}
                    onClose={this.closeDialogNewDice}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to create a New Custom Die?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This Custom Die will be deleted. 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeDialogNewDiceStay} color="primary">
                        No, Keep this Custom Die.
                    </Button>
                    <Button onClick={this.closeDialogNewDiceExit} color="primary" autoFocus>
                        Yes, Make a New Custom Die.
                    </Button>
                    </DialogActions>

                </Dialog>

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


export default CustomDice;
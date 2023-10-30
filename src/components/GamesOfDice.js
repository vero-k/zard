import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



import {valueMap, versionMap, versionArray, select, findSides, diceLimit} from '../helpers/Maps.js'

import Star from './Star.js';

import plack from '../img/placks/plack1.png'
import cross from '../img/cross/cross1.svg';


class GamesOfDice extends Component {


    constructor(props){
        super(props);
        this.state = {

            prep: true,
            selectDie: true,
            addingPlayers: false,
            scoreTypeDetermination: false,


            entries: [], //// TAKEN FROM MIXE DICE
            diceTypes: [], /// TAKEN FROM MIXED DICE

            numberDice: 0,
            numberSides: [],
            onlyNumerals: true,

            resultTxtFaces: "",
            resultTxtThrow: null,

            players: [],
            currentPlayerIndex: 0,
            whoseTurnNow: "",
            whoseTurnNext: "",

            throw: 0,

            scoreDeterminationThrow: "",
            scoreDeterminationTotal: "",
            winnerDetermination: "",

            keepTrack: false,
            keepTrackRows: [],

            openDialog: false,

            loading: false,
    
            path: "",

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
    versionCheck = new Map();
    limitCheck = new Map();
    availableSelect = _.cloneDeep(select);

    ////////////////////////////////
    //// HOW MANY DIE
    ///////////////////////////////////


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

    /// TAKEN FROM  MIXED DICE
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


    /// TAKEN FROM MIXED DIE
    selectDieType = (event, index) => {
        const updatedEntries = _.cloneDeep(this.state.entries);
        updatedEntries[index].selected = true;
        updatedEntries[index].sides = findSides['v' + event.target.value]; 
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

    /// TAKEN FROM MIXED DIE (NOW CHANGED)
    moveon = () => {
        
        const diceTypes = [];
        const numberSides = [];
        let onlyNumerals = true;
        let atLeastOne = false;

        this.state.entries.forEach((x) => {
            if(x.selected){
                diceTypes.push(x.type);
                numberSides.push(parseInt(x.sides))
                if(!parseInt(x.type)){
                    onlyNumerals = false
                }
                atLeastOne = true;
            }

        })

        const numberDice = diceTypes.length;

        if(atLeastOne){
            this.setState({
                numberDice,
                numberSides,
                diceTypes,
                onlyNumerals,
                selectDie: false,
                addingPlayers: true,
                
            })
        }

        
    }


    ////////////////////////////////////
    ///// THROWING DIE
    /////////////////////////////////

    checkpath = () => {
        //const dieSides = this.props.numberSides;

        if(this.props.showSideBar){
            this.justopenedSB = 0;
        } 
        if(this.state.path !== this.props.match.path){
            this.setState({
                prep: true,
                path: this.props.match.path,
                resultTxt: "",
                resultTxtThrow: null,
                numberDice: 0,
                startNew: false,

                keepTrack: false,
                keepTrackRows: [],
            })
            this.random = [];
            this.version = [];
            this.dicethrow = [];
            this.justchangedDie = 0;
            this.versionCheck = new Map()
        }
    }



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
                    this.state.diceTypes.forEach((x, j) => {
                        this.dicestill[j] = "../dicethrows/" + x + "/dicestill_" + 1 + ".png";
                    })
                
                } else {
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


        if(!this.state.prep && !this.state.loading){
        
        this.setState({
            loading: true,
        })

        const random = this.random;

        let resultTxtFaces = "";

        random.forEach((x, i) => {
            resultTxtFaces += x;
            if(i < random.length - 1){
                resultTxtFaces += ", "
            }
        })
        
    
        let updatedKeepTrackRows = _.cloneDeep(this.state.keepTrackRows);
        let nrthrow = this.state.throw;

        let updatedPlayers = _.cloneDeep(this.state.players);
        let nextPlayer = 0;
        let whoseTurnNext = "";
        let whoseTurnNow = "";

        // update multiplayer table
        const currentPlayerIndex = this.state.currentPlayerIndex;
        const currentPlayer = updatedPlayers[currentPlayerIndex];
        whoseTurnNow = currentPlayer.name;

        // update round
        currentPlayer.roundsPlayed++;
        
        // scoredetermination of throw
        let scoreThrow = null;
        if(this.state.scoreDeterminationThrow === "Adding"){
            scoreThrow = 0;
            random.forEach((x) => {
                scoreThrow += x;
            })
        } else if(this.state.scoreDeterminationThrow === "Multiplying"){
            scoreThrow = 1;
            random.forEach((x) => {
                scoreThrow *= x;
            })
        } else if(this.state.scoreDeterminationThrow === "Stringing"){
            scoreThrow = "";
            if(this.state.onlyNumerals){
                random.forEach((x) => {
                    scoreThrow += x;
                })
            } else {
                random.forEach((x, index) => {
                    if(index === random.length -1){
                        scoreThrow += x;
                    } else {
                        scoreThrow += x + ", ";
                    }
                    
                })    
            }
            
        } else if(this.state.scoreDeterminationThrow === "manually"){
            // leave it? 
            scoreThrow = null;
        } else {
            /// just one die
            scoreThrow = random[0]
        }

        let resultTxtThrow = null;

        if(scoreThrow && this.state.numberDice > 1 && this.state.onlyNumerals ){
            resultTxtThrow = scoreThrow;
        }
        

        if(currentPlayer.score === ""){
            if(this.state.scoreDeterminationTotal === "add"){
                currentPlayer.score = 0;
            } else if(this.state.scoreDeterminationTotal === "multiply"){
                currentPlayer.score = 1;
            } 
        }

        // scoredetermination of total
        if(this.state.scoreDeterminationTotal === "add"){
            currentPlayer.score += scoreThrow;
        } else if(this.state.scoreDeterminationTotal === "multiply"){
            currentPlayer.score *= scoreThrow;
        } else if(this.state.scoreDeterminationTotal === "concat-front"){
            if(!this.state.onlyNumerals){
                if(currentPlayer.roundsPlayed === 1){
                    currentPlayer.score = scoreThrow;
                } else {
                    currentPlayer.score = scoreThrow + " | " + currentPlayer.score;
                }
            } else {
                if(currentPlayer.roundsPlayed === 1){
                    currentPlayer.score = parseInt("" + scoreThrow);
                } else {
                    currentPlayer.score = parseInt("" + scoreThrow + currentPlayer.score.toString());
                }
            }
            
        } else if(this.state.scoreDeterminationTotal === "concat-back"){
            if(!this.state.onlyNumerals){
                if(currentPlayer.roundsPlayed === 1){
                    currentPlayer.score = scoreThrow;
                } else {
                    currentPlayer.score = currentPlayer.score + " | " + scoreThrow;
                }
            } else {
                if(currentPlayer.roundsPlayed === 1){
                    currentPlayer.score = parseInt("" + scoreThrow);
                } else {
                    currentPlayer.score = parseInt("" + currentPlayer.score.toString() + scoreThrow);
                }
            }
            
        } 

        // update next player index
        nextPlayer = (currentPlayerIndex + 1) % updatedPlayers.length;
        whoseTurnNext = updatedPlayers[nextPlayer].name;

        // update winner
        if(this.state.winnerDetermination === "highest"){
            let winnerisnoplayer = true;
            updatedPlayers.forEach((player) => {
                if(player.score < currentPlayer.score){ 
                    if(player.winner){
                        currentPlayer.winner = true;
                        player.winner = false;
                        winnerisnoplayer = false;
                    }
                } else if(player.score === currentPlayer.score){
                    if(player.winner){
                        currentPlayer.winner = true;
                        winnerisnoplayer = false;
                    }
                    
                }  else {
                    if(player.winner){
                        winnerisnoplayer = false;
                    }
                }
               
            })
            if(winnerisnoplayer){
                currentPlayer.winner = true; // this is only right if there are no negative numbers
            }

        } else if(this.state.winnerDetermination === "lowest"){

                let currentmin = updatedPlayers[0].score;
                let currentminindex = [0];

                for(let i = 1; i < updatedPlayers.length; i++){ // start at 1 to avoid double pushing on currentminindex
                    if(currentmin > updatedPlayers[i].score){
                        currentmin = updatedPlayers[i].score;
                        currentminindex = [i];
                    } else if(currentmin === updatedPlayers[i].score){
                        currentminindex.push(i);
                    }
                }

                updatedPlayers.forEach((player, i) => {
                    if(currentminindex.includes(i)){
                        player.winner = true;
                    } else {
                        player.winner = false;  
                    }
                })
                
        }        
            
    

        // show score in keeping track table
        if(this.state.keepTrack){

            const newRow = <tr>
                <td>Throw {currentPlayer.roundsPlayed} by {this.state.whoseTurn}</td>
                <td>{scoreThrow}</td>
            </tr>;
            updatedKeepTrackRows.push(newRow);
        }

        setTimeout(function(){
            this.setState({
                players: updatedPlayers,
                currentPlayerIndex: nextPlayer, 
                keepTrackRows: updatedKeepTrackRows,

                resultTxtFaces,
                resultTxtThrow,
                whoseTurnNext,
                whoseTurnNow,
                throw: nrthrow, // needed? 
                loading: false,
            })
        }.bind(this), 3200) // 4190
        
        }
    }


    //////////////////////////////////
    ////// MULTIPLAYER GAME
    ///////////////////////////////////

    ////

    addNewPlayer = () => {
        this.tablechange = true;
        let updatedPlayers = this.state.players; // maybe clone? 
        updatedPlayers.push(
           {
              name: "",
              score: "",
              winner: false, 
              roundsPlayed: 0, 
              playerIndex: 0,
              winnerButtonPressed: false,
           }
        );
        this.setState({
            players: updatedPlayers,
        })
    }


    removePlayer = (index) => {
        this.tablechange = true;
        let updatedPlayers = this.state.players; // maybe clone? 
        updatedPlayers.splice(index, 1);
        this.setState({
            players: updatedPlayers,
        })
    }


    playerNameInput = (event, index) => {
        this.tablechange = true;
        let updatedPlayers = this.state.players; // maybe clone? 
        updatedPlayers[index].name = event.target.value;
        this.setState({
            players: updatedPlayers,
        })
    }


    doneAddingPlayers = () => {
        this.tablechange = true;
        // could give each player an index
        let updatedPlayers = this.state.players; /// maybe clone 

        if(updatedPlayers.length > 0){
            let first = updatedPlayers[0].name;

            this.setState({
                addingPlayers: false,
                scoreTypeDetermination: true,
                whoseTurn: first,
            })
        } else { /// ??????
            this.setState({
                addingPlayers: false,
                selectDie: true,
            })
        }

    } 
        
    

    selectScoreDeterminationThrow = (event) => {
        console.log("selectscoredetermination throw " + event.target.value)
        this.tablechange = true;
        this.setState({
            scoreDeterminationThrow: event.target.value
        })
    }

    selectScoreDeterminationTotal = (event) => {
        this.tablechange = true;
        this.setState({
            scoreDeterminationTotal: event.target.value,
        })
    }

    selectWinnerDetermination = (event) => {
        this.tablechange = true;
        this.setState({
            winnerDetermination: event.target.value,
        })
    }

    startGame = () => {
        this.tablechange = true;
        let scoreDeterminationThrow = this.state.scoreDeterminationThrow || 'manually';
        let scoreDeterminationTotal = this.state.scoreDeterminationTotal || 'manually';
        let winnerDetermination = this.state.winnerDetermination || 'manually';
        
        this.setState({
            prep: false,
            selectDie: true,
            scoreTypeDetermination: false,
            scoreDeterminationThrow,
            scoreDeterminationTotal,
            winnerDetermination,
        })
    }
    

    /*
    openMpg = () => {
        // reset all stats
        this.tablechange = true;
        this.setState({
            multiplayer: true,
            mpgPrep: true,
            addingPlayers: true,

            resultTxt: "",
            players: [],
            currentPlayerIndex: 0,
            scoreDetermination: "",
            winnerDetermination: "",
        })
    }
    */

    isEndMpg = () => {
        this.tablechange = true;
        this.setState({
            openDialog: true
        })
    }


    endMpg = () => {
        this.tablechange = true;
        this.random = []
        this.limitCheck = new Map();
        this.availableSelect = _.cloneDeep(select);

        // MAYBE keep some of these for ppl who don't want to change settings
        this.setState({
            entries: [], 
            diceTypes: [], 
            players: [],

            currentPlayerIndex: 0,
            whoseTurn: "",

            throw: 0,
            throwingame: 0,

            scoreDeterminationThrow: "",
            scoreDeterminationTotal: "",
            winnerDetermination: "",

            keepTrack: false,
            keepTrackRows: [],

            prep: true,
            selectDie: true,
            addingPlayers: false,
            scoreTypeDetermination: false,

            maxNrDice: false,
            numberDice: 0,
            numberSides: [],
            onlyNumerals: true,

            resultTxtFaces: "",
            resultTxtThrow: null,

            whoseTurnNow: "",
            whoseTurnNext: "",

            loading: false,

            bringForward: -1000,
        })
    }


    closeDialogStay = () => {
        this.tablechange = true;
        this.setState({
            openDialog: false,
        })
        
    }

    closeDialogExit = () => {
        this.tablechange = true;
        this.setState({
            openDialog: false,
        })
        this.endMpg();
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
            numberDice: nrdice
        })
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
    ////////////////////////////////////////////
    /////////////////////////////////////////////

    winnerButtonPressed = (index) => {
        const updatedPlayers = this.state.players;
        const current = updatedPlayers[index];
        current["winnerButtonPressed"] = !current["winnerButtonPressed"];

        this.tablechange = true;
        this.setState({
            players: updatedPlayers
        })
    }

    //////////////////////////////////////////////
    ////////////////////////////////////////////


    render(){


        const pointer = this.state.loading? 'pointer-thrown':'pointer-pickup'

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
                                <h1 className="game-title">Game Of Dice</h1>
                                    
                            </div>  

                            { /* HERE (div d-box4) TAKEN FROM MIXED DICE */ }
                            <div className="d-box4">
                                    <React.Fragment>

                                        {this.state.selectDie && 
                                        <div className="custom-list">
                                            <div className="custom-list-entries">
                                                {
                                                    this.state.entries.map((entry, index) => {

                                                            return(
                                                                <React.Fragment key={index} >
                                                                    <div className="added-entry added-entry-type-selected-mixed-dice"> 
                                                                        
                                                                        <select className="reg-select select-entry-type" value={entry.type} onChange={(event) => this.selectDieType(event, index)}> 
                                                                            <option value="default" disabled>Choose...</option> 
                                                                            {
                                                                                entry.selection.map((x, i) => {
                                                                                    return(
                                                                                        <option key={i} value={x.value} >
                                                                                        {(parseInt(x.value))? "Standard ":""}
                                                                                        {(parseInt(x.value))?  x.value: x.value.charAt(0).toUpperCase() + x.value.slice(1)} Die 
                                                                                        </option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select> 
                                                                        
                                                                        <button onClick={() => this.removeDie(index)} className="remove-entry"><img alt="remove entry" className="cross-bttn" src={cross}></img></button>
                                                                        
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
                                        }
                                        {this.state.addingPlayers &&
                                                <div>
                                                    <div>
                                                        {
                                                            this.state.players.map((player, index) => {
                                                                return(
                                                                    <div key={index} className="adding-player"> 
                                                                        <input key={index} className="reg-input" placeholder="Name of Player" value={player.name} onChange={(event) => this.playerNameInput(event, index)}/> 
                                                                        <button key={index + "a"} className="remove-entry" onClick={() => this.removePlayer(index)}><img alt="remove entry" className="cross-bttn" src={cross}></img></button>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="prepare-multi-player-game">
                                                        <button className="reg-bttn" onClick={this.addNewPlayer}>Add New Player</button>
                                                        <button className="reg-bttn" onClick={this.doneAddingPlayers}>DONE!</button>
                                                    </div>
                                                </div>  
                                        
                                        }
                                        {this.state.scoreTypeDetermination &&

                                                <div className="game-settings">
                                                    {this.state.numberDice > 1 &&
                                                    <React.Fragment>
                                                    <p>How should the Score of a Throw be determined: </p>
                                                    <select className="reg-select" name="score-determination" onClick={this.selectScoreDeterminationThrow}>
                                                        <option value="">Select ...</option>
                                                        {this.state.onlyNumerals &&
                                                        <React.Fragment>
                                                        <option value="Adding">Adding Dice Faces</option>
                                                        <option value="Multiplying">Multiplying Dice Faces</option>
                                                        </React.Fragment>
                                                        }
                                                        <option value="Stringing">Stringing Faces</option>
                                                        <option value="manually">Manually</option>
                                                    </select>
                                                    </React.Fragment>
                                                    }

                                                    <p>How should the Total Score be determined: </p>
                                                    <select className="reg-select" name="score-determination" onClick={this.selectScoreDeterminationTotal}>
                                                        <option value="">Select ...</option>
                                                        {this.state.onlyNumerals && (this.state.scoreDeterminationThrow !== 'manually') && 
                                                        <React.Fragment>
                                                        <option value="add">Adding Throws</option>
                                                        <option value="multiply">Multiplying Throws</option>
                                                        </React.Fragment>
                                                        }
                                                        <option value="concat-front">Stringing - In Front</option>
                                                        <option value="concat-back">Stringing - In Back</option>
                                                        <option value="manually">Manually</option>
                                                    </select>
                                                    
                                                    {!this.state.hasSpecialDice && 
                                                    <React.Fragment>
                                                    <p>How should the Winner be determined: </p>
                                                    <select className="reg-select" name="winner-determination" onClick={this.selectWinnerDetermination}>
                                                        <option value="">Select ...</option>
                                                        {this.state.onlyNumerals && (this.state.scoreDeterminationTotal !== 'manually') &&
                                                        <React.Fragment>
                                                        <option value="highest">By Highest Score</option>
                                                        <option value="lowest">By Lowest Score</option>
                                                        </React.Fragment>
                                                        }
                                                        <option value="manually">Manually</option>
                                                    </select> 
                                                    </React.Fragment>
                                                    }
                                                    <button className="reg-bttn" onClick={this.startGame}>Start Game</button>
                                                    
                                                </div>


                                        }
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
                            <h1 className="game-title">Game Of Dice</h1>
                                
                        </div>  


                        <div className="d-box4">

                            {this.state.loading?
                                <React.Fragment>
                                    <div className="result-grid">
                                        <div className="result-boxing">
                                            <div className="current-player">Current Player</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.whoseTurnNow}</div>
                                        </div>
                                        <div className="result-boxing">
                                            <div className="current-player">Face Up</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.resultTxtFaces}</div>
                                        </div>
                                        {this.state.resultTxtThrow &&
                                            <React.Fragment>
                                            <div className="result-boxing">
                                                <div className="current-player">Result ({this.state.scoreDeterminationThrow})</div> 
                                            </div>
                                            <div className="result-boxing">
                                                <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.resultTxtThrow}</div>
                                            </div>
                                            </React.Fragment>
                                        }
                                        <div className="result-boxing">
                                            <div className="next-player">Next Player</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content" style={{color: "rgba(0, 0, 0, 0)"}}>{this.state.whoseTurnNext}</div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className="result-grid">
                                        <div className="result-boxing">
                                            <div className="current-player">Current Player</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content">{this.state.whoseTurnNow}</div>
                                        </div>
                                        <div className="result-boxing">
                                            <div className="current-player">Face Up</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content">{this.state.resultTxtFaces}</div>
                                        </div>
                                        {this.state.resultTxtThrow &&
                                            <React.Fragment>
                                            <div className="result-boxing">
                                                <div className="current-player">Result ({this.state.scoreDeterminationThrow})</div> 
                                            </div>
                                            <div className="result-boxing">
                                                <div className="result-content">{this.state.resultTxtThrow}</div>
                                            </div>
                                            </React.Fragment>
                                        }
                                        <div className="result-boxing">
                                            <div className="next-player">Next Player</div> 
                                        </div>
                                        <div className="result-boxing">
                                            <div className="result-content">{this.state.whoseTurnNext}</div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                
                            }

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

                            <div className="d-box6">
                                <table className="keep-track-table">  
                                    <thead>
                                        <tr>
                                            <th>Player</th>
                                            <th>Score</th>
                                            <th>Winner</th>
                                            <th>Round</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.players.map((player, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{player.name}</td>
                                                        {(this.state.scoreDeterminationTotal === "manually")?
                                                            <td>
                                                                {/*<textarea name="text" className="scoreinput" wrap="soft"></textarea>*/}
                                                                <input type="text" className="scoreinput" placeholder="" />
                                                            </td>
                                                        :
                                                            <td>{player.score}</td>
                                                        }
                                                        {(this.state.winnerDetermination === "manually")?
                                                            <td className="winnerbutton" onClick={() => this.winnerButtonPressed(index)}>
                                                                {player["winnerButtonPressed"]?
                                                                    <Star
                                                                    winner={true}/>
                                                                     
                                                                    :
                                                                    <Star
                                                                    winner={false}/>
                                                                }
                                                                
                                                            </td>
                                                        :
                                                            <td>   
                                                                {player.winner &&
                                                                    <Star 
                                                                    winner={true}/>
                                                                }
                                                                {/*<td>{player.winner? ((player.roundsPlayed === 0)? "":"winner"):""}</td>*/}
                                                            </td>
                                                            
                                                        }
                                                        <td>{player.roundsPlayed}</td>
                                                    </tr>    
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>

                            <div className="d-box5">
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
                                <button className="reg-bttn" onClick={this.isEndMpg}>Start New Game</button>

                            </div>


                            </div>
     
                        </div> 


                        

                <Dialog
                    className={"dialog"} 
                    open={this.state.openDialog}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to exit the Game?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Exiting the Game will delete it.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeDialogStay} color="primary">
                        No, Stay in the Game.
                    </Button>
                    <Button onClick={this.closeDialogExit} color="primary" autoFocus>
                        Yes, Exit the Game.
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


export default GamesOfDice;




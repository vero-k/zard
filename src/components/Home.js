import React, { Component } from 'react';

import Sidebar from './Sidebar.js'

import plack from '../img/placks/plack1.png'

import alldice_throw from '../img/dice/alldice.gif'
import alldice_still from '../img/dice/alldice.png';


class Home extends Component{

    constructor(props){
        super(props);
        this.state = {

            loading: true,

            mouseCoordX: 0,
            mouseCoordY: 0,

            choice: "What's Your Choice",

        }
        this.homepic = React.createRef();
    }


    componentDidMount(){
        setTimeout(function(){
            this.setState({
                loading: false,
            })
        }.bind(this), 3600) // gif: 3 seconds 20 frames of 33.33 fps
    }



    updateMousePosition = event => {
        console.log("updatemouseposition");


        console.dir(event)
        console.dir(this.homepic)
        const { clientX, clientY } = event;
        const a = this.homepic.current.getBoundingClientRect();

        console.log(a);

        const x = clientX - a.left;
        const y = clientY - a.top;
        const width = this.homepic.current.clientWidth;
        const height = this.homepic.current.clientHeight;

        // make sure not 0 for nenner   
        // convert
        const zX = x * 1080 / width;
        const zY = y * 1080 / height;

        const ret = this.checkPos(zX, zY);

        this.setState({
            mouseCoordX: clientX - a.left,
            mouseCoordY: clientY - a.top,
            choice: ret[1],
            choicepath: ret[0],
        })
    }


    checkPos = (x, y) => {
        // convert 
        if(x > 20 && x < 240 && y > 110 && y < 320){
            return ["/customdice", "Custom Dice"];
        } else if(x > 600 && x < 800 && y > 420 && y < 650){
            return ["/20dice", "Standard 20 Sided Die"];
        } else if(x > 60 && x < 270 && y > 820 && y < 1050){
            return ["/4dice", "Standard 4 Sided Die"];
        } else if(x > 830 && x < 1020 && y > 40 && y < 220){
            return ["/gamesofdice", "Game Of Dice"];
        } else if(x > 250 && x < 380 && y > 190 && y < 340){
            return ["/8dice", "Standard 8 Sided Die"];
        } else if(x > 620 && x < 840 && y > 740 && y < 940){
            return ["/alignmentsdice", "Alignment Die"];
        } else if(x > 480 && x < 620 && y > 250 && y < 420){
            return ["/answersdice", "Answer Dice"];
        } else if(x > 100 && x < 300 && y > 450 && y < 620){
            return ["/10dice", "Standard 10 Sided Die"];
        } else if(x > 610 && x < 780 && y > 50 && y < 210){
            return ["/royaltydice", "Royalty Dice"];
        } else if(x > 820 && x < 1030 && y > 510 && y < 700){
            return ["/directionsdice", "Direction Dice"];
        } else if(x > 120 && x < 300 && y > 660 && y < 840){
            return ["/6dice", "Standard 6 Sided Die"];
        } else if(x > 320 && x < 540 && y > 420 && y < 630){
            return ["/emotionsdice", "Emotion Dice"];
        } else if(x > 840 && x < 1020 && y > 880 && y < 1050){
            return ["/mathdice", "Math Dice"];
        } else if(x > 340 && x < 520 && y > 720 && y < 910){
            return ["/runesdice", "Rune Dice"];
        } else if(x > 820 && x < 1020 && y > 260 && y < 460){
            return ["/12dice", "Standard 12 Sided Die"];
        } else{
            return ["/", "What's Your Choice"];
        }
    }


    handleClick = () => {

        if(this.state.choice !== "What's Your Choice"){
            this.props.history.push(this.state.choicepath)
        }
    }



    render(){
        
        return(
            <React.Fragment>

                <div className='main-part'>
                    <div className="bg-middle"></div>

                    <div className="d-wrapper-main">
                    <div className="d-box0" ref={this.testref}>
                        <img className="plack" src={plack} />
                        <h1 className={`game-title`}>{this.state.choice}</h1>      
                    </div>  


                    <div className="d-box4">
                        {this.state.loading?
                            
                            <img src={alldice_throw} className={`home-die`}/>
                            :
                            
                            <img ref={this.homepic} src={alldice_still} 
                            className={`home-die ${(this.state.choice === "What's Your Choice")? "":"homepointer"}`} 
                            onMouseMove={this.updateMousePosition} onClick={this.handleClick}/> 
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

export default Home;
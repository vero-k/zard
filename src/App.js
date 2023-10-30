import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

import About from './components/About';
import Contact from './components/Contact';

import Dice from './components/Dice.js';
import CustomDice from './components/CustomDice.js';
import GamesOfDice from './components/GamesOfDice.js';
import MixedDice from './components/MixedDice.js';


import './styles/styles.css';
import './styles/stylesSideBar.css';
import './styles/stylesDice.css';
import "./styles/stylesCustomList.css";




class App extends Component{

  constructor(props){
    super(props);
    this.state = {
        showSideBar: false,
    }
  }

  moveSidebar = () => {
    this.setState(prevState => {
        return {showSideBar: !prevState.showSideBar};
    });
  }



  render(){
      return(
      <Router>

          <div className="uber">
          

          <Header 
              moveSidebar={this.moveSidebar}
              showSideBar={this.state.showSideBar}
          /> 

          <Switch>

          
          <Route exact path='/' render={ (props) => 
              <Home 
              {...props} 
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              /> 
          } />
          

          
          <Route exact path='/gamesofdice' render={ (props) => 
              <GamesOfDice
              {...props} 
              gameTitle={"GAMES OF DICE"}
              gameSubTitle1={"Toss the Die             "}
              gameSubTitle2={"Wait...                  "}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={-1}
              specialtype={""}
              /> 
          } />


          <Route exact path='/customdice' render={ (props) => 
              <CustomDice 
              {...props} 
              gameTitle={"CUSTOM DICE"}
              gameSubTitle0={"Put together a custom die"}
              gameSubTitle1={"Toss the Die             "}
              gameSubTitle2={"Wait...                  "}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={-1}
              specialtype={""}
              /> 
          } />


          <Route exact path='/mixeddice' render={ (props) => 
              <MixedDice 
              {...props} 
              gameTitle={"MIXED DICE"}
              gameSubTitle1={"Toss the Dice"}
              gameSubTitle2={"Wait...     "}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={-1}
              specialtype={""}
              /> 
          } />

          <Route exact path='/4dice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"4 SIDED DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait...     "}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={4}
              specialtype={"4"}
              /> 
          } />

          <Route exact path='/6dice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"6 SIDED DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait...     "}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={6}
              specialtype={"6"}
              /> 
          } />
          

          <Route exact path='/8dice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"8 SIDED DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={8}
              specialtype={"8"}
              /> 
          } />


          <Route exact path='/10dice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"10 SIDED DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={10}
              specialtype={"10"}
              /> 
          } />


          <Route exact path='/12dice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"12 SIDED DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={12}
              specialtype={"12"}
              /> 
          } />


          <Route exact path='/20dice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"20 SIDED DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={20}
              specialtype={"20"}
              /> 
          } />

          <Route exact path='/answersdice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"ANSWER DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={8}
              specialtype={"answers"}
              /> 
          } />


          <Route exact path='/alignmentsdice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"ALIGNMENTS DICE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={10}
              specialtype={"alignments"}
              /> 
          } />
          

          <Route exact path='/directionsdice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"DIRECTION DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={6}
              specialtype={"directions"}
              /> 
          } />


          <Route exact path='/mathdice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"MATH DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={4}
              specialtype={"math"}
              /> 
          } />



          <Route exact path='/royaltydice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"ROYALTY DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={10}
              specialtype={"royalty"}
              /> 
          } />

          
          <Route exact path='/emotionsdice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"EMOTION DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={6}
              specialtype={"emotions"}
              /> 
          } />


          <Route exact path='/runesdice' render={ (props) => 
              <Dice 
              {...props} 
              gameTitle={"RUNES DIE"}
              gameSubTitle1={"Toss the Die"}
              gameSubTitle2={"Wait..."}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              numberSides={20}
              specialtype={"runes"}
              /> 
          } />

          <Route exact path='/about' render={ (props) => 
              <About
              {...props} 
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              />
          } />

          <Route exact path='/contact' render={ (props) => 
              <Contact 
              {...props} 
              title={"Contact"}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              />
          } />

          <Route exact path='/feedback' render={ (props) => 
              <Contact 
              {...props} 
              title={"Feedback"}
              showSideBar={this.state.showSideBar}
              moveSidebar={this.moveSidebar}
              />
          } />

          
          </Switch>

          
          <Footer 
              showSideBar={this.state.showSideBar}
          />
          
          
          </div>

      </Router>
      );
  }
}


export default App;

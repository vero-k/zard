import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ZardIcon2 from '../img/logo/ZardIcon2';

// uses import '../css/stylesSideBar.css';


class Sidebar extends Component {

    constructor(){
        super();
        
        this.state = {
        }
    }

    closeSideBar = (event) => {
        this.props.moveSidebar();
    }



    render(){

            return(
                <div className="search-bar">
                    <a href="#" className="btn-close-sidebar" onClick={this.closeSideBar}>&times;</a>
                    <div className="logo">
                        <ZardIcon2 className="logo-header"/>
                    </div>


                    <Link className="sb-link" to="/" onClick={this.closeSideBar}>
                    <div className="sb-section-special">
                        Home
                    </div>
                    </Link>
                    
                    <Link className="sb-link" to="/about" onClick={this.closeSideBar}>
                    <div className="sb-section-special">
                        About
                    </div>
                    </Link>

                    <Link to="/gamesofdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                            Games Of Dice
                    </div>
                    </Link>

                    <Link to="/customdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                            Custom Dice
                    </div>
                    </Link>

                    <Link to="/mixeddice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Mixed Dice
                    </div>
                    </Link>

                    <Link to="/4dice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Standard 4 Sided Die
                    </div>
                    </Link>

                    <Link to="/6dice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Standard 6 Sided Die
                    </div>
                    </Link>


                    <Link to="/8dice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Standard 8 Sided Die
                    </div>
                    </Link>

                    <Link to="10dice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Standard 10 Sided Die
                    </div>
                    </Link>


                    <Link to="/12dice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Standard 12 Sided Die
                    </div>
                    </Link>

                    <Link to="/20dice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Standard 20 Sided Die
                    </div>
                    </Link>


                    <Link to="/answersdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Answer Die
                    </div>
                    </Link>

                    <Link to="/alignmentsdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Alignment Die
                    </div>
                    </Link>

                    <Link to="/directionsdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Direction Die
                    </div>
                    </Link>


                    <Link to="/mathdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Math Die
                    </div>
                    </Link>

                    <Link to="/royaltydice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Royalty Die
                    </div>
                    </Link>

                    <Link to="/emotionsdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Emotions Die
                    </div>
                    </Link>

                    <Link to="/runesdice" className="sb-link" onClick={this.closeSideBar}>
                    <div className="sb-section">
                                Runes Die
                            </div>
                    </Link>

                    <Link className="sb-link" to="/contact" onClick={this.closeSideBar}>
                    <div className="sb-section-special">
                        Contact Us
                    </div>
                    </Link>

                    <Link className="sb-link" to="/feedback" onClick={this.closeSideBar}>
                    <div className="sb-section-special">
                        Feedback
                    </div>
                    </Link>
                </div>
            );
    } 
}

export default Sidebar;
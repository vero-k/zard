import React, { Component } from 'react';
import Sidebar from './Sidebar.js';

import plack from '../img/placks/plack1.png'

class About extends Component {

    render(){

        return(
            <React.Fragment>
                    
                <div className='main-part'>

                    <div className="bg-middle"></div>
                    <div className="d-wrapper-main">
                        <div></div>
                        <div className="d-box0" ref={this.testref}>
                            <img className="plack" src={plack} />   
                            <h1 className={`game-title tracking-in-expand-fwd`}>About ZarD</h1>
                                
                        </div>  
                        <div></div>
                        <div className="d-box4">
                           <p></p>

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
    }
}

export default About;
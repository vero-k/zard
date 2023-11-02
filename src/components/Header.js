import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ZardIcon2 from '../img/logo/ZardIcon2';


class Header extends Component{

    openSideBar = (event) => {
        event.preventDefault();
        this.props.moveSidebar();
    }


    render(){

        const sideBar = this.props.showSideBar? 'header-pos' : '';

        return(
            <div className={`header ${sideBar}`}>

                {<div className="header-upper-bar">
                    <div>
                        <ZardIcon2 className="logo-header"/>
                    </div>
                    <div className="navbar-nav">
                        <NavLink className="navbar-link" to="/">HOME</NavLink>
                    </div>
                </div>}
                

                <div className={"header-lower-bar"}>
                    
                </div>


                {!this.props.showSideBar  &&
                            <a className="open-slide" href="" onClick={this.openSideBar}>
                                <svg width="30" height="30">
                                    <path d="M0,5 32,5" stroke="rgb(222, 219, 223)" strokeWidth="4" />
                                    <path d="M0,14 32,14" stroke="rgb(222, 219, 223)" strokeWidth="4" />
                                    <path d="M0,23 32,23" stroke="rgb(222, 219, 223)" strokeWidth="4" />
                                </svg>
                            </a>
                }
            </div>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Footer extends Component{
    
    render(){

        if(this.props.showSideBar){
            return(
                <div className={`footer footer-pos`}>
                </div>
            )
            
        } else {
        return(
            <div className={`footer`}>
                
                <div className="container-footer">
                    <div className="">
                        <div className="">
                            <span>Copyright © 2021, All Right Reserved VK</span>
                        </div>
                    </div>
                    <div></div>
                    <div className="">
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link to="/feedback">Feedback</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    

                </div>
            </div>
    );
        }
    }
}

export default Footer;
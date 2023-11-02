import React, {Component} from 'react';
import Sidebar from './Sidebar.js';

//import axios from 'axios';
import plack from '../img/placks/plack1.png'

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



var firebaseConfig = {
    apiKey: "AIzaSyDqQsVbeSXHmIpbcHs7IUGgJiTBF57_M74",
    authDomain: "zard-73c3c.firebaseapp.com",
    projectId: "zard-73c3c",
    storageBucket: "zard-73c3c.appspot.com",
    messagingSenderId: "957888569103",
    appId: "1:957888569103:web:aecc60ba52c16a50b3e87a",
    measurementId: "G-BZFHST9JVB"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            formsent : false,

            emptySubject: false,
            emptyEmail: false,
            emptyIssue: false,

            notEmail: false,
        }
    }

    contactdata = {
        subject: '',
        email: '',
        issue: '',
    };

    

    captureInput = (field, event) => {
        this.contactdata[field] = event.target.value;
    }

    captureEmail = (event) => {
        const data = event.target.value;
        if(this.validateEmail(event.target.value)){
            this.contactdata["email"] = event.target.value;
            this.setState({
                notEmail: false,
            })
        } else {
            this.contactdata["email"] = event.target.value;
            this.setState({
                notEmail: true,
            })
        }
    }

    validateEmail = (string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(string);
    }

    sendForm = async (event) => {
        event.preventDefault();
        
        // check if email valid
        if(this.setState.notEmail){
            return;
        }

        // check if any empty fields
        if(!this.contactdata.subject){
            this.setState({
                emptySubject: true,
            })
            return;
        } else {
            this.setState({
                emptySubject: false,
            })
        }
        if(!this.contactdata.email){
            this.setState({
                emptyEmail: true,
            })
            return;
        } else {
            this.setState({
                emptyEmail: false,
            })
        }
        if(!this.contactdata.issue){
            this.setState({
                emptyIssue: true,
            })
            return;
        } else {
            this.setState({
                emptyIssue: false,
            })
        }

        if(this.state.notEmail){
            return;
        } 


        db.collection('contacts').add({
            subject: this.contactdata.subject,
            email: this.contactdata.email,
            issue: this.contactdata.issue,

        })
        .then(() => {
            console.log("message sent")
        })
        .catch((error) => {
            console.log("error")
        })

        /*
        await fetch(`http://localhost:5000/${this.props.title.toLowerCase()}`, {
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.contactdata)
        })
        .then(res => {
            console.log("success")
        })
        .catch(err => {
            console.log("error error error")
        })

        
        axios({
            method: 'post',
            url: 'http://localhost:5000/feedback',
            data: JSON.stringify(this.contactdata),
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => {
            console.log("success")
        })
        .catch(err => {
            console.log("error error error")
        })
        */

       this.contactdata = {
            subject: '',
            email: '',
            issue: '',
        };

        this.setState({
            formsent: true,

            emptySubject: false,
            emptyEmail: false,
            emptyIssue: false,

            notEmail: false,
        })

    }



    newContact = () => {
        this.setState({
            formsent: false,
        })
    }

        
    render(){
        if(this.state.formsent){
            return(
            <React.Fragment>
                

                <div className='main-part'>
                    <div className="bg-middle"></div>
                    <div className="d-wrapper-main">
                        <div className="d-box0" ref={this.testref}>
                            <img alt="plack" className="plack" src={plack} />
                            <h1 className={`game-title`}>{this.props.title}</h1>
                        </div>  
                        <div className="d-box4 feedbackstructure">
                                <button className="reg-bttn" onClick={this.newContact}>New {this.props.title}</button>
                            
                        </div>
                        
                    </div>
                </div>

                {this.props.showSideBar &&
                    <Sidebar 
                        showSideBar={this.props.showSideBar}
                        moveSidebar={this.props.moveSidebar}
                    />
                }
            </React.Fragment>);
        } else {
        return(
            <React.Fragment>
                
                <div className='main-part'>
                    <div className="bg-middle"></div>
                    <div className="d-wrapper-main">
                        <div className="d-box0" ref={this.testref}>
                            <img className="plack" src={plack} />
                            <h1 className={`game-title`}>{this.props.title}</h1>
                                
                        </div>  
                        <div className="d-box4 feedbackstructure">
                            <form className="feedbackgrid">
                                <div>
                                    <label for="subject">Subject</label>
                                    <input name="subject" className="reg-input" type="text" placeholder="" onChange={(e) => this.captureInput("subject", e)}/>
                                    {this.state.emptySubject &&
                                            <React.Fragment>
                                                <p></p>
                                                <p className="error-message-form">Enter a Subject</p>
                                            </React.Fragment>
                                    }
                                </div>

                                <div>
                                <label for="email">E-mail</label>
                                <input name="email" className="reg-input" type="text" placeholder="" onChange={(e) => this.captureEmail(e)}/>
                                {this.state.emptyEmail &&
                                        <React.Fragment>
                                            <p></p>
                                            <p className="error-message-form">Enter an E-mail</p>
                                        </React.Fragment>
                                }
                                {this.state.notEmail &&
                                        <React.Fragment>
                                            <p></p>
                                            <p className="error-message-form">Not valid E-mail</p>
                                        </React.Fragment>
                                }
                                </div>
                                <div>
                                <label for="feedback">{this.props.title}</label>
                                <textarea name="feedback" className="reg-textarea" type="text" onChange={(e) => this.captureInput("issue", e)}></textarea>
                                {this.state.emptyFeedback &&
                                        <React.Fragment>
                                            <p></p>
                                            <p className="error-message-form">Do not leave empty.</p>
                                        </React.Fragment>
                                }
                                </div>
                                
                            </form>
                            <div></div>
                            <button className="reg-bttn" onClick={(e) => this.sendForm(e)}>Send</button>
                            
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

export default Contact;
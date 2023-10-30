import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SMShare extends Component {

    handleCloseShareBox = () => {
        this.props.closeShareBox();
    }


    render(){
        const sideBar = this.props.showSideBar? 'sm-share-box-moved':'';
        return(
            <React.Fragment>
                <div className="sm-share-page-box">
                    <a className={"btn-close-share-box"} onClick={this.handleCloseShareBox}>&times;</a>
                    <div className={`sm-share-box ${sideBar}`}>
                        <div>
                            <a>Share on Twitter</a>
                        </div>
                        <div>
                            <a>Share on Instagram</a>
                        </div>
                        <div>
                            <a>Share on Facebook</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SMShare;
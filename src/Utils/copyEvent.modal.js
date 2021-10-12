import React, { Component } from 'react';
import Modal from "react-modal";
import '../App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: '700px',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        padding:'30px 40px 35px 40px',
    }
};

const CopyEventModal = (props) => {
    return (
        
        <Modal
            isOpen={props.isModalOpen}
            onRequestClose={props.handleModalFun}
            style={customStyles}
            contentLabel="Copy Event"
        >
            <div className="modalContentArea cpyevntpopmain">
                <p>Please provide Domain Name for New Event</p>
                <div className="cpyevntpopmaininptoutr d-flex align-items-center">
                <label>Domain Name</label>
                <div className="cpyinputwrap">
                <input type="text" name="domain_name" onChange={props.handleOnChange}/><span class="dm-d">.illusnap.com</span><br />
                <span>{props.errorStatus ? `Error: ${props.errorStatus}`: null}</span>
                </div>
                </div>
                
            </div>
            <div className="modalBtnArea cpybtnwrap">
                <button onClick={props.handleModalClose} className="modalCloseBtn cpydltnbtn">Cancel</button>
                <button className="cpycntnbtn"
                    onClick={props.handleContinue} 
                    className="modalContinueBtn"
                >Continue</button>
            </div>
        </Modal>
       

    )
}

export default CopyEventModal;
import React, { Component } from 'react';
import Modal from "react-modal";
import '../App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: '450px',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        padding:'30px 40px 35px 40px',
    }
};

const InfoModal = (props) => {
    return (
        <Modal
            isOpen={props.isModalOpen}
            style={customStyles}
            contentLabel="Subscription"
        >
            <div className="modalContentArea dltevtnmdlwrap">
                <h4>Subscription!!!</h4>
                <p>Please subscribe to our plan first?</p>
            </div>
            <div className="modalBtnArea cpybtnwrap">
                {/* <button onClick={props.handleModalClose} className="modalCloseBtn cpydltnbtn">Cancel</button> */}
                <button className="cpycntnbtn"
                    onClick={props.handleLink}
                    className="modalContinueBtn"
                >Continue</button>
            </div>
        </Modal>
    )
}

export default InfoModal;
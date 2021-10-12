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
            onRequestClose={props.handleModalClose}
            style={customStyles}
            contentLabel="Delete Event"
        >
            <div className="modalContentArea dltevtnmdlwrap">
                <h4>Wait!!!</h4>
                <p>Do you really want to terminate this event?</p>
            </div>
            <div className="modalBtnArea cpybtnwrap">
                <button onClick={props.handleModalClose} className="modalCloseBtn cpydltnbtn">Cancel</button>
                <button className="cpycntnbtn"
                    onClick={props.handleDelete}
                    className="modalContinueBtn"
                >Continue</button>
            </div>
        </Modal>
    )
}

export default InfoModal;
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function DetailsModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.card?.cardName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.card ?
                    <>
                        <p>Name      : {props.card.cardName}</p>
                        <p>Status    : {props.card.status}</p>
                        <p>Card Code : {props.card.cardCode}</p>
                        <p>Gender    : {props.card.gender}</p>
                        <p>benefitsDetails</p>
                        <div>
                            {
                                props.card.benefitsDetails.map((bene, idx) => {
                                    return <p key={idx}>{idx}.{bene.name}</p>;
                                })
                            }
                        </div>
                    </> : ""}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailsModal;

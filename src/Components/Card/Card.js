import React, { useState } from 'react';
import DetailsModal from '../Modal/Modal';
import './Card.css';

function Card(props) {

    const [show, setShow] = useState(false);
    const [cardData, setCardData] = useState();

    const handleOpen = (card) => {
        setShow(true);
        setCardData(card);
    }
    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <div className="container">
                {
                    props.cardList ? props.cardList.map((card) => {
                        return (
                            <div className="card" key={card.cardCode} onClick={() => handleOpen(card)}>
                                <p>Name   : {card.cardName}</p>
                                <p>Status : {card.status}</p>
                                <p>Gender : {card.gender}</p>
                            </div>
                        );
                    }) : ""
                }
            </div>
            <DetailsModal show={show} handleClose={handleClose} card={cardData} />
        </>
    )

}
export default Card;
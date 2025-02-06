import axios from 'axios';
import { useState, useEffect } from 'react';

import Spinner from '../../assets/spinner'

import './cards.scss';


interface ICards {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}

const Cards = () => {
    const [data, setData] = useState<ICards[]>([]);
    const [loading, setLoading] = useState(false)
    const [activeModal, setActiveModal] = useState(false);

    const fetchCards = async () => {
        try {
            setLoading(true)
            const response = await axios.get<ICards[]>("http://localhost:3000/seminars");
            setLoading(false)
            setData(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCards()
    }, [])

    const modal = activeModal ? (<div className="modal-overlay" onClick={(e) => {
        if (e.target === e.currentTarget) {
            setActiveModal(false);
        }
    }}>
        <div className="modal-content">
            <span className="close" onClick={() => setActiveModal(false)}>&times;</span>
            <p>Подтвердите удаление</p>
            <button className="cancel-btn" onClick={() => setActiveModal(false)}>Отмена</button>
            <button className="confirm-btn">Подтвердить</button>
        </div>
    </div>) : null;
    const spinner = loading ? <Spinner /> : null;
    const cards = data.length > 0 ? (
        data.map(item => (
            <div className="wrapper" key={item.id}>
                <img className="photo" src={item.photo} alt={item.title} />
                <div className="flex-wrap">
                    <h2 className="title">{item.title}</h2>
                    <div className="desr">{item.description}</div>
                    <button className="edit-btn">Редактировать</button>
                    <button className="delete-btn" onClick={() => setActiveModal(true)}>Удалить</button>
                </div>
            </div>
        ))
    ) : null;

    return (
        <>
            {spinner}
            <div className="container" >
                {spinner}
                {cards}
                {modal}
            </div >
        </>
    )
}
export default Cards;
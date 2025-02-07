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
    const [activeEditor, setActiveEditor] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [titleText, setTitleText] = useState<string>("");
    const [descrText, setDescrText] = useState<string>("");
    const [imgLink, setImgLink] = useState<string>("")
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].slice(0, 5);

    // фунция для получения карточек с сервера
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

    // функция для удаления карточек
    const deleteCard = async (id: number | null) => {
        setActiveModal(false);
        try {
            await axios.delete(`http://localhost:3000/seminars/${id}`);
            console.log('Deleted successfully');
            setData(prevData => prevData.filter(card => card.id !== id));
        } catch (error) {
            console.error('Error', error);
        }
    };

    // функция для редактирования карточек
    const editCard = async (id: number | null) => {
        setActiveEditor(false);
        try {
            const response = await axios.put(`http://localhost:3000/seminars/${id}`, {
                id: selectedId,
                title: titleText,
                description: descrText,
                date: date,
                time: time,
                photo: imgLink
            });
            console.log("Обновлено:", response.data);
            fetchCards()
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    };

    // вызов функции для получения карточек с сервера при первом рендере
    useEffect(() => {
        fetchCards()
    }, [])

    // рендер модалки 
    const modal = activeModal ?
        (<div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) {
                setActiveModal(false);
            }
        }}>
            <div className="modal-content">
                <span className="close" onClick={() => setActiveModal(false)}>&times;</span>
                <p>Подтвердите действие</p>
                <button className="cancel-btn" onClick={() => setActiveModal(false)}>Отмена</button>
                <button className="confirm-btn" onClick={() => deleteCard(selectedId)}>Удалить</button>
            </div>
        </div>) : null;
    // рендер модалки редактирования
    const editor = activeEditor ?
        (<div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) {
                setActiveEditor(false);
            }
        }}>
            <div className="modal-content">
                <span className="close" onClick={() => setActiveEditor(false)}>&times;</span>
                <div className="flex-wrap">
                    <div className="img-wrap">
                        <label htmlFor="img">Поменять изображение:</label>
                        <input
                            id="img"
                            type="text"
                            className="img-input"
                            value={imgLink}
                            onChange={(e) => setImgLink(e.target.value)}
                            placeholder="Вставьте ссылку..."
                        />
                    </div>
                    <div className="text-wrap">
                        <label htmlFor="title">Редактировать заголовок:</label>
                        <input
                            id="title"
                            className="title-input"
                            type="text"
                            value={titleText}
                            onChange={(e) => setTitleText(e.target.value)}
                            placeholder="Введите текст..."
                        />
                        <label htmlFor="descr">Редактировать описание:</label>
                        <textarea
                            id="descr"
                            className="descr-text"
                            value={descrText}
                            onChange={(e) => setDescrText(e.target.value)}
                            placeholder="Введите текст..."
                        />
                    </div>
                </div>
                <button className="cancel-btn" onClick={() => setActiveEditor(false)}>Отмена</button>
                <button className="confirm-btn" onClick={() => editCard(selectedId)}>Подтвердить</button>
            </div>
        </div>) : null;
    // рендер спиннера
    const spinner = loading ? <Spinner /> : null;
    // рендер карточек
    const cards = data.length > 0 ? (
        data.map(item => (
            <div className="wrapper" key={item.id}>
                <img className="photo" src={item.photo} alt={item.title} />
                <div className="flex-wrap">
                    <h2 className="title">{item.title}</h2>
                    <div className="desr">{item.description.length > 90 ? item.description.slice(0, 90) + '...' : item.description}</div>
                    <button className="edit-btn" onClick={() => { setActiveEditor(true); setTitleText(item.title); setDescrText(item.description); setImgLink(item.photo); setSelectedId(item.id) }}>Редактировать</button>
                    <button className="delete-btn" onClick={() => { setActiveModal(true); setSelectedId(item.id) }}>Удалить</button>
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
                {editor}
            </div >
        </>
    )
}
export default Cards;
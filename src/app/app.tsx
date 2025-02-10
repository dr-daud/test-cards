import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ICards } from '../types/types';
import Card from '../components/card/card';
import Modal from '../components/modal/modal';
import Editor from '../components/editor/editor'
import Spinner from '../assets/spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

import './app.css';

const App = () => {
    const [data, setData] = useState<ICards[]>([]);
    const [loading, setLoading] = useState(false)
    const [activeModal, setActiveModal] = useState(false);
    const [activeEditor, setActiveEditor] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [titleText, setTitleText] = useState("");
    const [descrText, setDescrText] = useState("");
    const [imgLink, setImgLink] = useState("")
    const [error, setError] = useState(false);

    // фунция для получения карточек с сервера
    const fetchCards = async () => {
        try {
            setError(false)
            setLoading(true)
            const response = await axios.get<ICards[]>("http://localhost:3000/seminars");
            setLoading(false)
            setData(response.data);
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    // функция для удаления карточек
    const deleteCard = async (id: number | null) => {
        setActiveModal(false);
        try {
            await axios.delete(`http://localhost:3000/seminars/${id}`);
            setData(prevData => prevData.filter(card => card.id !== id));
            toast.success('Карточка успешно удалена!')
        } catch (error) {
            toast.error('Не удалось удалить карточку')
        }
    };

    // функция для редактирования карточек
    const editCard = async (id: number | null) => {
        setActiveEditor(false);
        const currentCard = data.find(card => card.id === id);
        if (!currentCard) return;

        const updatedData: Partial<ICards> = {};

        if (currentCard.title !== titleText) updatedData.title = titleText;
        if (currentCard.description !== descrText) updatedData.description = descrText;
        if (currentCard.photo !== imgLink) updatedData.photo = imgLink;

        // проверка на редактирование карточки
        if (Object.keys(updatedData).length === 0) {
            toast.info("Изменений нет, запрос не отправлен");
            // если карточка не редактировалась, запрос не отправляется
            return;
        }

        try {
            await axios.patch(`http://localhost:3000/seminars/${id}`, updatedData);
            fetchCards();
            toast.success('Карточка успешно обновлена!');
        } catch (error) {
            toast.error('Не удалось отредактировать карточку')
        }
    };

    // вызов функции для получения карточек с сервера при первом рендере
    useEffect(() => {
        fetchCards()
    }, [])

    return (
        <>
            {error ? <ErrorMessage /> : null}
            {loading ? <Spinner /> : null}
            <ToastContainer
                position="top-center"
                autoClose={3000} />
            <div className="container" >
                {data.length > 0 ? (
                    data.map(item => (
                        <Card
                            key={item.id}
                            item={item}
                            setActiveEditor={setActiveEditor}
                            setSelectedId={setSelectedId}
                            setTitleText={setTitleText}
                            setDescrText={setDescrText}
                            setImgLink={setImgLink}
                            setActiveModal={setActiveModal}
                        />
                    ))
                ) : null}

                {activeModal ?
                    <Modal
                        setActiveModal={setActiveModal}
                        selectedId={selectedId}
                        deleteCard={deleteCard}
                    /> : null}
                {activeEditor ?
                    <Editor
                        setActiveEditor={setActiveEditor}
                        imgLink={imgLink}
                        setImgLink={setImgLink}
                        titleText={titleText}
                        setTitleText={setTitleText}
                        descrText={descrText}
                        setDescrText={setDescrText}
                        editCard={editCard}
                        selectedId={selectedId}
                    />
                    : null}
            </div >
        </>
    )
}
export default App;

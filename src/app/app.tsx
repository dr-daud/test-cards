import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IEditorState, ICards, IModalState } from '../types/types';
import Card from '../components/card/card';
import Modal from '../components/modal/modal';
import Editor from '../components/editor/editor'
import Spinner from '../assets/spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

import './app.css';

const API_URL = "http://localhost:3000/seminars";

const App = () => {
    const [data, setData] = useState<ICards[]>([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [modal, setModal] = useState<IModalState>({ active: false, id: null });
    const [editor, setEditor] = useState<IEditorState>({ active: false, id: null, title: "", description: "", photo: "" });

    // вызов функции для получения карточек с сервера при первом рендере
    useEffect(() => {
        fetchCards()
    }, [])

    // фунция для получения карточек с сервера
    const fetchCards = async () => {
        try {
            setError(false)
            setLoading(true)
            const response = await axios.get<ICards[]>(API_URL);
            setData(response.data);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    // функция для удаления карточек
    const deleteCard = async (id: number | null) => {
        setModal(prev => ({ ...prev, active: false }));
        try {
            await axios.delete(`${API_URL}/${id}`);
            setData(data.filter(card => card.id !== modal.id));
            toast.success('Карточка успешно удалена!')
        } catch (error) {
            toast.error('Не удалось удалить карточку')
        }
    };

    // функция для редактирования карточек
    const editCard = async (id: number | null) => {
        const { title, description, photo } = editor;

        setEditor(prev => ({ ...prev, active: false }))
        const currentCard = data.find(card => card.id === id);
        if (!currentCard) return;

        // проверка на редактирование, если изменений не было, запрос не выполняется
        const updatedData: Partial<ICards> = {};
        if (currentCard.title !== title) updatedData.title = title;
        if (currentCard.description !== description) updatedData.description = description;
        if (currentCard.photo !== photo) updatedData.photo = photo;

        if (Object.keys(updatedData).length === 0) {
            toast.info("Изменений нет, запрос не отправлен");
            return;
        }

        try {
            await axios.patch(`${API_URL}/${id}`, updatedData);
            fetchCards();
            toast.success('Карточка успешно обновлена!');
        } catch {
            toast.error('Не удалось отредактировать карточку');
        }
    };

    return (
        <>
            {/* вывод ошибки в случае возникновения проблем с сервером */}
            {error && <ErrorMessage />}
            {/* загрузка */}
            {loading && <div style={{ marginTop: '200px' }}><Spinner /></div>}
            <ToastContainer
                position="top-center"
                autoClose={3000} />
            <div className="container" >
                {data.map(item => (
                    <Card
                        item={item}
                        setEditor={setEditor}
                        setModal={setModal}
                    />
                ))
                }
                {modal.active &&
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        deleteCard={deleteCard}
                    />}
                {editor.active &&
                    <Editor
                        editor={editor}
                        setEditor={setEditor}
                        editCard={editCard}
                    />}
            </div >
        </>
    )
}
export default App;

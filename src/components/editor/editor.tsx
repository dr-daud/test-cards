import { IEditorProps } from '../../types/types'

import './editor.scss'

const Editor = (props: IEditorProps) => {
    const { editor, setEditor, editCard } = props
    return (
        <div className="modal-overlay" onClick={(e) => {
            // закрытие по клику на подложку
            if (e.target === e.currentTarget) {
                setEditor(prev => ({ ...prev, active: false }));
            }
        }}>
            <div className="modal-content">
                <span className="close" onClick={() => setEditor(prev => ({ ...prev, active: false }))}>&times;</span>
                <div className="flex-wrap">
                    <div className="img-wrap">
                        <label htmlFor="img">Поменять изображение:</label>
                        <input
                            id="img"
                            type="text"
                            className="img-input"
                            value={editor.photo}
                            onChange={(e) => setEditor(prev => ({ ...prev, photo: e.target.value }))}
                            placeholder="Вставьте ссылку..."
                        />
                    </div>
                    <div className="text-wrap">
                        <label htmlFor="title">Редактировать заголовок:</label>
                        <input
                            id="title"
                            className="title-input"
                            type="text"
                            value={editor.title}
                            onChange={(e) => setEditor(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Введите текст..."
                        />
                        <label htmlFor="descr">Редактировать описание:</label>
                        <textarea
                            id="descr"
                            className="descr-text"
                            value={editor.description}
                            onChange={(e) => setEditor(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Введите текст..."
                        />
                    </div>
                </div>
                <button className="cancel-btn" onClick={() => setEditor(prev => ({ ...prev, active: false }))}>Отмена</button>
                <button className="confirm-btn" onClick={() => editCard(editor.id)}>Подтвердить</button>
            </div>
        </div>
    )
}
export default Editor
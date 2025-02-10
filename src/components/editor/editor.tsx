import { IEditorProps } from '../../types/types'

import './editor.scss'

const Editor = (props: IEditorProps) => {
    const { setActiveEditor, imgLink, setImgLink, titleText, setTitleText, descrText,
        setDescrText, editCard, selectedId
    } = props
    return (
        <div className="modal-overlay" onClick={(e) => {
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
        </div>
    )
}
export default Editor
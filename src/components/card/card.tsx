import { useState } from 'react'

import Spinner from '../../assets/spinner'
import { ICardProps } from '../../types/types'

import './card.scss'


const Card = (props: ICardProps) => {
    const { item, setModal, setEditor } = props
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="wrapper" key={item.id}>
            <div className="photo-container">
                {/* спиннер во время загрузки фото */}
                {isLoading && <Spinner />}
                <img
                    className={`photo ${isLoading ? "hidden" : ""}`} // прячем изображение, пока оно загружается
                    src={item.photo}
                    alt={item.title}
                    onLoad={() => setIsLoading(false)} // убираем загрузку, когда изображение загружено
                    onError={() => setIsLoading(false)}
                />
            </div>
            <div className="flex-wrap">
                <h2 className="title">{item.title}</h2>
                <div className="desr">{item.description.length > 90 ? item.description.slice(0, 90) + '...' : item.description}</div>
                <button className="edit-btn" onClick={() => { setEditor(prev => ({ ...prev, active: true, id: item.id, title: item.title, description: item.description, photo: item.photo })) }}>Редактировать</button>
                <button className="delete-btn" onClick={() => { setModal(prev => ({ ...prev, active: true, id: item.id })) }}>Удалить</button>
            </div>
        </div>
    )
}
export default Card;
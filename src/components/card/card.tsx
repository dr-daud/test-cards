import { ICardProps } from '../../types/types'

import './card.scss'


const Card = (props: ICardProps) => {
    const {item, setActiveEditor, setSelectedId, setTitleText, setDescrText, setImgLink, setActiveModal} = props
    return (
        <div className="wrapper" key={item.id}>
            <img className="photo" src={item.photo} alt={item.title} />
            <div className="flex-wrap">
                <h2 className="title">{item.title}</h2>
                <div className="desr">{item.description.length > 90 ? item.description.slice(0, 90) + '...' : item.description}</div>
                <button className="edit-btn" onClick={() => { setActiveEditor(true); setTitleText(item.title); setDescrText(item.description); setImgLink(item.photo); setSelectedId(item.id) }}>Редактировать</button>
                <button className="delete-btn" onClick={() => { setActiveModal(true); setSelectedId(item.id) }}>Удалить</button>
            </div>
        </div>
    )
}
export default Card;
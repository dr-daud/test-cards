import {IModalProps} from '../../types/types'

import './modal.scss';

const Modal = (props: IModalProps) => {
    const { setActiveModal, selectedId, deleteCard } = props;   
    return (
        <div className="modal-overlay" onClick={(e) => {
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
        </div>
    )
}
export default Modal
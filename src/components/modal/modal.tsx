import { IModalProps } from '../../types/types'

import './modal.scss';

const Modal = (props: IModalProps) => {
    const { modal, setModal, deleteCard } = props;
    return (
        <div className="modal-overlay" onClick={(e) => {
            // закрытие по клику на подложку
            if (e.target === e.currentTarget) {
                setModal(prev => ({ ...prev, active: false }));
            }
        }}>
            <div className="modal-content">
                <span className="close" onClick={() => setModal(prev => ({ ...prev, active: false }))}>&times;</span>
                <p>Подтвердите действие</p>
                <button className="cancel-btn" onClick={() => setModal(prev => ({ ...prev, active: false }))}>Отмена</button>
                <button className="confirm-btn" onClick={() => deleteCard(modal.id)}>Удалить</button>
            </div>
        </div>
    )
}
export default Modal

export interface ICards {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}

export interface IEditorState {
    active: boolean;
    id: number | null;
    title: string;
    description: string;
    photo: string;
}

export interface IModalState {
    active: boolean;
    id: number | null;
}

export interface ICardProps {
    item: ICards;
    setModal: React.Dispatch<React.SetStateAction<IModalState>>;
    setEditor: React.Dispatch<React.SetStateAction<IEditorState>>;
}

export interface IModalProps {
    modal: IModalState;
    setModal: React.Dispatch<React.SetStateAction<IModalState>>;
    deleteCard: (id: number | null) => void;
}

export interface IEditorProps {
    editor: IEditorState;
    setEditor: React.Dispatch<React.SetStateAction<IEditorState>>;
    editCard: (id: number | null) => void;
}
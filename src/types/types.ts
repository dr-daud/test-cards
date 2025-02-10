
export interface ICards {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}

export interface ICardProps {
    item: ICards;
    setActiveEditor: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setTitleText: React.Dispatch<React.SetStateAction<string>>;
    setDescrText: React.Dispatch<React.SetStateAction<string>>;
    setImgLink: React.Dispatch<React.SetStateAction<string>>;
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModalProps {
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedId: number | null;
    deleteCard: (id: number | null) => void;
}

export interface IEditorProps {
    setActiveEditor: React.Dispatch<React.SetStateAction<boolean>>;
    imgLink: string;
    setImgLink: React.Dispatch<React.SetStateAction<string>>;
    titleText: string;
    setTitleText: React.Dispatch<React.SetStateAction<string>>;
    descrText: string;
    setDescrText: React.Dispatch<React.SetStateAction<string>>;
    editCard: (id: number | null) => void;
    selectedId: number | null;
}
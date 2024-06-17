import { FC } from "react";
import ModalComponent from "./modal-component";

interface Source {
    link: string;
    title: string;
    post_date: string | null;
    similarity_score: number;
    verdict: string;
    content_source: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    relevantSources: Source[];
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, relevantSources }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-90 flex items-center justify-center">
            <div className="bg-gray-800 h-80 w-1/2 rounded-lg overflow-hidden">
                <div className="p-6 sticky top-0 bg-gray-700 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Relevant Sources</h2>
                    <button
                        className="text-white text-2xl hover:text-gray-300 cursor-pointer"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="overflow-y-auto max-h-60 p-6 pt-0">
                    <div className="space-y-4 text-white">
                        {relevantSources.map((source, index) => (
                            <ModalComponent key={index} source={source} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
import { useState } from "react";
import Modal from "./modal";
import { Tooltip } from 'react-tooltip';

const AnalysisComponent = ({ news }: { news: any }) => {
    const [showLinksModal, setShowLinksModal] = useState(false);
    const formatTextToHTML = (text: string) => {
        let htmlText = text.replace(/\n/g, "<br/>");
        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        htmlText = htmlText.replace(/^\d+\.\s*(.*)$/gm, "<li>$1</li>");
        htmlText = `<ul>${htmlText}</ul>`;
        return htmlText;
    };
    const bgColor = 'bg-red-500' ;
    return (
        <div className="relative flex flex-col items-end p-4 m-2 rounded-xl w-full gap-20">
            <div className="flex flex-col items-start p-4 mb-4 bg-gray-600 rounded-lg cursor-pointer w-1/2">
                <div className="mb-2 text-white">{news.userText}</div>
            </div>
            <div className="flex w-full">
                <div 
                    className="p-4 mb-4 bg-gray-700 rounded-lg cursor-pointer w-1/2 float-left"
                    onClick={() => setShowLinksModal(true)}
                >
                    <div className="mb-2 text-right font-extrabold text-green-300">{news.verdict}</div>
                    <div className="text-white" dangerouslySetInnerHTML={{ __html: formatTextToHTML(news.analysis) }}/>
                </div>
                <div className="ml-1 flex items-center justify-center w-12 h-12 text-white rounded-full font-bold cursor-pointer  ${bgColor}" data-tooltip-id="credibility-tooltip">
                    {Math.round(news.credibility)}
                </div>
                <Tooltip id="credibility-tooltip" content="Article credibility score" />
            </div>
            <Modal 
                isOpen={showLinksModal}
                onClose={() => setShowLinksModal(false)}
                relevantSources={news.search_results} 
            />
        </div>
    );
};

export default AnalysisComponent;

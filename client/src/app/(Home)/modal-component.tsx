import React from "react";
import Link from "next/link";

interface Source {
    link: string;
    title: string;
    post_date: string | null;
    similarity_score: number;
    verdict: string;
    content_source: string;
}

interface SourceListItemProps {
    source: Source;
}

const ModalComponent: React.FC<SourceListItemProps> = ({ source }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between">
                <Link
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        {source.title}
                    </Link>
                    <div className="text-white text-lg text-gray900">{source.verdict}</div>
            </div>
            <div className="text-gray-300">
                <div>Post Date: {source.post_date ? source.post_date : "Could not find"}</div>
                <div>Source: {source.content_source}</div>
                <div>Similarity Score: {source.similarity_score}</div>
            </div>
        </div>
    );
};

export default ModalComponent;

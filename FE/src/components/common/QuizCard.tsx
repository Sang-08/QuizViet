import React from 'react';
import { Button } from './Button';

interface QuizCardProps {
  thumbnailUrl?: string;
  topic?: string;
  title: string;
  questionCount: number;
  plays: number;
  onDetail?: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  thumbnailUrl,
  topic,
  title,
  questionCount,
  plays,
  onDetail,
}) => {
  return (
    <div className="card overflow-hidden h-full flex flex-col">
      <div className="bg-secondary-200 aspect-[16/9]">
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="card-content flex flex-col grow">
        {topic && (
          <div className="inline-flex px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700 mb-2">
            {topic}
          </div>
        )}
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">{title}</h3>
        <div className="flex items-center justify-between text-secondary-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h10v2H4v-2zm0 4h10v2H4v-2z"/></svg>
              {questionCount} câu
            </span>
          </div>
          <span>{plays.toLocaleString()} lượt chơi</span>
        </div>
        <div className="mt-auto">
          <Button className="w-full justify-center" onClick={onDetail}>Xem chi tiết</Button>
        </div>
      </div>
    </div>
  );
};



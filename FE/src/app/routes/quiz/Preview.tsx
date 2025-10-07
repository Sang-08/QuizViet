import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, HelpCircle, ChevronLeft, Play, User, Heart } from 'lucide-react';
import { Button } from '../../../components/common/Button';

export default function QuizPreview() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  // Mock dữ liệu preview – sau sẽ gọi API theo quizId
  const quiz = {
    id: quizId ?? 'q-demo',
    title: 'Phương trình bậc hai',
    description: 'Ôn tập cực nhanh kiến thức về phương trình bậc hai cơ bản.',
    author: 'GV. Nguyễn Văn Lam',
    questions: 12,
    timePerQuestion: 20,
    cover:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1600&auto=format&fit=crop',
  };

  // Yêu thích (mock bằng localStorage)
  const [isFav, setIsFav] = React.useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('fav_quizzes');
      const ids: string[] = raw ? JSON.parse(raw) : [];
      return ids.includes(quiz.id);
    } catch {
      return false;
    }
  });

  const toggleFav = () => {
    try {
      const raw = localStorage.getItem('fav_quizzes');
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const next = isFav ? ids.filter(id => id !== quiz.id) : Array.from(new Set([...ids, quiz.id]));
      localStorage.setItem('fav_quizzes', JSON.stringify(next));
      setIsFav(!isFav);
    } catch {
      setIsFav(!isFav);
    }
  };

  const handleStart = () => {
    // Với mock, tạo sessionId từ quizId để vào trang làm quiz
    navigate(`/play/live/preview-${quiz.id}`);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10" style={{background:'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(236,72,153,0.9))'}}>
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${quiz.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative w-full max-w-xl">
        <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-2xl border border-white/30 relative">
          <div className="px-6 md:px-8 py-6">
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại
            </button>

            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                <img src={quiz.cover} alt="cover" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-secondary-900">{quiz.title}</h1>
              <p className="text-secondary-600 mt-1">{quiz.description}</p>
              <div className="flex items-center justify-center gap-2 text-secondary-600 mt-2 text-sm">
                <User className="w-4 h-4" /> {quiz.author}
              </div>
            </div>

            {/* Favorite button */}
            <button
              aria-label="Yêu thích"
              onClick={toggleFav}
              className={`absolute top-4 right-4 rounded-full border px-3 py-2 transition ${
                isFav ? 'bg-rose-100 border-rose-200 text-rose-600' : 'bg-white/70 border-white/70 text-secondary-600'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                <span className="text-sm font-medium">{isFav ? 'Đã yêu thích' : 'Yêu thích'}</span>
              </span>
            </button>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-secondary-50 rounded-xl px-4 py-3 text-center">
                <div className="text-xs text-secondary-500 mb-1">Câu hỏi</div>
                <div className="text-lg font-semibold text-secondary-900">{quiz.questions}</div>
              </div>
              <div className="bg-secondary-50 rounded-xl px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-secondary-500 mb-1"><Clock className="w-3.5 h-3.5"/>Thời gian/câu</div>
                <div className="text-lg font-semibold text-secondary-900">{quiz.timePerQuestion} giây</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6">
              <Button className="w-full" onClick={handleStart}>
                <Play className="w-4 h-4 mr-2" /> Bắt đầu làm Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

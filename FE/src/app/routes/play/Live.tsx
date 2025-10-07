import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Trophy, 
  CheckCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface Question {
  id: string;
  content: string;
  options: string[];
  timeLimit: number;
  points: number;
}

interface PlayerStats {
  id: string;
  nickname: string;
  score: number;
  rank: number;
}

export default function PlayLive() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  // Mock bộ câu hỏi
  const questions: Question[] = [
    {
      id: '1',
      content: 'Phương trình x^2 - 5x + 6 = 0 có nghiệm là:',
      options: ['x = 2 hoặc x = 3', 'x = 1 hoặc x = 6', 'x = -2 hoặc x = -3', 'Vô nghiệm'],
      timeLimit: 20,
      points: 1000,
    },
    {
      id: '2',
      content: 'Giá trị Δ của phương trình x^2 - 4x + 4 = 0 là:',
      options: ['0', '4', '8', '16'],
      timeLimit: 20,
      points: 1000,
    },
    {
      id: '3',
      content: 'Phương trình x^2 + 2x + 1 = 0 có:',
      options: ['Nghiệm kép x = -1', 'Hai nghiệm phân biệt', 'Vô nghiệm', 'Nghiệm x = 1'],
      timeLimit: 20,
      points: 1000,
    },
  ];

  const [idx, setIdx] = useState(0);
  const quizTitle = 'Phương trình bậc hai';
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [timeLeft, setTimeLeft] = useState(currentQuestion.timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(questions.length);
  const [myScore, setMyScore] = useState(0);
  const [nextCountdown, setNextCountdown] = useState<number | null>(null);
  const [results, setResults] = useState<Array<{id:string; content:string; correctIndex:number; selectedIndex:number|null; time:number; isCorrect:boolean}>>([]);

  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([
    { id: '1', nickname: 'Học sinh 1', score: 50, rank: 1 },
    { id: '2', nickname: 'Học sinh 2', score: 30, rank: 2 },
    { id: '3', nickname: 'Bạn', score: 40, rank: 3 },
    { id: '4', nickname: 'Học sinh 4', score: 20, rank: 4 },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [timeLeft, showResults]);

  // Đếm lùi chuyển câu tiếp theo sau khi xác nhận
  useEffect(() => {
    if (nextCountdown === null) return;
    if (nextCountdown <= 0) {
      gotoNext();
      return;
    }
    const t = setTimeout(() => setNextCountdown(c => (c ?? 0) - 1), 1000);
    return () => clearTimeout(t);
  }, [nextCountdown]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered || showResults) return;
    setSelectedAnswer(answerIndex);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null || isAnswered) return;
    setIsAnswered(true);
    setShowResults(true);
    // Giả định đáp án đúng là index 0 cho mock
    if (selectedAnswer === 0) {
      setMyScore(s => s + currentQuestion.points);
    }
    // Lưu kết quả câu hỏi hiện tại
    setResults(prev => ([
      ...prev,
      {
        id: currentQuestion.id,
        content: currentQuestion.content,
        correctIndex: 0,
        selectedIndex: selectedAnswer,
        time: currentQuestion.timeLimit - timeLeft,
        isCorrect: selectedAnswer === 0,
      }
    ]));
    setNextCountdown(3);
  };

  const handleTimeUp = () => {
    if (!isAnswered) setIsAnswered(true);
    setShowResults(true);
    // Lưu kết quả khi hết giờ (selected có thể null)
    setResults(prev => ([
      ...prev,
      {
        id: currentQuestion.id,
        content: currentQuestion.content,
        correctIndex: 0,
        selectedIndex: selectedAnswer,
        time: currentQuestion.timeLimit,
        isCorrect: selectedAnswer === 0,
      }
    ]));
    setNextCountdown(3);
  };

  const gotoNext = () => {
    if (idx + 1 >= totalQuestions) {
      // kết thúc quiz
      navigate(`/play/result/${sessionId ?? 'session-demo'}`, { state: { results } });
      return;
    }
    const nextIdx = idx + 1;
    setIdx(nextIdx);
    setCurrentQuestion(questions[nextIdx]);
    setQuestionNumber(nextIdx + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResults(false);
    setNextCountdown(null);
    setTimeLeft(questions[nextIdx].timeLimit);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 5) return 'text-error-600';
    if (timeLeft <= 10) return 'text-warning-600';
    return 'text-success-600';
  };

  const getAnswerColor = (index: number) => {
    if (!showResults) {
      return selectedAnswer === index
        ? 'bg-blue-500/80 border-blue-300'
        : 'bg-white/20 border-white/20 hover:bg-white/25';
    }
    
    // Show results
    if (index === 0) { // Assuming correct answer is always index 0
      return 'bg-green-500/85 border-green-300';
    }
    if (selectedAnswer === index) {
      return 'bg-red-500/85 border-red-300';
    }
    return 'bg-white/15 border-white/20';
  };

  return (
    <div className="min-h-screen" style={{background:'linear-gradient(135deg,#7C3AED,#EC4899)'}}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Top bar like mock */}
        <div className="flex items-center justify-between text-white mb-3">
          <div className="flex items-center gap-3">
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full">{questionNumber}/{totalQuestions}</div>
            <div className="text-xl md:text-2xl font-extrabold">{quizTitle}</div>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <div>Điểm số <span className="font-bold">{myScore}</span></div>
            <button onClick={()=>navigate('/')} className="hover:underline">Thoát</button>
          </div>
        </div>
        <div className="w-full h-3 bg-white/30 rounded-full mb-6">
          <div className="h-3 bg-black rounded-full" style={{ width: `${(questionNumber/totalQuestions)*100}%` }} />
        </div>

        {/* Timer */}
        <div className={`text-center text-6xl font-extrabold text-white mb-2 ${getTimeColor()}`}>{timeLeft}</div>
        <div className="text-center text-white/80 mb-6">giây</div>

        {/* Question box */}
        <div className="bg-white/30 backdrop-blur-md rounded-xl border border-white/30 p-8 text-center text-white shadow-xl mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold">{currentQuestion.content}</h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered || showResults}
              className={`w-full p-6 rounded-xl border-2 text-left text-white shadow-md ${
                getAnswerColor(index)
              } ${isAnswered || showResults ? 'cursor-not-allowed' : 'hover:bg-white/25'}`}
            >
              <div className="flex items-center">
                <span className="w-10 h-10 bg-white/30 text-white rounded-lg flex items-center justify-center font-bold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg md:text-xl">{option}</span>
                {showResults && index === 0 && (
                  <CheckCircle className="w-5 h-5 text-white ml-auto" />
                )}
                {showResults && selectedAnswer === index && index !== 0 && (
                  <XCircle className="w-5 h-5 text-white ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Confirm / Next info */}
        <div className="mt-8 flex items-center justify-center">
          {!showResults ? (
            <button
              className={`px-6 py-3 rounded-xl text-white font-semibold ${selectedAnswer===null ? 'bg-white/30 cursor-not-allowed' : ''}`}
              style={selectedAnswer!==null ? {background:'linear-gradient(90deg,#7C3AED,#EC4899)'} : {}}
              disabled={selectedAnswer===null}
              onClick={handleConfirm}
            >
              Xác Nhận
            </button>
          ) : (
            <div className="px-5 py-3 rounded-xl text-white" style={{background:'linear-gradient(90deg,#7C3AED,#EC4899)'}}>
              {selectedAnswer === 0 ? `Chính xác! +${currentQuestion.points} điểm` : 'Sai rồi!'}
            </div>
          )}
        </div>
        {showResults && nextCountdown !== null && (
          <div className="text-center mt-3 text-white font-medium">
            »» Câu tiếp theo sau {nextCountdown} giây...
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Users, 
  Clock, 
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface Question {
  id: string;
  content: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  points: number;
}

interface PlayerStats {
  id: string;
  nickname: string;
  score: number;
  isAnswered: boolean;
  answerTime?: number;
}

export default function HostLive() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '1',
    content: 'Câu hỏi: Tính giá trị của biểu thức 2x + 3y khi x = 5 và y = 3?',
    options: ['A) 19', 'B) 21', 'C) 23', 'D) 25'],
    correctAnswer: 0,
    timeLimit: 30,
    points: 10,
  });

  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(20);

  const [players, setPlayers] = useState<PlayerStats[]>([
    { id: '1', nickname: 'Học sinh 1', score: 50, isAnswered: true, answerTime: 15 },
    { id: '2', nickname: 'Học sinh 2', score: 30, isAnswered: false },
    { id: '3', nickname: 'Học sinh 3', score: 40, isAnswered: true, answerTime: 25 },
    { id: '4', nickname: 'Học sinh 4', score: 20, isAnswered: false },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const handleStartQuestion = () => {
    setIsPlaying(true);
    setTimeLeft(currentQuestion.timeLimit);
  };

  const handlePauseQuestion = () => {
    setIsPlaying(false);
  };

  const handleNextQuestion = () => {
    // TODO: Move to next question
    console.log('Next question');
    setQuestionNumber(prev => prev + 1);
    setShowResults(false);
    setIsPlaying(false);
    setTimeLeft(currentQuestion.timeLimit);
  };

  const handleEndQuiz = () => {
    // TODO: End quiz and show final results
    console.log('End quiz');
  };

  const handleTimeUp = () => {
    setIsPlaying(false);
    setShowResults(true);
  };

  const handleShowResults = () => {
    setShowResults(true);
    setIsPlaying(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              Câu {questionNumber}/{totalQuestions}
            </h1>
            <p className="text-secondary-600">
              {currentQuestion.points} điểm • {currentQuestion.timeLimit} giây
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-secondary-600">Thời gian còn lại</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {players.length}
              </div>
              <div className="text-sm text-secondary-600">Người chơi</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-content">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                    {currentQuestion.content}
                  </h2>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          showResults
                            ? index === currentQuestion.correctAnswer
                              ? 'border-success-500 bg-success-50 text-success-800'
                              : 'border-secondary-200 bg-secondary-50'
                            : 'border-secondary-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold mr-3">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-lg">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-secondary-200">
                  <div className="flex items-center space-x-3">
                    {!isPlaying && !showResults ? (
                      <Button onClick={handleStartQuestion}>
                        <Play className="w-4 h-4 mr-2" />
                        Bắt đầu
                      </Button>
                    ) : isPlaying ? (
                      <Button variant="outline" onClick={handlePauseQuestion}>
                        <Pause className="w-4 h-4 mr-2" />
                        Tạm dừng
                      </Button>
                    ) : null}
                    
                    {isPlaying && (
                      <Button variant="outline" onClick={handleShowResults}>
                        <Eye className="w-4 h-4 mr-2" />
                        Hiển thị kết quả
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {showResults && questionNumber < totalQuestions && (
                      <Button onClick={handleNextQuestion}>
                        <SkipForward className="w-4 h-4 mr-2" />
                        Câu tiếp theo
                      </Button>
                    )}
                    {showResults && questionNumber === totalQuestions && (
                      <Button onClick={handleEndQuiz}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Kết thúc Quiz
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Player Stats */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-secondary-900">
                  Bảng xếp hạng
                </h3>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {players
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          index === 0 ? 'bg-warning-50 border border-warning-200' : 'bg-secondary-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-warning-500 text-white' : 'bg-primary-100 text-primary-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">
                              {player.nickname}
                            </p>
                            <p className="text-sm text-secondary-500">
                              {player.score} điểm
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {player.isAnswered ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                              ✓ Đã trả lời
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                              ⏳ Chờ
                            </span>
                          )}
                          {player.answerTime && (
                            <p className="text-xs text-secondary-500 mt-1">
                              {player.answerTime}s
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Quiz Progress */}
            <div className="card mt-6">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Tiến độ Quiz
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Câu hỏi</span>
                    <span className="font-medium">{questionNumber}/{totalQuestions}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Thời gian</span>
                    <span className="font-medium">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

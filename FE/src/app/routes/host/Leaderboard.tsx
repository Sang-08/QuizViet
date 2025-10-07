import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  Clock, 
  Target,
  Star,
  Award
} from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  rank: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  isMe?: boolean;
}

export default function HostLeaderboard() {
  const { sessionId } = useParams();

  // Mock data - sẽ thay thế bằng API call thực tế
  const leaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      nickname: 'Học sinh 1',
      score: 95,
      rank: 1,
      correctAnswers: 19,
      totalQuestions: 20,
      timeSpent: 25,
    },
    {
      id: '2',
      nickname: 'Học sinh 2',
      score: 90,
      rank: 2,
      correctAnswers: 18,
      totalQuestions: 20,
      timeSpent: 28,
    },
    {
      id: '3',
      nickname: 'Học sinh 3',
      score: 85,
      rank: 3,
      correctAnswers: 17,
      totalQuestions: 20,
      timeSpent: 30,
    },
    {
      id: '4',
      nickname: 'Học sinh 4',
      score: 80,
      rank: 4,
      correctAnswers: 16,
      totalQuestions: 20,
      timeSpent: 32,
    },
    {
      id: '5',
      nickname: 'Học sinh 5',
      score: 75,
      rank: 5,
      correctAnswers: 15,
      totalQuestions: 20,
      timeSpent: 35,
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-warning-600" />;
    if (rank === 2) return <Award className="w-6 h-6 text-secondary-600" />;
    if (rank === 3) return <Award className="w-6 h-6 text-warning-700" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-warning-50 border-warning-200';
    if (rank === 2) return 'bg-secondary-50 border-secondary-200';
    if (rank === 3) return 'bg-warning-100 border-warning-300';
    return 'bg-secondary-50 border-secondary-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-warning-100 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-warning-600" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            Bảng xếp hạng cuối
          </h1>
          <p className="text-secondary-600">
            Kết quả Quiz - Session: {sessionId}
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-content text-center">
              <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-900">{leaderboard.length}</p>
              <p className="text-sm text-secondary-600">Người chơi</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content text-center">
              <Target className="w-8 h-8 text-success-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-900">20</p>
              <p className="text-sm text-secondary-600">Câu hỏi</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content text-center">
              <Clock className="w-8 h-8 text-accent-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-900">30m</p>
              <p className="text-sm text-secondary-600">Thời gian</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content text-center">
              <Star className="w-8 h-8 text-warning-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-900">
                {Math.round(leaderboard.reduce((sum, player) => sum + player.score, 0) / leaderboard.length)}
              </p>
              <p className="text-sm text-secondary-600">Điểm TB</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-2xl font-semibold text-secondary-900">
              Kết quả chi tiết
            </h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {leaderboard.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-6 rounded-lg border-2 ${getRankColor(player.rank)}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        player.rank === 1 
                          ? 'bg-warning-500 text-white' 
                          : player.rank === 2 
                            ? 'bg-secondary-400 text-white'
                            : player.rank === 3 
                              ? 'bg-warning-600 text-white'
                              : 'bg-primary-100 text-primary-600'
                      }`}>
                        {player.rank}
                      </div>
                      {getRankIcon(player.rank)}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-secondary-900">
                        {player.nickname}
                      </h4>
                      <p className="text-secondary-600">
                        {player.correctAnswers}/{player.totalQuestions} câu đúng
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {player.score}%
                    </div>
                    <div className="flex items-center text-sm text-secondary-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {player.timeSpent} phút
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button size="lg">
            <Trophy className="w-5 h-5 mr-2" />
            Tạo Quiz mới
          </Button>
          <Button variant="outline" size="lg">
            <Users className="w-5 h-5 mr-2" />
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
}

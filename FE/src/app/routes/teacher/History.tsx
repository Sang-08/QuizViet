import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  Clock, 
  Trophy, 
  Target,
  Users,
  Eye,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';

interface TeacherQuizHistory {
  id: string;
  title: string;
  topic: string;
  totalPlays: number;
  averageScore: number;
  createdAt: string;
  lastPlayed: string;
  classCount: number;
  studentCount: number;
}

interface QuizLeaderboard {
  quizId: string;
  quizTitle: string;
  topStudents: {
    id: string;
    name: string;
    score: number;
    completedAt: string;
  }[];
}

export default function TeacherHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  // Mock data - sẽ thay thế bằng API call thực tế
  const quizHistory: TeacherQuizHistory[] = [
    {
      id: '1',
      title: 'Kiểm tra Toán học lớp 10',
      topic: 'Toán học',
      totalPlays: 1247,
      averageScore: 85.5,
      createdAt: '2024-10-01',
      lastPlayed: '2024-10-04',
      classCount: 5,
      studentCount: 125,
    },
    {
      id: '2',
      title: 'Quiz Vật lý - Điện học',
      topic: 'Vật lý',
      totalPlays: 892,
      averageScore: 78.2,
      createdAt: '2024-09-28',
      lastPlayed: '2024-10-03',
      classCount: 3,
      studentCount: 89,
    },
    {
      id: '3',
      title: 'Lịch sử Việt Nam',
      topic: 'Lịch sử',
      totalPlays: 1567,
      averageScore: 92.1,
      createdAt: '2024-09-25',
      lastPlayed: '2024-10-04',
      classCount: 8,
      studentCount: 201,
    },
  ];

  const leaderboards: Record<string, QuizLeaderboard> = {
    '1': {
      quizId: '1',
      quizTitle: 'Kiểm tra Toán học lớp 10',
      topStudents: [
        { id: '1', name: 'Nguyễn Văn A', score: 100, completedAt: '2024-10-04T14:30:00' },
        { id: '2', name: 'Trần Thị B', score: 95, completedAt: '2024-10-04T15:15:00' },
        { id: '3', name: 'Lê Văn C', score: 90, completedAt: '2024-10-04T16:00:00' },
        { id: '4', name: 'Phạm Thị D', score: 88, completedAt: '2024-10-04T16:30:00' },
        { id: '5', name: 'Hoàng Văn E', score: 85, completedAt: '2024-10-04T17:00:00' },
      ],
    },
    '2': {
      quizId: '2',
      quizTitle: 'Quiz Vật lý - Điện học',
      topStudents: [
        { id: '6', name: 'Vũ Thị F', score: 98, completedAt: '2024-10-03T10:30:00' },
        { id: '7', name: 'Đặng Văn G', score: 92, completedAt: '2024-10-03T11:15:00' },
        { id: '8', name: 'Bùi Thị H', score: 87, completedAt: '2024-10-03T12:00:00' },
      ],
    },
  };

  const topics = ['Tất cả', 'Toán học', 'Vật lý', 'Hóa học', 'Lịch sử', 'Địa lý', 'Văn học'];

  const filteredHistory = quizHistory.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === 'all' || quiz.topic === filterTopic;
    return matchesSearch && matchesTopic;
  });

  const selectedQuizData = selectedQuiz ? leaderboards[selectedQuiz] : null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Lịch sử Quiz</h1>
        <p className="text-secondary-600">Xem thống kê và bảng xếp hạng các quiz đã tạo</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Tổng Quiz</p>
                <p className="text-2xl font-bold text-secondary-900">{quizHistory.length}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Tổng lượt chơi</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {quizHistory.reduce((sum, quiz) => sum + quiz.totalPlays, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-success-100 rounded-lg">
                <Users className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Điểm TB</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {Math.round(quizHistory.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizHistory.length)}%
                </p>
              </div>
              <div className="p-3 bg-warning-100 rounded-lg">
                <Trophy className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Học sinh</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {quizHistory.reduce((sum, quiz) => sum + quiz.studentCount, 0)}
                </p>
              </div>
              <div className="p-3 bg-accent-100 rounded-lg">
                <Target className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="card-content">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm quiz..."
                icon={<Search size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                className="input"
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
              >
                {topics.map(topic => (
                  <option key={topic} value={topic === 'Tất cả' ? 'all' : topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiz History List */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-secondary-900">Danh sách Quiz</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {filteredHistory.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedQuiz === quiz.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-secondary-300'
                    }`}
                    onClick={() => setSelectedQuiz(quiz.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-secondary-900 mb-1">
                          {quiz.title}
                        </h4>
                        <p className="text-sm text-secondary-600 mb-2">
                          {quiz.topic} • {quiz.classCount} lớp • {quiz.studentCount} học sinh
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">
                          {quiz.averageScore}%
                        </div>
                        <div className="text-sm text-secondary-500">
                          Điểm TB
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-secondary-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {quiz.totalPlays.toLocaleString()} lượt chơi
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(quiz.lastPlayed).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-secondary-900">
                {selectedQuizData ? `Bảng xếp hạng: ${selectedQuizData.quizTitle}` : 'Chọn quiz để xem bảng xếp hạng'}
              </h3>
            </div>
            <div className="card-content">
              {selectedQuizData ? (
                <div className="space-y-3">
                  {selectedQuizData.topStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index < 3 
                          ? 'bg-warning-50 border border-warning-200' 
                          : 'bg-secondary-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 
                            ? 'bg-warning-500 text-white' 
                            : index === 1 
                              ? 'bg-secondary-400 text-white'
                              : index === 2 
                                ? 'bg-warning-600 text-white'
                                : 'bg-primary-100 text-primary-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">
                            {student.name}
                          </p>
                          <p className="text-sm text-secondary-500">
                            {new Date(student.completedAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">
                          {student.score}%
                        </p>
                        {index < 3 && (
                          <Trophy className="w-4 h-4 text-warning-600 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-600">
                    Nhấn vào quiz để xem bảng xếp hạng
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

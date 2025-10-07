import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Copy, 
  Play, 
  Settings, 
  Share2, 
  QrCode,
  Clock,
  UserCheck,
  UserX
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';

interface Player {
  id: string;
  nickname: string;
  socketId: string;
  joinedAt: string;
  isReady: boolean;
}

export default function HostLobby() {
  const [sessionId] = useState('ABC123'); // Mock session ID
  const [quizTitle] = useState('Kiểm tra Toán học lớp 10');
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      nickname: 'Học sinh 1',
      socketId: 'socket1',
      joinedAt: '2024-10-04T10:00:00',
      isReady: true,
    },
    {
      id: '2',
      nickname: 'Học sinh 2',
      socketId: 'socket2',
      joinedAt: '2024-10-04T10:01:00',
      isReady: false,
    },
    {
      id: '3',
      nickname: 'Học sinh 3',
      socketId: 'socket3',
      joinedAt: '2024-10-04T10:02:00',
      isReady: true,
    },
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleStartQuiz = () => {
    // TODO: Start quiz logic
    console.log('Starting quiz...');
  };

  const handleKickPlayer = (playerId: string) => {
    // TODO: Kick player logic
    console.log('Kicking player:', playerId);
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(sessionId);
    // TODO: Show toast notification
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            {quizTitle}
          </h1>
          <p className="text-secondary-600">
            Chờ người chơi tham gia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* PIN Code */}
            <div className="card mb-6">
              <div className="card-content text-center">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Mã PIN để tham gia
                </h3>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-6xl font-bold text-primary-600 tracking-wider">
                    {sessionId}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCopyPin}
                    className="self-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Sao chép
                  </Button>
                </div>
                <p className="text-sm text-secondary-600">
                  Chia sẻ mã PIN này với người chơi
                </p>
              </div>
            </div>

            {/* Players List */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Người chơi ({players.length})
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {player.nickname.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">
                            {player.nickname}
                          </p>
                          <p className="text-sm text-secondary-500">
                            Tham gia: {new Date(player.joinedAt).toLocaleTimeString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {player.isReady ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Sẵn sàng
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Chờ
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleKickPlayer(player.id)}
                          className="text-error-600 hover:text-error-700"
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {players.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                    <p className="text-secondary-600">
                      Chưa có người chơi nào tham gia
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Start Quiz */}
            <div className="card mb-6">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Điều khiển
                </h3>
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={handleStartQuiz}
                    disabled={players.length === 0}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Bắt đầu Quiz
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-secondary-600">
                      Cần ít nhất 1 người chơi để bắt đầu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Thông tin Quiz
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Số câu hỏi:</span>
                    <span className="font-medium">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Thời gian:</span>
                    <span className="font-medium">30 phút</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Độ khó:</span>
                    <span className="font-medium">Trung bình</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Chủ đề:</span>
                    <span className="font-medium">Toán học</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Cài đặt Quiz"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-secondary-700 mb-2 block">
              Thời gian mỗi câu (giây)
            </label>
            <input
              type="number"
              className="input"
              defaultValue={30}
              min={10}
              max={300}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-secondary-700 mb-2 block">
              Hiển thị điểm sau mỗi câu
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-secondary-600">
                Hiển thị điểm ngay lập tức
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
            >
              Hủy
            </Button>
            <Button>
              Lưu cài đặt
            </Button>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Chia sẻ Quiz"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-secondary-700 mb-2 block">
              Link tham gia
            </label>
            <div className="flex">
              <input
                type="text"
                className="input rounded-r-none"
                value={`https://quizmaster.com/play?pin=${sessionId}`}
                readOnly
              />
              <Button
                variant="outline"
                className="rounded-l-none"
                onClick={() => navigator.clipboard.writeText(`https://quizmaster.com/play?pin=${sessionId}`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 bg-secondary-50 rounded-lg">
              <QrCode className="w-32 h-32 mx-auto text-secondary-400" />
              <p className="text-sm text-secondary-600 mt-2">
                Quét mã QR để tham gia
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowShareModal(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  FolderPlus, 
  Folder, 
  FolderOpen, 
  MoreVertical, 
  Edit, 
  Trash2, 
  BookOpen,
  Calendar,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/common/Input';

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  quizCount: number;
  createdAt: string;
  children?: Folder[];
}

export default function TeacherFolders() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['1']);

  // Mock data - sẽ thay thế bằng API call thực tế
  const folders: Folder[] = [
    {
      id: '1',
      name: 'Thư mục mặc định',
      quizCount: 12,
      createdAt: '2024-01-01',
      children: [
        {
          id: '2',
          name: 'Toán học',
          parentId: '1',
          quizCount: 5,
          createdAt: '2024-02-01',
        },
        {
          id: '3',
          name: 'Vật lý',
          parentId: '1',
          quizCount: 3,
          createdAt: '2024-02-15',
        },
        {
          id: '4',
          name: 'Hóa học',
          parentId: '1',
          quizCount: 4,
          createdAt: '2024-03-01',
        },
      ],
    },
    {
      id: '5',
      name: 'Lịch sử',
      quizCount: 8,
      createdAt: '2024-04-01',
    },
    {
      id: '6',
      name: 'Địa lý',
      quizCount: 6,
      createdAt: '2024-05-01',
    },
  ];

  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParent, setNewFolderParent] = useState('');

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // TODO: Call create folder API
      console.log('Create folder:', { name: newFolderName, parentId: newFolderParent });
      setShowCreateModal(false);
      setNewFolderName('');
      setNewFolderParent('');
    }
  };

  const handleEditFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    setShowEditModal(true);
  };

  const handleDeleteFolder = (folder: Folder) => {
    // TODO: Call delete folder API
    console.log('Delete folder:', folder.id);
  };

  const renderFolder = (folder: Folder, level = 0) => {
    const isExpanded = expandedFolders.includes(folder.id);
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id} className="mb-2">
        <div 
          className={`flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors ${
            level > 0 ? 'ml-6' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            {hasChildren ? (
              <button
                onClick={() => toggleFolder(folder.id)}
                className="p-1 hover:bg-secondary-100 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-secondary-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-secondary-500" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}
            
            {isExpanded ? (
              <FolderOpen className="w-5 h-5 text-primary-600" />
            ) : (
              <Folder className="w-5 h-5 text-secondary-500" />
            )}
            
            <div>
              <h3 className="font-medium text-secondary-900">{folder.name}</h3>
              <p className="text-sm text-secondary-500">
                {folder.quizCount} quiz • {new Date(folder.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <BookOpen className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleEditFolder(folder)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDeleteFolder(folder)}
              className="text-error-600 hover:text-error-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-6">
            {folder.children?.map(child => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Thư mục</h1>
          <p className="text-secondary-600">Tổ chức quiz của bạn theo thư mục</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <FolderPlus className="w-4 h-4 mr-2" />
          Tạo thư mục mới
        </Button>
      </div>

      {/* Folders List */}
      <div className="card">
        <div className="card-content">
          {folders.map(folder => renderFolder(folder))}
        </div>
      </div>

      {/* Create Folder Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Tạo thư mục mới"
      >
        <div className="space-y-4">
          <Input
            label="Tên thư mục"
            placeholder="Nhập tên thư mục"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          
          <div>
            <label className="text-sm font-medium text-secondary-700 mb-2 block">
              Thư mục cha (tùy chọn)
            </label>
            <select
              className="input"
              value={newFolderParent}
              onChange={(e) => setNewFolderParent(e.target.value)}
            >
              <option value="">Không có (thư mục gốc)</option>
              <option value="1">Thư mục mặc định</option>
              <option value="5">Lịch sử</option>
              <option value="6">Địa lý</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleCreateFolder}>
              Tạo thư mục
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Folder Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Chỉnh sửa thư mục"
      >
        <div className="space-y-4">
          <Input
            label="Tên thư mục"
            placeholder="Nhập tên thư mục"
            defaultValue={selectedFolder?.name}
          />
          
          <div>
            <label className="text-sm font-medium text-secondary-700 mb-2 block">
              Thư mục cha
            </label>
            <select className="input">
              <option value="">Không có (thư mục gốc)</option>
              <option value="1">Thư mục mặc định</option>
              <option value="5">Lịch sử</option>
              <option value="6">Địa lý</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Hủy
            </Button>
            <Button>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

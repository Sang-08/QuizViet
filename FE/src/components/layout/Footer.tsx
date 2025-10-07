import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
	return (
		<footer className="mt-10 border-t border-white/30 bg-white/60 backdrop-blur-md">
			<div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
				<div className="md:col-span-2">
					<Logo size="md" />
					<p className="text-sm text-secondary-700 mt-3">QuizViet là nền tảng học tập tương tác giúp học sinh và giáo viên tạo, chia sẻ, và tham gia các bài quiz một cách thú vị.</p>
					<p className="text-xs text-secondary-500 mt-4">© {new Date().getFullYear()} QuizViet. All rights reserved.</p>
				</div>
				<div>
					<h4 className="font-semibold text-secondary-900 mb-3">Liên kết</h4>
					<ul className="space-y-2 text-sm">
						<li><Link to="/" className="text-secondary-700 hover:text-primary-700">Trang chủ</Link></li>
						<li><Link to="/auth/login" className="text-secondary-700 hover:text-primary-700">Đăng nhập</Link></li>
						<li><Link to="/auth/register" className="text-secondary-700 hover:text-primary-700">Đăng ký</Link></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold text-secondary-900 mb-3">Liên hệ</h4>
					<ul className="space-y-2 text-sm text-secondary-700">
						<li>Email: support@quizviet.vn</li>
						<li>Hotline: 0123 456 789</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

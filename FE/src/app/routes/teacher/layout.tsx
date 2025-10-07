import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavbar } from '../../../components/layout/TopNavbar';

export default function TeacherLayout() {
	return (
		<div className="flex flex-col h-screen relative page-bg">
			<div className="blob blob-1" />
			<div className="blob blob-2" />
			<div className="blob blob-3" />
			<TopNavbar />
			<main className="flex-1 overflow-auto">
				<div className="w-full px-4 sm:px-6 lg:px-8 py-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

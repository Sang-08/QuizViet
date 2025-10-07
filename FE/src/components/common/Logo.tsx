import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
	size?: 'sm' | 'md' | 'lg';
	to?: string;
}

const sizeMap = {
	sm: { icon: 'w-6 h-6', text: 'text-lg' },
	md: { icon: 'w-8 h-8', text: 'text-2xl' },
	lg: { icon: 'w-10 h-10', text: 'text-3xl' },
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', to = '/' }) => {
	const s = sizeMap[size];
	return (
		<Link to={to} className="flex items-center gap-2">
			{/* Graduation cap icon with gradient */}
			<svg className={`${s.icon}`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="qvGradient" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#7C3AED" />
						<stop offset="100%" stopColor="#EC4899" />
					</linearGradient>
				</defs>
				<path d="M2 16L24 6l22 10-22 10L2 16Z" fill="url(#qvGradient)"/>
				<path d="M10 24v6c0 2 6 6 14 6s14-4 14-6v-6" stroke="url(#qvGradient)" strokeWidth="4" strokeLinejoin="round"/>
			</svg>
			<span className={`${s.text} font-extrabold`} style={{background: 'linear-gradient(90deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', color: 'transparent'}}>QuizViet</span>
		</Link>
	);
};

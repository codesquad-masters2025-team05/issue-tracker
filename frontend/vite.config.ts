import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			// 예시: /api로 시작하는 요청을 실제 API 서버로 프록시
			'/api': {
				target: 'https://www.issue-tracker.online',
				changeOrigin: true,
				// 필요하면, secure 옵션 추가 (https 인증서 오류 있을 때만)
				// secure: false,
				// 필요에 따라 경로 재작성
				// rewrite: (path) => path.replace(/^\/api/, '/api'),
			},
		},
	},
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				icon: true, // width, height를 "1em"으로
				memo: true, // React.memo로 래핑
				svgoConfig: {
					plugins: [
						{ removeViewBox: false }, // viewBox 유지
					],
				},
			},
		}),
		tsconfigPaths(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

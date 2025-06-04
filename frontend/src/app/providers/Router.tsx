import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import { Toaster } from '@/shared/ui/sonner';

import AppLayout from '@/app/layout/AppLayout';
import NoHeaderLayout from '@/app/layout/NoHeaderLayout';

import IssueDetailPage from '@/pages/IssueDetailPage';
import IssueListPage from '@/pages/IssueListPage';
import LabelListPage from '@/pages/LabelListPage';
import MilestoneListPage from '@/pages/MilestoneListPage';
import IssueCreatePage from '@/pages/issueCreatePage';

import { GitHubCallbackPage } from '@/pages/github-callback';
import { LoginPage } from '@/pages/login';
import { ProtectedRoute } from '@/widgets/auth';

const router = createBrowserRouter([
	{
		element: <NoHeaderLayout />,
		children: [
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/auth/github/callback',
				element: <GitHubCallbackPage />,
			},
		],
	},
	{
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: '/', element: <Navigate to='/issues' replace /> },
			{ path: '/issues', element: <IssueListPage /> },
			{ path: '/issues/new', element: <IssueCreatePage /> },
			{ path: '/issues/:id', element: <IssueDetailPage /> },
			{ path: '/labels', element: <LabelListPage /> },
			{ path: '/milestones', element: <MilestoneListPage /> },
			{ path: '*', element: <Navigate to='/issues' replace /> },
		],
	},
]);

const AppRouter = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
};

export default AppRouter;

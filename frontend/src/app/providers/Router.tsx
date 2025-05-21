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
import LoginPage from '@/pages/LoginPage';
import MilestoneListPage from '@/pages/MilestoneListPage';
import IssueCreatePage from '@/pages/issueCreatePage';

import AuthGuard from '@/shared/auth/AuthGuard';

const router = createBrowserRouter([
	{
		element: <NoHeaderLayout />,
		children: [
			{
				path: '/login',
				element: <LoginPage />,
			},
		],
	},
	{
		element: (
			<AuthGuard>
				<AppLayout />
			</AuthGuard>
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

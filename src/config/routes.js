import { lazy } from 'react'

const Dashboard = lazy(() =>
    import('../pages/Dashboard/dashboard')
)

const Login = lazy(() =>
    import('../pages/Login/login')
)

const ManualEntry = lazy(() =>
    import('../pages/ManualEntry/manualEntry')
)

const ViewEntry = lazy(() =>
    import('../pages/ViewEntry/viewEntry')
)

const ViewAdminEntries = lazy(() =>
    import('../pages/ViewEntriesAdmin/ViewAdminEntries')
)

const routes = {
    publicRoutes: [
        {
            path: '/',
            component: Login,
            exact: true,
        },
        {
            path: '/login',
            component: Login,
            exact: true,
        },
    ],
    protectedRoutes: [
        {
            path: '/dashboard',
            component: Dashboard,
            exact: true,
        },
        {
            path: '/manual-entry',
            component: ManualEntry,
            exact: true
        },
        {
            path: '/view-entry',
            component: ViewEntry,
            exact: true
        },
        {
            path: '/admin/view-entry',
            component: ViewAdminEntries,
            exact: true
        }
    ]

}

export default routes
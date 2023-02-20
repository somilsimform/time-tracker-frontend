const API_ENDPOINTS = {
    AUTH: {
        Login: '/auth/login',
    },
    PROJECTS: {
        GetAllProjects: '/projects/all',
        AddProjectLog: '/projects/tasks/logs/add',
        GetLogsByProject: '/projects/logs',
        GetLogsByTask: '/projects/tasks/logs',
        GetTaskByUser: '/projects/tasks/users',
        GetLogsByViewType: '/projects/tasks/logs',
        UpdateLogs: '/projects/tasks/logs/update'
    },
    TASK: {
        GetAllTaskByProjectID: '/projects/tasks'
    },
    ADMIN: {
        GetAllLogs: '/admin/allLogs',
        UpdateLogStatus: '/admin/logs/update/status'
    }
}

export default API_ENDPOINTS

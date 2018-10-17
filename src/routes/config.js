export default {
    menus: [ // 菜单相关路由
        { key: '/app', title: 'Dashboard', icon: 'mobile', component: 'Dashboard' },
        //TODO: create a new component for each tables
        { key: '/app/userprofiles', title: 'User Profiles', icon: 'table', component: 'UserProfiles' },
        { key: '/app/stuffdot2', title: 'stuffdot2', icon: 'table', component: 'SelectTable' },
        { key: '/app/stuffdot3', title: 'stuffdot3', icon: 'table', component: 'BasicTable' },

        // if you want to using the togging menus, leave the component with blank, and define the subs
        // for example:
        {
            key: '/app/table', title: 'Template', icon: 'table',
            subs: [
                { key: '/app/table/basicTable', title: 'Basic Table', component: 'BasicTable'},
                { key: '/app/table/advancedTable', title: 'Advanced Table', component: 'AdvancedTable'},
                // { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },

    ],
    others: []
}

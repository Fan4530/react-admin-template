export default {
    menus: [ // 菜单相关路由
        { idx: 'index', key: '/app/dashboard', title: 'Dashboard', icon: 'mobile', component: 'Dashboard' },
        //TODO: create a new component for each tables
        { idx: 'userprofiles', key: '/app/userprofiles', title: 'User Profiles', icon: 'table', component: 'UserProfiles' },
        { idx: 'stuffdot2',  key: '/app/stuffdot2', title: 'stuffdot2', icon: 'table', component: 'SelectTable' },
        { idx: 'stuffdot3' , key: '/app/stuffdot3', title: 'stuffdot3', icon: 'table', component: 'BasicTable' },

        // if you want to using the togging menus, leave the component with blank, and define the subs
        // for example:
        {
            idx: 'table', key: '/app/table', title: 'Template', icon: 'table',
            subs: [
                { idx: 'basicTable', key: '/app/table/basicTable', title: 'Basic Table', component: 'BasicTable'},
                { idx: 'advancedTable', key: '/app/table/advancedTable', title: 'Advanced Table', component: 'AdvancedTable'},
                // { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },

    ],
    others: []
}

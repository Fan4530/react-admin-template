import UserCommissions from "../components/user-commissions/user-commissions";

export default {
    menus: [ // 菜单相关路由
        { idx: 'index', key: '/app/dashboard', title: 'Dashboard', icon: 'mobile', component: 'Dashboard' },
        //TODO: create a new component for each tables
        { idx: 'allUserProfiles', key: '/app/userprofiles', title: 'User Profiles', icon: 'table', component: 'UserProfiles' },
        { idx: 'allCashouts',  key: '/app/cashouts', title: 'Cashout Request', icon: 'table', component: 'Cashouts' },
        { idx: 'allCommissions' , key: '/app/commissions', title: 'User Commissions', icon: 'table', component: 'UserCommissions' },
        // make sure the idx is the same as the adminData type!

        // if you want to use the togging menus, leave the component with blank, and define the subs
        // for example:
        // {
        //     idx: 'table', key: '/app/table', title: 'Template', icon: 'table',
        //     subs: [
        //         { idx: 'basicTable', key: '/app/table/basicTable', title: 'Basic Table', component: 'BasicTable'},
        //         { idx: 'advancedTable', key: '/app/table/advancedTable', title: 'Advanced Table', component: 'AdvancedTable'},
        //         // { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
        //     ],
        // },

    ],
    others: []
}

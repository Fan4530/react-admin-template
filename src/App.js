import React, {Component} from 'react';
import {Icon, Layout, notification} from 'antd';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import {receiveData} from './actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes';
import {signIn} from "./actions/auth/signIn";
import {loadAllProfiles} from "./actions/actions-all_profiles";
import {loadAllCashouts} from "./actions/actions-all_cashouts";

const {Content, Footer} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        console.log("get the sstate")
        console.log(this.props.store)
        console.log("show me the responsive");

        console.log(this.props);
        this.props.actions.signIn({
            login: "anonymous",
            password: "q=3?testT"
        });

        // TODO: it is better to load each function at seperate page
        this.props.actions.loadAllProfiles();
        this.props.actions.loadAllCashouts();

        console.log("I am in")

        console.log(this.props);


        // }


        const {receiveData} = this.props;
        // loadProfile();

        const user = JSON.parse(localStorage.getItem('user'));
        console.log("aa" + user)
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        }
    }

    componentDidMount() {
        const openNotification = () => {
            notification.open({
                message: 'Fan Zhang',
                description: (
                    <div>
                        {receiveData()}
                        <p>
                            GitHub地址： <a href="https://github.com/yezihaohao" target="_blank"
                                         rel="noopener noreferrer">https://github.com/yezihaohao</a>
                        </p>
                        <p>
                            博客地址： <a href="https://yezihaohao.github.io/" target="_blank"
                                     rel="noopener noreferrer">https://yezihaohao.github.io/</a>
                        </p>
                    </div>
                ),
                icon: <Icon type="smile-circle" style={{color: 'red'}}/>,
                duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }

    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const {receiveData} = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        console.log("I am in here")

        console.log(this.props);
        const {auth, responsive} = this.props;
        return (
            <Layout>

                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed}/>}
                {/*TODO with layout*/}
                <Layout style={{flexDirection: 'column'}}>
                    {/*TODO with header*/}
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}/>

                    <Content style={{margin: '0 16px', overflow: 'initial', flex: '1 1 0'}}>

                        <Routes auth={auth}
                                adminData={this.props.adminData}
                        />

                    </Content>

                    <Footer style={{textAlign: 'center'}}>
                        StuffDot-Admin ©{new Date().getFullYear()} Created by fanz@stuffDot.com
                    </Footer>
                </Layout>

                {/* {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                } */}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {
        auth,
        responsive,
        adminData: {
            loggedIn: state.auth.loggedIn,
            allUserProfiles: state.allProfiles,
            allCashouts: state.allCashouts,
        }
    }
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),

    actions: {
        signIn: bindActionCreators(signIn, dispatch),
        loadAllProfiles: bindActionCreators(loadAllProfiles, dispatch),
        loadAllCashouts: bindActionCreators(loadAllCashouts, dispatch)

    }

});

export default connect(mapStateToProps, mapDispatchToProps)(App);

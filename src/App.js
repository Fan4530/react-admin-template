import React, {Component} from 'react';
import {Icon, Layout, notification} from 'antd';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import {receiveData} from './actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes';
import {loadProfile} from "./actions/actions-profile";
import {signIn} from "./actions/auth/signIn";
import ThemePicker from "./components/widget/ThemePicker";

const {Content, Footer} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        console.log("show me the responsive");

        console.log(this.props);
        this.props.actions.signIn({
            login: "anonymous",
            password: "q=3?testT"
        });
        console.log("check auth")
        console.log(this.props.data);
        if(this.props.data.loggedIn) {
            console.log("I am in")
            this.props.actions.loadProfile();
        }



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
                message: '博主-yezihaohao',
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
        const {auth, responsive} = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed}/>}
                {/*TODO with layout*/}
                <Layout style={{flexDirection: 'column'}}>
                    {/*TODO with header*/}
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}/>

                    <Content style={{margin: '0 16px', overflow: 'initial', flex: '1 1 0'}}>
                        <Routes auth={auth}/>
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
        data: {
            profiles: state.profiles,
            loggedIn: state.auth.loggedIn,
        }
    }
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),

    actions: {
        loadProfile: bindActionCreators(loadProfile, dispatch),
        signIn: bindActionCreators(signIn, dispatch),
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(App);

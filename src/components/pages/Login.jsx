/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/actions';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        const {receiveData} = this.props;
        receiveData(null, 'auth');
    }

    componentDidUpdate(prevProps) {
        const {auth: nextAuth = {}, history} = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {fetchData} = this.props;
                if (values.userName === 'admin' && values.password === 'admin') fetchData({
                    funcName: 'admin',
                    stateName: 'auth'
                });
                if (values.userName === 'guest' && values.password === 'guest') fetchData({
                    funcName: 'guest',
                    stateName: 'auth'
                });
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>StuffDot Admin</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please enter your user name!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="admin input admin, guest input guest"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please enter your password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="admin input admin, guest input guest"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember Me</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>Forget password?</span>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                sign in
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>or sign up now!</span>
                                <span onClick={this.gitHub}><Icon type="github"/></span>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => {
    const {auth} = state.httpData;
    return {auth};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));


import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import moment from "moment";



class CommissionTable extends React.Component {
    state = {
        filterDropdownVisibleEmail: false,
        filterDropdownVisibleUsername: false,

        data: this.props.data,
        searchText: '',
        filtered: false,
        sortedInfo: null,
    };
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    };
    onSearchUsername = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.map((record) => {
                const match = record.username.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    username: (
                        <span>
              {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    onSearchEmail = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.map((record) => {
                const match = record.email.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    email: (
                        <span>
              {record.email.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};

        const columns = [ {
            title: 'key',
            dataIndex: 'key',
            key: 'key',

        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        }, {
            title: 'Merchant Name',
            dataIndex: 'merchantName',
            key: 'merchantName',

        }, {
            title: 'Transaction Time',
            dataIndex: 'transactionTime',
            key: 'transactionTime',
        }, {
            title: 'Total Commission Value',
            dataIndex: 'totalCommissionValue',
            key: 'totalCommissionValue',
        }, {
            title: 'Pay Date',
            dataIndex: 'payDate',
            key: 'payDate',

        }];
        return (
            <div>
                <Table columns={columns} dataSource={this.props.data} />
                <style>{`
                    .custom-filter-dropdown {
                      padding: 8px;
                      border-radius: 6px;
                      background: #fff;
                      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                    }
                    .custom-filter-dropdown input {
                      width: 130px;
                      margin-right: 8px;
                    }
                    .highlight {
                      color: #f50;
                    }
                `}</style>
            </div>
        );
    }
}

export default CommissionTable;

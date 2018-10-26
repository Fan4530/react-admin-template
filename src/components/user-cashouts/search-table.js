import React from 'react';
import {Button, Icon, Input, Table} from 'antd';

import Switch from "react-switch";


class SearchTable extends React.Component {
    componentWillMount() {
        const paymentStatusMapping = {};
        this.props.data.map((r) => {
            paymentStatusMapping[r.id] = r.status
        })
        this.setState({paymentStatusMapping: paymentStatusMapping})

    }
    state = {
        filterDropdownVisibleEmail: false,
        filterDropdownVisibleUsername: false,
        paymentStatusChecked: false,
        data: this.props.data,
        searchText: '',
        filtered: false,
        sortedInfo: null,
        paymentStatusMapping: Object,
    };
    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    };
    handlePaymentStatusChange = (record) => {
        const request = {
            id: record.id,
            // should be opposite of the original status
            status: record.status ? "REQUESTED" : "PAID"
        }

        this.props.saveCashoutById(request);

        let newData = this.state.data;
        newData[record.key].status = !record.status;
        this.setState({data:newData})


    }
    onSearchUsername = () => {
        const {searchText} = this.state;
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
        const {searchText} = this.state;
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
        let {sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};


        const columns = [{
            title: 'key',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a - b,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearchUsername}
                    />
                    <Button type="primary" onClick={this.onSearchUsername}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
            filterDropdownVisibleUsername: this.state.filterDropdownVisibleUsername,
            onFilterDropdownVisibleChange: visible => this.setState({filterDropdownVisibleUsername: visible}, () => this.searchInput.focus()),
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search email"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearchEmail}
                    />
                    <Button type="primary" onClick={this.onSearchEmail}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
            filterDropdownVisibleEmail: this.state.filterDropdownVisibleEmail,
            onFilterDropdownVisibleChange: visible => this.setState({filterDropdownVisibleEmail: visible}, () => this.searchInput.focus()),
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        }, {
            title: 'Payment Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
        }, {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            render: (text, record) => {

                return (
                    <div>
                        <Switch
                            onChange={() => this.handlePaymentStatusChange(record)}
                            checked={record.status}
                            id="normal-switch"
                        />
                    </div>
                );
            },
        }];

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}/>
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

export default SearchTable;

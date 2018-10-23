
import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import moment from "moment";



class SearchTable extends React.Component {
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
            sorter: (a, b) =>  a - b,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search username"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearchUsername}
                    />
                    <Button type="primary" onClick={this.onSearchUsername}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisibleUsername: this.state.filterDropdownVisibleUsername,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisibleUsername: visible }, () => this.searchInput.focus()),
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
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisibleEmail: this.state.filterDropdownVisibleEmail,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisibleEmail: visible }, () => this.searchInput.focus()),
        }, {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        }, {
            title: 'Last Name',
            dataIndex: 'lasttName',
            key: 'lastName',
        }, {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
        }, {
            title: 'Email CNF',
            dataIndex: 'emailCNF',
            key: 'emailCNF',
            filters: [{
                text: 'Confirmed',
                value: 'true',
            }, {
                text: 'Unconfirmed',
                value: 'false',
            }],
            onFilter: (value, record) => {
                // console.log("temm me the recor")
                // console.log(value)
                // console.log(record)
                return record.emailCNF.indexOf(value) === 0
            }
        }, {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
            filters: [{
                text: 'CUSTOMER',
                value: 'CUSTOMER',
            }, {
                text: 'RETAILER',
                value: 'RETAILER',
            }],
            // filters: [{
            //     text: 'Confirmed',
            //     value: 'true',
            // }, {
            //     text: 'Unconfirmed',
            //     value: 'false',
            // }],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        }, {
            title: 'Registration Date',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            sorter: (a, b) =>  moment(a).isAfter(moment(b)) ? 1 : -1,
            sortOrder: sortedInfo.columnKey === 'registrationDate' && sortedInfo.order,
        }, ];
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

export default SearchTable;

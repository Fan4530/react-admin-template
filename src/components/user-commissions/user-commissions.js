import React from 'react';
import moment from "moment";
import CommissionTable from "./commissions-search-table";


class UserCommissions extends React.Component {


    render() {
        console.log("check data table of the commissions")
        console.log(this.props)
        console.log(this.props.data)
        const preData = this.props.data.data;
        const data = preData.map((r, i) => {

            const payDate = moment(r.payDate).format("YYYY-MM-DD HH:mm")
            const transactionTime = moment(r.transactionDate).format("YYYY-MM-DD HH:mm")

            console.log("time")
            console.log(payDate)
            console.log(r)
            return {
                key: i,

                email: 'zhan978@usc.edu',
                name: 'fan zhang',
                merchantName: 'fan zhang',
                transactionTime,
                totalCommissionValue: r.totalCommissionValue,
                payDate,


            }
        })


        return (
            <div>
                <CommissionTable data={data}/>
            </div>
        );
    }
}

export default UserCommissions;

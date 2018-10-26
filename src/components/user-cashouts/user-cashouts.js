
import React from 'react';
import SearchTable from "./search-table";
import moment from "moment";


class UserCashouts extends React.Component {


    render() {
        console.log("check data table of cashouts")
        console.log(this.props)
        console.log(this.props.data)
        const preData = this.props.data.data;
        if(!preData) {
            return null
        }
        const data = preData.map((r, i) => {

            return {
                key: i,
                username: r.name,
                email: r.email,
                paymentType: r.paymentType,
                amount: r.amount,
                status: r.status == 'REQUESTED' || r.status == 'FAILED' ? false : true,
                id: r.id,
            }
        })
        // console.log("what is the data looks like")
        // console.log(data)

        return (
            <div>
                <SearchTable data={data}
                             saveCashoutById = {this.props.actions.saveCashoutById}
                             loadAllCashouts = {this.props.actions.loadAllCashouts}
                />
            </div>
        );
    }
}

export default UserCashouts;

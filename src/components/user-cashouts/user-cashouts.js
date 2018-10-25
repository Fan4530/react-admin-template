
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
                paymentStatus: r.paymentStatus ? true : false,
                id: r.id,
            }
        })
        // console.log("what is the data looks like")
        // console.log(data)

        return (
            <div>
                <SearchTable data={data}/>
            </div>
        );
    }
}

export default UserCashouts;

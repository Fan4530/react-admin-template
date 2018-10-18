import React from 'react';


class UserCommissions extends React.Component {


    render() {
        console.log("check data table of the commissions")
        console.log(this.props)
        // console.log(this.props.data)
        // const preData = this.props.data.data;
        // const data = preData.map((r, i) => {
        //
        //     const registrationDate = moment(r.createdDate).format("YYYY-MM-DD HH:mm")
        //     console.log("time")
        //     console.log(registrationDate)
        //     console.log(r)
        //     return {
        //         key: i,
        //         username: r.name,
        //         firstName: r.firstName,
        //         lastName: r.lastName,
        //         email: r.email,
        //         emailCNF: r.emailConfirmed ? 'true' : 'false',
        //         type: r.type,
        //         registrationDate,
        //
        //     }
        // })
        // console.log("what is the data looks like")
        // console.log(data)

        return (
            <div>
                {/*<SearchTable data={data}/>*/}
            </div>
        );
    }
}

export default UserCommissions;

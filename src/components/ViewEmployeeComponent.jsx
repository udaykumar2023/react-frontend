import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accountid: this.props.match.params.accountid,
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.accountid,this.state.id).then( res => {

            if(res.data.body!=undefined) {
                console.log("Get contact by id : "+ JSON.stringify(res.data.body[0]));

                if(res.data.body[0].start_date !=undefined) {
                    res.data.body[0].start_date  = res.data.body[0].start_date.substring(0, 10);
                }

                if(res.data.body[0].end_date!=undefined) {
                    res.data.body[0].end_date  = res.data.body[0].end_date.substring(0, 10);
                }
                
                res.data.body[0].is_registered  = res.data.body[0].is_registered==1?'Yes':'No';
                this.setState({employee: res.data.body[0]});
    
            }
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Contact Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Contact ID: &nbsp; &nbsp;</label>
                            <div> { this.state.employee.contact_id }</div>
                        </div>
                        <div className = "row">
                            <label> Start date:  &nbsp; &nbsp;</label>
                            <div> { this.state.employee.start_date }</div>
                        </div>
                        <div className = "row">
                            <label> End date: &nbsp; &nbsp; </label>
                            <div> { this.state.employee.end_date }</div>
                        </div>
                        <div className = "row">
                            <label> Mode of Communication: &nbsp;</label>
                            <div> { this.state.employee.comm_mode }</div>
                        </div>

                        <div className = "row">
                            <label> Preferred calling time:  &nbsp; &nbsp;</label>
                            <div> { this.state.employee.preferred_stime }  to  { this.state.employee.preferred_etime } (24 hours format)</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent

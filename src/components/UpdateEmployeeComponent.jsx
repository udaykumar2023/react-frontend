import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accountid: this.props.match.params.accountid,
            id: this.props.match.params.id,
            contactID: '',
            startDate: '',
            endDate: '',
            commMode:'',
            preferredStartTime:'',
            preferredEndTime:'',
            disableStartAndEndDate:false
        }
        this.changeContactIDHandler = this.changeContactIDHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.changecommModeHandler = this.changecommModeHandler.bind(this);
        this.changepreferredStartTimeHandler = this.changepreferredStartTimeHandler.bind(this);
        this.changepreferredEndTimeHandler = this.changepreferredEndTimeHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.accountid,this.state.id).then( (res) =>{

            console.log("Inside update : edit ");

            if(res.data.body!=undefined) {
                console.log("Get contact by id : "+ JSON.stringify(res.data.body[0]));

                if(res.data.body[0].start_date !=undefined) {
                    res.data.body[0].start_date  = res.data.body[0].start_date.substring(0, 10);
                }
                
                if(res.data.body[0].end_date!=undefined) {
                    res.data.body[0].end_date  = res.data.body[0].end_date.substring(0, 10);

                }
                res.data.body[0].is_registered  = res.data.body[0].is_registered==1?'Yes':'No';
                
                let employee = res.data.body[0];
                this.setState({contactID: employee.contactID,
                    startDate: employee.startDate,
                    endDate : employee.endDate,
                    commMode : employee.commMode,
                    preferredStartTime : employee.preferredStartTime,
                    preferredEndTime : employee.preferredEndTime
                });
    
            }

        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {accountID:"695233040356",contactID: this.state.contactID, startDate: this.state.startDate, endDate: this.state.endDate,
        commMode: this.state.commMode,preferredStartTime: this.state.preferredStartTime,preferredEndTime: this.state.preferredEndTime
        };
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee).then( res => {
            this.props.history.push('/contacts');
        });
    }
    
    changeContactIDHandler= (event) => {
        this.setState({contactID: event.target.value});
    }
    changeStartDateHandler= (event) => {
        this.setState({startDate: event.target.value});
    }
    changeEndDateHandler= (event) => {
        this.setState({endDate: event.target.value});
    }
    changecommModeHandler= (event) => {
        this.setState({commMode: event.target.value});
    }
    changepreferredStartTimeHandler= (event) => {
        this.setState({preferredStartTime: event.target.value});
    }
    changepreferredEndTimeHandler= (event) => {
        this.setState({preferredEndTime: event.target.value});
    }

    cancel(){
        this.props.history.push('/contacts');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Contact Email ID: </label>
                                            <input placeholder="Contact Email ID" name="contactID" className="form-control" 
                                                value={this.state.contactID} onChange={this.changeContactIDHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Start Date: </label>
                                            <input placeholder="Start Date" name="startDate" className="form-control" 
                                                value={this.state.startDate} onChange={this.changeStartDateHandler} disabled={this.state.disableStartAndEndDate}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> End Date: </label>
                                            <input placeholder="End Date" name="endDate" className="form-control" 
                                                value={this.state.endDate} onChange={this.changeEndDateHandler} disabled={this.state.disableStartAndEndDate}/>
                                        </div>

                                        <div className = "form-group">
                                            <label>Communication Mode: </label>
                                            <input placeholder="Communication Mode" name="commMode" className="form-control" 
                                                value={this.state.commMode} onChange={this.changecommModeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Preference call time: </label>
                                            <input placeholder="Preference call start time" name="preferredStartTime" className="form-control" 
                                                value={this.state.preferredStartTime} onChange={this.changepreferredStartTimeHandler}/><br/>
                                            <input placeholder="Preference call end time" name="preferredEndTime" className="form-control" 
                                                value={this.state.preferredEndTime} onChange={this.changepreferredEndTimeHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent

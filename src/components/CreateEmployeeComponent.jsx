import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accountid: this.props.match.params.accountid,
            // step 2
            id: this.props.match.params.id,
            contactID: '',
            startDate: '',
            endDate: '',
            commMode:'',
            preferredStartTime:'',
            preferredEndTime:'',
            is_registered:'',
            disableStartAndEndDate:false
        }
        this.changeContactIDHandler = this.changeContactIDHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.changecommModeHandler = this.changecommModeHandler.bind(this);
        this.changepreferredStartTimeHandler = this.changepreferredStartTimeHandler.bind(this);
        this.changepreferredEndTimeHandler = this.changepreferredEndTimeHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.accountid,this.state.id).then( (res) =>{

                console.log("Inside create : edit ");

                if(res.data.body!=undefined) {
                    console.log("Get contact by id : "+ JSON.stringify(res.data.body[0]));
    
                     if(res.data.body[0].start_date!=undefined) {
                        res.data.body[0].start_date  = res.data.body[0].start_date.substring(0, 10);
                     }   
                     
                     if(res.data.body[0].end_date!=undefined) {
                        res.data.body[0].end_date  = res.data.body[0].end_date.substring(0, 10);

                     }
                    res.data.body[0].is_registered  = res.data.body[0].is_registered==1?'Yes':'No';
                    
                    let employee = res.data.body[0];

                    let disableStartAndEndDatesTemp=false;
                    if(res.data.body[0].is_registered =='Yes') {
                        disableStartAndEndDatesTemp=true;
                    }
                    console.log("disableStartAndEndDatesTemp"+disableStartAndEndDatesTemp);

                    console.log('employee'+JSON.stringify(employee));
                    this.setState({contactID: employee.contact_id,
                        startDate: employee.start_date,
                        endDate : employee.end_date,
                        commMode : employee.comm_mode,
                        preferredStartTime : employee.preferred_stime,
                        preferredEndTime : employee.preferred_etime,
                        disableStartAndEndDate: disableStartAndEndDatesTemp
                    });
        
                }
    
                // let employee = res.data;
                // this.setState({contactID: employee.contactID,
                //     startDate: employee.startDate,
                //     endDate : employee.endDate,
                //     commMode : employee.commMode,
                //     preferredStartTime : employee.preferredStartTime,
                //     preferredEndTime : employee.preferredEndTime
                // });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        
        let employee = {accountID:this.state.accountid,contactID: this.state.contactID, startDate: this.state.startDate, endDate: this.state.endDate,
            commMode: this.state.commMode,preferredStartTime: this.state.preferredStartTime,preferredEndTime: this.state.preferredEndTime,is_registered:this.state.is_registered
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push(`/contacts/${this.state.accountid}`);
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push(`/contacts/${this.state.accountid}`);
            });
        }
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

    // changeLastNameHandler= (event) => {
    //     this.setState({lastName: event.target.value});
    // }

    // changeEmailHandler= (event) => {
    //     this.setState({emailId: event.target.value});
    // }

    cancel(){
        this.props.history.push('/contacts');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Alternate Contact</h3>
        }else{
            return <h3 className="text-center">Update Contact</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Contact Email ID: </label>
                                            <input placeholder="Contact Email ID" name="contactID" className="form-control" 
                                                value={this.state.contactID} onChange={this.changeContactIDHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Start Date: </label>
                                            <input placeholder="yyyy-mm-dd" name="startDate" className="form-control" type="date" 
                                                value={this.state.startDate} onChange={this.changeStartDateHandler} disabled={this.state.disableStartAndEndDate}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> End Date: </label>
                                            <input placeholder="yyyy-mm-dd" name="endDate" className="form-control" type="date" 
                                                value={this.state.endDate} onChange={this.changeEndDateHandler} disabled={this.state.disableStartAndEndDate}/>
                                        </div>

                                        <div className = "form-group">
                                        <label>Communication Mode: </label>
                                            <select className="custom-select" id="commMode" 
                                                value={this.state.commMode} onChange={this.changecommModeHandler}>
                                                <option selected>call</option>
                                                <option selected>email</option>
                                                <option selected>call,email</option>
                                            </select>     
                                        </div>
                                        <div className = "form-group">
                                            <label>Preference call time: </label>
                                            <input placeholder="Preference call start time" name="preferredStartTime" className="form-control" type='time'
                                                value={this.state.preferredStartTime} onChange={this.changepreferredStartTimeHandler}/><br/>
                                            <input placeholder="Preference call end time" name="preferredEndTime" className="form-control" type='time'
                                                value={this.state.preferredEndTime} onChange={this.changepreferredEndTimeHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
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

export default CreateEmployeeComponent

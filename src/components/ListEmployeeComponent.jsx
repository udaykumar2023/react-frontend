import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                awsAccountnumber: ''
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(accountid,id){
        console.log("accountid:->"+accountid+" id:"+id);
        this.props.history.push(`/view-contact/${accountid}/${id}`);
    }
    editEmployee(accountid,id){
        this.props.history.push(`/add-contact/${accountid}/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            console.log("response:"+res);
            console.log("response:"+JSON.stringify(res));
            let awsAccountnumbertemp;
            for (let i = 0; i < res.data.body.length; i++) {
                console.log(JSON.stringify(res.data.body[i]));
                
                awsAccountnumbertemp=res.data.body[i].account_id;
                if(res.data.body[i].start_date!=undefined) {
                    res.data.body[i].start_date  = res.data.body[i].start_date.substring(0, 10);

                }
                if(res.data.body[i].end_date !=undefined) {
                    res.data.body[i].end_date  = res.data.body[i].end_date.substring(0, 10);
                }
                
                res.data.body[i].is_registered  = res.data.body[i].is_registered==1?'Yes':'No';

            }
            this.setState({ employees: res.data.body});
            this.setState({ awsAccountnumber: awsAccountnumbertemp});
        });
    }

    addEmployee(){
        this.props.history.push('/add-contact/alternate/_add');
    }

    render() {
        return (
            <div>
                <h5 style={{textAlign: "right"}}>AWS# {this.state.awsAccountnumber}</h5>
                 <h3 style={{textAlign: "center"}}>Contacts List</h3>
                 <div className = "row">
                    <button className="btn btn-success" onClick={this.addEmployee}> Add alternate contact</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr style={{background: "LightGray"}}>
                                    <th> Contact ID</th>
                                    <th> Start date</th>
                                    <th> End date</th>
                                    <th> Preferred mode</th>
                                    <th> Preferred calling time</th>
                                    <th>Is Registered?</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.contact_id}>
                                             <td> { employee.contact_id} </td>   
                                             <td> {employee.start_date}</td>
                                             <td> {employee.end_date}</td>
                                             <td> {employee.comm_mode}</td>
                                             <td> {employee.preferred_stime} to {employee.preferred_etime} </td>
                                             <td>{employee.is_registered}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.account_id,employee.contact_id)} className="btn btn-warning">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.account_id,employee.contact_id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent

import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://8ureh7i7n7.execute-api.ap-south-1.amazonaws.com/test";

class EmployeeService {

    getEmployees(accountID){

        console.log('accountID'+accountID)
        if(accountID!=undefined) {
            let data = {
                "accountID": accountID
              };
            return axios.post("https://8ureh7i7n7.execute-api.ap-south-1.amazonaws.com/test",data);
        } else {
            return axios.get("https://8ureh7i7n7.execute-api.ap-south-1.amazonaws.com/test");
        }
    }

    createEmployee(employee){
        
        return axios.post("https://qj3eaaotj6.execute-api.ap-south-1.amazonaws.com/TestInsertDetailsById", employee);
    }

    getEmployeeById(accountID,employeeId){
        //return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
        console.log("accountID:"+accountID,"employeeId"+employeeId);
        let data = {
            "accountID": accountID,
            "contactID": employeeId
          };
        return axios.post("https://hsuujo13r1.execute-api.ap-south-1.amazonaws.com/TestgetContactDetailsApi",data);
    
    }

    updateEmployee(employee){

        if(employee.is_registered==1) {
            employee.startDate=null;
            employee.endDate=null;
            
        }

        if(employee.startDate=='0000-00-00') {
            employee.startDate=null;
        }
        if(employee.endDate=='0000-00-00') {
            employee.endDate=null;
        }
        console.log("employee:"+JSON.stringify(employee));
        return axios.post("https://5venvi7aae.execute-api.ap-south-1.amazonaws.com/TestUpdateContactDetailsByID", employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()
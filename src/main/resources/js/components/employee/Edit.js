import React, { Component } from 'react';
import employeeService from "../services/Employee"


export default class Edit extends Component {

  constructor(){
    super()
    this.state = {
      id:0,
      fieldName:"",
      fieldEmail:"",
      fieldPhone:"",
      fieldAddress:"",
    }
  }

  async componentDidMount(){
    console.log("Mounted edit");
    const id = this.props.match.params.id;
    const res = await employeeService.get(id)
    console.log(res);
    if(res.success){
      console.log(res.data);
      this.setState({
        id:res.data.id,
        fieldName:res.data.name,
        fieldEmail:res.data.email,
        fieldAddress:res.data.address,
        fieldPhone:res.data.phone,
      })

    }else {
      alert("Error==>"+res.message)
    }
  }
  
  render() {

    let userId = this.props.match.params.id;

    return (
      <div>
        <h4>Edit Employee {userId} v2 {userId} </h4>
        <hr />
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Name employee</label>
            <input type="text" class="form-control" value={this.state.fieldName} onChange={(event)=>this.setState({fieldName:event.target.value})}/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="email">Email</label>
	          <input type="email" class="form-control" placeholder="you@example.com" value={this.state.fieldEmail} onChange={(event)=>this.setState({fieldEmail:event.target.value})}/>
            
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="address">Address</label>
	          <input type="text" class="form-control" placeholder="1234 Main St" value={this.state.fieldAddress} onChange={(event)=>this.setState({fieldEmail:event.target.value})}/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="address">Phone </label>
	          <input type="text" class="form-control" placeholder="123467890" value={this.state.fieldPhone} onChange={(event)=>this.setState({fieldPhone:event.target.value})}/>
          </div>
        </div>

				<div class="row">
					<div class="col-md-6 mb-3">
          <button class="btn btn-primary btn-block" onClick={()=>this.onClickUpdate()}
		      		type="submit">Update</button>
         </div>
				</div>
      </div>
    )
  }

  async onClickUpdate()
  { 
      console.log("Execute update");
    const res = await employeeService.update(this.state)
    if (res.success) {
      alert(res.message)
    }
    else {
        console.log("Error");
        console.log(res);
      alert("Error ==>"+JSON.stringify(res.data))
    }
  }

}
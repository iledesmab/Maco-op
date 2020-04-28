import React, { Component } from 'react';

import employeeServices from "../services/Employee"

export default class Form extends Component {

	constructor(){
		super();
		this.state = {
			fieldName:"",
			fieldEmail:"",
			fieldAddress:"",
			fieldPhone:"",
			errorfield:[]
		}
	}

  render() {
    return (
      <div>
      	<h4>Create employee v2 </h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Name employee</label>
            <input type="text" class="form-control" placeholder="Name"
            	value={this.state.fieldName}
            	onChange={(event)=>this.setState({fieldName:event.target.value})}
            	/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="email">Email</label>
	          <input type="email" class="form-control" placeholder="you@example.com"
	        	  value={this.state.fieldEmail}
          		  onChange={(event)=>this.setState({fieldEmail:event.target.value})}
	        	  />
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="address">Address</label>
	          <input type="text" class="form-control" placeholder="1234 Main St"
							value={this.state.fieldAddress}
							onChange={(event)=>this.setState({fieldAddress:event.target.value})}
						/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="phone">Phone </label>
	          <input type="text" class="form-control" placeholder="123467890"
							value={this.state.fieldPhone}
							onChange={(event)=>this.setState({fieldPhone:event.target.value})}
						/>
          </div>
        </div>

		{
			this.state.errorfield.map((itemerror)=>{
				return(
				<p class="text-danger">{itemerror}</p>
				);
			})
		}

				<div class="row">
					<div class="col-md-6 mb-3">
		      	<button onClick={()=>this.onClickSave()} class="btn btn-primary btn-block" type="submit">Save</button>
					</div>
				</div>
      </div>
    )
  }

	async onClickSave()
	{
		const res = await employeeServices.create(this.state)
		if (res.success) {
			alert(res.message)
			console.log(res);
			window.location.replace("/employee/index")
		}
		else {
			alert("Error ==>"+JSON.stringify(res))
			const DataError = []
			DataError.push(res.message);
			this.setState({errorfield:DataError});
			console.log(res);
		}
	}

}

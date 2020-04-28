import React, { Component } from 'react';

import employeeServices from "../services/Employee"
import { Link } from "react-router-dom";

export default class List extends Component {

  constructor()
  {
    super()
    this.state = {
      listEmployee:[]
    }
  }

  async componentDidMount()
  {
     console.log("Mounted list");
     const res = await employeeServices.list()
     console.log(res);
     if (res.success) {
       this.setState({listEmployee:res.list})
     }
     else {
       alert("Error ==>"+res.message)
     }
  }

  render() {
    return (
      <section>
      <h4>Employee List v3</h4>
      <hr/>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
             this.state.listEmployee.map((data,i)=>{
               return(
                 <tr>
                   <th scope="row">{data.id}</th>
                   <td>{data.name}</td>
                   <td>{data.email}</td>
                   <td>{data.address}</td>
                   <td>{data.phone}</td>
                   <td>
                     <Link class="btn btn-outline-info" to={"/employee/edit/"+data.id}>Edit</Link>
                     <a onClick={() => this.onClickDelete(i,data.id)} href="#" class="btn btn-danger"> Delete </a>
                   </td>
                 </tr>
               )
             })
           }
          </tbody>
        </table>
      </section>
    )
  }

  async onClickDelete(index,id){
    var yes = confirm("Are you sure you want to delete this item?")

    if(yes==true){

      const res = await employeeServices.delete(id)

      if (res.success){
      alert(res.message)
      const list = this.state.listEmployee
      list.splice(index,1)
      this.setState({listEmployee:list})
      }else{
        alert("Error server ==>"+JSON.stringify(res))
      }
    }
  }
}
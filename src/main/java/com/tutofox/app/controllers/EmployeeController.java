package com.tutofox.app.controllers;
  
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tutofox.app.models.Employee;
import com.tutofox.app.repository.EmployeeRepository;
import com.tutofox.app.models.*;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

	@Autowired
	EmployeeRepository employeeRepository;

@PostMapping(value="/create")
public Map<String, Object> create(@RequestBody Employee data){
	HashMap<String, Object> response = new HashMap<String, Object>();

	try {

		Optional<Employee> validEmail = employeeRepository.findByEmail(data.getEmail());

		if(validEmail.isPresent()){
			response.put("message", "The email "+data.getEmail()+"is already register");
			response.put("success", false);
			return response;
		}else {
		employeeRepository.save(data);
		response.put("message", "Successful save");
		response.put("success", true);
		return response;
		}
		
	} catch (Exception e) {
		response.put("message",e.getMessage()); 
		response.put("success",false);
		return response;
	}
} 
	/*
	@GetMapping(value = "/test")
	public List<Employee> test() {
		return employeeRepository.findAll();
	}
	
	@GetMapping(value = "/test2")
	public Optional<Employee> test2() {
		int id = 2;
		return employeeRepository.findById(id);
	} 
	
	@GetMapping(value = "/test3")
	public List<Employee> test3() {
		String name = "Andres";
		String likeName = "%"+name+"%";
		return employeeRepository.findByNameLike(likeName);
	} 	
	
	@PostMapping(value="/create")
	public ResponseEntity<String> create(@RequestBody Employee data){
		
		try {
			System. out. print("Proceso de guardar datos");
			employeeRepository.save(data);
			return new ResponseEntity<>( "Save successful " , HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.print(e);
			return new ResponseEntity<>( ""+e , HttpStatus.INTERNAL_SERVER_ERROR);
		}

	 }
	 */
	 
	@GetMapping(value="/list")
	public Map<String, Object> list(){
		
		HashMap<String,Object> response = new HashMap<String,Object>();
		
		try { 
			List<Employee> employeeList; 
			employeeList = employeeRepository.findAll();
			response.put("message","Successful load");
			response.put("list",employeeList);
			response.put("success",true);
			return response;
			
		} catch (Exception e) {  
			response.put("message",e.getMessage()); 
			response.put("success ",false);
			return response;
		}
		
	}

	@GetMapping(value="/get/{id}")
	public Map<String, Object> edit(@PathVariable("id") Integer id){
		
		HashMap<String, Object> response = new HashMap<String,Object>();
		try {
			
			Optional<Employee> employee = employeeRepository.findById(id);

			if(employee.isPresent()) {
				response.put("message", "Successful load");
				response.put("data", employee);
				response.put("success", true);
				return response;
			}else{
				response.put("message", "No data");
				response.put("data", null);
				response.put("success", false);
				return response;
			}

		} catch (Exception e) {
			response.put("message", e.getMessage());
			response.put("success", false);
			return response;
		} 

	}

	@PutMapping(value="/update/{id}")  
	public Map<String, Object> update(@PathVariable("id") Integer id,
			@RequestBody Employee data ){
		
		HashMap<String,Object> response = new HashMap<String,Object>();
		
		try {  
			data.setId(id);
			employeeRepository.save(data);
			response.put("message","Successful update"); 
			response.put("success",true);
			return response;
		} catch (Exception e) {
			response.put("message",e.getMessage()); 
			response.put("success",false);
			return response;
		}
		
	} 

	@DeleteMapping(value="/delete/{id}")
	public Map<String, Object> delete(@PathVariable("id") Integer id){
		HashMap<String,Object> response = new HashMap<String,Object>();
		try {  
			employeeRepository.deleteById(id);
			response.put("message","Successful delete"); 
			response.put("success",true);
			return response;
		} catch (Exception e) {
			response.put("message",e.getMessage()); 
			response.put("success",false);
			return response;
		}
	}
 
}
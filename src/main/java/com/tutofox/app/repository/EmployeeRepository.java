package com.tutofox.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tutofox.app.models.Employee;
 
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	List<Employee> findByName(String name);
	List<Employee> findByNameLike(String name);
	Optional<Employee> findByEmail(String email);
}
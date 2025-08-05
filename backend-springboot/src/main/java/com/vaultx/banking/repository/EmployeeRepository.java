package com.vaultx.banking.repository;

import com.vaultx.banking.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    Optional<Employee> findByEmployeeId(String employeeId);
    
    Optional<Employee> findByEmail(String email);
    
    List<Employee> findByRole(Employee.EmployeeRole role);
    
    List<Employee> findByIsActiveTrue();
    
    boolean existsByEmployeeId(String employeeId);
    
    boolean existsByEmail(String email);
}

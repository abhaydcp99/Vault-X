package com.vaultx.banking.repository;

import com.vaultx.banking.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    Optional<Customer> findByEmail(String email);
    
    Optional<Customer> findByPhone(String phone);
    
    Optional<Customer> findByAccountNumber(String accountNumber);
    
    List<Customer> findByStatus(Customer.CustomerStatus status);
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.status = 'APPROVED'")
    long countApprovedCustomers();
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.canPerformOperations = true")
    long countActiveCustomers();
    
    @Query("SELECT SUM(c.currentBalance) FROM Customer c WHERE c.status = 'APPROVED'")
    Double getTotalBalance();
    
    boolean existsByEmail(String email);
    
    boolean existsByPhone(String phone);
    
    boolean existsByAccountNumber(String accountNumber);
}

package com.vaultx.banking.repository;

import com.vaultx.banking.entity.Transaction;
import com.vaultx.banking.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.math.BigDecimal;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    List<Transaction> findByCustomerOrderByCreatedAtDesc(Customer customer);
    
    List<Transaction> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.customer.id = ?1 AND t.transactionType = 'CREDIT'")
    BigDecimal getTotalCreditsForCustomer(Long customerId);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.customer.id = ?1 AND t.transactionType = 'DEBIT'")
    BigDecimal getTotalDebitsForCustomer(Long customerId);
    
    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.customer.id = ?1")
    long getTransactionCountForCustomer(Long customerId);
}

package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.User;

// the meaning of this interface is to interact with the database to perform CRUD operations on User entities
// The JpaRepository provides methods like save, findById, findAll, deleteById, etc.
/*
 * This provides the following methods:
 * 1. save(S entity): Saves a given entity.
 * 2. findById(ID id): Retrieves an entity by its id.
 * 3. findAll(): Returns all instances of the type.
 * 4. deleteById(ID id): Deletes the entity with the given id.
 * 5. delete(S entity): Deletes a given entity.
 * 6. count(): Returns the number of entities.
 * 7. existsById(ID id): Checks if an entity with the given id exists.
 */
//Repository is a specialization of @Component, indicating that the class provides the mechanism for storage, retrieval, search, update and delete operation on objects.
//The repository in this context is an interface that extends JpaRepository, which is a part of Spring Data JPA. This interface provides JPA related methods such as saving, deleting, and finding entities.

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This is used in UserService to check if a user exists
    User findByEmail(String email);
    User findByPhone(String phone);
    // This method is not used currently, but can be used for login functionality
    // The @Query annotation is used to define a custom query
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.passwordHash = ?2")// a custom query to find a user by email and password hash
    User findByEmailAndPasswordHash(String email, String passwordHash);// to use this we will call userRepository.findByEmailAndPasswordHash(email, passwordHash) in UserService

}
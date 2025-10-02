package com.internlink.backend.entity;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;     
import lombok.Getter;
import lombok.Setter;

//this class represents a user in the system
//this file represents the User entity in the database
/*
 * how to use this class?
 *  1. When a new user signs up, an instance of this User class is created.
 * 2. The user's details (like fullName, email, passwordHash, etc.) are set using the setter methods provided by the @Setter annotation from Lombok.
 * 3. The instance is then saved to the database using a repository (like UserRepository) which extends JpaRepository.
 * 4. When you need to retrieve user details, you can use the repository to fetch the user from the database, which will return an instance of this User class.
 * 5. You can then use the getter methods provided by the @Getter annotation to access the user's details.
 * now the question is, how does the repository know which table to look for?
 * The @Table(name = "users") annotation specifies that this entity is mapped to the "users" table in the database.
 * The @Entity annotation indicates that this class is a JPA entity.
 * The @Id annotation specifies the primary key of the entity.
 * The @GeneratedValue(strategy = GenerationType.IDENTITY) annotation indicates that the primary key is auto-incremented.
 * The @Column annotations are used to specify the details of the columns in the database table.
 * For example, @Column(name = "full_name", nullable = false) indicates that the fullName field is mapped to the "full_name" column in the database and it cannot be null.
 * Now how do we use this class in the signup process?
 * 1. When a user submits the signup form, the data is sent to the backend (e.g., via a REST API).
 * 2. The backend receives the data and creates an instance of the SignupRequest class to hold the incoming data.
 * 3. The backend then creates a new instance of the User class.
 * 4. The details from the SignupRequest instance are set to the User instance using the setter methods.
 * 5. The User instance is then saved to the database using the UserRepository.
 * 6. If the save operation is successful, the backend can return a success response to the frontend.
 * 7. If there are any errors (like email already registered), the backend can return an error response.
 * * This process is typically handled in a service class (like UserService) and a controller class (like AuthController).
 */
@Entity // This annotation indicates that the class is a JPA entity
@Table(name = "users") // This annotation specifies the table name in the database
@Getter //getters are used to retrieve the value of a variable
@Setter //setters are used to set the value of a variable
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    
    private String organization;
    
    @Column(length = 20)
    private String phone;

    @Column(nullable=false)
    private String role;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
}

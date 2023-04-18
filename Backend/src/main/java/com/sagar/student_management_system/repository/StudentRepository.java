package com.sagar.student_management_system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.sagar.student_management_system.bean.Student;

public interface StudentRepository extends MongoRepository<Student, String> {

}

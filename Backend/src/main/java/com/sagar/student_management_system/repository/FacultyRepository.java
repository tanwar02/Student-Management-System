package com.sagar.student_management_system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.sagar.student_management_system.bean.Faculty;

public interface FacultyRepository extends MongoRepository<Faculty, String> {

}


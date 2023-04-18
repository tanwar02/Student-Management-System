package com.sagar.student_management_system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.sagar.student_management_system.bean.Course;

public interface CourseRepository extends MongoRepository<Course, String> {
	
}

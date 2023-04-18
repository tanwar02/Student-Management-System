package com.sagar.student_management_system.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.sagar.student_management_system.bean.Course;
import com.sagar.student_management_system.bean.Generate;
import com.sagar.student_management_system.repository.CourseRepository;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepository repository;
	
	public List<Course> getCourses(){
		
		return repository.findAll();
	}
	
    public Course getCourse(String id) {
		
		return repository.findById(id).get();
	}
	
	public boolean addCourse(Course course) {
		
		course.setId(course.getBranch());
		if(repository.existsById(course.getId())) return false;
		repository.insert(course);
		return true;
	}
	
	public ResponseEntity<String> deleteCourse(String id) {
		
		Course course = getCourse(id);
		if(course.getFilledSeats() > 0) 
			return ResponseEntity.badRequest().body("Failed to delete because "+course.getFilledSeats()+" students exists in "+course.getBranch()+" Branch");
		repository.deleteById(id);
		return ResponseEntity.ok().body("Course Deleted Successfully");
	}
	
	public boolean updateCourse(Course course) {
		
		if(!repository.existsById(course.getId())) return false;
		repository.save(course);
		return true;
	}
}

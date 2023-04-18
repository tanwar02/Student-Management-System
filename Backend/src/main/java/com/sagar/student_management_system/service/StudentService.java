package com.sagar.student_management_system.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sagar.student_management_system.bean.Course;
import com.sagar.student_management_system.bean.Generate;
import com.sagar.student_management_system.bean.Student;
import com.sagar.student_management_system.repository.CourseRepository;
import com.sagar.student_management_system.repository.StudentRepository;

@Service
public class StudentService {
	
	@Autowired
	private StudentRepository repository;
	
	@Autowired
	private CourseService courseService;
	
	public List<Student> getStudents(){
		
		return repository.findAll();
	}
	
	public Student getStudent(String id) {
		
		return repository.findById(id).get();
	} 
	
	public ResponseEntity<String> addStudent(Student student) {
		
		Course course = courseService.getCourse(student.getBranch());
		if(course.getFilledSeats() == course.getTotalSeats()) 
			return ResponseEntity.badRequest().body("Seats in "+ course.getId() +" branch are fulfilled");
		student.setId(Generate.generateID(student.getMail()));
		student.setPassword(Generate.generatePassword(student.getName()));
		if(repository.existsById(student.getId()))
			return ResponseEntity.badRequest().body("Student already exists");
		repository.insert(student);
		course.setFilledSeats(course.getFilledSeats() + 1);
		courseService.updateCourse(course);
		return ResponseEntity.ok(null);
	}
	
	public boolean deleteStudent(String id) {
		
		if(!repository.existsById(id))
			return false;
		Course course = courseService.getCourse(getStudent(id).getBranch());
		course.setFilledSeats(course.getFilledSeats() - 1);
		courseService.updateCourse(course);
		repository.deleteById(id);
		return true; 
	}
	
	public boolean updateStudent(Student student) {
		
		Student stu = getStudent(student.getId());
		if(!stu.getBranch().equals(student.getBranch())) {
			
			Course course = courseService.getCourse(student.getBranch());
			if(course.getFilledSeats() == course.getTotalSeats()) return false;
			course.setFilledSeats(course.getFilledSeats() + 1);
			courseService.updateCourse(course);
			
			Course prev = courseService.getCourse(stu.getBranch());
			prev.setFilledSeats(prev.getFilledSeats() - 1); 
			courseService.updateCourse(prev);
		}
	    repository.save(student);
		return true; 
	}
}

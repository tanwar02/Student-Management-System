package com.sagar.student_management_system.bean;

public class Admin {
	
	private String id;

	@Override
	public String toString() {
		return "Admin [userId=" + id + "]";
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}

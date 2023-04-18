package com.sagar.student_management_system.bean;

public class Login {
	
	public String type;
	String id;
	String password;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "Login [type=" + type + ", id=" + id + ", password=" + password + "]";
	}
}

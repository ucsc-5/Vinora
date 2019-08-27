package com.jcl.vinora.models;

public class User {
	private  String Name,Password,IsStaff;
    private String Phone;
    
    public User()
    {

    }

    public String getIsStaff() {
        return IsStaff;
    }

    public void setIsStaff(String isStaff) {
        IsStaff = isStaff;
    }

    public User(String name, String password) {
        Name = name;
        Password = password;
        IsStaff="false";


    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
    
    

}

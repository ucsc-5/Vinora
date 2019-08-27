package com.jcl.vinora.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.jcl.vinora.models.User;

@RestController
@CrossOrigin(origins="*",allowedHeaders="*",maxAge=3600)
public class UserController {
	boolean result=false;
	@PostMapping("/usercreate")
	public boolean createCustomer(User user1)
	{
		FirebaseDatabase database=FirebaseDatabase.getInstance();
        final DatabaseReference table_user=database.getReference("User");
        User user=new User(user1.getName(),user1.getPassword());
        table_user.child(user1.getPhone()).setValue(user, null);
		result=true;
		return result;
	}

}

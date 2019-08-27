package com.jcl.vinora.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*",allowedHeaders="*",maxAge=3600)
public class Controller {
	
	@RequestMapping("/")
	public String index()
	{
		return "Greetings from Spring Boot!";
	}

}

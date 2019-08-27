package com.jcl.vinora;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
public class VinoraApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(VinoraApplication.class, args);
		
		FileInputStream serviceAccount;
		try {
			serviceAccount = new FileInputStream("./vinora-dc8a2-firebase-adminsdk-b1ct4-fd1345baaf.json");
			FirebaseOptions options;
			options = new FirebaseOptions.Builder()
					  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
					  .setDatabaseUrl("https://vinora-dc8a2.firebaseio.com")
					  .build();
			FirebaseApp.initializeApp(options);
		} catch (FileNotFoundException e) {
			
			e.printStackTrace();
		}
		
		
		


				
		
	}

}

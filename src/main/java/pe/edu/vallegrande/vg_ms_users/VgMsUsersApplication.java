package pe.edu.vallegrande.vg_ms_users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "pe.edu.vallegrande.vg_ms_users.domain.repository")
public class VgMsUsersApplication {

	public static void main(String[] args) {
		SpringApplication.run(VgMsUsersApplication.class, args);
	}
}

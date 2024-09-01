package pe.edu.vallegrande.vg_ms_users.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@Document(collection = "users") // Nombre de la colección en MongoDB
public class User {

    // Getters y Setters
    @Id
    private String id;
    private String name;
    private String lastName;
    private String email;
    private String documentNumber;
    private String documentType;
    private String password;
    private String phone;
    private List<String> roles;

    public User(String id, String name, String email, String documentNumber, String documentType, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.documentNumber = documentNumber;
        this.documentType = documentType;
        this.phone = phone;
    }

}

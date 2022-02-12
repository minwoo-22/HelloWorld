package com.helloworld.project.domain;

import com.helloworld.project.domain.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;
    private String picture;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    private String privateId;

    @Builder
    public User(String name, String email, String picture, Role role, String privateId) {
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
        this.privateId = privateId;
    }

    public User update(String name, String picture) {
        this.name = name;
        this.picture = picture;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}

package com.ssafy.bridgetalkback.parents.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
@Table(name="parents")
public class Parents extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(name = "parents_uuid", columnDefinition = "BINARY(16)")
    private UUID uuid;

    @Column(nullable = false, length = 20)
    private String parentsName;

    @Embedded
    private Email parentsEmail;

    @Embedded
    private Password parentsPassword;

    @Column(nullable = false, length = 20)
    private String parentsNickname;

    @Column(nullable = false)
    private String parentsDino;

    @Column(nullable = false)
    private int parentsActive;

    @Convert(converter = Role.RoleConverter.class)
    private Role role;

    @OneToMany(mappedBy = "parents", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Kids> kidsList = new ArrayList<>();

    private Parents(String parentsName, Email parentsEmail, Password parentsPassword, String parentsNickname, String parentsDino) {
        this.uuid = UUID.randomUUID();
        this.parentsName = parentsName;
        this.parentsEmail = parentsEmail;
        this.parentsPassword = parentsPassword;
        this.parentsNickname = parentsNickname;
        this.parentsDino = parentsDino;
        this.parentsActive = 0;
        this.role = Role.USER;
    }

    public static Parents createParents(String parentsName, Email parentsEmail, Password parentsPassword, String parentsNickname, String parentsDino) {
        return new Parents(parentsName, parentsEmail, parentsPassword, parentsNickname, parentsDino);
    }

    public String getRoleKey() {
        return this.role.getAuthority();
    }
}

package com.ssafy.bridgetalkback.kid.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.parent.domain.Parents;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
@Table(name="kids")
public class Kids extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(name = "kids_uuid", columnDefinition = "BINARY(16)")
    private UUID uuid;

    @Column(nullable = false, length = 20)
    private String kidsName;

    @Column(nullable = false, length = 30)
    private String kidsEmail;

    @Column(nullable = false, length = 20)
    private String kidsNickname;

    @Column(nullable = false)
    private String kidsDino;

    @Convert(converter = Role.RoleConverter.class)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parents_uuid", referencedColumnName = "parents_uuid")
    private Parents parents;

    private Kids(Parents parents, String kidsName, String kidsEmail, String kidsNickname, String kidsDino) {
        this.uuid = UUID.randomUUID();
        this.parents = parents;
        this.kidsName = kidsName;
        this.kidsEmail = kidsEmail;
        this.kidsNickname = kidsNickname;
        this.kidsDino = kidsDino;
        this.role = Role.USER;
    }

    public static Kids createKids(Parents parents, String kidsName, String kidsEmail, String kidsNickname, String kidsDino) {
        return new Kids(parents, kidsName, kidsEmail, kidsNickname, kidsDino);
    }

    public String getRoleKey() {
        return this.role.getAuthority();
    }
}

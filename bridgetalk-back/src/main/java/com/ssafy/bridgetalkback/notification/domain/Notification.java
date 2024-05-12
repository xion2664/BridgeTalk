package com.ssafy.bridgetalkback.notification.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.checkerframework.checker.units.qual.N;

import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="notifications")
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column
    private String emitterId;

    @Column
    private String receiverUuid; //uuid

    @Column
    private String content;

    @Column(columnDefinition = "integer default 0")
    private int isChecked;

    private Notification(String receiverUuid, String emitterId, String content) {
        this.receiverUuid = receiverUuid;
        this.emitterId = emitterId;
        this.content = content;
    }

    public static Notification createNotification(String receiverUuid, String emitterId, String content){
        return new Notification(receiverUuid, emitterId, content);
    }

    public void updateNotification(){
        this.isChecked = 1;
    }

}

package com.ssafy.bridgetalkback.notification.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.notification.domain.Notification;
import com.ssafy.bridgetalkback.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "notification", description = "NotificationController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

//    @Operation(summary = "알림전체조회")
    @GetMapping("")
    public ResponseEntity<List<Notification>> getAllNotificationByReceiverUuid(@ExtractPayload String userId) {
        return ResponseEntity.ok().body(notificationService.getAllNotificationByReceiverUuid(userId));
    }

//    @Operation(summary = "알림전체읽음")
    @PutMapping("/read")
    public ResponseEntity<List<Notification>> updateNotificationReadStatusByReceiverUuid(@ExtractPayload String userId) {
        notificationService.updateNotificationReadStatusByReceiverUuid(userId);
        return ResponseEntity.ok().body(notificationService.getAllNotificationByReceiverUuid(userId)); //수정 후 새롭게 전달
    }

//    @Operation(summary = "알림삭제")
    @DeleteMapping("/{notificationId}/delete")
    public ResponseEntity<List<Notification>> updateNotificationDeleteStatusById(@ExtractPayload String userId, @PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok().body(notificationService.getAllNotificationByReceiverUuid(userId)); //수정 후 새롭게 전달
    }

//    @Operation(summary = "라이브퀴즈알림발송")
//    @GetMapping("/notification/livequiz")
//    public ResponseEntity<MsgResponse> notificationLivequiz(@Parameter(hidden = true) @AuthenticationPrincipal UserDetailsImpl userDetails) {
//        return ResponseEntity.ok().body(notificationService.sendNotifications(userDetails.getMember()));
//    }
    @GetMapping("/send-test/{receiverUuid}")
    public ResponseEntity<?> sendTest(@ExtractPayload String userId, @PathVariable String receiverUuid){
        notificationService.sendNotification(receiverUuid);
        return ResponseEntity.ok().body("success to send notification");
    }
}

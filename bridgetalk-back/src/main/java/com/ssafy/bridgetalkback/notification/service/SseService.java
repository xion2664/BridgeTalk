package com.ssafy.bridgetalkback.notification.service;

import com.ssafy.bridgetalkback.notification.repository.SseRepositoryImpl;
import com.ssafy.bridgetalkback.notification.domain.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class SseService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60; //60분

    private final SseRepositoryImpl sseRepository;

    /**
     * [SSE 통신]연결
     */
    public SseEmitter subscribe(String receiverUuid, String lastEventId) {
        String emitterId = receiverUuid + "_" + System.currentTimeMillis();

        SseEmitter sseEmitter = sseRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
//        log.info("new emitter added : {}", sseEmitter);
//        log.info("lastEventId : {}", lastEventId);

        /* 상황별 emitter 삭제 처리 */
        sseEmitter.onCompletion(() -> sseRepository.deleteEmitterById(emitterId)); //완료 시, 타임아웃 시, 에러 발생 시
        sseEmitter.onTimeout(() -> sseRepository.deleteEmitterById(emitterId));
        sseEmitter.onError((e) -> sseRepository.deleteEmitterById(emitterId));

        /* 503 Service Unavailable 방지용 dummy event 전송 */
        sendStart(sseEmitter, emitterId, createDummyNotification(receiverUuid));

        /* client가 미수신한 event 목록이 존재하는 경우 */
        if(!lastEventId.isEmpty()) { //client가 미수신한 event가 존재하는 경우 이를 전송하여 유실 예방
            Map<String, Object> eventCaches = sseRepository.findAllEventCacheStartsWithReceiverUuid(receiverUuid); //id에 해당하는 eventCache 조회
            eventCaches.entrySet().stream() //미수신 상태인 event 목록 전송
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> emitEventToClient(sseEmitter, entry.getKey(), entry.getValue()));
        }

        return sseEmitter;
    }

    /**
     * [SSE 통신]specific user에게 알림 전송
     */
//    public void send(Notification notificationResult) {
//        /* 로그인한 client의 sseEmitter 전체 호출 */
//        Map<String, SseEmitter> sseEmitters = sseRepository.findAllEmitterStartsWithReceiverUuid(notificationResult.getReceiverUuid());
//        sseEmitters.forEach(
//                (key, sseEmitter) -> {
//                    //log.info("key, notification : {}, {}", key, notification);
//                    sseRepository.saveEventCache(key, notificationResult); //저장
//                    emitEventToClient(sseEmitter, key, notificationResult); //전송
//                }
//        );
//    }

    public void send(String receiverUuid) {
        Map<String, SseEmitter> sseEmitters = sseRepository.findAllEmitter();
        sseEmitters.forEach(
                (key, sseEmitter) -> {
                    Notification notification = Notification.createNotification(receiverUuid, key, "send to notification");
                    log.info("key, notification : {}, {}", key, notification);
                    sseRepository.saveEventCache(key, notification); //저장
                    emitEventToClient(sseEmitter, key, notification); //전송
                });
    }

    /**
     * [SSE 통신]dummy data 생성
     * : 503 Service Unavailable 방지
     */
    private Notification createDummyNotification(String receiverUuid) {
        return Notification.createNotification(receiverUuid, receiverUuid+"_"+System.currentTimeMillis(), "send dummy data to client");
//        return Notification.builder()
//                .notificationId(receiver + "_" + System.currentTimeMillis())
//                .receiver(receiver)
//                .content("send dummy data to client.")
//                .notificationType(NotificationType.NOTICE.getAlias())
//                .url(NotificationType.NOTICE.getPath())
//                .readYn('N')
//                .deletedYn('N')
//                .build();
    }
    /**
     * [SSE 통신]notification type별 event 전송
     */
    private void sendStart(SseEmitter sseEmitter, String emitterId, Object data) {
        try {
            sseEmitter.send(SseEmitter.event()
                    .id(emitterId)
                    .name("sse")
                    .data(data, MediaType.APPLICATION_JSON));
        } catch(IOException exception) {
            sseRepository.deleteEmitterById(emitterId);
            sseEmitter.completeWithError(exception);
        }
    }

    /**
     * [SSE 통신]
     */
    private void emitEventToClient(SseEmitter sseEmitter, String emitterId, Object data) {
        try {
            sendStart(sseEmitter, emitterId, data);
        } catch (Exception e) {
            sseRepository.deleteEmitterById(emitterId);
            throw new RuntimeException("Connection Failed.");
        }
    }

}

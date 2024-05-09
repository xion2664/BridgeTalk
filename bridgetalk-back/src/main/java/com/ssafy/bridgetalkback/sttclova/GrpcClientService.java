package com.ssafy.bridgetalkback.sttclova;

import java.io.FileInputStream;
import java.util.concurrent.CountDownLatch;

import com.google.protobuf.ByteString;

import io.grpc.ManagedChannel;
import io.grpc.Metadata;
//import clova.*
import io.grpc.StatusRuntimeException;
import io.grpc.netty.NettyChannelBuilder;
import io.grpc.stub.MetadataUtils;
import io.grpc.stub.StreamObserver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class GrpcClientService {

    @Value("${CLOVA_SPEECH_SECRET}")
    private String clovaSpeechSecret;


    @Async
    public void startGrpcClient() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);
        ManagedChannel channel = NettyChannelBuilder
                .forTarget("clovaspeech-gw.ncloud.com:50051")
                .useTransportSecurity()
                .build();

        NestServiceGrpc.NestServiceStub client = NestServiceGrpc.newStub(channel);
        Metadata metadata = new Metadata();
        metadata.put(Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER),
                "Bearer " + clovaSpeechSecret);

        client = MetadataUtils.attachHeaders(client, metadata);

        StreamObserver<NestResponse> responseObserver = new StreamObserver<NestResponse>() {
            @Override
            public void onNext(NestResponse response) {
                System.out.println("Received response: " + response.getContents());
            }

            @Override
            public void onError(Throwable t) {
                System.out.println("Error: " + t.getMessage());
                latch.countDown();
            }

            @Override
            public void onCompleted() {
                System.out.println("Stream completed.");
                latch.countDown();
            }
        };

        StreamObserver<NestRequest> requestObserver = client.recognize(responseObserver);
        try {
            requestObserver.onNext(NestRequest.newBuilder()
                    .setType(RequestType.CONFIG)
                    .setConfig(NestConfig.newBuilder()
                            .setConfig("{\"transcription\":{\"language\":\"ko\"}}")
                            .build())
                    .build());

            java.io.File file = new java.io.File("~/media/42s.wav");
            byte[] buffer = new byte[32000];
            int bytesRead;
            try (FileInputStream inputStream = new FileInputStream(file)) {
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    requestObserver.onNext(NestRequest.newBuilder()
                            .setType(RequestType.DATA)
                            .setData(NestData.newBuilder()
                                    .setChunk(ByteString.copyFrom(buffer, 0, bytesRead))
                                    .setExtraContents("{ \"seqId\": 0, \"epFlag\": false}")
                                    .build())
                            .build());
                }
            }
            requestObserver.onCompleted();
        } catch (Exception e) {
            requestObserver.onError(e);
        }
        latch.await();
        channel.shutdown();
    }

}

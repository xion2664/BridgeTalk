package com.ssafy.bridgetalkback;

import com.ssafy.bridgetalkback.sttclova.GrpcClientService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BridgetalkBackApplication {

	public static void main(String[] args) {

		ConfigurableApplicationContext context = SpringApplication.run(BridgetalkBackApplication.class, args);
		GrpcClientService grpcClientService = context.getBean(GrpcClientService.class);
		try {
			grpcClientService.startGrpcClient();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}

}

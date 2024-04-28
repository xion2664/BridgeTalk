package com.ssafy.bridgetalkback.common;

<<<<<<< bridgetalk-back/src/test/java/com/ssafy/bridgetalkback/common/ServiceTest.java
=======
import com.ssafy.bridgetalkback.auth.repository.RefreshTokenRedisRepository;
>>>>>>> bridgetalk-back/src/test/java/com/ssafy/bridgetalkback/common/ServiceTest.java
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import com.ssafy.bridgetalkback.parents.repository.ParentsRepository;
import com.ssafy.bridgetalkback.reports.repository.ReportsRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
public class ServiceTest {
    @Autowired
    private DatabaseCleaner databaseCleaner;

    @Autowired
    protected ParentsRepository parentsRepository;

    @Autowired
    protected KidsRepository kidsRepository;

    @Autowired
    protected ReportsRepository reportsRepository;

    @Autowired
    protected RefreshTokenRedisRepository refreshTokenRedisRepository;


    @AfterEach
    void clearDatabase() {
        databaseCleaner.cleanUpDatabase();
    }

    public void flushAndClear() {
        databaseCleaner.flushAndClear();
    }
}
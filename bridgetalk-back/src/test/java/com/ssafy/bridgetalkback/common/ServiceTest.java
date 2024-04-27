package com.ssafy.bridgetalkback.common;

import com.ssafy.bridgetalkback.auth.repository.RefreshTokenRedisRepository;
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import com.ssafy.bridgetalkback.letters.repository.LettersRepository;
import com.ssafy.bridgetalkback.parents.repository.ParentsRepository;
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
    protected RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Autowired
    protected LettersRepository lettersRepository;

    @AfterEach
    void clearDatabase() {
        databaseCleaner.cleanUpDatabase();
    }

    public void flushAndClear() {
        databaseCleaner.flushAndClear();
    }
}
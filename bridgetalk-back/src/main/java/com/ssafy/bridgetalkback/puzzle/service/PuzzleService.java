package com.ssafy.bridgetalkback.puzzle.service;

import com.ssafy.bridgetalkback.puzzle.domain.Puzzle;
import com.ssafy.bridgetalkback.puzzle.dto.response.PuzzleListResponseDto;
import com.ssafy.bridgetalkback.puzzle.dto.response.PuzzleResponseDto;
import com.ssafy.bridgetalkback.puzzle.repository.PuzzleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PuzzleService {
    private final PuzzleRepository puzzleRepository;
    private final PuzzleFindService puzzleFindService;

    public PuzzleResponseDto puzzleDetail(Long puzzleId) {
        log.info("{ PuzzleService } : 퍼즐 상세 조회 진입");
        Puzzle puzzle = puzzleFindService.findByPuzzleIdAndIsDeleted(puzzleId);

        PuzzleResponseDto puzzleResponseDto = PuzzleResponseDto.from(puzzle);
        log.info("{ PuzzleService } : 퍼즐 상세 조회 성공");
        return puzzleResponseDto;
    }

    public PuzzleListResponseDto puzzleList() {
        log.info("{ PuzzleService } : 퍼즐 리스트 조회 진입");

        List<Puzzle> puzzles = puzzleRepository.findAllByIsDeleted(0);
        List<PuzzleResponseDto> puzzleList = new ArrayList<>();

        for (Puzzle puzzle : puzzles){
            puzzleList.add(PuzzleResponseDto.from(puzzle));
        }

        PuzzleListResponseDto puzzleListResponseDto = new PuzzleListResponseDto(puzzleList);
        log.info("{ PuzzleService } : 퍼즐 리스트 조회 성공");
        return puzzleListResponseDto;
    }
}

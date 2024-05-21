# 브릿지톡(BridgeTalk) - 이주민 가정을 위한 다문화 소통 플랫폼
<img src="https://github.com/hyun0-25/SSAFY-BRIDGETALK/assets/95136913/54ed3830-f93b-46c4-90a2-9b4fefb4b497" width="700px" height="500px">

<br>

# ⏱️ 프로젝트 진행 기간

### SSAFY 10기 2학기 자율프로젝트

<summary><strong>전체 일정 : 2024.04.08 ~ 2024.05.20 (6주)</strong></summary>
<div>
    <ul>
        <li>기획: 2024.04.08 ~ 2024.04.19</li>
        <li>설계: 2024.04.20 ~ 2024.04.24</li>
        <li>구현: 2024.04.25 ~ 2024.05.16</li>
        <li>배포: 2024.05.17</li>
        <li>버그 수정: 2024.05.19 ~ 2024.05.20</li>
    </ul>
</div>
</details>
<br>

# 목차

[1. 프로젝트 개요](#1️⃣-프로젝트-개요)<br>
[2. 주요 기능](#two-주요-기능)<br>
[3. 화면 설명](#three-화면-설명)<br>
[4. 기술 소개](#four-기술-소개)<br>
[5. 시스템 아키텍처](#five-시스템-아키텍처)<br>
[6. 파일 구조](#six-파일-구조)<br>
[7. 기술 스택](#seven-기술-스택)<br>
[8. 설계 문서](#eight-문서)<br>
[9. 팀 소개](#nine-팀-소개)<br>
<br><br><br>



# 1️⃣ 프로젝트 개요
## 💡 서비스 소개


아이가 한국어를 배우면서 계속 이야기를 하지만, 이 이야기를 이해하기 어려우시다면!

아이의 속마음에 대해 들어보고 싶다면!

아이와 같이 모국의 문화에 대해 알아가고 싶다면!

이주민 가정의 아이와 부모의 소통을 서포트하는 플랫폼 브릿지톡을 추천드립니다.

<br>

## ⭐ 기획 배경

국내에 다문화 가정이 몇 가구 인 지 혹시 아시나요?

약 40만 가구로 매년 꾸준하게 증가하고 있는데요. 이 과정에서 한국어가 서툰 어머니와 한국에서 자라게 되어 한국어가 능숙한 아이 간 소통에 대한 문제가 있다고 합니다.

저희는 뉴스를 보고 그 사실에 주목했습니다. 한 쪽에 치우쳐진 사실은 아닌 지 추가 조사도 진행하였습니다.

| 총 30여 곳의 다문화 센터에 연락 및 관련 영상 조사 |
| --- |
|<img src="https://github.com/hyun0-25/SSAFY-BRIDGETALK/assets/95136913/e62fca12-cbc3-4fad-8b7d-971928ec9279" width="650px" height="400px">|

→ 
| 대전 외국인 주민 지원통합 센터장님의 인터뷰 진행 |
| --- |
|<img src="https://github.com/hyun0-25/SSAFY-BRIDGETALK/assets/95136913/0fa9df6b-c5bb-4768-b8f2-011d5af4b8a7" width="650px" height="400px">|
```
- 조사 결과
    - 실제로 소통 문제 존재 확인
    - 기존의 언어 학습 위주의 프로그램에서 언어와 소통을 같이 하는 방향으로 바뀌어 나가고 있음
    - 지원 프로그램 예시로 상담사를 한 사람씩 가정에 배치하고 있음을 확인
```
### 지원 프로그램에서 시간적, 공간적인 제한의 아쉬움 발견 -> 아이와의 소통에 도움을 주는 서비스 기획

<br>

> #### ❓ 왜 언어 학습 위주가 아닌 소통 중심의 서비스를 기획하나요?

- 언어 학습으로 인한 문제는 아이가 성장하면서 어머니가 한국에 계신 시간이 길어지다 보니 자연스레 소통에 큰 문제가 없을 정도로 개선되는 경우가 많음
- 하지만 엄마와 아이와 소통하면서 유대감 형성을 하는 시기는 지나게 됩니다!
    
    → 저희는 이 시기에 소통을 돕고자 했습니다. 그렇게 나온 서비스! 
    

### 이주민 가정을 위한 다문화 소통 플랫폼 '브릿지톡' 입니다.

<br>

# 2️⃣ 주요 기능

## 💡 로그인 / 회원가입
- 자체 회원가입 구현 
    - 자유로운 닉네임 설정
    - 공룡 캐릭터 선택이 필요했기에 자체 회원가입 구현
- 이메일 인증 진행
    - 인증번호를 통해 부모 회원가입 승인
- 인증번호 및 리프레시토큰은 특정 기간 이후 바로 날리는 데이터이기에 redis를 사용

## 💡 멀티 프로필
- ott의 멀티 프로필 형태를 참고하여 구현
- 부모의 프로필은 오른쪽 상단의 톱니바퀴 클릭 후 접속 가능
- 아이의 프로필은 리스트 형태로 보여줌
- 부모와 아이 모두 비밀번호 입력 후 본인의 프로필로 접속 가능
## 💡 아이 
### 공룡친구와 대화하기 (STT → 생성형 AI → TTS)
- 아이가 음성으로 말하면 이를 텍스트로 변환
- 생성형 AI를 통해 감정 및 답변 추출
- CLOVA API를 통해 캐릭터 목소리로 답변 음성 전달
- 감정에 따른 공룡 캐릭터 표정변화
### 게임하기
- 퍼즐
    - 부모 나라의 랜드마크 퍼즐 맞추기
    - 퍼즐 완성 시 장소에 대한 설명 제공
- 전통복 입기, 사진찍기
    - Mediapipe를 통해 전통복 상하의 입기
    - 사진찍기 버튼을 통해 이미지 저장 가능
### 편지함
- 부모가 모국어(베트남어/필리핀어)로 보낸 음성 편지
- 익명의 공룡 친구에게 온 편지처럼 한국어 음성 파일과 자막 제공
- 편지내용의 키워드에 해당하는 이모지 제공
## 💡 부모
### 레포트 및 솔루션
- 아이 대화내용 기반 레포트 생성
- 대화 내용 요약 및 핵심 키워드 추출
- 대화 내용에 따른 솔루션 제시
- 번역본 제공
- 아이에게 모국어로 편지보내기
### 정보 제공
- 여성가족부 ‘자녀연령별 육아정보 제공
- 한국 학부모들의 줄임말 및 신조어 제공
- 베트남어/필리핀어 번역본 제공
### 커뮤니티
- 다른 부모들과 소통하는 공간
- 아이 레포트 기반 커뮤니티 고민글 작성
- 고민글에 대한 댓글 작성

<br><br>

# 3️⃣ 화면 설명

<br><br>

# 4️⃣ 기술 소개


<br><br>
# 5️⃣ 시스템 아키텍처
<img src="https://github.com/hyun0-25/SSAFY-BRIDGETALK/assets/95136913/87e32f80-2ccc-4194-a46a-25d83886dbba" width="650px" height="400px">

<br><br>

# 6️⃣ 파일 구조


<br><br>

# 7️⃣ 기술 스택

<div style="display:flex; flex-direction:column; align-items:flex-start;">
    <p><strong>⚡ Management Tool</stron-g></p>
    <div>
        <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> 
        <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">  
        <img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white"> 
        <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> 
       <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
       <img src="https://img.shields.io/badge/termius-000000?style=for-the-badge&logo=termius&logoColor=white">
    </div>
    <br>
    <p><strong>⚡ IDE</strong></p>
    <div>
        <img src="https://img.shields.io/badge/vscode 1.86-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> 
        <img src="https://img.shields.io/badge/intellij-000000?style=for-the-badge&logo=intellijidea&logoColor=white">  
        <img src="https://img.shields.io/badge/android studio 1.1.28-569A31?style=for-the-badge&logo=redis&logoColor=white">
    </div>
    <br>
    <!-- Server -->
    <p><strong>⚡ Server</strong></p>
    <div>
        <img src="https://img.shields.io/badge/ubuntu 20.04-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">    
        <img src="https://img.shields.io/badge/nginx 1.18.0-009639?style=for-the-badge&logo=nginx&logoColor=white">
        <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
        <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
        <img src="https://img.shields.io/badge/redis 7.2.4-DC382D?style=for-the-badge&logo=redis&logoColor=white">
    </div>
    <br>
    <p><strong>⚡ Infra</strong></p>
    <div>
        <img src="https://img.shields.io/badge/docker 25.0.4-2496ED?style=for-the-badge&logo=docker&logoColor=white">
        <img src="https://img.shields.io/badge/jenkins 2.448-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
        <img src="https://img.shields.io/badge/sonarqube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white">
    </div>
    <br>
    <!-- Frontend -->
    <p><strong>⚡ Frontend</strong></p>
    <div> 
    </div>
    <br>
    <!-- Backend -->
    <p><strong>⚡ Backend</strong></p>
    <div>
        <img src="https://img.shields.io/badge/Java 17-007396?style=for-the-badge&logo=Java&logoColor=white"> 
        <img src="https://img.shields.io/badge/Spring Boot 3.2.3-6DB33F?style=for-the-badge&logo=spring boot&logoColor=white">
        <img src="https://img.shields.io/badge/gralde 8.5-02303A?style=for-the-badge&logo=gradle&logoColor=white">
       <img src="https://img.shields.io/badge/spring jpa-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
       <img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
       <img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
       <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">
    </div>
    <br>
    <p><strong>⚡ Database</strong></p>
    <div>
        <img src="https://img.shields.io/badge/mysql 8.0.35-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
    </div>
    <br>
    <!--Alarm-->
    <p><strong>⚡ Alarm</strong></p>
    <div>
    </div>
</div>
<br><br>

## 협업 환경

```markdown
- Gitlab
    - 코드 버전 관리
    - 기능별, 이슈별 브랜치를 생성해서 진행
    - MergeRequest를 통해 서로 코드 리뷰를 해서 merge 진행
	    - dto에 필요한 추가 변수, 테스트코드 오류, css 깨짐, typescript 오류 부분 등 확인하며 코드 리뷰 진행
- JIRA
    - 매주 월요일 오전 목표량을 정해 스프린트 진행
    - 이슈 별 해야하는 업무를 자세히 작성하고, Story Point와 Epic을 설정하여 작업
- 데일리 스크럼
    - 매주 오전 데일리 스크럼을 진행하여 서로 간의 진행 상황 공유 및 그날 진행할 업무 브리핑
    - 매일 소통하면서 새로 생기는 이슈에 빠른 대응 가능해짐
- Notion
    - 회고록 및 회의록이 있을 때마다 매번 기록하여 보관
    - 참고할 기술, 자료 확보 시 모두가 볼 수 있도록 공유
    - 컨벤션 정리 (git 등)
    - 문서 정리 (요구사항 명세서, ERD 명세서, API 명세서)
    - 백엔드, 프론트엔드 각각 페이지를 구성해서 실행 과정 정리, secret.yml 파일, .env 파일 등 공유
```

<br><br>

# 8️⃣ 문서

## 📂ERD
<img src="https://github.com/hyun0-25/SSAFY-BRIDGETALK/assets/95136913/ce169977-cfb4-42ce-8ce7-446e0ec9fbf2" height="650px" width="400px">

<br><br>

## 📂기능명세서
<br><br>

## 📂API 명세서
<br><br>

## 📂포팅메뉴얼
<br><br>

# 9️⃣ 팀 소개
| 이름 | 역할 |
| --- | --- |
| 윤선경 (팀장) |- BackEnd<br> - 전역  예외 처리  및 **테스트 코드 틀 구성** 및 작성<br> - 스프링시큐리티, **JWT를 사용한 회원 인가/인증 구현**<br> - 리프레시토큰 및 이메일 인증번호 등 일정 **휘발성 데이터 redis를 활용해서 처리**<br> - **생성형 AI를 활용**한 캐릭터 대화 구현<br> - **querydsl을 활용**한 조회 및 부모 커뮤니티 기능 구현<br> - 육아 정보 크롤링 및 번역 구현<br> - **ssl 인증** 및 프록시로 **nginx 분기 처리** ( / , /api ) |
| 방소영 |- BackEnd<br> - **텍스트 음성 변환** 시스템 구현<br> - **대화 내용 관리를 위한 Redis 및 MySQL 활용**<br> - **실시간 대화 내용을 Redis에 임시 저장**하고, 검증된 내용만을 MySQL 데이터베이스에 영구적으로 저장하는 프로세스 구현<br> - Spring Boot 프레임워크 내에서 **캐싱 기능을 활용**하여 한국어 줄임말 목록의 **조회 속도개선**<br> - 편지 내용 및 관련 이미지 반환 기능 구현<br> - UCC 촬영 및 편집|
| 이현영 |- BackEnd<br> - **EC2 서버 및 Jenkins CI/CD 구축**<br> - 아이 **대화내용 요약 및 키워드 추출, 솔루션 제시**, **2개 국어 번역**<br> - 비동기처리를 통해 응답속도 개선<br> - 아이 대화내용 기반 커뮤니티 글 CRUD, 커뮤니티 게시글 댓글 CRUD 구현<br> - **Mattermost 알림채널 개설**(Gitlab Merge Request, Jenkins Build 결과 알림기능)|
| 이지영 |- **음성 텍스트 변환** 시스템 구현<br> - 캐릭터와의 **대화시간 최적화를 위한 api 테스트 진행** (Amazon Transcribe, Clova, Whisper AI)<br> - 번역 API 구현(Papago api 및 생성형 AI 활용)<br> - **캐릭터 답장 음성 파일 및 자막 생성**<br> - **SSE** 알림 설정 |
| 조한빈 |- 메인 페이지, 부모 페이지 화면 및 기능<br> - manifest 작성을 통한 **PWA** 환경 구현<br> - webpack 설정을 통한 프로젝트 **번들링**<br> - 서비스 워커를 활용한 **정적 데이터 캐싱**<br> - 에셋 **프리로드**를 통한 초기 사용성 개선|
|박시연|- **3D 캐릭터 구현부 전반**<br> - Unity Editor, Blender, Three.js 사용하여 Animated 3D Asset 출력 및 상호작용 구현<br> - 아이 페이지 디자인 전반<br> - 아이 페이지 중 [받은 편지함], [게임하기] 기능 구현<br> - [받은 편지함] : 편지 리스트, 편지 음성, 편지 아이콘, 편지 내용 받아오기<br> -  [게임하기]: 퍼즐 게임, 카메라 의상 필터 구현<br> - 나라별 퍼즐 리스트 및 퍼즐 상세 받아오기, 퍼즐 로직 구현<br> - mediapipe 사용하여 카메라 의상 필터 구현<br>|
    

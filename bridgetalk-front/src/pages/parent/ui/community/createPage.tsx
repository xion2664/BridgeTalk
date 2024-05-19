import * as S from '@/styles/parent/createPage.style';
import { useEffect, useRef, useState } from 'react';
import { useReportStore } from '../../store';
import { getReportList, postBoardCreate } from '../../query';
import { errorCatch } from '@/shared';
import { useErrorStore } from '@/shared/store';
import { useNavigate } from 'react-router-dom';

export function CreatePage() {
  const navigate = useNavigate();

  const language = useReportStore((state) => state.language);
  const setErrorModalState = useErrorStore((state) => state.setErrorModalState);
  const reportList = useReportStore((state) => state.reportList);
  const setReportList = useReportStore((state) => state.setReportList);
  const setReports_UUID = useReportStore((state) => state.setReports_UUID);
  const childrenList = useReportStore((state) => state.childrenList);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [reportsId, setReportsId] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      // childMap: {UUID: {name, nickname}}
      const childMap = new Map();

      // {reportsId: UUID}
      const reports_UUID = new Map();

      // promises: 여러개의 비동기 호출에 대한 결과를 저장하는 배열
      const promises = childrenList.map((child: any) => {
        childMap.set(child.userId, { name: child.userName, nickname: child.userNickname, dino: child.userDino });
        return getReportList(child.userId, language);
      });

      // data: promises의 비동기 호출이 모두 종료되었을 때 resolve된 응답을 저장하는 배열
      const data = await Promise.allSettled(promises);
      console.log(data);

      data.forEach((it: any) => {
        if (!it.value) return;

        const childUUID = it.value.request.responseURL.split('/')[5];

        // child = {name, nickname}
        const child = childMap.get(childUUID);

        it.UUID = childUUID;
        it.name = child.name;
        it.nickname = child.nickname;
        it.dino = child.dino;

        it.value.data.forEach((report: any) => {
          reports_UUID.set(report.reportsId, it.UUID);
        });
      });

      setReports_UUID(reports_UUID);
      setReportList(data);
    }

    fetchData();
  }, []);

  async function handleBoardCreate(reportsId: number, boardsTitle: string, boardsContent: string, language: any) {
    const DTO = {
      reportsId,
      boardsTitle,
      boardsContent,
      language,
    };

    try {
      const response = await postBoardCreate(DTO);
      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        return errorCatch(err, setErrorModalState);
      }
    }
  }

  return (
    <S.Container>
      <div className="createPage">
        <div className="createPage__header">
          <button className="createPage__header-toBack">{`<`}</button>
        </div>
        <div className="createPage__container">
          <div className="createPage__container-title">
            <div>Q</div>
            <input type="text" placeholder="제목을 입력하세요" required ref={titleRef} />
          </div>
          <div className="createPage__container-report">
            {reportList &&
              reportList.map((report: any) => {
                const reports = report.value.data;

                return reports.map((it: any) => {
                  const reportId = it.reportsId;
                  const repoortsSummary = it.reportsSummary;

                  return (
                    <button
                      onClick={() => {
                        setReportsId(reportId);
                      }}
                    >
                      <p>{repoortsSummary}</p>
                    </button>
                  );
                });
              })}
          </div>
          <div className="createPage__container-content">
            <textarea
              name="article"
              id="article"
              cols={40}
              rows={30}
              placeholder="내용을 입력해주세요"
              ref={contentRef}
            ></textarea>
          </div>
          <div className="createPage__container-btns">
            <button
              onClick={() => {
                handleBoardCreate(reportsId, titleRef.current!.value, contentRef.current!.value, language).then(
                  (res) => {
                    if (!res) return;

                    setErrorModalState('게시글이 성공적으로 등록됐습니다.');

                    setTimeout(() => {
                      navigate('../board');
                    }, 500);
                  },
                );
              }}
            >
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </S.Container>
  );
}

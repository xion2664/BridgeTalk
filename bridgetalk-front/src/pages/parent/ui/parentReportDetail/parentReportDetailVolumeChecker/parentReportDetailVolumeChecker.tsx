import * as S from '@/styles/parent/parentReportDetailRecorder.style';
import { useVoiceStore } from '@/pages/parent/store';
import { useEffect, useState } from 'react';

interface Props {
    isRecording: boolean;
}

export function ParentReportDetailVolumeChecker({ isRecording }: Props) {
    const volume = useVoiceStore((state) => state.volume);
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        let timer: any = null;

        if (isRecording) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            setTime(0);
            clearInterval(timer);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isRecording]);

    return (
        <>
            <S.Volume>
                {[...Array(15)].map((it, idx) => (
                    <S.VolumeBar volume={volume} idx={idx} />
                ))}
            </S.Volume>
            <div>음량표시공룡</div>
            <div>
                {`${Math.floor(time / 60)}`.padStart(2, '0') + ' : ' + `${Math.floor(time % 60)}`.padStart(2, '0')}
            </div>
        </>
    );
}

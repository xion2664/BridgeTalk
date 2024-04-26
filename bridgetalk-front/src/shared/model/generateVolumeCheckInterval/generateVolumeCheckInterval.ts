import { Dispatch, SetStateAction } from 'react';

export function generateVolumeCheckInterval(
    analyser: AnalyserNode,
    dataArray: Uint8Array,
    bufferLength: number,

    setVolume: Dispatch<SetStateAction<number>>,
) {
    // 30ms마다 볼륨체크하는 인터벌 생성

    let interval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        setVolume(Math.floor((getAudioFrequency(dataArray, bufferLength) / 256) * 100));
    }, 10);

    return interval;
}

function getAudioFrequency(dataArray: Uint8Array, bufferLength: number): number {
    let total = 0;
    for (let i = 0; i < bufferLength; i++) {
        total += dataArray[i];
    }
    return total / bufferLength;
}

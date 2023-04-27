import { Stack, Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { databaseRealtime } from "../../../config/firebase";
import { onValue, ref, update } from 'firebase/database';
import { CameraDataRealtime } from '../general/schema';
import FullWidthTabs from '../general/Tab';
import Lottie from 'react-lottie';
import loadingData from '../../lotties/LoadingTraffic.json';
import { TrafficClassifier } from '../general/TrafficClassify';

type SensorProps = {
    //userData: any
};

const defaultChosenCam: CameraDataRealtime = {
    img_link: "https://storage.googleapis.com/delaynt-31feb.appspot.com/camera/lequangdinhst/1682531956.jpg",
    name: "lequangdinhst",
    timestamp: 1682531956,
    traffic: 0
}


const Sensor: React.FC<SensorProps> = () => {

    const [liveCamera, setLiveCamera] = useState<CameraDataRealtime[]>([]);
    const [chosenCamTime, setChosenCamTime] = useState<CameraDataRealtime>();
    const [keyData, setKeyData] = useState<String[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const theme = useTheme();
    const cameraRef = ref(databaseRealtime, 'camera');
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    useEffect(() => {
        onValue(cameraRef, (snapshot) => {
            setLoading(true);
            const data = snapshot.val();
            setLiveCamera(Object.values(data));
            setKeyData(Object.keys(data));
            setChosenCamTime(Object.values(data)[Object.values(data).length - 1] as CameraDataRealtime)
            let lstImages = Object.values(data) as CameraDataRealtime[];
            setLoading(false);
        });
    }, []);

    async function labelTraffic(camTime: CameraDataRealtime) {
        let traffic: String = await TrafficClassifier(camTime.img_link)
        if (traffic === "Heavy Traffic") {
            let index = liveCamera.findIndex(item => item.timestamp == camTime.timestamp);
            let camTimeRef = ref(databaseRealtime, 'camera/' + keyData[index])
            update(camTimeRef, {
                traffic: 1
            })
        }
    }

    useEffect(() => {
        if (chosenCamTime) {
            labelTraffic(chosenCamTime);
        }
    }, [chosenCamTime]);

    return (
        <Stack direction="column" justifyContent="center"
            alignItems="stretch">
            {/* Live traffic camera */}
            {loading ? (
                <Box>
                    <Lottie
                        options={defaultOptions}
                    />
                </Box>
            ) : (
                <Box
                    component="img"
                    alt='Live Camera'
                    src={liveCamera[liveCamera.length - 1].img_link}
                />
            )}
            <FullWidthTabs
                imageKeys={liveCamera}
                chosenCam={chosenCamTime ? chosenCamTime : defaultChosenCam}
            />
        </Stack>
    )
}
export default Sensor;
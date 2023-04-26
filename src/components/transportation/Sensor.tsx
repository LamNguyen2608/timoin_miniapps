import { Grid, Stack, Tooltip, Box, Tab, useTheme } from '@mui/material';
import { collection, getDocs, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { auth, database, databaseRealtime } from "../../../config/firebase";
import { onValue, ref } from 'firebase/database';
import Image from 'next/image';
import DustSensor from '../sensors/DustSensor';
import { CameraData } from '../general/schema';
import FullWidthTabs from '../general/Tab';


type SensorProps = {
    //userData: any
};

const defaultCameraData: CameraData = {
    address: '548, Le Quang Dinh St, Binh Thanh Dist',
    current_file: 'https://firebasestorage.googleapis.com/v0/b/delaynt-31feb.appspot.com/o/camera%2Flequangdinhst%2F1682419313.2462935.jpg?alt=media&token=59abb891-3599-46ee-a0e5-9cb4732e261d',
    long_lat: '10.816984858368457,106.68878968599218',
    traffic: 0
}

const Sensor: React.FC<SensorProps> = () => {
    const cameraRef = doc(database, "Camera", "lequangdinhst");
    const [liveCamera, setLiveCamera] = useState<CameraData>(defaultCameraData);
    const theme = useTheme();

    const getCameraImage = async () => {
        try {
            const docSnap = await getDoc(cameraRef);
            console.log(docSnap.data());
            if (docSnap.exists()) {
                setLiveCamera(docSnap.data() as CameraData)
            } else {
                console.log("Document does not exist");
            }
        } catch (error) {
            console.log("Error fetching camera image", error);
            return error;
        }
    }
    useEffect(() => {

    }, []);

    return (
        <Stack direction="column" justifyContent="center"
            alignItems="stretch">
            {/* Live traffic camera */}
            <Box
                component="img"
                alt='Live Camera'
                src={liveCamera.current_file}
            />
            <FullWidthTabs />
        </Stack>
    )
}
export default Sensor;
import { tokens } from '@/theme';
import { Alert, Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell, LineChart, Line } from 'recharts';
import { database, databaseRealtime } from '../../../config/firebase';
import CardInfo from '../general/CardInfo';
import StatBox from '../general/StatBox';
import { CameraDataRealtime, LocationFirestore } from '../general/schema';
import { dateFormatter } from '../general/utils';
import { TrafficClassifier } from '../general/TrafficClassify';
import { ref, set } from 'firebase/database';

type TrafficReportProps = {
    imageKeys: CameraDataRealtime[],
    chosenCam: CameraDataRealtime
};

const TrafficReport: React.FC<TrafficReportProps> = ({ imageKeys, chosenCam }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [locationData, setLocationData] = useState<LocationFirestore>()
    const [markerPosition, setMarkerPosition] = useState({
        lat: 0,
        lng: 0,
    });

    const getCameraImage = async () => {
        let cameraRef = doc(database, "Camera", "lequangdinhst");
        try {
            const docSnap = await getDoc(cameraRef);
            console.log(docSnap.data());
            if (docSnap.exists()) {
                setLocationData(docSnap.data() as LocationFirestore)
                let latLng: string[] = docSnap.data().long_lat.split(',');
                setMarkerPosition({ lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) })
            } else {
                console.log("Document does not exist");
            }
        } catch (error) {
            console.log("Error fetching camera image", error);
            return error;
        }
    }

    useEffect(() => {
        getCameraImage();
    }, [chosenCam])


    return (
        <Stack
            direction="column"
        >
            <Typography
                variant="h2"
                color={colors.yellow[500]}
                fontSize={20}
                fontWeight="bold"
                gutterBottom>
                Location
            </Typography>
            <Stack direction="row" spacing={2}>
                <Box>
                    <iframe src={locationData?.ggl_map} title="Embedded Website" style={{ width: '100%', minWidth: "200px", height: '99%', border: 'none' }}></iframe>
                </Box>
                <CardInfo
                    type={chosenCam.traffic == 0 ? "Normal" : "Warning"}
                    title={chosenCam.traffic == 0 ? "Normal Traffic" : "Heavy Traffic"}
                    subtitle={dateFormatter(chosenCam.timestamp)}
                    description="The real-time traffic classification, developed and trained by Lamie Nguyen"
                    color={
                        chosenCam.traffic == 0 ?
                            "#00FF00" : "#FF0000"
                    }
                />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="baseline" marginTop={1.5}>
                <CardInfo
                    type="Traffic Monitoring Chart"
                    title=""
                    subtitle=""
                    description="Observe whether at which time of the day is likely to get traffic jam"
                    color={
                        colors.blue[500]
                    }
                />
            </Stack>
            <StatBox
                title="Traffic Monitoring Chart"
                subtitle={""}
                increase={""}
                chart={
                    <ResponsiveContainer aspect={2}>
                        <BarChart
                            data={imageKeys}
                            margin={{ top: 0, right: 20, bottom: 20, left: -40 }} >
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={dateFormatter} />
                            <YAxis />
                            <Bar dataKey="traffic" fill={colors.purple[300]} />
                        </BarChart>
                    </ResponsiveContainer>
                } />
        </Stack >
    )
}
export default TrafficReport;
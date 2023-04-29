import React from 'react';
import PersonalLayout from '../layout/personal_layout';
import UserVehicle from '../records/UserVehicle';
import { Avatar, Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Lottie from 'react-lottie';
import avatar from '../../lotties/avatar2.json';
import personalized from '../../lotties/personalized.json';
import { tokens } from '@/theme';
import CarouselRatio from '../records/UserCharts';
import { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase';
import Papa from 'papaparse';
import { getBlob, ref, getDownloadURL } from 'firebase/storage';
import { HistoryData, InsightData, UserCommuteData } from '../general/schema';
import UserChart from '../records/UserCharts';
import { stringify } from 'querystring';

type recordsProps = {

};

const Records: React.FC<recordsProps> = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: avatar,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },
        segments: [
            {
                time: 0,
                duration: 5,
            },
        ]
    };
    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: personalized,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    //GetUserHistoryData
    const csvRef = ref(storage, '/ZBa16LZrCvWGUHH6Tx72fHzu7br1/travel_history/thithien.csv');
    const [userData, setUserData] = useState<HistoryData[]>([])
    const [insightData, setInsightData] = useState<InsightData>({ max: { distance: 0, estimate: 0 }, min: { distance: 10000, estimate: 10000 }, sumSpeed: 0.0, validRecords: 0 });
    const fetchData = async () => {
        getDownloadURL(csvRef).then(url => {
            Papa.parse(url, {
                download: true,
                header: true,
                complete: results => {
                    const data = results.data as UserCommuteData[]; // This is a list of objects parsed from the CSV file
                    setUserData(dataFormatter(data));
                }
            });
        });
    }

    const dataFormatter = (userHistoryData: UserCommuteData[]) => {
        return userHistoryData.map(data => ({
            //Estimation chart
            actual: parseInt(data.actual_travel_time),
            estimate: parseInt(data.expected_travel_time),
            late: parseInt(data.late),
            //Weather chart
            weather: parseInt(data.weather),
            //Start time chart
            start_time: parseInt(data.start_time),
            rush_hour: parseInt(data.rush_hour),
            //Traffic chart
            traffic: parseInt(data.traffic),
            AQI: parseInt(data.AQI),
            //Speed
            speed: parseFloat(data.speed),
            distance: parseFloat(data.distance)
        }))
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let insight = { max: { distance: 0, estimate: 0 }, min: { distance: 10000, estimate: 10000 }, sumSpeed: 0, validRecords: 0 }
        userData.forEach(item => {
            if (item.distance > insight.max.distance) {
                insight.max.distance = item.distance
            }
            if (item.distance < insight.min.distance) {
                insight.min.distance = item.distance
            }
            if (item.estimate > insight.max.estimate) {
                insight.max.estimate = item.estimate
            }
            if (item.estimate < insight.min.estimate) {
                insight.min.estimate = item.estimate
            }
            if (item.speed) {
                insight.validRecords += 1
                insight.sumSpeed += item.speed
            }
        })
        setInsightData(insight);
        localStorage.setItem("maxDistance", insight.max.distance.toFixed(2))
        localStorage.setItem("maxEstimation", insight.max.estimate.toFixed(2))
        localStorage.setItem("minDistance", insight.min.distance.toFixed(2))
        localStorage.setItem("minEstimation", insight.min.estimate.toFixed(2))
    }, [userData])

    return (
        <Stack direction="column" alignItems="center">
            <Box
                position="absolute"
                top="0"
                left="0"
                zIndex={-1}
            >
                <Lottie
                    options={defaultOptions}
                />
            </Box>
            <Box>
                <Avatar
                    sx={{ bgcolor: deepOrange[500], width: 100, height: 100, marginTop: 5 }}
                    alt="Psalm Nguyen"
                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/339777859_148080301534183_4138241996284354350_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=bJ0_c3rRKiMAX8kTiy1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfCPl8Sd_xlOIKZFeK4Kp2LqEmOitwfn_4pPqHzSuHAPLg&oe=64505835"
                ></Avatar>
            </Box>
            <Typography
                marginTop={3}
                variant="h2"
                color={colors.pink[100]}
                fontSize={25}
                fontWeight="bold"
                gutterBottom>
                PSALM NGUYEN
            </Typography>
            <Stack marginTop={3} alignItems="center">
                <UserVehicle insightData={insightData} />
            </Stack>
            <Box
                position="absolute"
                top={320}
                left="0"
                zIndex={-1}
            >
                <Lottie
                    options={defaultOptions1}
                    speed={0.3}
                />
            </Box>
            <Typography
                marginTop={3}
                color={colors.blue[500]}
                fontSize={20}
                fontWeight="bold"
                gutterBottom>
                PERSONALIZED INSIGHT
            </Typography>
            <UserChart historyData={userData} />
        </Stack>
    )
}
export default Records;
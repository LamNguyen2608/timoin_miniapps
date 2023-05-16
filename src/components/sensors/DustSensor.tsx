import React, { useEffect, useState } from 'react';
import { auth, database, databaseRealtime } from "../../../config/firebase";
import { onValue, ref } from 'firebase/database';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts';
import { SensorData } from '../general/schema';
import { Box, Divider, Grid, Paper, Stack, Typography, colors, useTheme } from '@mui/material';
import StatBox from '../general/StatBox';
import TrafficIcon from "@mui/icons-material/Traffic";
import { tokens } from '@/theme';
import CardInfo from '../general/CardInfo';
import { dateFormatter } from '../general/utils';

type DustSensorProps = {

};


const DustSensor: React.FC<DustSensorProps> = () => {
    const [dustData, setDustData] = useState<SensorData[]>([]);
    const [pm25Data, setPm25Data] = useState<SensorData[]>([]);
    const [co2Data, setCo2Data] = useState<SensorData[]>([]);
    const dustRef = ref(databaseRealtime, 'dust');
    const pm25Ref = ref(databaseRealtime, 'pm25');
    const co2Ref = ref(databaseRealtime, 'co2');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        // Set up listener for real-time updates from Firebase Realtime Database
        onValue(dustRef, (snapshot) => {
            const data = snapshot.val();
            setDustData(formatDustDataRef(Object.values(data)))
        });

        onValue(pm25Ref, (snapshot) => {
            const data = snapshot.val();
            setPm25Data(formatDustDataRef(Object.values(data)))
        });

        onValue(co2Ref, (snapshot) => {
            const data = snapshot.val();
            setCo2Data(Object.values(data))
        });
    }, []);
    const getIncreasePercent = (data: SensorData[]) => {
        if (data.length > 0) {
            let increase = ((data[data.length - 1].value - data[data.length - 2].value)
                / data[data.length - 2].value * 100).toFixed(2)
            return increase + "%"
        } else {
            return "+0.0 %"
        }
    }

    const formatDustDataRef = (data: SensorData[]) => {
        return data.map((dust) => ({
            ...dust,
            value: parseFloat((dust.value * 0.35).toFixed(2))
        }))
    }
    return (
        <Stack
            direction="column"
            spacing={2}
        >
            <Typography
                variant="h2"
                color={colors.pink[500]}
                fontSize={25}
                fontWeight="bold"
                gutterBottom>
                Dust Density
            </Typography>
            <ResponsiveContainer aspect={2}>
                <LineChart
                    data={dustData.slice(-10)}
                    margin={{ top: 0, right: 20, bottom: 0, left: -40 }}
                >
                    <XAxis
                        fontStyle="bold"
                        fontSize={11}
                        tickMargin={15}
                        dataKey="timestamp"
                        tickFormatter={dateFormatter} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Line
                        name="Dust sensor"
                        type="monotone"
                        dataKey="value"
                        stroke="#c6c5ff"
                        strokeWidth={4}
                        dot={{ color: colors.pink[600], strokeWidth: 1, r: 5 }}
                        activeDot={{ color: colors.pink[600], strokeWidth: 1, r: 10 }} />
                </LineChart>
            </ResponsiveContainer>
            <Stack direction="row" spacing={2}>
                <CardInfo
                    type="WARNING!"
                    title="PM 2.5"
                    subtitle="(ug/cm3)"
                    description={"The current PM2.5 (" + (pm25Data.length > 0 ? pm25Data[pm25Data.length - 1].value.toFixed(2) : "0") + ") in the air can possibly affect your health. Put on your jacket, or stay at home if possible."}
                    color={
                        "#FF0000"
                    }
                />
                <StatBox
                    title="PM2.5"
                    subtitle={pm25Data.length > 0 ? pm25Data[pm25Data.length - 1].value.toFixed(2) : "0"}
                    increase={getIncreasePercent(pm25Data)}
                    chart={
                        <ResponsiveContainer aspect={2}>
                            <LineChart
                                data={pm25Data.slice(-20)}
                                margin={{ top: 20, right: 10, bottom: 0, left: 0 }}
                            >
                                <XAxis
                                    tickFormatter={dateFormatter}
                                    dataKey="timestamp" />
                                <Tooltip />
                                <YAxis hide />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={colors.pink[600]}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    } />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="baseline">
                <StatBox
                    title="CO2"
                    subtitle={co2Data.length > 0 ? co2Data[co2Data.length - 1].value.toFixed(2) : "0"}
                    icon={
                        <TrafficIcon
                            sx={{ color: colors.blue[600], fontSize: "26px" }}
                        />
                    }
                    increase={getIncreasePercent(co2Data)}
                    chart={
                        <ResponsiveContainer aspect={2}>
                            <LineChart
                                data={co2Data.slice(-20)}
                                margin={{ top: 20, right: 10, bottom: 0, left: 0 }}
                            >
                                <XAxis
                                    tickFormatter={dateFormatter}
                                    dataKey="timestamp" />
                                <Tooltip />
                                <YAxis hide />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={colors.pink[600]}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    } />
                <CardInfo
                    type="KNOWLEDGE"
                    title="CO2"
                    subtitle="(ppm)"
                    description="Global energy-related CO2 emissions grew in 2022 by 0.9%, or 321 million tonnes. #SaveTheEarth"
                    color={
                        colors.pink[500]
                    }
                />
            </Stack>
        </Stack>
    )
}
export default DustSensor;

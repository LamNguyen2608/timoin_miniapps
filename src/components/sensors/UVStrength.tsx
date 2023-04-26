import React, { useEffect, useState } from 'react';
import { auth, database, databaseRealtime } from "../../../config/firebase";
import { onValue, ref } from 'firebase/database';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, Bar, BarChart, Cell } from 'recharts';
import { SensorData } from '../general/schema';
import { Box, Divider, Grid, Paper, Stack, Typography, colors, useTheme } from '@mui/material';
import StatBox from '../general/StatBox';
import TrafficIcon from "@mui/icons-material/Traffic";
import { tokens } from '@/theme';
import CardInfo from '../general/CardInfo';

type UVStrengthProps = {

};

const UVStrength: React.FC<UVStrengthProps> = () => {
    const [uvData, setUVData] = useState<SensorData[]>([]);
    const [tempData, setTempData] = useState<SensorData[]>([]);
    const [humidData, setHumidData] = useState<SensorData[]>([]);
    const uvRef = ref(databaseRealtime, 'uv');
    const tempRef = ref(databaseRealtime, 'temp');
    const humidRef = ref(databaseRealtime, 'humid');

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const uvColorsGenerator = (uv: number) => {
        if (uv < 3) {
            return "#67be4d"
        } else if (uv > 3 && uv < 6) {
            return "#fcbd22"
        } else if (uv > 6 && uv < 8) {
            return "#f66b34"
        } else if (uv > 8 && uv < 10) {
            return "#ee154a"
        } else {
            return "#7b439c"
        }
    }

    useEffect(() => {
        // Set up listener for real-time updates from Firebase Realtime Database
        onValue(uvRef, (snapshot) => {
            const data = snapshot.val();
            setUVData(Object.values(data))
        });
        onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            setTempData(Object.values(data))
        });
        onValue(humidRef, (snapshot) => {
            const data = snapshot.val();
            setHumidData(Object.values(data))
        });
    }, []);

    const formatUVData = (data: SensorData[]) => {
        const formattedData = data.map((record) => ({
            ...record,
            value: record.value > 11 ? 12 : record.value
        }));
        return formattedData;
    };

    const dateFormatter = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        console.log(date)
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    };
    const getIncreasePercent = (data: SensorData[]) => {
        if (data.length > 0) {
            let increase = ((data[data.length - 1].value - data[data.length - 2].value)
                / data[data.length - 2].value * 100).toFixed(2)
            return increase + "%"
        } else {
            return "+0.0 %"
        }
    }
    return (

        <Stack
            direction="column"
        >
            <Typography
                variant="h2"
                color={colors.blue[500]}
                fontSize={25}
                fontWeight="bold"
                gutterBottom>
                UV Strength
            </Typography>
            <ResponsiveContainer aspect={2}>
                <BarChart
                    data={formatUVData(uvData)}
                    margin={{ top: 0, right: 20, bottom: 20, left: -40 }} >
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={dateFormatter} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                        {
                            formatUVData(uvData).map((entry, index) => (
                                <Cell key={`cell-${index}`} stroke={uvColorsGenerator(entry.value)} strokeWidth={index === 2 ? 4 : 1} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Stack direction="row" spacing={2}>
                <CardInfo
                    type="WARNING!"
                    title="Temperature"
                    subtitle="°C"
                    description="The current temperature (31.3 ppm) can possibly cause dizziness and heat stroke. Put on your jacket, or stay at home if possible."
                    color={
                        "#FF0000"
                    }
                />
                <StatBox
                    title="PM2.5"
                    subtitle={tempData.length > 0 ? tempData[tempData.length - 1].value.toFixed(2) : "0"}
                    increase={getIncreasePercent(tempData)}
                    chart={
                        <ResponsiveContainer aspect={2}>
                            <LineChart
                                data={tempData.slice(-20)}
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
                                    stroke={colors.blue[600]}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    } />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="baseline">
                <StatBox
                    title="Humidity"
                    subtitle={humidData.length > 0 ? humidData[humidData.length - 1].value.toFixed(2) : "0"}
                    increase={getIncreasePercent(humidData)}
                    chart={
                        <ResponsiveContainer aspect={2}>
                            <LineChart
                                data={humidData.slice(-20)}
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
                                    stroke={colors.blue[600]}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    } />
                <CardInfo
                    type="KNOWLEDGE"
                    title="Humidity"
                    subtitle="(%)"
                    description="Humidity comes from water evaporating from lakes and oceans. Warmer water evaporates more quickly"
                    color={
                        colors.blue[500]
                    }
                />
            </Stack>
        </Stack>
    )
}
export default UVStrength;
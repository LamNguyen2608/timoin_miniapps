import React, { useEffect, useState } from 'react';
import { auth, database, databaseRealtime } from "../../../config/firebase";
import { onValue, ref } from 'firebase/database';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from 'recharts';
import { SensorData } from '../general/schema';

type DustSensorProps = {

};


const DustSensor: React.FC<DustSensorProps> = () => {
    const [dustData, setDustData] = useState<SensorData[]>([]);
    const [pm25Data, setPm25Data] = useState<SensorData[]>([]);
    const dustRef = ref(databaseRealtime, 'dust');
    const pm25Ref = ref(databaseRealtime, 'pm25');

    useEffect(() => {
        // Set up listener for real-time updates from Firebase Realtime Database
        onValue(dustRef, (snapshot) => {
            const data = snapshot.val();
            setDustData(Object.values(data))
        });

        onValue(pm25Ref, (snapshot) => {
            const data = snapshot.val();
            setPm25Data(Object.values(data))
        });
    }, []);
    const dateFormatter = (timestamp: number) => {
        const date = new Date(timestamp);
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`
    };
    return (
        <><ResponsiveContainer width="100%" aspect={3}>
            <LineChart
                data={dustData.slice(-10)}
                margin={{
                    right: 70
                }}
            >
                <XAxis fontSize={13} tickMargin={12} dataKey="timestamp" tickFormatter={dateFormatter} />
                <YAxis fontSize={13} />
                {/* <Tooltip /> */}
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                    name="Dust sensor"
                    type="monotone"
                    dataKey="value"
                    stroke="#c6c5ff"
                    strokeWidth={4}
                    activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }} />
            </LineChart>
        </ResponsiveContainer><ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                    data={pm25Data.slice(-10)}
                    width={800}
                    margin={{
                        right: 70
                    }}
                >
                    <XAxis fontSize={13} tickMargin={12} dataKey="timestamp" tickFormatter={dateFormatter} />
                    <YAxis fontSize={13} />
                    {/* <Tooltip /> */}
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line
                        name="PM2.5 (ppm)"
                        type="monotone"
                        dataKey="value"
                        stroke="#c6c5ff"
                        strokeWidth={4}
                        activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }} />
                </LineChart>
            </ResponsiveContainer></>
    )
}
export default DustSensor;

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, ZAxis, Bar, BarChart, CartesianGrid, Legend, ComposedChart, Line } from 'recharts';
import { HistoryData } from '../general/schema';
import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import Lottie from 'react-lottie';
import loading from '../../lotties/loading.json';
import { tokens } from '@/theme';
import { data } from '@tensorflow/tfjs';
import { dateHHMMFormatter } from '../general/utils';


type UserChartsProps = {
    historyData: HistoryData[]
};

const UserChart: React.FC<UserChartsProps> = ({ historyData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <Stack direction="column">
            {historyData.length !== 0 ? (
                <Stack direction="column" spacing={2}>
                    {/* Late, Actual, Estimate, Start */}
                    <Box>
                        <Card sx={{ width: "98%", minWidth: 370, height: 250, borderRadius: 8, bgcolor: colors.yellow[200], paddingY: 1.5, paddingX: 2 }}>
                            <Typography
                                variant="h3" component="div" margin={1}
                                fontWeight="bold" color={colors.pink[800]}>
                                Estimation Accuracy Over Time
                            </Typography>
                            <ResponsiveContainer aspect={1.75}>
                                <ComposedChart width={350}
                                    height={220}
                                    margin={{
                                        top: 15,
                                        right: -10,
                                        bottom: 0,
                                        left: -25,
                                    }}
                                    data={[...historyData.slice(-7)]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="start_time" tickFormatter={dateHHMMFormatter} />
                                    <YAxis />
                                    <Legend />
                                    <Bar dataKey="estimate" fill={colors.pink[600]} />
                                    <Bar dataKey="actual" fill={colors.blue[600]} />
                                    <Line type="monotone" dataKey="late" stroke={colors.purple[700]} strokeWidth={3} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Card>
                    </Box>
                    {/* Traffic */}
                    <Box>
                        <Card sx={{ width: "98%", minWidth: 370, height: 250, borderRadius: 8, bgcolor: colors.pink[300], paddingY: 2, paddingX: 2 }}>
                            <Typography
                                variant="h3" component="div" margin={1}
                                fontWeight="bold" color={colors.pink[800]}>
                                Traffic Impact On Estimation
                            </Typography>
                            <ResponsiveContainer aspect={1.75}>
                                <ScatterChart
                                    width={350}
                                    height={220}
                                    margin={{
                                        top: 15,
                                        right: 20,
                                        bottom: 0,
                                        left: -25,
                                    }}
                                >
                                    <XAxis dataKey="traffic" type="number" tickCount={4} />
                                    <YAxis dataKey="actual" type="number" tickCount={4} />
                                    <ZAxis dataKey="AQI" type="number" range={[0, 200]} name="AQI" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="A school" data={historyData} fill="#8884d8" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </Card>
                    </Box>
                    <Box>
                        <Card sx={{ width: "98%", minWidth: 370, height: 250, borderRadius: 8, bgcolor: colors.blue[200], paddingY: 2, paddingX: 2 }}>
                            <Typography
                                variant="h3" component="div" margin={1}
                                fontWeight="bold" color={colors.pink[800]}>
                                Weather Impact On Estimation
                            </Typography>
                            <ResponsiveContainer aspect={1.75}>
                                <ScatterChart
                                    width={350}
                                    height={220}
                                    margin={{
                                        top: 15,
                                        right: 20,
                                        bottom: 0,
                                        left: -25,
                                    }}
                                >
                                    <XAxis dataKey="weather" type="number" tickCount={4} />
                                    <YAxis dataKey="late" type="number" tickCount={4} />
                                    <ZAxis dataKey="actual" type="number" range={[0, 200]} name="AQI" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="A school" data={historyData} fill="#8884d8" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </Card>
                    </Box>
                </Stack>
            ) : (
                <Box
                    height={220}
                    width="100%"
                    marginTop={2}
                    marginLeft={0}
                >

                    <Lottie
                        options={defaultOptions}
                    />
                </Box>
            )
            }
        </Stack >
    );
};

export default UserChart;

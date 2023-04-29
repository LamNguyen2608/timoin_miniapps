import { tokens } from '@/theme';
import { Avatar, Box, Button, Card, CardActions, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { type } from 'os';
import { title } from 'process';
import React from 'react';
import motorbike from '../../lotties/mbike1.json';
import Lottie from 'react-lottie';
import { InsightData } from '../general/schema';

type UserVehicleProps = {
    insightData: InsightData
};

const UserVehicle: React.FC<UserVehicleProps> = ({ insightData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: motorbike,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <Box>
            <Card sx={{ width: "98%", minWidth: 370, height: 250, borderRadius: 8 }}>
                <CardContent>
                    <Typography
                        variant="h3" component="div" margin={1}
                        fontWeight="bold" color={colors.pink[500]}>
                        MOTORBIKE
                    </Typography>
                    <Typography marginLeft={1} variant="value" component="div" fontWeight="bold">
                        {(insightData.sumSpeed / insightData.validRecords).toFixed(2)}
                    </Typography>
                    <Typography marginLeft={2} marginTop={-1} variant="h4" component="div" fontWeight="bold">
                        km/h
                    </Typography>
                    <Box
                        height={220}
                        width="100%"
                        marginTop={-18}
                        marginLeft={8}
                    >
                        <Lottie
                            options={{
                                ...defaultOptions,
                                rendererSettings: {
                                    ...defaultOptions.rendererSettings,
                                    width: 400,
                                    height: 400,
                                }
                            }}
                        />
                    </Box>
                </CardContent>

            </Card>
        </Box>
    )
}
export default UserVehicle;
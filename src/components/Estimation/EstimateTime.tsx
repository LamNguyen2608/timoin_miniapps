import { tokens } from '@/theme';
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, MenuItem, Stack, TextField, Typography, useTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { type } from 'os';
import { title } from 'process';
import React, { useState } from 'react';
import result from '../../lotties/result.json';
import Lottie from 'react-lottie';
import { CommuteTimePredictor } from '../MLModels/predictTime';

type EstimateTimeProps = {

};
const traffic = [
    {
        value: 1,
        label: 'Heavy Traffic',
    },
    {
        value: 0,
        label: 'Normal Traffic',
    }
]

const weather = [
    {
        value: 0,
        label: 'Normal',
    },
    {
        value: 1,
        label: 'Sunny',
    },
    {
        value: 2,
        label: 'Scorching Hot',
    },
    {
        value: -1,
        label: 'Shower',
    },
    {
        value: -2,
        label: 'Heavy Rain',
    }
]
const vehicles = [
    {
        value: 'bike',
        label: 'Bike',
    },
    {
        value: 'motorbike',
        label: 'Motorbike',
    },
    {
        value: 'car',
        label: 'Car',
    },
    {
        value: 'bus',
        label: 'Bus',
    }
]

const EstimateTime: React.FC<EstimateTimeProps> = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        estimated: "0",
        distance: "0",
        transportation: 1,
        traffic: 0
    });
    const [prediction, setPrediction] = useState<number>();
    const [loading, setLoading] = useState(false);
    const colors = tokens(theme.palette.mode);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: result,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let input = new Array(parseInt(formData.estimated), parseInt(formData.distance), formData.traffic / 5)
        CommuteTimePredictor(input).then(value => {
            console.log(value)
            setPrediction(value)
        })
        console.log(formData);
    };
    return (
        <Stack spacing={2} alignItems="center">
            <Box>
                <Card sx={{ width: "98%", minWidth: 370, height: 250, borderRadius: 8 }}>
                    <CardContent>
                        <Typography
                            variant="h3" component="div" margin={1} marginLeft={2}
                            fontWeight="bold" color={colors.pink[500]}>
                            MOTORBIKE
                        </Typography>
                        <Typography marginLeft={1} variant="value" component="div" fontWeight="bold">
                            {prediction ? prediction.toFixed() : "NaN"}
                        </Typography>
                        <Typography marginLeft={1} marginTop={-1} variant="h4" component="div" fontWeight="bold">
                            minutes
                        </Typography>
                        <Box
                            height={220}
                            width="90%"
                            marginTop={-16}
                            marginLeft={8}
                        >
                            <Lottie
                                options={{
                                    ...defaultOptions,
                                    rendererSettings: {
                                        ...defaultOptions.rendererSettings,
                                        width: 360,
                                        height: 360,
                                    }
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Typography
                marginTop={1}
                marginBottom={4}
                color={colors.blue[500]}
                fontSize={20}
                fontWeight="bold"
                gutterBottom>
                Predict Actual Commute Time
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >

                <Grid container spacing={2}>
                    <Grid container item spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-number"
                                label="Distance"
                                name="distance"
                                color="info"
                                onChange={handleInputChange}
                                placeholder='7.6'
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                color="info"
                                label="Means of Transportation"
                                name="transportation"
                                onChange={handleInputChange}
                                defaultValue={'motorbike'}
                                fullWidth
                            >
                                {vehicles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                select
                                onChange={handleInputChange}
                                color="info"
                                name="traffic"
                                label="Traffic"
                                defaultValue={0}
                                fullWidth
                            >
                                {traffic.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleInputChange}
                                color="info"
                                name="estimated"
                                label="Estimation"
                                type='number'
                                placeholder='in minutes'
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {weather.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs={6} spacing={2}>
                            <Button color="info" type="submit" onClick={(e) => { handleSubmit(e) }}>
                                Predict
                            </Button>
                            <Button color="info" type="submit">
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}
export default EstimateTime;
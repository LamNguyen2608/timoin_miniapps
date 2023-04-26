import { tokens } from '@/theme';
import { Card, CardContent, Typography, CardActions, Button, Box, useTheme } from '@mui/material';
import React from 'react';

type CardInfoProps = {
    type: string,
    title: string,
    subtitle: string,
    description: string,
    color: any
};

const CardInfo: React.FC<CardInfoProps> = ({ type, title, subtitle, description, color }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <Box>
            <Card sx={{ minWidth: 105 }}>
                <CardContent>
                    <Typography
                        variant='h5'
                        fontWeight="bold"
                        color={color}
                        gutterBottom>
                        {type}
                    </Typography>
                    <Typography variant="h2" component="div" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {subtitle}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
        </Box>
    )
}
export default CardInfo;
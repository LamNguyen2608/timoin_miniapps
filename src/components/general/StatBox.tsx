import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
//import ProgressCircle from "./ProgressCircle";

import React from 'react';

type StatBoxProps = {
    title: string,
    subtitle: string,
    chart: any,
    increase: string
};

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, increase, chart }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{ minWidth: 168 }}
            bgcolor={colors.blue[900]}
            padding={2}>
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{ color: colors.purple[200] }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.pink[600] }}
                >
                    {increase}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography fontWeight="bold" variant="value" sx={{ color: colors.pink[500] }}>
                    {subtitle}
                </Typography>
            </Box>
            <Box>
                {chart}
            </Box>
        </Box>
    );
};

export default StatBox;

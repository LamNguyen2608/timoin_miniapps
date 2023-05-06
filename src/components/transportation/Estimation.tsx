import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MapComponent from '../Estimation/Map';
import { useTheme } from '@mui/material';
import { tokens } from '@/theme';
import { useState } from 'react';
import EstimateTime from '../Estimation/EstimateTime';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Estimation() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mapData, setMapData] = useState({ departure: 'Dai+Hoc+Greenwich+HCM', destination: 'Etown+5' });


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary">
                    <Tab label="Search" {...a11yProps(0)} />
                    <Tab label="Tracking" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <MapComponent mapData={mapData} setMapData={setMapData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EstimateTime />
            </TabPanel>
        </Box>
    );
}
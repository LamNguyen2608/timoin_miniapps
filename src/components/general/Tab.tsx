import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DustSensor from '../sensors/DustSensor';
import { base } from '../general/colors'
import { colors } from '@mui/material';
import StatBox from './StatBox';
import UVStrength from '../sensors/UVStrength';
import TrafficReport from '../records/TrafficReport';
import { CameraDataRealtime } from './schema';


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


type TabProps = {
    imageKeys: CameraDataRealtime[];
    chosenCam: CameraDataRealtime;
};


const FullWidthTabs: React.FC<TabProps> = ({ imageKeys, chosenCam }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    aria-label="sensors"
                    variant='fullWidth'
                >
                    <Tab label="Air Pollution" {...a11yProps(0)} />
                    <Tab label="UV Strength" {...a11yProps(1)} />
                    <Tab label="Traffic" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <DustSensor />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <UVStrength />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <TrafficReport imageKeys={imageKeys} chosenCam={chosenCam} />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}

export default FullWidthTabs
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import { Box, CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import Records from '@/components/transportation/Records';
import Sensor from '@/components/transportation/Sensor';
import { ColorModeContext, tokens, useMode } from '@/theme';
import Estimation from '@/components/transportation/Estimation';
import { database } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { UserData } from '@/components/general/schema';
import UserContext from '@/context/UserContext';

type TransportationProps = {
    userDataFirebase: UserData;
};

const Transportation: React.FC<TransportationProps> = ({ userDataFirebase }) => {
    const [value, setValue] = React.useState('records');
    const [theme, colorMode] = useMode();
    const themeColor = useTheme();
    const colors = tokens(themeColor.palette.mode);
    const [userData, setUserData] = React.useState<UserData>();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        console.log(userDataFirebase);
        setUserData(userDataFirebase);
    }, [])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Box sx={{ pb: 7 }} zIndex={1}>
                        <CssBaseline />
                        {value === 'records' && (
                            <Records />
                        )}
                        {value === 'sensor' && (
                            <Sensor />
                        )}
                        {value === 'estimate' && (
                            <Estimation />
                        )}
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation showLabels={true} value={value} onChange={handleChange} >
                                <BottomNavigationAction
                                    label="Records"
                                    value="records"
                                    icon={<RestoreIcon />}
                                />
                                <BottomNavigationAction
                                    label="Estimate"
                                    value="estimate"
                                    icon={<LocationOnIcon />}
                                />
                                <BottomNavigationAction
                                    label="Sensors"
                                    value="sensor"
                                    icon={<FavoriteIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </UserContext.Provider>
    );
}

export default Transportation;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const collectionRef = doc(database, "Users", context.query.userId as string);
    try {
        const docSnap = await getDoc(collectionRef);
        //console.log(docSnap.data());
        if (docSnap.exists()) {
            return {
                props: {
                    userDataFirebase: docSnap.data() as UserData
                },
            };
        } else {
            console.log("Document does not exist");
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}
//JSON.parse(safeJsonStringify({ ...response.data })),
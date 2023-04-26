import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GetServerSidePropsContext } from 'next';
import { auth, database, databaseRealtime } from "../../../../config/firebase";
import { doc, getDoc } from 'firebase/firestore';
import Paper from '@mui/material/Paper';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Records from '@/components/transportation/Records';
import Sensor from '@/components/transportation/Sensor';
import { ColorModeContext, useMode } from '@/theme';

export default function Transportation() {
    const [value, setValue] = React.useState('recents');
    const [theme, colorMode] = useMode();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>

                <Box sx={{ pb: 7 }} >
                    <CssBaseline />
                    {value === 'records' && (
                        <Records />
                    )}
                    {value === 'sensor' && (
                        <Sensor />
                    )}
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation showLabels={true} value={value} onChange={handleChange}>
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
    );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const collectionRef = doc(database, "Users", context.query.userId as string);
//     try {
//         const docSnap = await getDoc(collectionRef);
//         //console.log(docSnap.data());
//         if (docSnap.exists()) {
//             return {
//                 props: {
//                     userData: docSnap.data()
//                 },
//             };
//         } else {
//             console.log("Document does not exist");
//         }

//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

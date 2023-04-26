import { Grid, Stack, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { collection, getDocs, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { auth, database, databaseRealtime } from "../../../config/firebase";
import { onValue, ref } from 'firebase/database';
import Image from 'next/image';
import DustSensor from '../sensors/DustSensor';


type SensorProps = {
    //userData: any
};

const Sensor: React.FC<SensorProps> = () => {
    const dustRef = doc(database, "Camera", "lequangdinhst");

    const getCameraImage = () => {
        try {
            const docSnap = await getDoc(collectionRef);
            //console.log(docSnap.data());
            if (docSnap.exists()) {
                return {
                    props: {
                        userData: docSnap.data()
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
    useEffect(() => {

    }, []);

    return (
        <Stack direction="column" spacing={2}>
            {/* Live traffic camera */}
            <Image src={''} alt={''} />
            {/* tab navigator maybe? */}
            <DustSensor />
        </Stack>
    )
}
export default Sensor;

{/* <Grid container spacing={2}>
            <Grid container item spacing={2}>
            <Grid item xs={8}>
                
            </Grid>
            </Grid>
            
            <Grid item xs={4}>
                xs=4
            </Grid>
            <Grid item xs={4}>
                xs=4
            </Grid>
            <Grid item xs={8}>
                xs=8
            </Grid>
        </Grid> */}
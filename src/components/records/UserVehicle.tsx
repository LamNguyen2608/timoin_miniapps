import { Avatar, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';

type UserVehicleProps = {

};

const UserVehicle: React.FC<UserVehicleProps> = () => {

    return (
        <Stack>
            <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
            ></Avatar>
        </Stack>
    )
}
export default UserVehicle;
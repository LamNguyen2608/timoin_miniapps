import React from 'react';
import PersonalLayout from '../layout/personal_layout';
import UserVehicle from '../records/UserVehicle';

type recordsProps = {

};

const Records: React.FC<recordsProps> = () => {

    return (
        <PersonalLayout>
            <UserVehicle />
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </PersonalLayout>
    )
}
export default Records;
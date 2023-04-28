import { Stack, TextField, Button } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";


type MapProps = {
    mapData: { departure: string, destination: string }
    setMapData: (data: { departure: string, destination: string }) => void;
};



const MapComponent: React.FC<MapProps> = ({ mapData, setMapData }) => {
    const [formData, setFormData] = useState({ departure: '', destination: '' });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let go = formData.departure.split(" ").join('+');
        let arrive = formData.destination.split(" ").join('+');
        setMapData({ departure: go, destination: arrive });
    };

    return (
        <Stack>
            <iframe
                height="700"
                src={"https://www.google.com/maps/embed/v1/directions?origin=" + mapData.departure + "&destination=" + mapData.destination + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}
            ></iframe>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" alignContent="baseline" spacing={2}>
                    <Stack width={280}>
                        <TextField
                            label="Enter your departure"
                            name="departure"
                            value={formData.departure}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Enter your destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Stack>
                    <Button color="info" type="submit">
                        Search
                    </Button>
                </Stack>
            </form>
        </Stack >
    );
};

export default MapComponent;

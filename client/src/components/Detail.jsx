import React from 'react'
import { Typography, Stack, Button, Box } from '@mui/material'

import BodyPartPNG from "../assets/icons/body-part.png"
import TargetPNG from "../assets/icons/target.png"
import EquipmentPNG from "../assets/icons/equipment.png"

const Detail = ({ exerciseDetail }) => {
    const { bodyPart, equipment, gifUrl, id, name, target } = exerciseDetail;

    const extraDetail = [
        {
            icon: BodyPartPNG,
            name: bodyPart,
        },
        {
            icon: TargetPNG,
            name: target,
        },
        {
            icon: EquipmentPNG,
            name: equipment,
        },
    ];
    return (
        <Stack>
            <Stack flexDirection="row" gap="60px" sx={{ p: '20px', backgroundColor: "#749BC2" }}>
                <img src={exerciseDetail.gifUrl} alt={exerciseDetail.name} loading="lazy" style={{ borderRadius: "20px", outline: "10px solid #000000", width: "600px", height: "600px" }} />
                <Typography sx={{ fontSize: { lg: '64px', xs: '30px' }, fontFamily: "Spartan", fontWeight: "bold" }} textTransform="uppercase" variant='h3'>
                    {name}<br /><br />
                    <span style={{ textTransform: "none", fontFamily: "monospace", fontWeight: "normal", fontSize: "30px" }}>Exercises keep you strong. {name} is a pretty descent exercise to target your {target}. It will help you strengthen your {bodyPart}.</span>
                </Typography>
            </Stack>

            <Stack sx={{ gap: '20px' }}>

                {extraDetail.map((item) => {
                    <Stack key={item.name} gap="30px" direction={'column'} alignItems={"center"}>
                        <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
                            <img src={item.icon} alt="icon"/>
                        </Button>
                        <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }} variant='h5'>
                            {item.name}
                        </Typography>
                    </Stack>
                })}
            </Stack>
        </Stack>
    )
}

export default Detail
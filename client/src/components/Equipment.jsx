import React from 'react'
import { Stack, Typography } from '@mui/material'

import { goodIcon } from '../utils/goodIcon'

const Equipment = ({ item, setEquipment
    , equipment }) => {
    
    return (
        <Stack
            type="button"
            alignItems="center"
            justifyContent="center"
            className="equipment-card"
            sx={{
                borderTop: equipment === item ? '4px solid #000000' : '',
                backgroundColor: "#F6F4EB",
                borderBottomLeftRadius: '20px',
                width: "270px",
                height: "280px",
                cursor: 'pointer',
                gap: "47px"
            }}
            onClick={()=>{
                setEquipment(item);
                window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            }}

        >
            <img src={goodIcon(item)} alt="dumbbell" style={{
                width: '40px',
                height: '40px'
            }} />
            <Typography fontSize="24px" fontFamily="Spartan" fontWeight={"bold"} color="#3A1212" textTransform={"capitalize"}>{item}</Typography>
        </Stack>
    )
}

export default Equipment
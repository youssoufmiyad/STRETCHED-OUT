import React from 'react'
import { Stack, Typography } from '@mui/material'

import { goodIcon } from '../utils/goodIcon'

const Equipment = ({ item, setEquipment
    , equipment }) => {
    const href = window.location.href.substring(window.location.href.lastIndexOf("/") + 2).replace("%20", " ")
    return (
        <Stack
            type="button"
            alignItems="center"
            justifyContent="center"
            textAlign={"center"}
            className="equipment-card"
            sx={{
                borderBottom:  href === item ? '4px solid #000000' : '',
                backgroundColor: "#F6F4EB",
                borderBottomLeftRadius: '20px',
                width: "270px",
                height: "280px",
                cursor: 'pointer',
                gap: "47px"
            }}
            onClick={()=>{
                window.location.replace(`./#${item}`)
                window.location.reload()
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
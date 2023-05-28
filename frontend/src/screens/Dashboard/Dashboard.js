import { Typography } from '@mui/material';
import React from 'react';
import TitlePage from '../../components/Title-page'
import NavBar from "../../components/NavBar";

export default function Dashboard() {
    return (
        <div className='site-container'>
            <header>
                <TitlePage title='Dashboard' />
                <NavBar/>
            </header>
            <body className='site-container-content'>

            <Typography variant='h4'>Dashboard</Typography>
            </body>
        </div>
    );
}



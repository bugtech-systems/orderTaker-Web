import React from 'react'
import { Container } from '@mui/system';

//Components
import SettingsList from '../../components/Lists/SettingsList';


export default function Settings() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <SettingsList/>
    </Container>
  )
}

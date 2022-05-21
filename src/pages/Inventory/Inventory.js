import React from 'react'
import { Container } from '@mui/system';

//Components
import CollapsibleTable from '../../components/Tables/CollapsibleTable';
export default function Inventory() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <CollapsibleTable/>
    </Container>
  )
}

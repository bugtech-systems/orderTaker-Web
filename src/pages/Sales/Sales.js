import React from 'react'
import { Container } from '@mui/system';



//Components
import SpanningTable from '../../components/Tables/SpanningTable';

export default function Sales() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <SpanningTable/>
    </Container>
  )
}

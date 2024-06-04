import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Grid, GridCol, Image, Paper, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from 'graphql-hooks';
import { HomeQuery } from '../Query/Queries';
import SkeletonsComponent from '../Components/SkeletonsComponent';
import MacroBlocco from '../Components/MacroBlocco';

const Home: FC = () => {

  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const linkStyle = {
    color: colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.blue[6],
    textDecoration: 'none'
  };

  useDocumentTitle('Home')

  //Gestisco il caso di errore
  const { loading, error, data } = useQuery(HomeQuery);
  console.log(data)
  if (loading || error) {
    return (
      <Paper mb="sm" shadow="xl" p="md">
        {error ? <Title c='red'>Errore inaspettato con DATO CMS, contattare l'admin (Andrea)</Title> : undefined}
        <SkeletonsComponent />
      </Paper>
    );
  }

  //Ritorno i macroblocchi
  return <Paper p="md" shadow="xl">
    <Stack>

      <MacroBlocco title={data.homeModel.title} body={data.homeModel.body} />

      <Grid gutter="lg" justify="center">
        <GridCol span={4}>
          <Paper p='md' className='h-full'>
            <Link to="windows" style={linkStyle}>
              <Text>WINDOWS</Text>
              <Image src="/usb-stick.jpeg" alt="Windows Guide" />
            </Link>
          </Paper>
        </GridCol>
        <GridCol span={4}>
          <Paper p='md' className='h-full'>
            <Link to="setup" style={linkStyle}>
              <Text>SETUP</Text>
              <Image src="/first-desktop.png" alt="Setup Guide" />
            </Link>
          </Paper>
        </GridCol>
        <GridCol span={4}>
          <Paper p='md' className='h-full'>
            <Link to="errori" style={linkStyle}>
              <Text>ERRORI</Text>
              <Image src="/hold-power-button.jpeg" alt="Errori Guide" />
            </Link>
          </Paper>
        </GridCol>

        <GridCol span={4}>
          <Paper p='md' className='h-full'>
            <Link to="hardware" style={linkStyle}>
              <Text>HARDWARE</Text>
              <Image src="/gpu.jpg" alt="Hardware Guide" />
            </Link>
          </Paper>
        </GridCol>
        <GridCol span={4}>
          <Paper p='md' className='h-full'>
            <Link to="curiosita" style={linkStyle}>
              <Text>CURIOSITA'</Text>
              <Image src="/brain.jpg" alt="Curiosità Guide" />
            </Link>
          </Paper>
        </GridCol>
        <GridCol span={4}>
          <Paper p='md' className='h-full'>
            <Link to="altro" style={linkStyle}>
              <Text>ALTRO</Text>
              <Image src="/other.png" alt="Altro Guide" />
            </Link>
          </Paper>
        </GridCol>

      </Grid>
    </Stack>
  </Paper>
};



export default Home;
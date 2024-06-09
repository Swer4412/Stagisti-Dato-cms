import { FC } from 'react';
import { Paper, Stack, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from 'graphql-hooks';
import { HomeQuery } from '../Queries/Queries';
import SkeletonsComponent from '../Components/SkeletonsComponent';
import MacroBlocco from '../Components/MacroBlocco';
import HomeLinks from '../Components/HomeLinks';

const Home: FC = () => {

  //Aggiorno il titolo del sito in base alla pagina scelta
  useDocumentTitle('Home')

  //Gestisco il caso di errore
  const { loading, error, data } = useQuery(HomeQuery);

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
      <HomeLinks />
    </Stack>
  </Paper>
};

export default Home;
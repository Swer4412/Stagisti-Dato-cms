import { useQuery } from "graphql-hooks";
import { windowsQuery } from "../Query/Queries";
import { Body } from "../_models/commonModels";
import MacroBlocco from "../Components/MacroBlocco";
import { Paper, Title } from "@mantine/core";
import SkeletonsComponent from "../Components/SkeletonsComponent";

const Windows = () => {
  let counter = 0;

  let count = true

  interface MacroBlocco {
    title: string;
    body: Body[];
  }

  const { loading, error, data } = useQuery(windowsQuery);
  if (loading || error) {
    return (
      <Paper mb="sm" shadow="xl" p="md">
        {error ? <Title c='red'>Errore inaspettato con DATO CMS, contattare l'admin (Andrea)</Title> : undefined}
        <SkeletonsComponent />
      </Paper>
    );
  }
  return data.allWindowsModels.map((macroBlocco: MacroBlocco) => {
    return (
      <>
        <MacroBlocco title={macroBlocco.title} body={macroBlocco.body} counter={count ? ++counter : undefined} />
      </>
    );
  });
};

export default Windows;

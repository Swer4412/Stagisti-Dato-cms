import { useQuery } from "graphql-hooks";
import { setupQuery } from "../Query/Queries";
import { Body } from "../_models/commonModels";
import MacroBlocco from "../Components/MacroBlocco";
import { Paper, Title } from "@mantine/core";
import SkeletonsComponent from "../Components/SkeletonsComponent";

const Setup = () => {
  let counter = 0;

  interface AllSetupModel {
    title: string;
    body: Body[];
  }

  const { loading, error, data } = useQuery(setupQuery);
  if (loading || error) {
    return (
      <Paper mb="sm" shadow="xl" p="md">
        {error ? <Title c='red'>Errore inaspettato con DATO CMS, contattare l'admin</Title>: undefined}
        <SkeletonsComponent/>
      </Paper>
    );
  }
  return data.allSetupModels.map((step: AllSetupModel) => {
    return (
      <>
        <MacroBlocco title={step.title} body={step.body} counter={++counter}/>
      </>
    );
  });
};

export default Setup;

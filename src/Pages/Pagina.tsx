import { useQuery } from "graphql-hooks";
import { paginaProps, MacroBloccoProps } from "../_models/commonModels";
import MacroBlocco from "../Components/MacroBlocco";
import { Paper, Title } from "@mantine/core";
import SkeletonsComponent from "../Components/SkeletonsComponent";
import { Query } from "../Query/Queries";

const Pagina = ({pathName, count}: paginaProps) => {

  let counter = 0;

  const query : string = Query(pathName)

  //Gestisco il caso di errore
  const { loading, error, data } = useQuery(query);
  if (loading || error) {
    return (
      <Paper mb="sm" shadow="xl" p="md">
        {error ? <Title c='red'>Errore inaspettato con DATO CMS, contattare l'admin (Andrea)</Title> : undefined}
        <SkeletonsComponent />
      </Paper>
    );
  }

  //Gestisco dinamicame il nome del modello
  const modelName = `all${pathName.charAt(0).toUpperCase() + pathName.slice(1)}Models`;

  //Ritorno i macroblocchi
  return data[modelName]?.map((macroBlocco: MacroBloccoProps) => (
      <>
        <MacroBlocco title={macroBlocco.title} body={macroBlocco.body} counter={count ? ++counter : undefined} />
      </>
    )
  )
};

export default Pagina;

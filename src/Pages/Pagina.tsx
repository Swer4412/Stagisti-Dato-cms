import { useQuery } from "graphql-hooks";
import { paginaProps, MacroBloccoProps } from "../_models/commonModels";
import MacroBlocco from "../Components/MacroBlocco";
import { Paper, Title } from "@mantine/core";
import SkeletonsComponent from "../Components/SkeletonsComponent";
import { Query } from "../Query/Queries";
import { useDocumentTitle } from "@mantine/hooks";

const Pagina = ({pathName, count}: paginaProps) => {

  let counter = 0;

  const capitalizedPath = pathName[0].toUpperCase() + pathName.slice(1);
  
  //Cambio il titolo del sito in base alla pagina
  useDocumentTitle(capitalizedPath)

  const query : string = Query(capitalizedPath)

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
  const modelName = `all${capitalizedPath}Models`;
  
  //Ritorno i macroblocchi
  return data[modelName]?.map((macroBlocco: MacroBloccoProps) => (
      <>
        <MacroBlocco title={macroBlocco.title} body={macroBlocco.body} counter={count ? ++counter : undefined} />
      </>
    )
  )
};

export default Pagina;

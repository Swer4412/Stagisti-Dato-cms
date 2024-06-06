import { useQuery } from "graphql-hooks";
import { paginaProps, MacroBloccoProps } from "../_models/commonModels";
import MacroBlocco from "../Components/MacroBlocco";
import { Paper, Title } from "@mantine/core";
import SkeletonsComponent from "../Components/SkeletonsComponent";
import { Query } from "../Query/Queries";
import { useDocumentTitle } from "@mantine/hooks";
import { useEffect } from "react";

const Pagina = ({pathName, count}: paginaProps) => {

  let counter = 0;

  const capitalizedPath = pathName[0].toUpperCase() + pathName.slice(1);
  
  //Cambio il titolo del sito in base alla pagina
  useDocumentTitle(capitalizedPath)

  //TODO gestire cacheing per risolvere il problema che quando di naviga indietro, si ritorna in cima alla pagina
  const query : string = Query(capitalizedPath)

  //Gestisco il caso di errore
  const { loading, error, data } = useQuery(query, {
    cachePolicy: 'cache'
  });

  useEffect(() => {
    if (!loading && data) {
      const path = window.location.pathname;
      const scrollPosition = sessionStorage.getItem(`scrollPosition_${path}`);
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    }
  
    // Aggiungi questo codice per salvare la posizione dello scroll quando l'utente naviga via dalla pagina
    window.addEventListener('beforeunload', () => {
      const path = window.location.pathname;
      sessionStorage.setItem(`scrollPosition_${path}`, window.scrollY.toString());
    });
  
    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('beforeunload', () => {
        const path = window.location.pathname;
        sessionStorage.setItem(`scrollPosition_${path}`, window.scrollY.toString());
      });
    }
  }, [loading, data]); // Aggiungi le dipendenze necessarie qui
  

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

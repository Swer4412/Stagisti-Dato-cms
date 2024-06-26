import { useQuery } from "graphql-hooks";
import { paginaProps, MacroBloccoProps } from "../_models/commonModels";
import MacroBlocco from "../Components/MacroBlocco";
import { Paper, Title } from "@mantine/core";
import SkeletonsComponent from "../Components/SkeletonsComponent";
import { Query } from "../Queries/Queries";
import { useDocumentTitle } from "@mantine/hooks";

const Pagina = ({ pathName, count }: paginaProps) => {

  const capitalizedPath = pathName[0].toUpperCase() + pathName.slice(1);
  //Cambio il titolo del sito in base alla pagina
  useDocumentTitle(capitalizedPath)

  const query: string = Query(capitalizedPath)

  //Chiamo l'endpoint
  const { loading, error, data } = useQuery(query, {
    cachePolicy: 'cache-and-network'
  });

  //Provo a gestire lo scrolling post render che pero non va
  // useEffect(() => {
  //   if (!loading && data) {
  //     const path = window.location.pathname;
  //     const scrollPosition = sessionStorage.getItem(`scrollPosition_${path}`);
  //     if (scrollPosition) {
  //       window.scrollTo(0, parseInt(scrollPosition));
  //     }
  //   }

  //   // Aggiungi questo codice per salvare la posizione dello scroll quando l'utente naviga via dalla pagina
  //   window.addEventListener('beforeunload', () => {
  //     const path = window.location.pathname;
  //     sessionStorage.setItem(`scrollPosition_${path}`, window.scrollY.toString());
  //   });

  //   // Rimuovi l'event listener quando il componente viene smontato
  //   return () => {
  //     window.removeEventListener('beforeunload', () => {
  //       const path = window.location.pathname;
  //       sessionStorage.setItem(`scrollPosition_${path}`, window.scrollY.toString());
  //     });
  //   }
  // }, [data]); // Aggiungi le dipendenze necessarie qui

  //Gestisco caso di caricamento o errore in modo intelligente e carino da vedere
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
  let counter = 0;
  return data[modelName]?.map((macroBlocco: MacroBloccoProps) => (
    <>
      <MacroBlocco title={macroBlocco.title} body={macroBlocco.body} counter={count ? ++counter : undefined} />
    </>
  )
  )
};

export default Pagina;

//TODO creare una funzione che prende il path e fa questo: All${path}Model 
export const windowsQuery = `query MyQuery {
  allWindowsModels {
    title
    body {
      ... on ImmagineRecord {
        immagine {
          url
        }
      }
      ... on LinkRecord {
        link {
          ... on ErroriModelRecord {
            title
            _modelApiKey
          }
          ... on SetupModelRecord {
            title
            _modelApiKey
          }
          ... on WindowsModelRecord {
            title
            _modelApiKey
          }
          ... on AltroModelRecord {
            title
            _modelApiKey
          }
          ... on CuriositaModelRecord {
            title
            _modelApiKey
          }
          ... on HardwareModelRecord {
            title
            _modelApiKey
          }
        }
        descrizioneLink
      }
      ... on ListRecord {
        id
        list {
          listElement
        }
      }
      ... on SottotitoloRecord {
        subtitle
      }
      ... on TestoRecord {
        testo
      }
    }
  }
}`

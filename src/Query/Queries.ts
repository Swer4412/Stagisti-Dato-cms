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
          }
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

export const setupQuery = ``
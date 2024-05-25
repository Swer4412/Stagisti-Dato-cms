export interface Body {
    testo?: string
    immagine?: Immagine
    link?: Link
    subtitle?: string
    list?: listElement[]
  }
  
  export interface Immagine {
    url: string
  }
  
  export interface Link {
      link: {
        title: string
        _modelApiKey: string
      },
      descrizioneLink: string
  }
  
  //Per problemi di ambiguitá di nomi, devo chiamare List come ListElement
  export interface listElement {
    listElement: string
  }
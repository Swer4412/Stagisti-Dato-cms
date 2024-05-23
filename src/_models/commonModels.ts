export interface Body {
    testo?: string
    immagine?: Immagine
    link?: Link
    id?: string
    list?: List[]
  }
  
  export interface Immagine {
    url: string
  }
  
  export interface Link {
    title: string
    _modelApiKey: string
  }
  
  export interface List {
    listElement: string
  }
// app/adobe-workfront-managed-services/queries.ts

export const ADOBE_WORKFRONT_QUERY = `
{
  ourClients:dluxHomePage(id:"4A72lxXg2x9dph73jiAulF"){
    dluxHeading
    dluxPara
    dluxImageCollection{
      items{ url }
    }
  }

  dluxClientReview(id:"v0vliZ0vlLncA9C8MoFj4"){
    clientheading
    clientText
    clientParagraph
    clientH3
  }

  client2:dluxClientReview(id:"7v3M8VauzJC7unNBQYXmER"){
    clientParagraph
    clientH3
  }

  client3:dluxClientReview(id:"1BFMkgxFC5iZwk2zD45gWs"){
    clientParagraph
    clientH3
  }

  client4:dluxClientReview(id:"5Das9dg0zL7u0d2JWQSAjq"){
    clientParagraph
    clientH3
  }

  girl_banner:dluxHomePage(id:"3Qua2MuT10wlYUoaFWh4md"){
    dluxImageCollection{
      items{ url }
    }
  }
}
`;

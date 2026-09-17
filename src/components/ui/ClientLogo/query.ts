// lib/contentful/clients.query.ts

export const CLIENTS_QUERY = `
{
  ourClients: dluxHomePage(id:"4A72lxXg2x9dph73jiAulF") {
    dluxHeading
    dluxPara
    dluxImageCollection {
      items {
        url
      }
    }
  }
}
`;

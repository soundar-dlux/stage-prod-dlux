// lib/contentful/clients.types.ts

export interface ClientLogo {
  url: string;
}

export interface ClientsData {
  dluxHeading: string;
  dluxPara: string;
  dluxImageCollection: {
    items: ClientLogo[];
  };
}

export interface ClientsResponse {
  data: {
    ourClients: ClientsData;
  };
}

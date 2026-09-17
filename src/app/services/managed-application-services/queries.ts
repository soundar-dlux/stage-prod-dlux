export const MANAGED_APPLICATION_SERVICES_QUERY = `
{
  dluxServiceMainPage(id:"2foNr3XkxX7F7DvuuJgc2S"){
    dluxServiceHeading
    dluxServiceImage {
      url
    }
  }

  ManagedApplicationPage_ManagedApplicationServices: dluxServiceMainPage(
    id:"BDo8geqovjCX5mWGTMy5e"
  ){
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }

  ManagedApplicationPage_AMSReinvented: dluxServiceMainPage(
    id:"3nglsPthwGgyDdophhQjV6"
  ){
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }

  ManageApplicationPage_Our_One_Of_A_KindApproach: dluxServiceMainPage(
    id:"7zkrrmRfhNQvYWmgEqmG2k"
  ){
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }
}
`;

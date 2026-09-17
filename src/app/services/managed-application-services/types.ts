export interface Image {
  url: string;
}

export interface ImageCollection {
  items: Image[];
}

export interface ServiceBlock {
  dluxServiceHeading: string;
  dluxServiceImage?: Image;
  dluxServiceImageManyCollection?: ImageCollection;
}

export interface ManagedApplicationServicesPageData {
  dluxServiceMainPage: ServiceBlock;

  ManagedApplicationPage_ManagedApplicationServices: ServiceBlock;

  ManagedApplicationPage_AMSReinvented: ServiceBlock;

  ManageApplicationPage_Our_One_Of_A_KindApproach: ServiceBlock;
}

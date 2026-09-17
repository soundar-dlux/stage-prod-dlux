export interface Asset {
  url: string;
}

export interface AssetCollection {
  items: Asset[];
}

export interface ServicePage {
  dluxServiceHeading: string;
  dluxServiceImage?: Asset;
  dluxServiceImageManyCollection?: AssetCollection;
}

export interface TrainingChangeManagementData {
  dluxServiceMainPage: ServicePage;
  Traning_ChangePage_TrainingandChangeManagement: ServicePage;
  Traning_ChangePage_BuildingaFutureReadyWorkforce: ServicePage;
  Traning_changePage_WhyChooseDLUX: ServicePage;
}

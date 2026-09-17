export const DIGITAL_MARTECH_QUERY = `
{
  dluxServiceMainPage(id:"4pyqUFmuhzVsjCCi5KaGLE"){
    dluxServiceHeading
    dluxServiceImage {
      url
    }
  }

  DigitalPage_Digital: dluxServiceMainPage(id:"5AOeVFJm42tHg2UBqgdTzc"){
    dluxServiceHeading
    dluxServiceImage {
      url
    }
  }

  DigitalPage_Whatdoyoustandtogain: dluxServiceMainPage(id:"4GEsvnyuz5zlEPWN6Mcabx"){
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }

  DigitalPage_BusinessProcessOptimizationServices: dluxServiceMainPage(id:"4HrftGoj8GhQ89WR8sutQ8"){
    dluxServiceHeading
    dluxServiceImageManyCollection {
      items {
        url
      }
    }
  }
}
`;

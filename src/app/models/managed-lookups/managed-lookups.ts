export enum LookupTableId {
    Public_Strengths = 'd6a43968-93c1-43be-96e5-903b1d4088a0',
    Public_SpiritualGifts = '118c4dd3-93c4-4ff9-8339-d23578714fe6',
    Public_Regions = 'b0559b8b-5408-4ba2-a5b4-07445caa2d23',
    Public_ThresholdsOfConversion = '99ebc74e-dd5d-4052-bf89-c0e5cd12a95f',
    Public_VolunteerInterests = 'b9e8ee78-02af-48ea-bb3d-d53fa34b07b5',
    Public_Interests = 'ab1bc0b6-9d0a-4854-8495-42f6089ca034',
    Public_Skills = '9d1c88a4-ea29-4727-8bb7-4937b6af4c69'
  }
  
  export interface ILookup {
    id: string;
    name: string;
    description: string;
    selected: boolean;
  }
  
  export interface ILookupItem {
    lookupTableRow: ILookupTableRow;
    selected: boolean;
    isUsed?: boolean;
  }
  
  export interface ILookupTable {
    lookup_table_id: string;
    lookup_table_description: string;
    lookup_table_name: string;
  }
  
  export interface ILookupTableRow {
    pk_id: string;
    item_text: string;
    sort_order: number;
    lookup_default_id: string;
    created_timestamp: Date;
    modified_timestamp: Date;
    deleted_timestamp: Date;
  }
  
  export interface ILookupTableRowAdded {
    organization_id: string;
    item_text: string;
    sort_order: number;
  }
  
  export interface ILookupTableRowUpdated {
    pk_id: string;
    item_text: string;
    sort_order: number;
    deleted: boolean;
  }
  
  export interface IManagedLookupAddUpdateResponse {
    result_code: number;
  }
  
  export interface ILookupTableRowIsUsed {
    region_id: string;
    item_text: string;
    is_used: boolean;
  }
  
  export interface ILookupDisplayRow {
    lookup_id: string;
    lookup_text: string;
    sort_order: number;
  }
  
  export interface IMultiSelectLookupAttributes {
    lookupTableId: string,
    modifyModalTitle: string;
    mergeUrlPath: string;
  }
  
  export interface IUpdatedLookupItems {
    lookupItems: ILookupDisplayRow[];
    isItemsAreSaved: boolean;
  }
  
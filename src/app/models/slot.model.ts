export interface SlotModelArray {
    data: SlotTypeModel[];
  }
  
  export interface SlotModel {
    data: SlotTypeModel;
  }
  
  export interface SlotTypeModel {
    type: string;
    category: string;
    platform: string;
    name: string;
    order: number;
    totalGames: number;
    icon?: string;
    games: ISlotModel[];
  }
  
  export interface ISlotModel {
    game_id: string;
    name: string;
    provider: string;
    providerName: string;
    image: string;
    imageSet: {
      blurhash: string;
      original: string;
      webp: string;
    };
    url: string;
    order: 1;
    tags: string[];
    stats: string[];
    gameId: string;
    image2: string;
  }
  
  export interface ProvidersModel {
    data: BaseProvidersModel[];
  }
  
  export interface BaseProvidersModel {
    _id: string;
    name: string;
    iframeW: number;
    iframeH: number;
    vendor: string;
    provider: string;
    type: string;
    order: number;
    enabled: true;
    logo: string;
    tags: string[];
    gamesCount: number;
  }
  
  export interface ProviderSlotsModel {
    data: {
      type: string;
      provider: string;
      vendor: string;
      iframeW: number;
      iframeH: number;
      name: string;
      order: number;
      games: ISlotModel[];
    };
  }
  
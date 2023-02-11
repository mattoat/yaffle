import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LeaderboardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League0MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League1MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League2MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League3MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League4MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League5MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League6MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type League7MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Leaderboard {
  readonly id: string;
  readonly League0s?: (League0 | null)[] | null;
  readonly League1s?: (League1 | null)[] | null;
  readonly League2s?: (League2 | null)[] | null;
  readonly League3s?: (League3 | null)[] | null;
  readonly League4s?: (League4 | null)[] | null;
  readonly League5s?: (League5 | null)[] | null;
  readonly League6s?: (League6 | null)[] | null;
  readonly League7s?: (League7 | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Leaderboard, LeaderboardMetaData>);
  static copyOf(source: Leaderboard, mutator: (draft: MutableModel<Leaderboard, LeaderboardMetaData>) => MutableModel<Leaderboard, LeaderboardMetaData> | void): Leaderboard;
}

export declare class League0 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League0, League0MetaData>);
  static copyOf(source: League0, mutator: (draft: MutableModel<League0, League0MetaData>) => MutableModel<League0, League0MetaData> | void): League0;
}

export declare class League1 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League1, League1MetaData>);
  static copyOf(source: League1, mutator: (draft: MutableModel<League1, League1MetaData>) => MutableModel<League1, League1MetaData> | void): League1;
}

export declare class League2 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League2, League2MetaData>);
  static copyOf(source: League2, mutator: (draft: MutableModel<League2, League2MetaData>) => MutableModel<League2, League2MetaData> | void): League2;
}

export declare class League3 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League3, League3MetaData>);
  static copyOf(source: League3, mutator: (draft: MutableModel<League3, League3MetaData>) => MutableModel<League3, League3MetaData> | void): League3;
}

export declare class League4 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League4, League4MetaData>);
  static copyOf(source: League4, mutator: (draft: MutableModel<League4, League4MetaData>) => MutableModel<League4, League4MetaData> | void): League4;
}

export declare class League5 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League5, League5MetaData>);
  static copyOf(source: League5, mutator: (draft: MutableModel<League5, League5MetaData>) => MutableModel<League5, League5MetaData> | void): League5;
}

export declare class League6 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League6, League6MetaData>);
  static copyOf(source: League6, mutator: (draft: MutableModel<League6, League6MetaData>) => MutableModel<League6, League6MetaData> | void): League6;
}

export declare class League7 {
  readonly id: string;
  readonly Rank?: number | null;
  readonly Played?: number | null;
  readonly Badge?: string | null;
  readonly Name?: string | null;
  readonly GF?: number | null;
  readonly GA?: number | null;
  readonly GD?: number | null;
  readonly Points?: number | null;
  readonly Form?: string | null;
  readonly leaderboardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<League7, League7MetaData>);
  static copyOf(source: League7, mutator: (draft: MutableModel<League7, League7MetaData>) => MutableModel<League7, League7MetaData> | void): League7;
}
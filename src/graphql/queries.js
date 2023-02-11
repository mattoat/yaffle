/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLeaderboard = /* GraphQL */ `
  query GetLeaderboard($id: ID!) {
    getLeaderboard(id: $id) {
      id
      League0s {
        nextToken
        startedAt
      }
      League1s {
        nextToken
        startedAt
      }
      League2s {
        nextToken
        startedAt
      }
      League3s {
        nextToken
        startedAt
      }
      League4s {
        nextToken
        startedAt
      }
      League5s {
        nextToken
        startedAt
      }
      League6s {
        nextToken
        startedAt
      }
      League7s {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeaderboards = /* GraphQL */ `
  query ListLeaderboards(
    $filter: ModelLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeaderboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeaderboards = /* GraphQL */ `
  query SyncLeaderboards(
    $filter: ModelLeaderboardFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeaderboards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague0 = /* GraphQL */ `
  query GetLeague0($id: ID!) {
    getLeague0(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague0s = /* GraphQL */ `
  query ListLeague0s(
    $filter: ModelLeague0FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague0s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague0s = /* GraphQL */ `
  query SyncLeague0s(
    $filter: ModelLeague0FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague0s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague1 = /* GraphQL */ `
  query GetLeague1($id: ID!) {
    getLeague1(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague1s = /* GraphQL */ `
  query ListLeague1s(
    $filter: ModelLeague1FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague1s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague1s = /* GraphQL */ `
  query SyncLeague1s(
    $filter: ModelLeague1FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague1s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague2 = /* GraphQL */ `
  query GetLeague2($id: ID!) {
    getLeague2(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague2s = /* GraphQL */ `
  query ListLeague2s(
    $filter: ModelLeague2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague2s = /* GraphQL */ `
  query SyncLeague2s(
    $filter: ModelLeague2FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague3 = /* GraphQL */ `
  query GetLeague3($id: ID!) {
    getLeague3(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague3s = /* GraphQL */ `
  query ListLeague3s(
    $filter: ModelLeague3FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague3s = /* GraphQL */ `
  query SyncLeague3s(
    $filter: ModelLeague3FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague3s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague4 = /* GraphQL */ `
  query GetLeague4($id: ID!) {
    getLeague4(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague4s = /* GraphQL */ `
  query ListLeague4s(
    $filter: ModelLeague4FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague4s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague4s = /* GraphQL */ `
  query SyncLeague4s(
    $filter: ModelLeague4FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague4s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague5 = /* GraphQL */ `
  query GetLeague5($id: ID!) {
    getLeague5(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague5s = /* GraphQL */ `
  query ListLeague5s(
    $filter: ModelLeague5FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague5s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague5s = /* GraphQL */ `
  query SyncLeague5s(
    $filter: ModelLeague5FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague5s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague6 = /* GraphQL */ `
  query GetLeague6($id: ID!) {
    getLeague6(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague6s = /* GraphQL */ `
  query ListLeague6s(
    $filter: ModelLeague6FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague6s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague6s = /* GraphQL */ `
  query SyncLeague6s(
    $filter: ModelLeague6FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague6s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeague7 = /* GraphQL */ `
  query GetLeague7($id: ID!) {
    getLeague7(id: $id) {
      id
      Rank
      Played
      Badge
      Name
      GF
      GA
      GD
      Points
      Form
      leaderboardID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLeague7s = /* GraphQL */ `
  query ListLeague7s(
    $filter: ModelLeague7FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeague7s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeague7s = /* GraphQL */ `
  query SyncLeague7s(
    $filter: ModelLeague7FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeague7s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Rank
        Played
        Badge
        Name
        GF
        GA
        GD
        Points
        Form
        leaderboardID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;

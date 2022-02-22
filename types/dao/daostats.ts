/** all stats of all daos */
/** stats of daos */
export type DAOStats = {
  _id?: string
  /** dao number */
  daos: number
  /** member number of all dao */
  members: number
  /** treasury of all dao */
  treasury: number
  /** dao on chains count */
  chain_category: ChainCategory[]
  governanace: Governanace
  dework: Dework
  create_at: Date
}

/** governanace */
type Governanace = {
  /** number of in grace */
  grace: number
  /** number of in passed */
  passed: number
  /** number of in process */
  process: number
  /** number of unsponsored */
  unsponsored: number
  /** number of in voting */
  voting: number
  /** number of excution */
  excution: number
}

/** Statistics of the number of states of all DAOs in Dework */
type Dework = {
  /** number of in process */
  progress: number
  /** number of in todo */
  todo: number
  /** number of in review */
  inreview: number
}

/** Chain Category */
type ChainCategory = {
  /** the block chain type */
  chain_type: string
  /** total counts */
  count: number
}

type TwitterData = {
  twitter_followers: number
}

type Attributes = {
  activities_count: number
  avatar_url: string
  bio: string
  birthday: string
  company: string
  title: string
  created_at: string
  deleted_at: string
  first_activity_occurred_at: string
  last_activity_occurred_at: string
  location: string
  name: string
  pronouns: string
  reach: number
  shipping_address: string
  slug: string
  source: string
  tag_list: unknown[]
  tags: unknown[]
  teammate: boolean
  tshirt: string
  updated_at: string
  merged_at: string
  url: string
  orbit_url: string
  created: boolean
  id: string
  orbit_level: string
  love: string
  twitter: string
  github: string
  discourse: string
  email: string
  devto: string
  linkedin: string
  discord: string
  github_followers: string
  twitter_followers: number
  topics: string
  languages: string
}

interface Included_Attributes {
  uid: string
  email: string
  username: string
  name: string
  source: string
  source_host: string
}

type Data = {
  id: string
  type: string
  attributes: Attributes
  relationships: Data_Relationships
}

interface Data_Relationships_Identities_Data {
  id: string
  type: string
}

interface Data_Relationships_Identities {
  data: Data_Relationships_Identities_Data[]
}

interface Included {
  id: string
  type: string
  attributes: Included_Attributes
}

type Data_Relationships = {
  identities: Data_Relationships_Identities
}

type TwitterResponse = {
  data: Data
  included: Included[]
}

export type { TwitterData, TwitterResponse }

export interface JSONType {
  [key: Readonly<string>]:
    | string
    | number
    | boolean
    | Date
    | JSONType
    | JSONType[]
}

const a: object = {}

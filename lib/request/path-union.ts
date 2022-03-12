/* eslint-disable prettier/prettier */
/* Tidy TypeScript:Prefer union types over enums,
 * https://fettblog.eu/tidy-typescript-avoid-enums/
 */
// Tips: If path like this: [path]/:id ,we can use @Type:AxiosRequestConfig.paramsSerializer

export type PathUnionType =
  | '/auth/sign-in'
  | '/auth/status'
  | '/auth/sign-out'
  | '/auth/me'
  | `/api/error`
  | '/dao'
  | '/v2/user'

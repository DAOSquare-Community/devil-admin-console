/* eslint-disable prettier/prettier */
/* Tidy TypeScript:Prefer union types over enums,
 * https://fettblog.eu/tidy-typescript-avoid-enums/
 */
// Tips: If path like this: [path]/:id ,we can use @Type:AxiosRequestConfig.paramsSerializer

export type PathUnionType = '/api/sign' | `/login/${'event' | 'events'}`

export type UniqueAliasKeyType = 'GOT_CALENDAR_MEETING_EVENTS'

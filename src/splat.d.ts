
type text = string
type date = Date
type datetime = Date
type fpnumber = number
type flag = boolean

type SplatPropertyType = text | date | datetime | fpnumber | flag | Array<SplatPropertyType> // TODO: objekt
type SplatParameterType = SplatPropertyType // for now
type SplatReturnType = SplatPropertyType | Promise<SplatPropertyType> | void

type SplatAction = (...args: SplatParameterType[]) => SplatReturnType

// interface SplatObject {
//     [name: string]: SplatType
// }

type WithOnlySplatPropertyTypes<T> = {
    [P in keyof T]: SplatPropertyType|SplatAction;
}
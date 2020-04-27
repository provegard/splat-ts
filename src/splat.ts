
type text = string
type date = Date
type datetime = Date
type fpnumber = number
type flag = boolean

type SplatPropertyType = text | date | datetime | fpnumber | flag | Array<SplatPropertyType> // TODO: objekt
type SplatParameterType = SplatPropertyType // for now
type SplatReturnType = SplatPropertyType | Promise<SplatPropertyType> | void

type SplatAction = (...args: SplatParameterType[]) => SplatReturnType

type WithOnlySplatPropertyTypes<T> = {
    [P in keyof T]: SplatPropertyType|SplatAction;
}

type SplatType<T> = WithOnlySplatPropertyTypes<T>
type Empty_Constructor_Creating_SplatType<T> = new () => SplatType<T>

function Model<T extends Empty_Constructor_Creating_SplatType<InstanceType<T>>>(cls: T): T {
    return cls
}

@Model
class TheEntity2 {
    something(): text { return "" }
    x: fpnumber
    //y: RegExp

    constructor() {}
}

function f<T>(x: Empty_Constructor_Creating_SplatType<T>): Empty_Constructor_Creating_SplatType<T> { return }

const x = f(TheEntity2)

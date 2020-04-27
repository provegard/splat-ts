
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

type SplatClass<T> = {
    new(...args: any[]): WithOnlySplatPropertyTypes<T>
}

/*function Entity<T extends (new (...args: any[]) => WithOnlySplatPropertyTypes<InstanceType<T>>)>(_: T) {
}

function ValueObject<T extends (new (...args: any[]) => WithOnlySplatPropertyTypes<InstanceType<T>>)>(_: T) {
}

function Process<T extends (new (...args: any[]) => WithOnlySplatPropertyTypes<InstanceType<T>>)>(_: T) {
}*/


type NoArgConstructorXX = new () => any

type InstanceTypeNoC<T> = T extends new (...args: any) => infer R ? R : any;
type SplatTypeBase<T> = new () => WithOnlySplatPropertyTypes<InstanceTypeNoC<T>>
    // T extends (new () => WithOnlySplatPropertyTypes<InstanceTypeNoC<T>>)
    //     ? T
    //     : never


// type NoArgConstructor<T> = new () => T
// type SplatTypeBase<T> =
//     T extends (new () => WithOnlySplatPropertyTypes<InstanceType<T>>)
//         ? T
//         : never
type SplatType<T> = new () => WithOnlySplatPropertyTypes<InstanceTypeNoC<T>>

function Model<T>(cls: SplatType<T>): SplatType<T> {
    return cls
}

type SplatType2<T> = WithOnlySplatPropertyTypes<T>

type Empty_Constructor_Creating_SplatType<T> = new () => SplatType2<T>

// @Model
class TheEntity2 {
    something(): text { return "" }
    x: fpnumber
    //y: RegExp

    constructor() {}
}

function f<T>(x: Empty_Constructor_Creating_SplatType<T>): Empty_Constructor_Creating_SplatType<T> { return }

const x = f(TheEntity2)

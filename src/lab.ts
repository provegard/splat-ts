

function Entity<T extends (new (...args: any[]) => WithOnlySplatPropertyTypes<InstanceType<T>>)>(_: T) {
    console.log("decorating")
    console.log(_)
}

function Expression<T>(f: () => T) {

}

@Entity
class MyEntity {
    MyProp: fpnumber
    OtherProp: text

    get ExprProp(): text { return this.OtherProp }

    doSomething(): void {
        console.log("something " + this.OtherProp)
    }
}

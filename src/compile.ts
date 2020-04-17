import { readFileSync } from "fs"
import * as ts from "typescript"

export function delint(sourceFile: ts.SourceFile) {
    delintNode(sourceFile)

    function delintNode(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.Decorator:
                const parentType = node.parent?.kind
                if (parentType === ts.SyntaxKind.ClassDeclaration) {
                    const parent = node.parent as ts.ClassDeclaration
                    console.log("found decorated class", parent.name.getText())
                }
                break
        }

        ts.forEachChild(node, delintNode)
    }
}

const fileNames = process.argv.slice(2)
fileNames.forEach(fileName => {
  // Parse a file
    const sourceFile = ts.createSourceFile(
        fileName,
        readFileSync(fileName).toString(),
        ts.ScriptTarget.ES2015,
        /*setParentNodes */ true
    )

    // delint it
    delint(sourceFile)
})
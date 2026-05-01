from backend.utils import guess_java_type


def generate_java_code(classes):
    code = ""

    for cls in classes:
        inheritance = ""

        for rel in cls["relationships"]:
            if rel["type"] == "inheritance":
                inheritance = f" extends {rel['target']}"

        code += f"public class {cls['name']}{inheritance} {{\n"

        for attr in cls["attributes"]:
            java_type = guess_java_type(attr["type"])
            code += f"    private {java_type} {attr['name']};\n"

        code += "\n"

        constructor_params = []
        for attr in cls["attributes"]:
            constructor_params.append(
                f"{guess_java_type(attr['type'])} {attr['name']}"
            )

        code += f"    public {cls['name']}({', '.join(constructor_params)}) {{\n"

        for attr in cls["attributes"]:
            code += f"        this.{attr['name']} = {attr['name']};\n"

        code += "    }\n\n"

        for method in cls["methods"]:
            return_type = guess_java_type(method["returnType"])

            params = []
            for p in method["params"]:
                params.append(
                    f"{guess_java_type(p['type'])} {p['name']}"
                )

            code += f"    public {return_type} {method['name']}({', '.join(params)}) {{\n"
            code += "        // TODO\n"

            if return_type != "void":
                code += "        return null;\n"

            code += "    }\n\n"

        code += "}\n\n"

    return code
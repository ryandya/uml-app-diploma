from backend.utils import guess_cpp_type


def generate_cpp_code(classes):
    code = "#include <string>\n\n"

    for cls in classes:
        inheritance = ""

        for rel in cls["relationships"]:
            if rel["type"] == "inheritance":
                inheritance = f" : public {rel['target']}"

        code += f"class {cls['name']}{inheritance} {{\n"
        code += "private:\n"

        for attr in cls["attributes"]:
            cpp_type = guess_cpp_type(attr["type"])
            code += f"    {cpp_type} {attr['name']};\n"

        code += "\npublic:\n"

        params = []
        for attr in cls["attributes"]:
            params.append(
                f"{guess_cpp_type(attr['type'])} {attr['name']}"
            )

        code += f"    {cls['name']}({', '.join(params)}) {{\n"

        for attr in cls["attributes"]:
            code += f"        this->{attr['name']} = {attr['name']};\n"

        code += "    }\n\n"

        for method in cls["methods"]:
            return_type = guess_cpp_type(method["returnType"])

            params = []
            for p in method["params"]:
                params.append(
                    f"{guess_cpp_type(p['type'])} {p['name']}"
                )

            code += f"    {return_type} {method['name']}({', '.join(params)}) {{\n"
            code += "        // TODO\n"

            if return_type != "void":
                code += "        return {};\n"

            code += "    }\n\n"

        code += "};\n\n"

    return code
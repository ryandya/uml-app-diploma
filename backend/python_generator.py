def generate_python_code(classes):
    code = ""

    for cls in classes:
        inheritance = ""

        for rel in cls["relationships"]:
            if rel["type"] == "inheritance":
                inheritance = f"({rel['target']})"

        code += f"class {cls['name']}{inheritance}:\n"

        attributes = cls["attributes"]

        if attributes:
            params = ", ".join([a["name"] for a in attributes])
            code += f"    def __init__(self, {params}):\n"

            if inheritance:
                code += "        super().__init__()\n"

            for attr in attributes:
                code += f"        self.{attr['name']} = {attr['name']}\n"
        else:
            code += "    def __init__(self):\n"
            code += "        pass\n"

        code += "\n"

        for method in cls["methods"]:
            method_params = ", ".join(
                [p["name"] for p in method["params"]]
            )

            if method_params:
                method_params = ", " + method_params

            code += f"    def {method['name']}(self{method_params}):\n"
            code += "        # TODO\n"
            code += "        pass\n\n"

        code += "\n"

    return code
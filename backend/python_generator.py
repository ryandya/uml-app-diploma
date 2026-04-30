def generate_python_code(classes):
    code = ""

    for cls in classes:
        base = f"({cls['extends']})" if cls.get("extends") else ""

        params = ", ".join([a["name"] for a in cls["attributes"]])

        init_body = []
        for attr in cls["attributes"]:
            init_body.append(f"        self.{attr['name']} = {attr['name']}")

        methods = ""
        for m in cls["methods"]:
            name = m.split("(")[0]
            methods += f"""
    def {name}(self):
        # TODO
        pass
"""

        code += f"""
class {cls['name']}{base}:
    def __init__(self, {params}):
{chr(10).join(init_body) if init_body else '        pass'}
{methods}
"""
    return code
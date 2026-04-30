from .utils import guess_java_type

def generate_java_code(classes):
    code = ""

    for cls in classes:
        fields = ""
        constructor_params = []
        constructor_body = ""
        getters_setters = ""

        for attr in cls["attributes"]:
            t = guess_java_type(attr["type"])
            name = attr["name"]

            fields += f"    private {t} {name};\n"
            constructor_params.append(f"{t} {name}")
            constructor_body += f"        this.{name} = {name};\n"

            getters_setters += f"""
    public {t} get{ name.capitalize() }() {{
        return {name};
    }}

    public void set{ name.capitalize() }({t} {name}) {{
        this.{name} = {name};
    }}
"""

        code += f"""
public class {cls['name']} {{

{fields}

    public {cls['name']}({', '.join(constructor_params)}) {{
{constructor_body}
    }}

{getters_setters}
}}
"""
    return code
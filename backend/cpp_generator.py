from .utils import guess_cpp_type

def generate_cpp_code(classes):
    code = ""

    for cls in classes:
        private_fields = ""
        public_methods = ""

        constructor_params = []
        constructor_body = ""

        for attr in cls["attributes"]:
            t = guess_cpp_type(attr["type"])
            name = attr["name"]

            private_fields += f"    {t} {name};\n"
            constructor_params.append(f"{t} {name}")
            constructor_body += f"        this->{name} = {name};\n"

            public_methods += f"""
    {t} get{ name.capitalize() }() {{
        return {name};
    }}

    void set{ name.capitalize() }({t} {name}) {{
        this->{name} = {name};
    }}
"""

        code += f"""
class {cls['name']} {{
private:
{private_fields}

public:
    {cls['name']}({', '.join(constructor_params)}) {{
{constructor_body}
    }}

{public_methods}
}};
"""
    return code
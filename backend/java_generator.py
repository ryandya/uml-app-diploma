def find_parent(class_data):
    for rel in class_data.get("relationships", []):
        if rel["type"] == "inheritance":
            return rel["target"]
    return None


def get_java_type(type_name):
    type_map = {
        "string": "String",
        "int": "int",
        "float": "double",
        "bool": "boolean"
    }
    return type_map.get(type_name.lower(), "String")


def generate_method(method):
    name = method["name"]
    return_type = get_java_type(method.get("returnType", "void"))
    params = method.get("params", [])

    param_str = ", ".join(
        [f"{get_java_type(p['type'])} {p['name']}" for p in params]
    )

    lines = [f"    public {return_type} {name}({param_str}) " + "{"]

    if name.startswith("get"):
        field = name[3:]
        if field:
            field = field[0].lower() + field[1:]
            lines.append(f"        return {field};")
    elif name.startswith("set") and len(params) == 1:
        field = name[3:]
        if field:
            field = field[0].lower() + field[1:]
            lines.append(f"        this.{field} = {params[0]['name']};")
    elif return_type != "void":
        if return_type in ["int", "double"]:
            lines.append("        return 0;")
        elif return_type == "boolean":
            lines.append("        return false;")
        else:
            lines.append("        return null;")
    else:
        lines.append("        // TODO: Implement")

    lines.append("    }")
    return "\n".join(lines)


def generate_java_code(classes):
    result = []

    for cls in classes:
        name = cls["name"]
        parent = find_parent(cls)
        attributes = cls.get("attributes", [])

        if parent:
            result.append(f"public class {name} extends {parent} " + "{")
        else:
            result.append(f"public class {name} " + "{")

        # поля
        for attr in attributes:
            attr_type = get_java_type(attr["type"])
            result.append(f"    private {attr_type} {attr['name']};")

        result.append("")

        # constructor
        parent_attrs = []
        if parent:
            for c in classes:
                if c["name"] == parent:
                    parent_attrs = c.get("attributes", [])
                    break

        all_attrs = parent_attrs + attributes

        params = ", ".join(
            [f"{get_java_type(a['type'])} {a['name']}" for a in all_attrs]
        )

        result.append(f"    public {name}({params}) " + "{")

        if parent_attrs:
            parent_args = ", ".join([a["name"] for a in parent_attrs])
            result.append(f"        super({parent_args});")

        for attr in attributes:
            result.append(f"        this.{attr['name']} = {attr['name']};")

        result.append("    }")
        result.append("")

        # methods
        for method in cls.get("methods", []):
            result.append(generate_method(method))
            result.append("")

        result.append("}")
        result.append("")

    return "\n".join(result)
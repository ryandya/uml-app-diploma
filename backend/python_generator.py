def find_parent(class_data):
    for rel in class_data.get("relationships", []):
        if rel["type"] == "inheritance":
            return rel["target"]
    return None


def get_class_by_name(classes, name):
    for cls in classes:
        if cls["name"] == name:
            return cls
    return None


def generate_method(method):
    method_name = method["name"]
    params = method.get("params", [])
    return_type = method.get("returnType", "void").lower()

    param_names = [p["name"] for p in params]
    param_string = ", ".join(["self"] + param_names)

    lines = [f"    def {method_name}({param_string}):"]
    lines.append("        # TODO: Implement")

    # getter
    if method_name.startswith("get"):
        field_name = method_name[3:]
        if field_name:
            field_name = field_name[0].lower() + field_name[1:]
            lines.append(f"        return self.{field_name}")
        else:
            lines.append("        pass")

    elif method_name.startswith("change"):
        field_name = method_name[6:]
        if field_name and params:
            field_name = field_name[0].lower() + field_name[1:]
            lines.append(f"        self.{field_name} = {params[0]['name']}")
        else:
            lines.append("        pass")
    # bool
    elif return_type == "bool":
        lines.append("        return False")

    # numbers
    elif return_type in ["int", "float", "double"]:
        lines.append("        return 0")

    # string
    elif return_type == "string":
        lines.append('        return ""')

    # objects
    elif return_type != "void":
        lines.append("        return None")

    else:
        lines.append("        pass")

    return "\n".join(lines)


def generate_python_code(classes):
    result = []

    for cls in classes:
        class_name = cls["name"]
        parent_name = find_parent(cls)

        if parent_name:
            result.append(f"class {class_name}({parent_name}):")
        else:
            result.append(f"class {class_name}:")

        own_attributes = cls.get("attributes", [])

        parent_attributes = []
        if parent_name:
            parent_class = get_class_by_name(classes, parent_name)
            if parent_class:
                parent_attributes = parent_class.get("attributes", [])

        all_attributes = parent_attributes + own_attributes

        constructor_params = ["self"] + [attr["name"] for attr in all_attributes]
        result.append(f"    def __init__({', '.join(constructor_params)}):")

        # super
        if parent_name and parent_attributes:
            parent_args = ", ".join([attr["name"] for attr in parent_attributes])
            result.append(f"        super().__init__({parent_args})")

        # свои поля
        for attr in own_attributes:
            result.append(f"        self.{attr['name']} = {attr['name']}")

        if not own_attributes and not parent_name:
            result.append("        pass")

        result.append("")

        for method in cls.get("methods", []):
            result.append(generate_method(method))
            result.append("")

        result.append("")

    return "\n".join(result)
def normalize_class(cls):
    attributes = []

    for attr in cls.get("attributes", []):
        if ":" in attr:
            name, type_ = attr.split(":")
            attributes.append({
                "name": name.strip(),
                "type": type_.strip()
            })

    return {
        "name": cls["name"],
        "attributes": attributes,
        "methods": cls.get("methods", []),
        "extends": cls.get("extends")
    }


def guess_java_type(t):
    t = t.lower()
    if t in ["int", "integer", "number"]:
        return "int"
    if t in ["float", "double"]:
        return "double"
    if t in ["bool", "boolean"]:
        return "boolean"
    return "String"


def guess_cpp_type(t):
    t = t.lower()
    if t in ["int", "integer"]:
        return "int"
    if t in ["float", "double"]:
        return "double"
    if t in ["bool", "boolean"]:
        return "bool"
    return "std::string"
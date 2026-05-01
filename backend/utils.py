def normalize_class(cls):
    return {
        "name": cls.get("name", "Unknown"),
        "attributes": cls.get("attributes", []),
        "methods": cls.get("methods", []),
        "relationships": cls.get("relationships", [])
    }


def guess_java_type(type_name):
    t = type_name.lower()

    if t in ["int", "integer"]:
        return "int"
    elif t in ["float", "double", "number"]:
        return "double"
    elif t in ["bool", "boolean"]:
        return "boolean"
    elif t in ["string"]:
        return "String"

    return "Object"


def guess_cpp_type(type_name):
    t = type_name.lower()

    if t in ["int", "integer"]:
        return "int"
    elif t in ["float", "double", "number"]:
        return "double"
    elif t in ["bool", "boolean"]:
        return "bool"
    elif t in ["string"]:
        return "std::string"

    return "auto"
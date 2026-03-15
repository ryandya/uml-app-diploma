import re

def parse_class_block(text):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if not lines or lines[0].startswith(('-', '+')):
        return None

    name = lines[0]
    fields = []
    methods = []
    section = "fields"

    for line in lines[1:]:
        if line.startswith("---") or line.startswith("===") or not line:
            section = "methods"
            continue
        if line.startswith('-'):
            fields.append(re.sub(r'\s*:\s*', ': ', line[1:].strip()))
        elif line.startswith('+'):
            methods.append(re.sub(r'\s*:\s*', ': ', line[1:].strip()))
        else:
            continue

    return {"name": name, "fields": fields, "methods": methods}

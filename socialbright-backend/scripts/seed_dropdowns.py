from faker import Faker

fake = Faker()
Faker.seed(42)

def seed_dropdowns():
    sql = ""

    def seed(table, values):
        nonlocal sql
        for i, name in enumerate(values, start=1):
            sql += f"INSERT INTO dropdowns.{table} (id, name, is_active, display_order) VALUES ({i}, '{name}', TRUE, {i});\n"

    seed("contact_methods", ["Phone", "Email", "Text"])
    seed("genders", ["Male", "Female", "Other"])
    seed("languages", ["English", "Spanish", "French"])
    seed("living_arrangements", ["Alone", "With Family", "Group Home"])
    seed("states", ["NH", "VT", "ME"])
    seed("document_categories", ["MEA", "Consent", "Plan of Care"])
    seed("event_types", ["Home Visit", "Check-in", "Assessment"])
    seed("note_types", ["Visit", "Phone", "Email"])
    seed("visit_types", ["Initial", "Follow-up", "Annual"])
    seed("billing_statuses", ["Billed", "Pending", "Denied"])
    seed("closure_reasons", ["Completed", "Client Moved", "Other"])
    seed("gcm_statuses", ["Active", "Inactive", "Discharged"])
    seed("user_roles", ["Admin", "Case Manager", "Supervisor"])

    return sql

if __name__ == "__main__":
    with open("dropdown_seed_from_faker.sql", "w") as f:
        f.write(seed_dropdowns())

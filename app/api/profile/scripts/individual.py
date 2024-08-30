import sys
import json
from linkedin_api import Linkedin


def safe_text(text):
    try:
        return text.encode("latin-1", "replace").decode("latin-1")
    except Exception:
        return "Unsupported characters"


def get_profile_data(profile_id):
    # Authenticate using LinkedIn account credentials
    api = Linkedin("9313972238", "Mitul@9824535467")

    # GET a profile
    profile = api.get_profile(profile_id)

    # Extract and format data as needed
    data = {
        "firstName": profile.get("firstName", "Unknown"),
        "lastName": profile.get("lastName", "Unknown"),
        "summary": profile.get("summary", "No summary provided"),
        "experience": profile.get("experience", []),
        "education": profile.get("education", []),
        "certifications": profile.get("certifications", []),
        "contact_info": api.get_profile_contact_info(profile_id),
    }

    return data


if __name__ == "__main__":
    profile_id = sys.argv[1]  # Get profile_id from command line arguments
    data = get_profile_data(profile_id)
    print(json.dumps(data))  # Print data as JSON

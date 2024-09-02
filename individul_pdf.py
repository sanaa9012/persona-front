from linkedin_api import Linkedin
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        # Add the background image
        self.image('bg3.png', x=0, y=0, w=self.w, h=self.h)

        # Set top margin for the text
        self.set_y(20)  # Adjust the value (e.g., 20) to increase or decrease top margin

        if self.page_no() == 1:
            self.set_font('Arial', 'B', 14)
            self.cell(0, 10, '', ln=True, align='C')
            self.ln(10)

    def footer(self):
        # Set bottom margin for the text
        self.set_y(-20)  # Adjust the value (e.g., -20) to increase or decrease bottom margin

    def add_key_value(self, key, value):
        self.set_font('Times', 'B', 12)
        self.cell(50, 10, f"{key}: ", ln=False)
        self.set_font('Times', '', 12)
        self.multi_cell(0, 10, value)
        self.ln(4)  # Add space between key-value pairs

    def add_section_title(self, title):
        self.ln(6)  # Add space before each section
        self.set_font('Arial', 'B', 14)
        self.cell(0, 10, title, ln=True, align='L')
        self.ln(4)  # Add space after each section title

def safe_text(text):
    try:
        return text.encode('latin-1', 'replace').decode('latin-1')
    except Exception:
        return "Unsupported characters"

def print_persona_info(profile_id):
    try:
        # Authenticate using LinkedIn account credentials
        api = Linkedin('9173432482', 'Mevada@9173')

        # GET a profile
        profile = api.get_profile(profile_id)

        # Create a PDF object
        pdf = PDF()
        pdf.add_page()

        # Title
        pdf.set_font('Arial', 'B', 16)
        pdf.cell(0, 10, f"Persona of {profile.get('firstName', 'Unknown')} {profile.get('lastName', 'Unknown')}", ln=True, align='C')
        pdf.ln(10)

        # Profile Summary
        pdf.add_section_title("Profile Summary")
        pdf.add_key_value("Summary", profile.get('summary', 'No summary provided'))

        # Other Profile Information
        for key, value in profile.items():
            if key in [
                'entityUrn', 'urn_id', 'displayPictureUrl', 'img_100_100', 'img_200_200', 'img_400_400', 'img_600_600',
                'profilePicture', 'geoLocation', 'location', 'profile_urn', 'member_urn', 'geoCountryUrn', 'geoLocationBackfilled',
                'elt', 'profilePictureOriginalImage', 'companyUrn', 'industryUrn', 'companyLogoUrl'
            ]:
                continue

            if key == 'certifications':
                pdf.add_section_title("Certifications")
                for cert in value:
                    pdf.ln(10)  # Add space before each new certification
                    company_name = cert.get('company', {}).get('name', 'N/A')
                    pdf.add_key_value("Company", company_name)
                    for cert_key, cert_value in cert.items():
                        if cert_key not in ['company', 'companyUrn', 'entityUrn']:
                            pdf.add_key_value(cert_key.capitalize(), str(cert_value))

            elif key == 'education':
                pdf.add_section_title("Education")
                for edu in value:
                    school_name = edu.get('schoolName', 'N/A')
                    degree_name = edu.get('degreeName', 'N/A')
                    field_of_study = edu.get('fieldOfStudy', 'N/A')
                    start_date = edu.get('timePeriod', {}).get('startDate', {}).get('year', 'N/A')
                    end_date = edu.get('timePeriod', {}).get('endDate', {}).get('year', 'N/A')
                    pdf.add_key_value("School Name", school_name)
                    pdf.add_key_value("Degree Name", degree_name)
                    pdf.add_key_value("Field of Study", field_of_study)
                    pdf.add_key_value("Start Date", str(start_date))
                    pdf.add_key_value("End Date", str(end_date))

            elif key == 'experience':
                pdf.add_section_title("Experience")
                for exp in value:
                    company_name = exp.get('company', {}).get('name', 'N/A')
                    pdf.add_key_value("Company Name", company_name)
                    for exp_key, exp_value in exp.items():
                        if exp_key not in ['company', 'companyUrn', 'entityUrn']:
                            pdf.add_key_value(exp_key.capitalize(), str(exp_value))

            else:
                pdf.add_key_value(key.capitalize(), str(value))

        # GET a profile's contact info
        pdf.add_section_title("Contact Information")
        contact_info = api.get_profile_contact_info(profile_id)
        for key, value in contact_info.items():
            if key not in ['entityUrn', 'companyLogoUrl']:
                pdf.add_key_value(key.capitalize(), str(value))

        # Save the PDF to a file
        pdf.output("linkedin_profile.pdf")

        print("Profile information has been saved to linkedin_profile.pdf")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    profile_id = input("Enter the LinkedIn profile ID of the person: ")
    print_persona_info(profile_id)

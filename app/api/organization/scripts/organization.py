import sys
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time
from linkedin_api import Linkedin


def safe_text(text):
    try:
        return text.encode("latin-1", "replace").decode("latin-1")
    except Exception:
        return "Unsupported characters"


def print_company_info(company_name):
    try:
        # Authenticate using LinkedIn account credentials
        api = Linkedin("9104396556", "0258sana")

        # GET company information
        company = api.get_company(company_name)

        # Fields to include in the output
        fields_to_include = {
            "name": "Name",
            "staffCount": "Staff Count",
            "companyPageUrl": "Company Page URL",
            "companyEmployeesSearchPageUrl": "Employees Search Page URL",
            "confirmedLocations": "Confirmed Locations",
            "followerCount": "Follower Count",
            "description": "Description",
            "universalName": "Universal Name",
            "url": "Website URL",
            "jobSearchPageUrl": "Job Search Page URL",
            "paidCompany": "Paid Company Status",
            "tagline": "Tagline",
        }

        # Prepare company information for JSON output
        company_info = {}
        company_info["name"] = safe_text(company.get("name", "Unknown"))
        for key, label in fields_to_include.items():
            value = company.get(key, "Not Available")
            if key == "confirmedLocations" and isinstance(value, list):
                company_info["confirmedLocations"] = [
                    {
                        "country": loc.get("country", "N/A"),
                        "state": loc.get("geographicArea", "N/A"),
                        "city": loc.get("city", "N/A"),
                        "postalCode": loc.get("postalCode", "N/A"),
                        "address": loc.get("line1", "N/A"),
                        "description": loc.get("description", "N/A"),
                        "headquarters": loc.get("headquarter", False),
                    }
                    for loc in value
                ]
            else:
                company_info[key] = safe_text(str(value))

        return json.dumps(company_info)

    except Exception as e:
        return json.dumps({"error": str(e)})


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No company name provided"}))
        return

    company_name = sys.argv[1]

    # Set up Chrome options for headless mode
    options = webdriver.ChromeOptions()
    options.add_argument("headless")  # Run in headless mode
    options.add_argument("window-size=1920x1080")  # Optional: set the window size
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    # Initialize the WebDriver
    driver = webdriver.Chrome(options=options)

    # Step 1: Perform a Google search for the company
    driver.get("https://www.google.com")
    driver.implicitly_wait(2)
    driver.find_element(By.NAME, "q").send_keys(company_name + Keys.ENTER)

    # Locate the "Maps" tab and click it
    try:
        maps_tab = driver.find_element(By.LINK_TEXT, "Maps")
        maps_tab.click()
    except NoSuchElementException:
        driver.quit()
        print(json.dumps({"error": 'No "Maps" tab found'}))
        return

    # Add a delay to allow the map page to load
    time.sleep(5)

    # Extract information
    company_data = {
        "title": None,
        "rating": None,
        "address": None,
        "website": None,
        "phone": None,
        "reviews": [],
    }

    try:
        company_data["title"] = driver.find_element(
            By.CSS_SELECTOR, "h1.DUwDvf.lfPIob"
        ).text
    except NoSuchElementException:
        print("Title element not found.")
        company_data["title"] = "N/A"

    try:
        rating_element = driver.find_element(
            By.XPATH, "//span[@aria-hidden='true' and contains(text(), '.')]/.."
        )
        company_data["rating"] = rating_element.text.split()[
            0
        ]  # Extract only the numeric part
    except NoSuchElementException:
        print("Rating element not found.")
        company_data["rating"] = "N/A"

    try:
        address_element = driver.find_element(
            By.CSS_SELECTOR, "button[data-item-id='address'] div.Io6YTe"
        )
        company_data["address"] = address_element.text
    except NoSuchElementException:
        print("Address element not found.")
        company_data["address"] = "N/A"

    try:
        website_element = driver.find_element(
            By.CSS_SELECTOR, "a[data-item-id='authority'] div.Io6YTe"
        )
        company_data["website"] = website_element.text
    except NoSuchElementException:
        print("Website element not found.")
        company_data["website"] = "N/A"

    try:
        phone_element = driver.find_element(
            By.CSS_SELECTOR, "button[data-item-id^='phone'] div.Io6YTe"
        )
        company_data["phone"] = phone_element.text
    except NoSuchElementException:
        print("Phone element not found.")
        company_data["phone"] = "N/A"

    try:
        reviews_tab = driver.find_element(
            By.CSS_SELECTOR, "button[aria-label^='Reviews for']"
        )
        reviews_tab.click()
    except NoSuchElementException:
        driver.quit()
        print(json.dumps({"error": 'No "Reviews" tab found'}))
        return

    time.sleep(3)

    try:
        reviews = driver.find_elements(By.CLASS_NAME, "MyEned")[:10]
        company_data["reviews"] = [review.text for review in reviews]
    except NoSuchElementException:
        print("Reviews not found.")
        company_data["reviews"] = []

    # Search for LinkedIn URL
    try:
        driver.get("https://www.google.com")
        driver.find_element(By.NAME, "q").send_keys(
            company_name + " LinkedIn Profile" + Keys.ENTER
        )

        try:
            first_link = driver.find_element(
                By.CSS_SELECTOR, 'a[href*="linkedin.com/company"]'
            )
            first_link.click()
        except NoSuchElementException:
            driver.quit()
            print(json.dumps({"error": "No LinkedIn profile link found"}))
            return

        time.sleep(3)
        linkedin_url = driver.current_url
        linkedin_id = (
            linkedin_url.split("company/")[1].split("/")[0]
            if "company/" in linkedin_url
            else "Not Available"
        )

        # Add LinkedIn info to the company data
        company_data["linkedinUrl"] = linkedin_url
        company_data["linkedinId"] = linkedin_id

        # Use the LinkedIn ID to get company info
        company_info = print_company_info(linkedin_id)
        company_data["linkedinCompanyInfo"] = json.loads(company_info)

    except Exception as e:
        company_data["error"] = str(e)

    finally:
        driver.quit()

    print(json.dumps(company_data))


if __name__ == "__main__":
    main()

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time
import os
from textblob import TextBlob
import matplotlib.pyplot as plt

def clean_text(text):
    """Clean the text by removing special characters."""
    import re
    return ' '.join(re.sub(r"(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", text).split())

def get_sentiment(text):
    """Classify sentiment using TextBlob."""
    analysis = TextBlob(clean_text(text))
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'

def analyze_reviews(reviews):
    """Analyze the sentiment of the reviews and categorize them."""
    positive_reviews = []
    negative_reviews = []

    for review in reviews:
        sentiment = get_sentiment(review)
        if sentiment == 'positive':
            positive_reviews.append(review)
        elif sentiment == 'negative':
            negative_reviews.append(review)

    total_reviews = len(reviews)
    positive_percentage = (len(positive_reviews) / total_reviews) * 100
    negative_percentage = (len(negative_reviews) / total_reviews) * 100

    print(f"Positive reviews percentage: {positive_percentage:.2f}%")
    print(f"Negative reviews percentage: {negative_percentage:.2f}%")

    print("\nPositive reviews:")
    for review in positive_reviews:
        print(review)
    
    print("\nNegative reviews:")
    for review in negative_reviews:
        print(review)

    # Generate a pie chart and save it as PNG
    labels = ['Positive', 'Negative']
    sizes = [positive_percentage, negative_percentage]
    colors = ['#66b3ff', '#ff9999']
    explode = (0.1, 0)  # explode the 1st slice (Positive)

    plt.figure(figsize=(8, 8))
    plt.pie(sizes, explode=explode, labels=labels, colors=colors,
            autopct='%1.1f%%', shadow=True, startangle=140)
    plt.title('Sentiment Analysis of Reviews')

    # Save the plot as a PNG file in the same directory
    output_file = 'sentiment_analysis_pie_chart.png'
    plt.savefig(output_file, format='png')
    plt.close()  # Close the figure to free up memory

    print(f"Pie chart saved as {output_file}")

def get_company_reviews(search, num_reviews=15):
    # Set up Chrome options for headless mode
    options = webdriver.ChromeOptions()
    options.add_argument('headless')  # Run in headless mode
    options.add_argument('window-size=1920x1080')  # Optional: set the window size
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    # Initialize the WebDriver
    driver = webdriver.Chrome(options=options)

    # Step 1: Perform a Google search for the company
    driver.get('https://www.google.com')
    driver.implicitly_wait(2)
    driver.find_element(By.NAME, "q").send_keys(search + Keys.ENTER)

    # Locate the "Maps" tab and click it
    try:
        maps_tab = driver.find_element(By.LINK_TEXT, 'Maps')
        maps_tab.click()
    except NoSuchElementException:
        print("No 'Maps' tab found.")
        driver.quit()
        return

    # Add a delay to allow the map page to load
    time.sleep(5)

    # Click on the "Reviews" tab
    try:
        reviews_tab = driver.find_element(By.CSS_SELECTOR, "button[aria-label^='Reviews for']")
        reviews_tab.click()
    except NoSuchElementException:
        print("No 'Reviews' tab found.")
        driver.quit()
        return

    # Add a delay to allow the reviews to load
    time.sleep(3)

    # Extract the first `num_reviews` reviews and expand them
    reviews = []
    try:
        review_elements = driver.find_elements(By.CLASS_NAME, "MyEned")[:num_reviews]
        for i, review_element in enumerate(review_elements, start=1):
            # Click on "More" if available to expand the review
            try:
                more_button = review_element.find_element(By.CLASS_NAME, "w8nwRe")  # Locate the "More" button
                more_button.click()
                time.sleep(1)  # Wait for the text to expand
            except NoSuchElementException:
                pass  # No "More" button found, proceed

            # Get the full review text
            full_review_text = review_element.text
            reviews.append(full_review_text)

    except NoSuchElementException:
        print("No reviews found.")

    # Close the browser when done
    driver.quit()

    # Perform sentiment analysis on the collected reviews
    analyze_reviews(reviews)

if __name__ == "__main__":
    company_name = input("Enter the company name: ")
    get_company_reviews(company_name, num_reviews=15)

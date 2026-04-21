import pandas as pd

# Load your data intp your dataframe
df = pd.read_csv("primecore_chatbot_faq.csv")
# print(df)

print("CoreBot: Hello! Welcome to PrimeCore Sys. How can I help you find the perfect gaming setup today?")

while True:
    #1. Get the user's input and storethe same in a variable
    user_text = input("\n You: ").lower()

    # 2. Check if the user wants to exit the chat/conversation
    if user_text == "quit":
        print("CoreBot: Goodbye! Have a great day!")
        break

    # Create a variable that will store the details structured in the csv file
    found_answer = False

    # Come up with a loop that loops through the entire dataframe and checks if the user input matches any of the symptoms in the dataframe
    for index, row in df.iterrows():
        # Clean up the Keywords from the CSV row
        keyword_list = str(row["Keywords"]).split(",")

        # Check if any of the keywords match the user input
        for word in keyword_list:
            clean_word = word.strip().lower()

            # If the keyword is inside the user input, then we will print the corresponding answer from the CSV file
            if clean_word in user_text:
                print("CoreBot:", row["Response"])
                found_answer = True
                break # Stop looking at other answers since we found a match

            #  4. If we loop through the entire dataframe and we don't find any match, then we will print a default response
            if not found_answer:
                print("CoreBot: I'm sorry, I don't have information on that. Try asking about something else.")
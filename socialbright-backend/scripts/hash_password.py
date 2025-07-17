import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))


from utils.security import hash_password



if __name__ == "__main__":
    password = input("Enter password to hash: ")
    print("Hashed password:\n", hash_password(password))

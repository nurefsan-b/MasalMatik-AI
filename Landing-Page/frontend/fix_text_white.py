import os
import re

dir_path = r'c:\Users\Nur Efşan\Desktop\yz\frontend\src'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.jsx'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace all text-white with text-dark-900
            new_content = re.sub(r'\btext-white\b', 'text-dark-900', content)
            
            # Also if there are any text-primary-100 or 200 left, replace them
            new_content = re.sub(r'text-primary-[123]00(?:/[0-9]+)?', 'text-dark-900', new_content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file}")

print("Text colors fixed.")

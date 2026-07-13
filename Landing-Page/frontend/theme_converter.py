import os
import re

dir_path = r'c:\Users\Nur Efşan\Desktop\yz\frontend\src'

def replace_theme_classes(content):
    # Text colors
    content = re.sub(r'text-primary-[1234]00(?:/[0-9]+)?', 'text-dark-800', content)
    content = re.sub(r'text-primary-500(?:/[0-9]+)?', 'text-magic-green', content)
    
    # Hover text colors
    content = re.sub(r'hover:text-white', 'hover:text-magic-green', content)
    
    # Backgrounds and borders (white/10 -> dark/10)
    content = re.sub(r'bg-white/([0-9]+)', r'bg-magic-green/\1', content)
    content = re.sub(r'border-white/([0-9]+)', r'border-magic-green/\1', content)
    
    # Specific component styles
    content = re.sub(r'text-white/([0-9]+)', r'text-dark-800', content)
    
    return content

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.jsx'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = replace_theme_classes(content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file}")

print("Theme conversion complete.")

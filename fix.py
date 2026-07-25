# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines before: {len(lines)}")

new_lines = []
for i, line in enumerate(lines):
    # Insert <div class="two-column"> before section 8
    if i == 1941 and '<article class="code-panel"' in line:
        new_lines.append('        <div class="two-column">\n')
    
    # After section 9 ends (before </article> at line ~2600)
    if i == 2599 and '</code></pre>' in line:
        pass  # Will add closing tags after next line
    
    new_lines.append(line)
    
    # After the </article> of coordinate click code panel
    if i > 2595 and i < 2610 and new_lines[-1].strip() == '</article>' and any('座標點擊' in l for l in lines[max(0,i-20):i]):
        new_lines.append('      </div>\n')
        new_lines.append('</section>\n')

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Total lines after: {len(new_lines)}")
print("Done!")

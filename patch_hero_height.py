with open('app/pages/index.vue', 'r') as f:
    content = f.read()

content = content.replace('min-h-[420px]', 'min-h-[500px]')
content = content.replace('md:h-[500px]', 'md:h-[600px]')

with open('app/pages/index.vue', 'w') as f:
    f.write(content)

html = open('index.html', 'r')

text = html.read()

words_list = text.split('class="board-cell"')

new_text = ''
for i in range(len(words_list)-1):
    data_index = str(i//5) + str(i % 5)
    new_text = new_text + words_list[i] + \
        f' class="board-cell" data-index="{data_index}"'

new_text = new_text + words_list[-1]

new_html = open('index.html', 'w')
new_html.write(new_text)

# TOBE

import time, os, sqlite3, requests, json, re
from random import randint
from pyquery import PyQuery 
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client.test

clear = lambda: os.system('cls')

####################################################################################################
# Поиск по ингред.: select name from Ingredient where upper(name) like upper('%яй%') order by name #
####################################################################################################


pq = PyQuery(requests.get("https://eda.ru/").text)
categores = pq('.seo-footer__list-item').find('a')
num = 0;
for cat in categores.items():
	for i in range(1,999):
		URL = 'https://eda.ru' + cat.attr('href') + '?page=' + str(i)
		# print(URL)
		pq = PyQuery(requests.get(URL).text)
		if pq('body > div.wrapper-sel > section > div > section.recipes-page._no-top-pad.layout__content > div > div > div > div.recipes-page__not-found.js-updated-page__not-found.visible > h3').text() == 'Мы не нашли ничего по вашему запросу, попробуйте изменить параметры фильтра.':
			break
		recepts = pq('body > div.wrapper-sel > section > div > section.recipes-page._no-top-pad.layout__content > div > div > div > div.js-updated-page__content.js-load-more-content > div');
		num_recept = 1
		for recept in recepts.items():
			recipe = {
				'title': recept.find('div.clearfix > div.horizontal-tile__content > h3 > a:nth-child(1) > span'),
				'ingredients': [],
				'category' : cat.text().strip().replace("\xa0"," "),
				'image' :  recept.find('.lazy-load-container').attr('data-src'),
				'url': "https://eda.ru"+str(recept.find('div.clearfix > div.horizontal-tile__content > h3 > a:nth-child(1) > span').parent().attr('href'))
			}
			ingrs = recept.find("div.clearfix > div.horizontal-tile__content > div.horizontal-tile__item-specifications > div.inline-dropdown__dropdown > div > div > div.ingredients-list__content > p")
			recipe['title'] = str(recipe['title'].text()).strip().replace("'", "").replace("\"", "").replace("\xa0"," ")
			if recipe['title'] == '':
				continue
			num += 1;
			for ingr in ingrs.items():
				sql = ''
				try:
					ingr = str(json.loads(ingr.attr('data-ingredient-object'))['name']).replace("'", "").replace("\"", "")
					recipe['ingredients'].append(ingr)
					# requests.post("http://localhost:3030/ingredient/", json={"title": ingr})
					db.test_ingr.insert({"title": ingr})
				except Exception as e:
					print(e)
			
			# requests.post("http://localhost:3030/recipe/", json=recipe )
			db.test_recipe.insert(recipe)
			print(recipe)
		print(str(num) + "_____" + str(cat.text().strip()))
		



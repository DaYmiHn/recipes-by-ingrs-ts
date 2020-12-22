import time, os, sqlite3, requests, urllib, time
from pyquery import PyQuery 
# from memory_profiler import profile

from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client.domchanski


def clearStr(str):
	return str.replace("'", "").replace("\"", "").strip()

clear = lambda: os.system('cls')





def main():
	pq = PyQuery(requests.get("https://www.edimdoma.ru/retsepty").text)
	categores = pq('input[name=recipe_category].checkbox__input')

	progress = 0;
	db.recipe.delete_many({})
	
	for cat in categores.items():
		pq = PyQuery(requests.get('https://www.edimdoma.ru/retsepty?tags[recipe_category][]='+cat.val()).text)
		print('https://www.edimdoma.ru/retsepty?tags[recipe_category][]='+cat.val())
		lastPage = int(pq(".tags_content_pages_container > div.paginator > div > a:nth-child(8)").text())

		for i in range(1,lastPage):
			recipes = []
			pq = PyQuery(requests.get('https://www.edimdoma.ru/retsepty?page='+str(i)+'&tags[recipe_category][]='+cat.val()).text)
			recepts = pq('.card__title.title');

			for recept in recepts.items():
				# if progress <= 3020:
				# 	print(progress)
				# 	progress += 1
				# 	continue
				secumdomer = time.time()
				try:
					pq = PyQuery(requests.get('https://www.edimdoma.ru'+recept.parent().attr('href')).text)
					# recept = 'https://www.edimdoma.ru'+recept.parent().attr('href')
					recipe = {
						'title': pq('.recipe-header__name').text(),
						'ingredients': [],
						'category' : cat.val(),
						'url': 'https://www.edimdoma.ru'+recept.parent().attr('href')
					}

					ingrs = pq('span.recipe_ingredient_title')

					if len(ingrs) == 0:
						continue
					for ingr in ingrs.items():
						ingredient = clearStr(ingr.text())
						recipe['ingredients'].append(ingredient)
						requests.post("http://localhost:3030/ingredient/", json={"title": ingredient})
						# db.ingredient.updateOne(
						# 	{ "$setOnInsert": { "title" : clearStr(ingr.text()) } },
						# 	{ "upsert": "true" }
						# )

					recipe['ingredients'] = list(dict.fromkeys(recipe['ingredients']))

					print(progress, recipe['url'])
					print("Время:"+str(time.time() - secumdomer))
					progress += 1
					recipes.append(recipe)
				except Exception as e:
					pass
				

			print('===================================================')
			try:
				db.recipe.insert_many(recipes)
			except Exception as e:
				pass		
			print('===================================================')	
		clear()	
if __name__ == '__main__':
    main()
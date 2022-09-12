import requests 
from bs4 import BeautifulSoup
url_test = 'https://www.nike.com/es/w?q=dunk&vst=dunk'
html_test = requests.get(url_test)
soup = BeautifulSoup(html_test.text,'html.parser')
products = soup.find_all('div',{'class' : 'product-card__body'})
for product in products:
    print(product.find('a',{'class' : 'product-card__link-overlay'}).text)
    print(soup.findAll('img').text)

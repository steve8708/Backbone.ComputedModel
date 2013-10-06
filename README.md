# Backbone.ComputedModel

Computed properties for your backbone models

```coffeescript

class MyModel extends Backbone.ComputedModel
  constructor: ->
    super

  compute:
    totalPrice: [ 'productList', (productList) ->
      _.reduce productList, (memo, product) -> memo + product.price
    ]

    maxPrice: [ 'productsList', (productsList) ->
      _.max productsList, (product) -> product.price
    ]

    brandList: [ 'productsList', (productsList) ->
      _.unique productsList.map (product) -> product.brand
    ]

myModel = new MyModel products: [
  brand: 'nike'
  price: 100
,
  brand: 'adidas'
  price: 200
,
  brand: 'aesics'
  price: 150
]

myModel.get 'totalPrice' # => 450
myModel.get 'maxPrice'   # => 200
myModel.get 'brandList'  # => [ 'nike', 'adidas', 'aesics' ]

```

Documentation coming soon...
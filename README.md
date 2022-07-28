# ecommerce - Libraries Management App

## user

1. login(get)
    localhost:8080/ecommerce/users

    format
    {
    "userName":"ebendc",
    "password":"222225"
    }

2. register(post)
    localhost:8080/ecommerce/users

    format
    {
    "userName" :"ebendc",
    "name":"christoper",
    "password":"112233",
    "email":"dajodjao@gmail.com",
    "phone":"1313141415",
    "status":"buyer"
    }

3. update user(patch)
    localhost:8080/ecommerce/users/:id

    format
    {
    "userName" :"ebendc",
    "name":"christoper febian wijaya",
    "password":"222225",
    "email":"dajodjao@gmail.com",
    "phone":"1313141415",
    "status":"buyer"
    }
4. delete user(delete)
    localhost:8080/ecommerce/users/:id

## item

1. show item(get)
localhost:8080/ecommerce/users/items

2. add item (post)
localhost:8080/ecommerce/users/:id/items
id in here is id user

format
[
    {
    "name":"kursi",
    "codes":"A1",
    "price":"25",
    "totalItems":"50"
    },
    {
    "name":"sepatu",
    "codes":"A2",
    "price":"22",
    "totalItems":"50"
    },
    {
    "name":"baju",
    "codes":"A3",
    "price":"8",
    "totalItems":"50"
    },
    {
    "name":"celana",
    "codes":"A4",
    "price":"11",
    "totalItems":"50"
    },
    {
    "name":"kaos kaki",
    "codes":"A5",
    "price":"4",
    "totalItems":"50"
    },
    {
    "name":"sepeda",
    "codes":"A7",
    "price":"252",
    "totalItems":"50"
    },
    {
    "name":"sarung tangan",
    "codes":"A8",
    "price":"22",
    "totalItems":"50"
    },
    {
    "name":"kemeja",
    "codes":"A9",
    "price":"25",
    "totalItems":"50"
    },
    {
    "name":"cincin",
    "codes":"A10",
    "price":"25",
    "totalItems":"50"
    },
    {
    "name":"bendera",
    "codes":"A11",
    "price":"25",
    "totalItems":"50"
    },
    {
    "name":"cermin",
    "codes":"A12",
    "price":"5",
    "totalItems":"50"
    }
]

3. update item(patch)
localhost:8080/ecommerce/users/:id/items/:iditem
id in here is id user

format
{
    "name":"kaos kaki",
    "codes":"A6",
    "price":"12",
    "totalItems":"12"
}

4.delete item(delete)
localhost:8080/ecommerce/users/:id/items/:iditem
id in here is id user

## order
1.show order(get)
localhost:8080/ecommerce/users/:id/orders

2.add order(post)
localhost:8080/ecommerce/users/:id/orders

format
{
    "status":"PENDING",
    "item":[{"name":"sepeda","totalItem":"2"},{"name":"baju","totalItem":"3"}]
}

3.update order(patch)
localhost:8080/ecommerce/users/:id/orders/:idorder
format
{
    "status":"PENDING",
    "item":[{"name":"sepeda","totalItem":"2"},{"name":"baju","totalItem":"3"}]
}
4.delete order(delete)
localhost:8080/ecommerce/users/:id/orders/:idorder

5.change status(patch)
localhost:8080/ecommerce/users/:id/orders/:idorder/:status
status is enum use paid or pending or cancel





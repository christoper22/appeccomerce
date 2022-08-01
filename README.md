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
    "name":"christoper febian wijaya",
    "password":"12345678",
    "email":"dajodjao@gmail.com",
    "phone":"1313141415",
    "role":"member"
    }

3. update user(patch)
    localhost:8080/ecommerce/users/

    format
    {
    "userName" :"ebendc",
    "name":"christoper febian wijaya",
    "password":"12345678",
    "email":"dajodjao@gmail.com",
    "phone":"1313141415",
    "role":"member"
    }
4. delete user(delete)
    localhost:8080/ecommerce/users/

## item

1. show item(get)
localhost:8080/ecommerce/users/items

2. add item (post)
localhost:8080/ecommerce/users/items


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
localhost:8080/ecommerce/users/items/:iditem


format
{
    "name":"kaos kaki",
    "codes":"A6",
    "price":"12",
    "totalItems":"12"
}

4.delete item(delete)
localhost:8080/ecommerce/users/items/:iditem


## order
1.show order(get)
localhost:8080/ecommerce/users/orders


2.add order(post)
localhost:8080/ecommerce/users/orders


format
{
    "status":"PENDING",
    "item":[{"name":"sepeda","totalItem":"2"},{"name":"baju","totalItem":"3"}]
}

3.update order(patch)
localhost:8080/ecommerce/users/orders/:idorder

format
{
    "status":"PENDING",
    "item":[{"name":"sepeda","totalItem":"2"},{"name":"baju","totalItem":"3"}]
}
4.delete order(delete)
localhost:8080/ecommerce/users/orders/:idorder


5.change status(patch)
localhost:8080/ecommerce/users/orders/:idorder/:status
status is enum use paid or pending 



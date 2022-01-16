# PG Connect REST API

### A public service API all about fictional rooms , users , owners , reviews etc free to use when making your fancy new App, Website or Service.

</br>

> https://pg-connect.herokuapp.com/

<br>

# Build Locally

```
1. npm install

2. npm start
```

# Usage

## Request

```
https://pg-connect.herokuapp.com/api/v1/rooms/61df4d8a724e9fe6d25f7c22
```

## Response

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "room": {
      "location": {
        "type": "Point",
        "coordinates": [22.608621337143948, 88.3408846727569],
        "description": "Kolkata, West Bengal",
        "address": "17, Park St, Taltala, Kolkata, West Bengal 700016"
      },
      "ratingsAverage": 4,
      "ratingsQty": 1,
      "images": ["room-1-1.jpg", "room-1-2.jpg", "room-2-3.jpg"],
      "_id": "61df4d8a724e9fe6d25f7c22",
      "contact": 9999999999,
      "mail": "test1@gmail.com",
      "deposit": 5000,
      "established": 2009,
      "parking": "Yes",
      "notice": 3,
      "distance": 4,
      "food": "Veg",
      "occupancy": "Single",
      "type": "Girls",
      "name": "Savita Residence",
      "price": 15000,
      "summary": "Best PG in Kolkata",
      "description": "Dear brothers, kindly visit our flat for all your accommodation or short-term rental needs. This is a new flat with a single-room attached washroom and balcony. Each room has its separate entrance. Fully furnished and all along with marble flooring. Within 15 minutes from Jadavpur police station or Ruby crossing or Acropolis Mall, by auto or bus. Ideal for executives, students, visitors who want to stay in a clean and safe neighborhood. Waiting for your positive response.",
      "owner": {
        "role": "owner",
        "_id": "61df45292fb673e606895c95",
        "name": "John Riley",
        "email": "riley@example.com",
        "photo": "user-19.jpg"
      },
      "__v": 0,
      "reviews": [
        {
          "_id": "61e488a605fef90016363f3f",
          "review": "Very Nice Room, awesome cleaning service !!! Food service could have been better",
          "rating": 4,
          "room": "61df4d8a724e9fe6d25f7c22",
          "user": {
            "_id": "61e1684885e101f41985b46e",
            "name": "Testuser1234",
            "photo": "user-20.jpg"
          },
          "createdAt": "2022-01-16T21:05:42.867Z",
          "__v": 0,
          "id": "61e488a605fef90016363f3f"
        }
      ],
      "id": "61df4d8a724e9fe6d25f7c22"
    }
  }
}
```

</br>

# Documentation

[Postman](https://documenter.getpostman.com/view/14524684/UVXjKGQw)

</br>

> # Thank You !!!

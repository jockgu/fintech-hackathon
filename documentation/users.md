**Show User**
----
  Returns json data about a single user.

* **URL**

  /api/users/:profileid

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `profileid=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
  {
    "_id": "56fff5b77d9f47d03473d582",
    "profileid": "405",
    "__v": 0,
    "viceEvents": [
      {
        "_id": "57002f9193afb04c35d38f58",
        "vice": {
          "0": {
            "_id": "57002f9193afb04c35d38f59",
            "name": "Bought Coffee"
          }
        }
      }
    ],
    "vices": [
      {
        "_id": "570026e4235e7a9c16516383",
        "name": "beer"
      },
      {
        "_id": "570026e4235e7a9c16516382",
        "name": "hookers"
      },
      {
        "_id": "570026e4235e7a9c16516381",
        "name": "whisky"
      }
    ],
    "metrics": [
      {
        "name": "Spending",
        "value": 1,
        "_id": "57001a1f1fbb6d500e51a9c2"
      },
      {
        "_id": "57001cf4bb35e390365a919b",
        "value": 1,
        "name": "Beer"
      }
    ]
  }
]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`


**Create User**
----
  Create a new user

* **URL**

  /user

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

   **Required:**
 
   `profileid=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
  "message": "New savegen user added."
}`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Something Broke" }`
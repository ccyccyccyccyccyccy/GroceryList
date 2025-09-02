# Installation

1. **Create and activate the environment** using `environment.yaml`:

    ```bash
    conda env create -f environment.yaml
    conda activate grocery
    ```

2. **Fill in .env**
Copy .env.example to .env and fill in your credentials:

    ```bash
    cp .env.example .env
    ```
    ```ADMIN_API_KEY```
    ```SEARCH_API_KEY```
    ```DATABASE_URL```: the one ending in typesense.net


# Running the Server

1. **Navigate to the backend directory** 

2. **Start the server** using Uvicorn:
    ```bash
    uvicorn main:app --reload
    ```

    The server will start in development mode at http://127.0.0.1:8000 with auto-reload enabled.
    API documentation is generated at http://127.0.0.1:8000/docs

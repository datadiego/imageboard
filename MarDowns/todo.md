# Tareas

- Crear unauthorized.njk []
- Logout []
- Crear modelo Boards []
- Crear diagrama ER para el imageboard []

- (OYEEEEE EN EN EL ER METE UN POST)
- Solo pon si es un foreing key o un prumary key
- Pasar a mermaid

USER {
        int id PK
        string username
        string password
        date createdAt
        date updatedAt
    }

    POST {
        int id PK
        string title
        string content
        string image
        int userId FK
        int boardId FK
        date createdAt
        date updatedAt
    }

    COMMENT {
        int id PK
        string content
        int userId FK
        int postId FK
        date createdAt
        date updatedAt
    }

    BOARD {
        int id PK
        string name
        date createdAt
        date updatedAt
    }

# Tareas2
 - Vistas: BOARDS.NJK, BOARD.NJK
 - ROUTER: BOARD Y POST

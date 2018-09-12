# UCOSRA API

API REST for UCO Classroom Reservation System using Web Scrapping.

*Original Project -> [UCOSRA-API-python](https://github.com/ahcode/UCOSRA-API-python/)*

## To Run

Prerequisites: NodeJS v8

``` bash
install npm
node server.js
```

## Examples

### Degrees list

GET - /titulaciones

``` json
[
    [
        "0108",
        "GRADO DE INGENIERÍA FORESTAL"
    ],
    [
        "0114",
        "GRADO DE INGENIERÍA INFORMÁTICA"
    ],
    [
        "0111",
        "GRADO DE INGENIERÍA MECÁNICA"
    ],
]
```

### Subjects list

GET - /asignaturas

params:

* titulacion = degree_code

``` json
[
    [
        "101384",
        "ÁLGEBRA LINEAL"
    ],
    [
        "101422",
        "ALGORÍTMICA"
    ],
    [
        "101397",
        "ARQUITECTURA DE COMPUTADORES"
    ],
]
```